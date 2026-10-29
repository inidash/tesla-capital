<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class DashboardController extends Controller
{
    public function index(Request $request): Response | RedirectResponse
    {
        $user = $request->user();

        // Admins should never see the investor dashboard.
        if ($user->is_admin) {
            return redirect()->route('admin.dashboard');
        }

        $activeInvestments = $user->investments()
            ->with('plan')
            ->where('status', 'active')
            ->orderBy('next_payout_on')
            ->get();

        $recentTransactions = $user->transactions()
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('Dashboard', [
            'wallet' => $user->wallet,
            'activeInvestments' => $activeInvestments,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}