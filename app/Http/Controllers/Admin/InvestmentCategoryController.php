<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InvestmentCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class InvestmentCategoryController extends Controller
{
    /**
     * Display categories.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        $categories = InvestmentCategory::query()
            ->withCount('investmentPlans')
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
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/InvestmentCategories/Index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show create form.
     */
    public function create(): Response
    {
        return Inertia::render(
            'Admin/InvestmentCategories/Create'
        );
    }

    /**
     * Store category.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:investment_categories,name',
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        InvestmentCategory::create($validated);

        return redirect()
            ->route('admin.investment-categories.index')
            ->with(
                'success',
                'Investment category created successfully.'
            );
    }

    /**
     * Display category.
     */
    public function show(
        InvestmentCategory $investmentCategory
    ): Response {
        $investmentCategory->load([
            'investmentPlans' => function ($query) {
                $query->withCount('investments');
            },
        ]);

        return Inertia::render(
            'Admin/InvestmentCategories/Show',
            [
                'category' => $investmentCategory,
            ]
        );
    }

    /**
     * Show edit form.
     */
    public function edit(
        InvestmentCategory $investmentCategory
    ): Response {
        return Inertia::render(
            'Admin/InvestmentCategories/Edit',
            [
                'category' => $investmentCategory,
            ]
        );
    }

    /**
     * Update category.
     */
    public function update(
        Request $request,
        InvestmentCategory $investmentCategory
    ): RedirectResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:investment_categories,name,' .
                $investmentCategory->id,
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $investmentCategory->update($validated);

        return redirect()
            ->route('admin.investment-categories.index')
            ->with(
                'success',
                'Investment category updated successfully.'
            );
    }

    /**
     * Delete category.
     */
    public function destroy(
        InvestmentCategory $investmentCategory
    ): RedirectResponse {
        if ($investmentCategory->investmentPlans()->exists()) {
            return back()->with(
                'error',
                'This category cannot be deleted because it contains investment plans.'
            );
        }

        $investmentCategory->delete();

        return redirect()
            ->route('admin.investment-categories.index')
            ->with(
                'success',
                'Investment category deleted successfully.'
            );
    }

    /**
     * Toggle category status.
     */
    public function toggleStatus(
        InvestmentCategory $investmentCategory
    ): RedirectResponse {
        $investmentCategory->update([
            'is_active' => ! $investmentCategory->is_active,
        ]);

        return back()->with(
            'success',
            $investmentCategory->is_active
                ? 'Investment category activated.'
                : 'Investment category deactivated.'
        );
    }
}