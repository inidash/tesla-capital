<?php

namespace App\Http\Controllers;

use App\Models\Profit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfitController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $profits = Profit::query()
            ->where('user_id', $user->id)
            ->with([
                'investment.plan',
            ])
            ->latest('earned_at')
            ->paginate(10)
            ->withQueryString();

        $totalProfit = Profit::query()
            ->where('user_id', $user->id)
            ->whereIn('status', ['available', 'paid'])
            ->sum('amount');

        $availableProfit = Profit::query()
            ->where('user_id', $user->id)
            ->where('status', 'available')
            ->sum('amount');

        $pendingProfit = Profit::query()
            ->where('user_id', $user->id)
            ->where('status', 'pending')
            ->sum('amount');

        $thisMonthProfit = Profit::query()
            ->where('user_id', $user->id)
            ->whereIn('status', ['available', 'paid'])
            ->whereBetween('earned_at', [
                now()->startOfMonth(),
                now()->endOfMonth(),
            ])
            ->sum('amount');

        return Inertia::render('Profits/Index', [
            'profits' => $profits,

            'summary' => [
                'total' => (float) $totalProfit,
                'available' => (float) $availableProfit,
                'pending' => (float) $pendingProfit,
                'thisMonth' => (float) $thisMonthProfit,
            ],
        ]);
    }
}