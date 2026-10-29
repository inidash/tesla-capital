<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $transactions = Transaction::query()
            ->where('user_id', $user->id)
            ->with([
                'investment.plan',
            ])
            ->when(
                $request->filled('type'),
                fn ($query) => $query->where(
                    'type',
                    $request->string('type')->toString()
                )
            )
            ->when(
                $request->filled('status'),
                fn ($query) => $query->where(
                    'status',
                    $request->string('status')->toString()
                )
            )
            ->when(
                $request->filled('search'),
                function ($query) use ($request) {
                    $search = $request->string('search')->toString();

                    $query->where(function ($query) use ($search) {
                        $query
                            ->where('reference', 'like', "%{$search}%")
                            ->orWhere(
                                'gateway_reference',
                                'like',
                                "%{$search}%"
                            )
                            ->orWhere(
                                'description',
                                'like',
                                "%{$search}%"
                            );
                    });
                }
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'filters' => [
                'type' => $request->string('type')->toString(),
                'status' => $request->string('status')->toString(),
                'search' => $request->string('search')->toString(),
            ],
        ]);
    }

   public function show(
    Request $request,
    Transaction $transaction
    ): Response {
        abort_unless(
            $transaction->user_id === $request->user()->id,
            404
        );

        $transaction->load([
            'investment.plan',
            'payment',
        ]);

        return Inertia::render('Transactions/Show', [
            'transaction' => $transaction,
        ]);
    }
}