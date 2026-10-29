<?php
namespace App\Services;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;
use RuntimeException;

use App\Mail\WithdrawalFailedMail;
use App\Mail\WithdrawalPendingMail;
use App\Mail\WithdrawalSuccessfulMail;
use Illuminate\Support\Facades\Mail;

/**
 * Every balance change goes through here, inside a DB transaction,
 * paired with a Transaction ledger row.
 *
 * All monetary amounts are normal currency values, not minor units.
 *
 * Example:
 * 1000.00 = $1,000.00
 * 1000.50 = $1,000.50
 *
 * Never modify wallet balances directly elsewhere in the codebase.
 */
class WalletService
{
    /**
     * Credit available balance and create a successful transaction.
     *
     * Used for:
     * - deposits
     * - ROI payouts
     * - refunds
     */
    public function credit(
        User $user,
        float $amount,
        string $type,
        array $attributes = []
    ): Transaction {
        return DB::transaction(function () use (
            $user,
            $amount,
            $type,
            $attributes
        ) {
            $amount = round($amount, 2);

            if ($amount <= 0) {
                throw new RuntimeException(
                    'Credit amount must be greater than zero.'
                );
            }

            $wallet = Wallet::where('user_id', $user->id)
                ->lockForUpdate()
                ->firstOrFail();

            $wallet->available_balance = round(
                (float) $wallet->available_balance + $amount,
                2
            );

            $wallet->save();

            return Transaction::create(array_merge([
                'user_id' => $user->id,
                'type' => $type,
                'status' => 'successful',
                'amount' => $amount,
                'processed_at' => now(),
            ], $attributes));
        });
    }

    /**
     * Debit available balance and create a successful transaction.
     *
     * Used for:
     * - investment purchases
     * - other immediate successful debits
     */
    public function debit(
        User $user,
        float $amount,
        string $type,
        array $attributes = []
    ): Transaction {
        return DB::transaction(function () use (
            $user,
            $amount,
            $type,
            $attributes
        ) {
            $amount = round($amount, 2);

            if ($amount <= 0) {
                throw new RuntimeException(
                    'Debit amount must be greater than zero.'
                );
            }

            $wallet = Wallet::where('user_id', $user->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ((float) $wallet->available_balance < $amount) {
                throw new RuntimeException(
                    'Insufficient available balance.'
                );
            }

            $wallet->available_balance = round(
                (float) $wallet->available_balance - $amount,
                2
            );

            $wallet->save();

            return Transaction::create(array_merge([
                'user_id' => $user->id,
                'type' => $type,
                'status' => 'successful',
                'amount' => $amount,
                'processed_at' => now(),
            ], $attributes));
        });
    }

    /**
     * Move funds from available -> locked when a user
     * buys an investment plan.
     */
    public function lockFunds(
        User $user,
        float $amount
    ): void {
        DB::transaction(function () use ($user, $amount) {
            $amount = round($amount, 2);

            if ($amount <= 0) {
                throw new RuntimeException(
                    'Amount must be greater than zero.'
                );
            }

            $wallet = Wallet::where('user_id', $user->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ((float) $wallet->available_balance < $amount) {
                throw new RuntimeException(
                    'Insufficient available balance.'
                );
            }

            $wallet->available_balance = round(
                (float) $wallet->available_balance - $amount,
                2
            );

            $wallet->locked_balance = round(
                (float) $wallet->locked_balance + $amount,
                2
            );

            $wallet->save();
        });
    }

    /**
     * Release principal from locked balance back into
     * available balance when an investment matures.
     */
    public function releaseFunds(
        User $user,
        float $amount
    ): void {
        DB::transaction(function () use ($user, $amount) {
            $amount = round($amount, 2);

            if ($amount <= 0) {
                throw new RuntimeException(
                    'Amount must be greater than zero.'
                );
            }

            $wallet = Wallet::where('user_id', $user->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ((float) $wallet->locked_balance < $amount) {
                throw new RuntimeException(
                    'Insufficient locked balance.'
                );
            }

            $wallet->locked_balance = round(
                (float) $wallet->locked_balance - $amount,
                2
            );

            $wallet->available_balance = round(
                (float) $wallet->available_balance + $amount,
                2
            );

            $wallet->save();
        });
    }

    /**
     * Create a pending withdrawal and reserve the requested amount.
     *
     * The amount is moved:
     *
     * available_balance -> locked_balance
     *
     * The transaction remains pending until an administrator
     * processes it.
     */
   public function requestWithdrawal(
    User $user,
    float $amount,
    array $attributes = []
    ): Transaction {
        $transaction = DB::transaction(function () use (
            $user,
            $amount,
            $attributes
        ) {
            $amount = round($amount, 2);

            $wallet = Wallet::where('user_id', $user->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($amount <= 0) {
                throw new RuntimeException(
                    'Withdrawal amount must be greater than zero.'
                );
            }

            if ((float) $wallet->available_balance < $amount) {
                throw new RuntimeException(
                    'Insufficient available balance.'
                );
            }

            /*
            * Reserve the withdrawal amount.
            *
            * available_balance -> locked_balance
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

            return Transaction::create(array_merge([
                'user_id' => $user->id,
                'type' => 'withdrawal',
                'status' => 'pending',
                'amount' => $amount,
                'currency' => $wallet->currency,
            ], $attributes));
        });

        /*
        * The transaction has committed successfully.
        * Now queue the notification.
        */
        Mail::to($user->email)
            ->queue(new WithdrawalPendingMail($transaction));

        return $transaction;
    }

    /**
     * Mark a pending withdrawal as successful.
     *
     * The money is already reserved in locked_balance,
     * so we only remove it from locked balance.
     */
    public function completeWithdrawal(
    Transaction $transaction
    ): Transaction {
        $completedTransaction = DB::transaction(function () use ($transaction) {
            $transaction = Transaction::whereKey($transaction->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($transaction->type !== 'withdrawal') {
                throw new RuntimeException(
                    'Transaction is not a withdrawal.'
                );
            }

            if ($transaction->status !== 'pending') {
                throw new RuntimeException(
                    'Only pending withdrawals can be completed.'
                );
            }

            $wallet = Wallet::where('user_id', $transaction->user_id)
                ->lockForUpdate()
                ->firstOrFail();

            $amount = round(
                (float) $transaction->amount,
                2
            );

            if ((float) $wallet->locked_balance < $amount) {
                throw new RuntimeException(
                    'Insufficient locked balance for withdrawal.'
                );
            }

            /*
            * The money was already reserved.
            * Remove it from locked balance.
            */
            $wallet->locked_balance = round(
                (float) $wallet->locked_balance - $amount,
                2
            );

            $wallet->save();

            $transaction->update([
                'status' => 'successful',
                'processed_at' => now(),
            ]);

            return $transaction->fresh();
        });

        /*
        * Queue successful withdrawal notification
        * after the database transaction commits.
        */
        $completedTransaction->loadMissing('user');

        Mail::to($completedTransaction->user->email)
            ->queue(new WithdrawalSuccessfulMail($completedTransaction));

        return $completedTransaction;
    }

    /**
     * Reject/cancel a pending withdrawal.
     *
     * The reserved amount is returned:
     *
     * locked_balance -> available_balance
     */
    public function failWithdrawal(
        Transaction $transaction
    ): Transaction {
        $failedTransaction = DB::transaction(function () use ($transaction) {
            $transaction = Transaction::whereKey($transaction->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($transaction->type !== 'withdrawal') {
                throw new RuntimeException(
                    'Transaction is not a withdrawal.'
                );
            }

            if ($transaction->status !== 'pending') {
                throw new RuntimeException(
                    'Only pending withdrawals can be rejected.'
                );
            }

            $wallet = Wallet::where('user_id', $transaction->user_id)
                ->lockForUpdate()
                ->firstOrFail();

            $amount = round(
                (float) $transaction->amount,
                2
            );

            if ((float) $wallet->locked_balance < $amount) {
                throw new RuntimeException(
                    'Insufficient locked balance for withdrawal reversal.'
                );
            }

            /*
            * Return reserved funds.
            *
            * locked_balance -> available_balance
            */
            $wallet->locked_balance = round(
                (float) $wallet->locked_balance - $amount,
                2
            );

            $wallet->available_balance = round(
                (float) $wallet->available_balance + $amount,
                2
            );

            $wallet->save();

            $transaction->update([
                'status' => 'failed',
                'processed_at' => now(),
            ]);

            return $transaction->fresh();
        });

        /*
        * Queue rejected withdrawal notification
        * after the database transaction commits.
        */
        $failedTransaction->loadMissing('user');

        Mail::to($failedTransaction->user->email)
            ->queue(new WithdrawalFailedMail($failedTransaction));

        return $failedTransaction;
    }
}