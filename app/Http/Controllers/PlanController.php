<?php

namespace App\Http\Controllers;

use App\Models\InvestmentPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Plans/Index', [
            'plans' => InvestmentPlan::where('is_active', true)->orderBy('duration_months')->get(),
            'wallet' => $request->user()->wallet,
        ]);
    }
}
