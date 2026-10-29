<?php

namespace App\Services;

use App\Models\Investment;
use App\Models\InvestmentPlan;
use App\Models\Payment;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Models\User;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

use App\Mail\InvestmentCreatedMail;
use App\Mail\InvestmentCancelledMail;
use App\Mail\InvestmentMaturedMail;

class InvestmentService
{
    /**
     * Create an investment using funds from the user's
     * available wallet balance.
     *
     * All monetary values are stored as normal currency values.
     */
    public function create(
        int $userId,
        int $investmentPlanId,
        float $amount
    ): Investment {
        return DB::transaction(function () use (
            $userId,
            $investmentPlanId,
            $amount
        ) {
            $amount = round($amount, 2);

            if ($amount <= 0) {
                throw ValidationException::withMessages([
                    'amount' => 'Investment amount must be greater than zero.',
                ]);
            }

            /*
             * Get the user.
             */
            $user = User::query()->find($userId);

            if (!$user) {
                throw ValidationException::withMessages([
                    'amount' => 'The investor account could not be found.',
                ]);
            }

            $plan = InvestmentPlan::query()
                ->whereKey($investmentPlanId)
                ->where('is_active', true)
                ->first();

            if (!$plan) {
                throw ValidationException::withMessages([
                    'investment_plan_id' =>
                        'The selected investment plan is not available.',
                ]);
            }

            /*
             * Validate the investment amount directly.
             *
             * No /100 conversion.
             */
            if (!$plan->isAmountAllowed($amount)) {
                $minimum = number_format(
                    (float) $plan->min_amount,
                    2
                );

                $message = "Investment amount must be at least {$minimum}.";

                if ($plan->max_amount !== null) {
                    $maximum = number_format(
                        (float) $plan->max_amount,
                        2
                    );

                    $message =
                        "Investment amount must be between {$minimum} and {$maximum}.";
                }

                throw ValidationException::withMessages([
                    'amount' => $message,
                ]);
            }

            /*
             * Lock the wallet row while performing the balance operation.
             */
            $wallet = Wallet::query()
                ->where('user_id', $userId)
                ->lockForUpdate()
                ->first();

            if (!$wallet) {
                throw ValidationException::withMessages([
                    'amount' => 'Your wallet could not be found.',
                ]);
            }

            /*
             * Wallet balances are treated as normal currency values.
             */
            if ((float) $wallet->available_balance < $amount) {
                throw ValidationException::withMessages([
                    'amount' => 'Insufficient wallet balance.',
                ]);
            }

            $startsOn = Carbon::today();

            $endsOn = $startsOn->copy()
                ->addMonths($plan->duration_months);

            $nextPayoutOn = $startsOn->copy()
                ->addMonth();

            /*
             * Move the principal from available funds
             * into locked funds.
             */
            $wallet->available_balance = round(
                (float) $wallet->available_balance - $amount,
                2
            );

            $wallet->locked_balance = round(
                (float) $wallet->locked_balance + $amount,
                2
            );

            $wallet->save();

            /*
             * Create the investment.
             */
            $investment = Investment::create([
                'user_id' => $userId,
                'investment_plan_id' => $plan->id,
                'principal_amount' => $amount,
                'locked_monthly_roi_percentage' =>
                    $plan->monthly_roi_percentage,
                'status' => 'active',
                'starts_on' => $startsOn,
                'ends_on' => $endsOn,
                'next_payout_on' => $nextPayoutOn,
            ]);

            /*
             * Calculate monthly ROI.
             */
            $monthlyRoi = $investment->monthlyRoiAmount();

            /*
             * Schedule monthly ROI payments.
             */
            for (
                $month = 1;
                $month <= $plan->duration_months;
                $month++
            ) {
                Payment::create([
                    'investment_id' => $investment->id,
                    'amount' => $monthlyRoi,
                    'due_on' => $startsOn->copy()->addMonths($month),
                    'status' => 'scheduled',
                ]);
            }

            /*
             * Record the investment purchase.
             */
            Transaction::create([
                'user_id' => $userId,
                'investment_id' => $investment->id,
                'type' => 'investment_purchase',
                'status' => 'successful',
                'amount' => $amount,
                'currency' => $wallet->currency,
                'description' => "Investment purchase: {$plan->name}",
                'processed_at' => now(),
            ]);

            /*
             * Send investment-created email after the
             * database transaction successfully commits.
             */
            Mail::to($user->email)
                ->queue(
                    (new InvestmentCreatedMail($investment))
                        ->afterCommit()
                );

            return $investment->load([
                'plan',
                'payments',
            ]);
        });
    }

    /**
     * Cancel an active investment and release its locked principal.
     */
    public function cancelInvestment(
        int $investmentId
    ): Investment {
        return DB::transaction(function () use ($investmentId) {
            $investment = Investment::query()
                ->whereKey($investmentId)
                ->lockForUpdate()
                ->firstOrFail();

            /*
             * Get the investor.
             */
            $user = User::query()->find($investment->user_id);

            if (!$user) {
                throw ValidationException::withMessages([
                    'investment' =>
                        'The investor account could not be found.',
                ]);
            }

            if ($investment->status !== 'active') {
                throw ValidationException::withMessages([
                    'investment' =>
                        'Only active investments can be cancelled.',
                ]);
            }

            $wallet = Wallet::query()
                ->where('user_id', $investment->user_id)
                ->lockForUpdate()
                ->first();

            if (!$wallet) {
                throw ValidationException::withMessages([
                    'investment' =>
                        'The investor wallet could not be found.',
                ]);
            }

            $principal = (float) $investment->principal_amount;

            if ((float) $wallet->locked_balance < $principal) {
                throw ValidationException::withMessages([
                    'investment' =>
                        'The wallet locked balance is insufficient to release this investment.',
                ]);
            }

            /*
             * Release principal.
             */
            $wallet->locked_balance = round(
                (float) $wallet->locked_balance - $principal,
                2
            );

            $wallet->available_balance = round(
                (float) $wallet->available_balance + $principal,
                2
            );

            $wallet->save();

            $investment->update([
                'status' => 'cancelled',
                'matured_at' => null,
                'next_payout_on' => null,
            ]);

            /*
             * Cancel unpaid ROI payments.
             */
            Payment::query()
                ->where('investment_id', $investment->id)
                ->whereIn('status', ['scheduled', 'approved'])
                ->update([
                    'status' => 'skipped',
                ]);

            /*
             * Record principal release.
             */
            Transaction::create([
                'user_id' => $investment->user_id,
                'investment_id' => $investment->id,
                'type' => 'refund',
                'status' => 'successful',
                'amount' => $principal,
                'currency' => $wallet->currency,
                'description' =>
                    'Investment cancelled and principal released.',
                'processed_at' => now(),
            ]);

            /*
             * Send cancellation email after commit.
             */
            Mail::to($user->email)
                ->queue(
                    (new InvestmentCancelledMail($investment))
                        ->afterCommit()
                );

            return $investment->fresh([
                'plan',
                'payments',
            ]);
        });
    }

    /**
     * Mature an investment and release its locked principal.
     */
    public function matureInvestment(
        int $investmentId
    ): Investment {
        return DB::transaction(function () use ($investmentId) {
            $investment = Investment::query()
                ->whereKey($investmentId)
                ->lockForUpdate()
                ->firstOrFail();

            /*
             * Get the investor.
             */
            $user = User::query()->find($investment->user_id);

            if (!$user) {
                throw ValidationException::withMessages([
                    'investment' =>
                        'The investor account could not be found.',
                ]);
            }

            if ($investment->status !== 'active') {
                throw ValidationException::withMessages([
                    'investment' =>
                        'Only active investments can be matured.',
                ]);
            }

            if (Carbon::today()->lt($investment->ends_on)) {
                throw ValidationException::withMessages([
                    'investment' =>
                        'This investment has not reached its maturity date.',
                ]);
            }

            $wallet = Wallet::query()
                ->where('user_id', $investment->user_id)
                ->lockForUpdate()
                ->first();

            if (!$wallet) {
                throw ValidationException::withMessages([
                    'investment' =>
                        'The investor wallet could not be found.',
                ]);
            }

            $principal = (float) $investment->principal_amount;

            if ((float) $wallet->locked_balance < $principal) {
                throw ValidationException::withMessages([
                    'investment' =>
                        'The wallet locked balance is insufficient to release this investment.',
                ]);
            }

            /*
             * Release principal.
             */
            $wallet->locked_balance = round(
                (float) $wallet->locked_balance - $principal,
                2
            );

            $wallet->available_balance = round(
                (float) $wallet->available_balance + $principal,
                2
            );

            $wallet->save();

            $investment->update([
                'status' => 'matured',
                'matured_at' => now(),
                'next_payout_on' => null,
            ]);

            /*
             * Any unpaid ROI beyond the investment term
             * should not remain payable.
             */
            Payment::query()
                ->where('investment_id', $investment->id)
                ->whereIn('status', ['scheduled', 'approved'])
                ->whereDate('due_on', '>', $investment->ends_on)
                ->update([
                    'status' => 'skipped',
                ]);

            /*
             * Record principal release.
             */
            Transaction::create([
                'user_id' => $investment->user_id,
                'investment_id' => $investment->id,
                'type' => 'refund',
                'status' => 'successful',
                'amount' => $principal,
                'currency' => $wallet->currency,
                'description' =>
                    'Investment matured and principal released.',
                'processed_at' => now(),
            ]);

            /*
             * Send maturity email after commit.
             */
            Mail::to($user->email)
                ->queue(
                    (new InvestmentMaturedMail($investment))
                        ->afterCommit()
                );

            return $investment->fresh([
                'plan',
                'payments',
            ]);
        });
    }
}


