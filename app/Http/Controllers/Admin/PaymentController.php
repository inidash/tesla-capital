<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RoiPayout;
use App\Models\Payment;
use App\Services\PayoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class PaymentController extends Controller
{
    public function index(Request $request): Response
{
    $status = $request->string('status')->toString();

    $payments = Payment::with(['investment.user', 'investment.plan'])
        ->when(
            $status,
            fn ($q, $status) => $q->where('status', $status),
            fn ($q) => $q->whereIn('status', ['approved', 'scheduled'])
        )
        ->orderBy('due_on')
        ->paginate(25)
        ->withQueryString();

    return Inertia::render('Admin/Payments/Index', [
        'payouts' => $payments,

        'filters' => [
            'status' => $status,
        ],
    ]);
}

    /**
     * One-by-one approval -- deliberately not bulk-by-default, since this
     * is real money leaving the business. Bulk approval below exists for
     * when you actually want it, as a separate, explicit action.
     */
    public function approve(Payment $payment): RedirectResponse
    {
        $payment->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Payment approved.');
    }

    public function disburse(Payment $payment, PayoutService $payouts): RedirectResponse
    {
        try {
            $payouts->disburseToWallet($payment);
        } catch (RuntimeException $e) {
            return back()->withErrors(['payment' => $e->getMessage()]);
        }

        return back()->with('success', 'Payment disbursed to investor wallet.');
    }

    public function disburseAllApproved(PayoutService $payouts): RedirectResponse
    {
        $approved = Payment::where('status', 'approved')->get();

        $count = 0;
        foreach ($approved as $payment) {
            $payouts->disburseToWallet($payment);
            $count++;
        }

        return back()->with('success', "Disbursed {$count} payment(s).");
    }
}
