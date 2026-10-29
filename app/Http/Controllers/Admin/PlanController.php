<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InvestmentCategory;
use App\Models\InvestmentPlan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PlanController extends Controller
{
    /**
     * Display investment plans.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        $categoryId = $request->integer('category_id');

        $plans = InvestmentPlan::query()
            ->with('category:id,name')
            ->withCount('investments')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere(
                            'description',
                            'like',
                            "%{$search}%"
                        );
                });
            })
            ->when($categoryId, function ($query) use ($categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $categories = InvestmentCategory::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
            ]);

        return Inertia::render('Admin/Plans/Index', [
            'plans' => $plans,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category_id' => $categoryId ?: null,
            ],
        ]);
    }

    /**
     * Show create form.
     */
    public function create(): Response
    {
        $categories = InvestmentCategory::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
            ]);

        return Inertia::render('Admin/Plans/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store plan.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => [
                'required',
                'integer',
                'exists:investment_categories,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'min_amount' => [
                'required',
                'numeric',
                 'min:100',
            ], 

            'max_amount' => [
                'nullable',
                'numeric',
                 'gte:min_amount',
            ],

            'monthly_roi_percentage' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],

            'duration_months' => [
                'required',
                'integer',
                'min:1',
            ],

            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        $category = InvestmentCategory::findOrFail(
            $validated['category_id']
        );

        if (! $category->is_active) {
            return back()
                ->withErrors([
                    'category_id' =>
                        'The selected category is inactive.',
                ])
                ->withInput();
        }

        $slug = Str::slug($validated['name']);

        $originalSlug = $slug;
        $counter = 1;

        while (InvestmentPlan::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        
        $validated['slug'] = $slug;
        // dd($validated);
        InvestmentPlan::create($validated);

        return redirect()
            ->route('admin.plans.index')
            ->with(
                'success',
                'Investment plan created successfully.'
            );
    }

    /**
     * Display plan.
     */
    public function show(InvestmentPlan $plan): Response
    {
        $plan->load('category');

        $plan->loadCount('investments');

        return Inertia::render('Admin/Plans/Show', [
            'plan' => $plan,
        ]);
    }

    /**
     * Show edit form.
     */
    public function edit(InvestmentPlan $plan): Response
    {
        $categories = InvestmentCategory::query()
            ->where(function ($query) use ($plan) {
                $query
                    ->where('is_active', true)
                    ->orWhere('id', $plan->category_id);
            })
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'is_active',
            ]);

        return Inertia::render('Admin/Plans/Edit', [
            'plan' => $plan->load('category'),
            'categories' => $categories,
        ]);
    }

    /**
     * Update plan.
     */
    public function update(
        Request $request,
        InvestmentPlan $plan
    ): RedirectResponse {
        $validated = $request->validate([
            'category_id' => [
                'required',
                'integer',
                'exists:investment_categories,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'minimum_amount' => [
                'required',
                'numeric',
                'min:100',
            ],

            'maximum_amount' => [
                'nullable',
                'numeric',
                'gte:minimum_amount',
            ],

            'monthly_roi_percentage' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],

            'duration_months' => [
                'required',
                'integer',
                'min:1',
            ],

            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        $category = InvestmentCategory::findOrFail(
            $validated['category_id']
        );

        if (! $category->is_active) {
            return back()
                ->withErrors([
                    'category_id' =>
                        'The selected category is inactive.',
                ])
                ->withInput();
        }

        $plan->update($validated);

        return redirect()
            ->route('admin.plans.index')
            ->with(
                'success',
                'Investment plan updated successfully.'
            );
    }

    /**
     * Delete plan.
     */
    public function destroy(
        InvestmentPlan $plan
    ): RedirectResponse {
        if ($plan->investments()->exists()) {
            return back()->with(
                'error',
                'This plan cannot be deleted because it has existing investments.'
            );
        }

        $plan->delete();

        return redirect()
            ->route('admin.plans.index')
            ->with(
                'success',
                'Investment plan deleted successfully.'
            );
    }

    /**
     * Toggle plan status.
     */
    public function toggleStatus(
        InvestmentPlan $plan
    ): RedirectResponse {
        $plan->update([
            'is_active' => ! $plan->is_active,
        ]);

        return back()->with(
            'success',
            $plan->is_active
                ? 'Investment plan activated.'
                : 'Investment plan deactivated.'
        );
    }
}