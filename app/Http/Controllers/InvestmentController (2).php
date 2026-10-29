<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvestmentRequest;
use App\Models\Investment;
use App\Models\InvestmentPlan;
use App\Services\InvestmentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class InvestmentController extends Controller
{
    public function __construct(private readonly InvestmentService $investments) {}

    public function index(\Illuminate\Http\Request $request): Response
    {
        $investments = $request->user()->investments()->with('plan')->latest()->get();

        return Inertia::render('Investments/Index', ['investments' => $investments]);
    }

    public function show(Investment $investment): Response
    {
        $this->authorizeOwnership($investment);

        return Inertia::render('Investments/Show', [
            'investment' => $investment->load('plan', 'payouts', 'transactions'),
        ]);
    }

    public function store(StoreInvestmentRequest $request): RedirectResponse
    {
        $plan = InvestmentPlan::findOrFail($request->validated('plan_id'));

        try {
            $this->investments->purchase($request->user(), $plan, $request->validated('amount'));
        } catch (RuntimeException $e) {
            return back()->withErrors(['amount' => $e->getMessage()]);
        }

        return redirect()->route('dashboard')->with('success', 'Investment confirmed.');
    }

    private function authorizeOwnership(Investment $investment): void
    {
        abort_unless($investment->user_id === auth()->id(), 403);
    }
}
