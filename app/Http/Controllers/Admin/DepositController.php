<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\DepositConfirmedMail;
use App\Mail\DepositRejectedMail;
use App\Models\Deposit;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class DepositController extends Controller
{
    /**
     * Display all deposits.
     */
    public function index(Request $request): Response
    {
        $deposits = Deposit::query()
            ->with([
                'user:id,name,email',
                'transaction:id,reference,status,gateway_reference,processed_at',
            ])
            ->when(
                $request->filled('status'),
                fn ($query) =>
                    $query->where('status', $request->string('status'))
            )
            ->when(
                $request->filled('search'),
                function ($query) use ($request) {
                    $search = $request->string('search');

                    $query->where(function ($query) use ($search) {
                        $query
                            ->where('reference', 'like', "%{$search}%")
                            ->orWhereHas('user', function ($userQuery) use ($search) {
                                $userQuery
                                    ->where('name', 'like', "%{$search}%")
                                    ->orWhere('email', 'like', "%{$search}%");
                            });
                    });
                }
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $stats = [
            'pending' => Deposit::where('status', 'pending')->count(),

            'successful' => Deposit::where('status', 'successful')->count(),

            'failed' => Deposit::where('status', 'failed')->count(),

            'pending_amount' => Deposit::where('status', 'pending')
                ->sum('amount'),

            'successful_amount' => Deposit::where('status', 'successful')
                ->sum('amount'),
        ];

        return Inertia::render('Admin/Deposits/Index', [
            'deposits' => $deposits,

            'filters' => [
                'status' => $request->input('status'),
                'search' => $request->input('search'),
            ],

            'stats' => $stats,
        ]);
    }

    /**
     * Display a single deposit.
     */
    public function show(Deposit $deposit): Response
    {
        $deposit->load([
            'user',
            'transaction',
        ]);

        return Inertia::render('Admin/Deposits/Show', [
            'deposit' => $deposit,
        ]);
    }

    /**
     * Confirm a pending deposit.
     */
    public function confirm(
        Request $request,
        Deposit $deposit
    ): RedirectResponse {
        $confirmedDeposit = DB::transaction(function () use ($deposit) {
            /*
             * Lock the deposit to prevent double confirmation.
             */
            $deposit = Deposit::query()
                ->whereKey($deposit->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($deposit->status !== 'pending') {
                abort(
                    422,
                    'Only pending deposits can be confirmed.'
                );
            }

            /*
             * Lock the associated transaction.
             */
            $transaction = Transaction::query()
                ->whereKey($deposit->transaction_id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($transaction->status !== 'pending') {
                abort(
                    422,
                    'The associated transaction is no longer pending.'
                );
            }

            /*
             * Find or create the user's wallet.
             */
            $wallet = Wallet::firstOrCreate(
                ['user_id' => $deposit->user_id],
                [
                    'available_balance' => 0,
                    'locked_balance' => 0,
                    'currency' => $deposit->currency ?? 'USD',
                ]
            );

            /*
             * Lock the wallet before modifying the balance.
             */
            $wallet = Wallet::query()
                ->whereKey($wallet->id)
                ->lockForUpdate()
                ->firstOrFail();

            /*
             * Credit the wallet exactly once.
             */
            $wallet->available_balance += $deposit->amount;
            $wallet->save();

            /*
             * Mark transaction successful.
             */
            $transaction->update([
                'status' => 'successful',
                'processed_at' => now(),
            ]);

            /*
             * Mark deposit successful.
             */
            $deposit->update([
                'status' => 'successful',
                'processed_at' => now(),
            ]);

            return $deposit->fresh([
                'user',
                'transaction',
            ]);
        });

        /*
         * Send confirmation email AFTER the transaction commits.
         */
        Mail::to($confirmedDeposit->user->email)
            ->queue(
                new DepositConfirmedMail(
                    $confirmedDeposit->transaction
                )
            );

        return back()->with(
            'success',
            'Deposit confirmed successfully and the user wallet has been credited.'
        );
    }

    /**
     * Reject a pending deposit.
     */
    public function reject(
        Request $request,
        Deposit $deposit
    ): RedirectResponse {
        $rejectedDeposit = DB::transaction(function () use ($deposit) {
            $deposit = Deposit::query()
                ->whereKey($deposit->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($deposit->status !== 'pending') {
                abort(
                    422,
                    'Only pending deposits can be rejected.'
                );
            }

            $transaction = Transaction::query()
                ->whereKey($deposit->transaction_id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($transaction->status !== 'pending') {
                abort(
                    422,
                    'The associated transaction is no longer pending.'
                );
            }

            /*
             * IMPORTANT:
             * Do NOT touch the wallet when rejecting.
             */
            $transaction->update([
                'status' => 'failed',
                'processed_at' => now(),
            ]);

            $deposit->update([
                'status' => 'failed',
                'processed_at' => now(),
            ]);

            return $deposit->fresh([
                'user',
                'transaction',
            ]);
        });

        Mail::to($rejectedDeposit->user->email)
            ->queue(
                new DepositRejectedMail(
                    $rejectedDeposit->transaction
                )
            );

        return back()->with(
            'success',
            'Deposit rejected successfully.'
        );
    }
}