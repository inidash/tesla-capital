<?php

namespace App\Services;

use App\Mail\RoiPayoutMail;
use App\Models\Payment;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use RuntimeException;

class PayoutService
{
    /**
     * Approve a scheduled ROI payment.
     */
    public function approve(Payment $payment): Payment
    {
        return DB::transaction(function () use ($payment) {
            $payment = Payment::query()
                ->whereKey($payment->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($payment->status !== 'scheduled') {
                throw new RuntimeException(
                    'Only scheduled payouts can be approved.'
                );
            }

            $payment->update([
                'status' => 'approved',
                'approved_by' => auth()->id(),
                'approved_at' => now(),
            ]);

            return $payment->fresh();
        });
    }

    /**
     * Disburse an approved ROI payment to the investor wallet.
     *
     * The operation is deliberately idempotent:
     * a payment that is already paid cannot be paid again.
     */
    public function disburseToWallet(Payment $payment): Payment
    {
        /*
         * Complete all financial operations first.
         */
        $paidPayment = DB::transaction(function () use ($payment) {
            $payment = Payment::query()
                ->with('investment')
                ->whereKey($payment->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($payment->status !== 'approved') {
                throw new RuntimeException(
                    'Only approved payouts can be disbursed.'
                );
            }

            $investment = $payment->investment;

            if (!$investment) {
                throw new RuntimeException(
                    'The investment associated with this payout could not be found.'
                );
            }

            $wallet = Wallet::query()
                ->where('user_id', $investment->user_id)
                ->lockForUpdate()
                ->first();

            if (!$wallet) {
                throw new RuntimeException(
                    'The investor wallet could not be found.'
                );
            }

            /*
             * Credit ROI to the investor's available balance.
             */
            $wallet->available_balance = round(
                (float) $wallet->available_balance +
                (float) $payment->amount,
                2
            );

            $wallet->save();

            /*
             * Record the ROI movement in the financial ledger.
             */
            $transaction = Transaction::create([
                'user_id' => $investment->user_id,
                'investment_id' => $investment->id,
                'type' => 'roi_payout',
                'status' => 'successful',
                'amount' => $payment->amount,
                'currency' => $wallet->currency,
                'description' => 'ROI payout for investment #' . $investment->id,
                'processed_at' => now(),
            ]);

            /*
             * Mark the payment as paid and link it to the ledger entry.
             */
            $payment->update([
                'status' => 'paid',
                'transaction_id' => $transaction->id,
                'paid_at' => now(),
            ]);

            /*
             * Advance the investment's next payout date.
             */
            $nextPayment = Payment::query()
                ->where('investment_id', $investment->id)
                ->where('status', 'scheduled')
                ->orderBy('due_on')
                ->first();

            $investment->update([
                'next_payout_on' => $nextPayment?->due_on,
            ]);

            /*
             * Reload all relationships required by the email.
             */
            return $payment->fresh([
                'investment.user',
                'investment.plan',
                'transaction',
            ]);
        });

        /*
         * IMPORTANT:
         *
         * The DB transaction has already committed here.
         * Therefore the email cannot be sent for a transaction
         * that later rolls back.
         */
        Mail::to($paidPayment->investment->user->email)
            ->queue(new RoiPayoutMail($paidPayment));

        return $paidPayment;
    }
}