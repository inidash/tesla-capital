<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Investment;
use App\Models\Payment;
use App\Models\User;
use App\Models\Deposit;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    { 
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalDeposits' => Deposit::where('status', 'successful')->count(),
                'totalInvestments' => Investment::count(),

                'totalPrincipalLocked' => Investment::where('status', 'active')
                    ->sum('principal_amount'),

                'totalPaidOut' => Payment::where('status', 'paid')
                    ->sum('amount'),

                'pendingPayouts' => Payment::where('status', 'approved')
                    ->count(),

                'payoutsDueAmount' => Payment::where('status', 'approved')
                    ->sum('amount'),
            ],
        ]);
    }
}