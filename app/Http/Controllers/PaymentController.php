<?php
namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * Display the authenticated user's payments.
     */
    public function index(Request $request): Response
    {
        $userId = auth()->id();

        $userPayments = Payment::query()
            ->whereHas('investment', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });

        $statistics = [
            'total' => (clone $userPayments)->count(),

            'paid' => (clone $userPayments)
                ->whereIn('status', ['paid', 'completed', 'approved'])
                ->count(),

            'pending' => (clone $userPayments)
                ->whereIn('status', ['pending', 'processing'])
                ->count(),

            'failed' => (clone $userPayments)
                ->whereIn('status', ['failed', 'rejected', 'cancelled'])
                ->count(),
        ];

        $payments = Payment::query()
            ->with([
                'investment.plan',
                'transaction',
            ])
            ->whereHas('investment', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->latest('due_on')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Payments/Index', [
            'payments' => $payments,
            'statistics' => $statistics,
        ]);
    }

    /**
     * Display a single payment belonging to the authenticated user.
     */
    public function show(Payment $payment): Response
    {
        abort_unless(
            $payment->investment?->user_id === auth()->id(),
            404
        );

        $payment->load([
            'investment.plan',
            'transaction',
        ]);

        return Inertia::render('Payments/Show', [
            'payment' => $payment,
        ]);
    }
}
