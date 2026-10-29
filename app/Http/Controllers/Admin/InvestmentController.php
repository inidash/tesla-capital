<?php
namespace App\Http\Controllers\Admin;


// namespace App\Http\Controllers\Admin;

// use App\Http\Controllers\Controller;
// use App\Http\Requests\Admin\UpdateKycRequest;
// use App\Models\User;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Inertia\Inertia;
// use Inertia\Response;

// class InvestorController extends Controller
// {
//     public function index(Request $request): Response
//     {
//         $investors = User::where('role', 'investor')
//             ->with('wallet')
//             ->when($request->string('kyc_status')->toString(), fn ($q, $status) => $q->where('kyc_status', $status))
//             ->when($request->string('search')->toString(), function ($q, $search) {
//                 $q->where(fn ($q) => $q->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"));
//             })
//             ->latest()
//             ->paginate(20)
//             ->withQueryString();

//         return Inertia::render('Admin/Investors/Index', [
//             'investors' => $investors,
//             'filters' => $request->only(['kyc_status', 'search']),
//         ]);
//     }

//     public function show(User $investor): Response
//     {
//         $investor->load('wallet');

//         return Inertia::render('Admin/Investors/Show', [
//             'investor' => $investor,
//             'investments' => $investor->investments()->with('plan')->latest()->get(),
//             'transactions' => $investor->transactions()->latest()->limit(50)->get(),
//         ]);
//     }

//     public function updateKyc(UpdateKycRequest $request, User $investor): RedirectResponse
//     {
//         $investor->update([
//             'kyc_status' => $request->validated('kyc_status'),
//             'kyc_verified_at' => $request->validated('kyc_status') === 'verified' ? now() : null,
//         ]);

//         return back()->with('success', "KYC status updated to {$request->validated('kyc_status')}.");
//     }
// } 


use App\Http\Controllers\Controller;
use App\Models\Investment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\InvestmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use RuntimeException;

class InvestmentController extends Controller
{
    /**
     * Display all investments.
     */

    public function __construct( private readonly InvestmentService $investmentService ) {
    }
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $status = $request->string('status')->trim()->toString();

        $investments = Investment::query()
            ->with([
                'user:id,name,email',
                'plan:id,name',
            ])
            ->withCount([
                'payments as total_payments',
                'payments as paid_payments' => function ($query) {
                    $query->where('status', 'paid');
                },
            ])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query
                        ->whereHas('user', function ($userQuery) use ($search) {
                            $userQuery
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        })
                        ->orWhereHas('plan', function ($planQuery) use ($search) {
                            $planQuery->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when(
                in_array($status, ['active', 'matured', 'cancelled'], true),
                function ($query) use ($status) {
                    $query->where('status', $status);
                }
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $statistics = [
            'total' => Investment::count(),

            'active' => Investment::where('status', 'active')->count(),

            'matured' => Investment::where('status', 'matured')->count(),

            'cancelled' => Investment::where('status', 'cancelled')->count(),

            'principal' => (int) Investment::sum('principal_amount'),

            'active_principal' => (int) Investment::where('status', 'active')
                ->sum('principal_amount'),
        ];

        return Inertia::render('Admin/Investments/Index', [
            'investments' => $investments,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Display a single investment.
     */
    public function show(Investment $investment): Response
    {
        $investment->load([
            'user',
            'plan',
            'payments.transaction',
            'transactions',
        ]);

        $monthlyRoi = $investment->monthlyRoiAmount();

        $months = 0;

        if ($investment->starts_on && $investment->ends_on) {
            $months = $investment->starts_on->diffInMonths(
                $investment->ends_on
            );
        }

        $expectedRoi = $monthlyRoi * $months;

        $paidRoi = (int) $investment->payments()
            ->where('status', 'paid')
            ->sum('amount');

        return Inertia::render('Admin/Investments/Show', [
            'investment' => $investment,
            'summary' => [
                'monthly_roi' => $monthlyRoi,
                'months' => $months,
                'expected_roi' => $expectedRoi,
                'paid_roi' => $paidRoi,
                'remaining_roi' => max(0, $expectedRoi - $paidRoi),
            ],
        ]);
    }

    public function cancel( Investment $investment ): RedirectResponse {
        try {
            $this->investmentService->cancelInvestment(
                $investment->id
            );
        } catch (ValidationException $e) {
            return back()->withErrors(
                $e->errors()
            );
        }

        return back()->with(
            'success',
            'Investment cancelled and principal released.'
        );
    }

    public function mature(
        Investment $investment
    ): RedirectResponse {
        try {
            $this->investmentService->matureInvestment(
                $investment->id
            );
        } catch (ValidationException $e) {
            return back()->withErrors(
                $e->errors()
            );
        }

        return back()->with(
            'success',
            'Investment matured and principal released.'
        );
    }
}
