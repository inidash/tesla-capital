<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Investment;
use App\Models\Profit;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProfitController extends Controller
{
    public function index(Request $request): Response
    {
        $profits = Profit::query()
            ->with([
                'user:id,name,email',
                'investment:id,user_id,investment_plan_id,principal_amount',
                'investment.plan:id,name',
            ])
            ->when(
                $request->string('status')->toString(),
                fn ($query, $status) => $query->where('status', $status)
            )
            ->when(
                $request->string('search')->toString(),
                function ($query, $search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('reference', 'like', "%{$search}%")
                            ->orWhereHas('user', function ($userQuery) use ($search) {
                                $userQuery
                                    ->where('name', 'like', "%{$search}%")
                                    ->orWhere('email', 'like', "%{$search}%");
                            });
                    });
                }
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $summary = [
            'total' => (float) Profit::whereIn('status', [
                'available',
                'paid',
            ])->sum('amount'),

            'pending' => (float) Profit::where('status', 'pending')
                ->sum('amount'),

            'available' => (float) Profit::where('status', 'available')
                ->sum('amount'),

            'paid' => (float) Profit::where('status', 'paid')
                ->sum('amount'),
        ];

        return Inertia::render('Admin/Profits/Index', [
            'profits' => $profits,
            'summary' => $summary,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'status' => $request->string('status')->toString(),
            ],
        ]);
    }

    public function create(): Response
    {
        $users = User::query()
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Profits/Create', [
            'users' => $users,
        ]);
    }

    // public function investments(User $user)
    // {
    //     $investments = Investment::query()
    //         ->where('user_id', $user->id)
    //         ->with('plan:id,name')
    //         ->select([
    //             'id',
    //             'user_id',
    //             'investment_plan_id',
    //             'amount',
    //             'status',
    //             'started_at',
    //         ])
    //         ->latest()
    //         ->get();

    //     return response()->json($investments);
    // }

    public function investments(User $user)
{
    $investments = Investment::query()
        ->where('user_id', $user->id)
        ->with('plan')
        ->latest()
        ->get();

    return response()->json($investments);
}
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'user_id' => [
                'required',
                'exists:users,id',
            ],

            'investment_id' => [
                'required',
                'exists:investments,id',
            ],

            'amount' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            'type' => [
                'required',
                'in:profit,bonus,adjustment',
            ],

            'status' => [
                'required',
                'in:pending,available,paid,cancelled',
            ],

            'description' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'earned_at' => [
                'nullable',
                'date',
            ],

            'available_at' => [
                'nullable',
                'date',
            ],
        ]);

        /*
         * Make sure the selected investment actually belongs
         * to the selected investor.
         */
        $investment = Investment::query()
            ->where('id', $validated['investment_id'])
            ->where('user_id', $validated['user_id'])
            ->firstOrFail();

        $profit = Profit::create([
            'user_id' => $validated['user_id'],
            'investment_id' => $investment->id,
            'amount' => $validated['amount'],
            'type' => $validated['type'],
            'status' => $validated['status'],
            'reference' => 'PROF-' . strtoupper(Str::random(12)),
            'description' => $validated['description'] ?? null,
            'earned_at' => $validated['earned_at'] ?? now(),
            'available_at' => $validated['available_at'] ?? null,
            'paid_at' => $validated['status'] === 'paid'
                ? now()
                : null,
        ]);

        return redirect()
            ->route('admin.profits.index')
            ->with('success', 'Profit record created successfully.');
    }

    public function show(Profit $profit): Response
    {
        $profit->load([
            'user:id,name,email',
            'investment.plan',
        ]);

        return Inertia::render('Admin/Profits/Show', [
            'profit' => $profit,
        ]);
    }

    public function edit(Profit $profit): Response
    {
        $profit->load([
            'user:id,name,email',
            'investment.plan',
        ]);

        $users = User::query()
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Profits/Edit', [
            'profit' => $profit,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Profit $profit): RedirectResponse
    {
        $validated = $request->validate([
            'amount' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            'type' => [
                'required',
                'in:profit,bonus,adjustment',
            ],

            'status' => [
                'required',
                'in:pending,available,paid,cancelled',
            ],

            'description' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'earned_at' => [
                'nullable',
                'date',
            ],

            'available_at' => [
                'nullable',
                'date',
            ],
        ]);

        $status = $validated['status'];

        $profit->update([
            'amount' => $validated['amount'],
            'type' => $validated['type'],
            'status' => $status,
            'description' => $validated['description'] ?? null,
            'earned_at' => $validated['earned_at'] ?? null,
            'available_at' => $validated['available_at'] ?? null,
            'paid_at' => $status === 'paid'
                ? ($profit->paid_at ?? now())
                : null,
        ]);

        return redirect()
            ->route('admin.profits.index')
            ->with('success', 'Profit record updated successfully.');
    }

    public function destroy(Profit $profit): RedirectResponse
    {
        $profit->update([
            'status' => 'cancelled',
        ]);

        return redirect()
            ->route('admin.profits.index')
            ->with('success', 'Profit record cancelled successfully.');
    }
}