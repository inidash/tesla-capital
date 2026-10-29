<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreInvestmentRequest;
use App\Models\Investment;
use App\Models\InvestmentPlan;
use App\Services\InvestmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class InvestmentController extends Controller
{
    public function __construct(
        private readonly InvestmentService $investmentService
    ) {
    }

    public function index(): Response
    {
        $investments = Investment::query()
            ->where('user_id', Auth::id())
            ->with('plan')
            ->withCount([
                'payments as total_payments',
                'payments as paid_payments' => function ($query) {
                    $query->where('status', 'paid');
                },
            ])
            ->latest()
            ->get();

        return Inertia::render('Investments/index', [
            'investments' => $investments,
        ]);
    }

    public function create(): Response
    {
        $plans = InvestmentPlan::query()
            ->where('is_active', true)
            ->orderBy('min_amount')
            ->get();

        $wallet = Auth::user()
            ->wallet()
            ->first();

        return Inertia::render('Investments/create', [
            'plans' => $plans,
            'wallet' => $wallet,
        ]);
    }

    public function store(
        StoreInvestmentRequest $request
    ): RedirectResponse {
        $validated = $request->validated();

        $this->investmentService->create(
            userId: (int) Auth::id(),
            investmentPlanId: (int) $validated['investment_plan_id'],
            amount: (float) $validated['amount'],
        );

        return redirect()
            ->route('investments.index')
            ->with(
                'success',
                'Investment created successfully.'
            );
    }

    public function show(
        Investment $investment
    ): Response {
        abort_unless(
            $investment->user_id === Auth::id(),
            403
        );

        $investment->load([
            'plan',
            'payments.transaction',
            'transactions',
        ]);

        return Inertia::render('Investments/show', [
            'investment' => $investment,
        ]);
    }
}