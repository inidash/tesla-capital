<?php

namespace App\Http\Controllers;

use App\Models\InvestmentPlan;
use App\Models\InvestmentCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response 
    { 
        $categories = InvestmentCategory::query() 
        ->where('is_active', true) 
        ->with([ 'plans' => fn ($query) => $query ->where('is_active', true) 
        ->orderBy('min_amount'), ]) 
        ->whereHas('plans', function ($query) { $query->where('is_active', true); }) 
        ->orderBy('name') ->get(); 
        return Inertia::render('Home', [ 'categories' => $categories, ]); 
        
    }

    public function about(): Response
    {
        return Inertia::render('About', [
            'featuredPlans' => InvestmentPlan::where('is_active', true)
                ->get(),
        ]);
    }

    // public function services(): Response
    // {
    //     $categories = InvestmentCategory::query() 
    //         ->where('is_active', true) 
    //         ->with([ 'plans' => fn ($query) => $query ->where('is_active', true) 
    //         ->orderBy('min_amount'), ]) 
    //         ->whereHas('plans', function ($query) { $query->where('is_active', true); }) 
    //         ->orderBy('name') ->get(); 
            
    //    $plans = InvestmentPlan::query()
    //         ->with('category:id,name')
    //         ->withCount('investments')
    //         ->when($search, function ($query) use ($search) {
    //             $query->where(function ($q) use ($search) {
    //                 $q->where('name', 'like', "%{$search}%")
    //                     ->orWhere(
    //                         'description',
    //                         'like',
    //                         "%{$search}%"
    //                     );
    //             });
    //         })
    //         ->when($categoryId, function ($query) use ($categoryId) {
    //             $query->where('category_id', $categoryId);
    //         })
    //         ->latest()
    //         ->paginate(10)
    //         ->withQueryString();
    //     return Inertia::render('Services', [ 
    //         'categories' => $categories, 
    //         'plans' => $plans,
    //         ]); 
    // }

   

public function services(Request $request): Response
{
    $search = $request->input('search');
    $categoryId = $request->input('category');

    $categories = InvestmentCategory::query()
        ->where('is_active', true)
        ->with([
            'plans' => fn ($query) => $query
                ->where('is_active', true)
                ->orderBy('min_amount'),
        ])
        ->whereHas('plans', function ($query) {
            $query->where('is_active', true);
        })
        ->orderBy('name')
        ->get();

    $plans = InvestmentPlan::query()
        ->with('category:id,name')
        ->withCount('investments')
        ->where('is_active', true)
        ->when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        })
        ->when($categoryId, function ($query) use ($categoryId) {
            $query->where('category_id', $categoryId);
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Services', [
        'categories' => $categories,
        'plans' => $plans,
        'search' => $search,
        'categoryId' => $categoryId,
    ]);
}
}
