<?php

// namespace App\Http\Controllers;

// use App\Http\Requests\StoreDepositRequest;
// use App\Mail\DepositPendingMail;
// use App\Models\Deposit;
// use App\Models\Transaction;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Mail;
// use Illuminate\Support\Str;
// use Inertia\Inertia;
// use Inertia\Response;

// class DepositController extends Controller
// {
//     public function create(): Response
//     {
//         return Inertia::render('Wallet/Deposit');
//     }

//     /**
//      * Create a pending deposit.
//      *
//      * The user's wallet is NOT credited here.
//      * An admin must confirm the deposit first.
//      */
//     public function store(StoreDepositRequest $request): RedirectResponse
//     {
//         $user = $request->user();

//         $deposit = DB::transaction(function () use ($user, $request) {
//             $amount = (int) $request->validated('amount');

//             $reference = (string) Str::uuid();

//             /*
//              * Create the transaction as PENDING.
//              */
//             $transaction = Transaction::create([
//                 'reference' => $reference,
//                 'user_id' => $user->id,
//                 'type' => 'deposit',
//                 'status' => 'pending',
//                 'amount' => $amount,
//                 'currency' => 'USD',
//                 'payment_gateway' => 'transfer',
//                 'gateway_reference' => 'TRANSFER-' . strtoupper(Str::random(12)),
//                 'gateway_meta' => [
//                     'test_mode' => true,
//                     'method' => 'transfer',
//                 ],
//                 'description' => 'Tesla Capital wallet deposit',
//                 'processed_at' => null,
//             ]);

//             /*
//              * Create the deposit as PENDING.
//              */
//             $deposit = Deposit::create([
//                 'user_id' => $user->id,
//                 'transaction_id' => $transaction->id,
//                 'reference' => $reference,
//                 'amount' => $amount,
//                 'currency' => 'USD',
//                 'status' => 'pending',
//                 'payment_gateway' => 'transfer',
//                 'description' => 'Tesla Capital wallet deposit',
//                 'processed_at' => null,
//             ]);

//             /*
//              * Send pending notification only after
//              * the database transaction has successfully
//              * created the records.
//              */
//             Mail::to($user->email)
//                     ->queue((new DepositPendingMail($transaction))
//                         ->afterCommit()
//                     );
//             return $deposit;
//         });

//         return redirect()
//             ->route('dashboard')
//             ->with(
//                 'success',
//                 'Your deposit of $' .
//                 number_format($deposit->amount / 100, 2) .
//                 ' has been submitted and is awaiting confirmation.'
//             );
//     }
// }


namespace App\Http\Controllers;

use App\Http\Requests\StoreDepositRequest;
use App\Mail\DepositPendingMail;
use App\Models\Deposit;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DepositController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Wallet/Deposit');
    }

    /**
     * Create a pending deposit.
     *
     * The user's wallet is NOT credited here.
     * An admin must confirm the deposit first.
     *
     * Amounts are stored as normal currency values.
     *
     * Example:
     * 1000 = $1,000.00
     * 1000.50 = $1,000.50
     */
    public function store(
        StoreDepositRequest $request
    ): RedirectResponse {
        $user = $request->user();

        $deposit = DB::transaction(function () use (
            $user,
            $request
        ) {
            $amount = round(
                (float) $request->validated('amount'),
                2
            );

            $reference = (string) Str::uuid();

            /*
             * Create the transaction as PENDING.
             */
            $transaction = Transaction::create([
                'reference' => $reference,
                'user_id' => $user->id,
                'type' => 'deposit',
                'status' => 'pending',
                'amount' => $amount,
                'currency' => 'USD',
                'payment_gateway' => 'transfer',
                'gateway_reference' =>
                    'TRANSFER-' . strtoupper(Str::random(12)),
                'gateway_meta' => [
                    'test_mode' => true,
                    'method' => 'transfer',
                ],
                'description' =>
                    'Tesla Capital wallet deposit',
                'processed_at' => null,
            ]);

            /*
             * Create the deposit as PENDING.
             */
            $deposit = Deposit::create([
                'user_id' => $user->id,
                'transaction_id' => $transaction->id,
                'reference' => $reference,
                'amount' => $amount,
                'currency' => 'USD',
                'status' => 'pending',
                'payment_gateway' => 'transfer',
                'description' =>
                    'Tesla Capital wallet deposit',
                'processed_at' => null,
            ]);

            /*
             * Send pending notification only after
             * the database transaction commits.
             */
            Mail::to($user->email)
                ->queue(
                    (new DepositPendingMail($transaction))
                        ->afterCommit()
                );

            return $deposit;
        });

        return redirect()
            ->route('dashboard')
            ->with(
                'success',
                'Your deposit of $' .
                number_format(
                    (float) $deposit->amount,
                    2
                ) .
                ' has been submitted and is awaiting confirmation.'
            );
    }
}