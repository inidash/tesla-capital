<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvestmentPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'min_amount',
        'max_amount',
        'monthly_roi_percentage',
        'duration_months',
        'is_active',
    ];

    protected $casts = [
        'category_id' => 'integer',
        'min_amount' => 'decimal:2',
        'max_amount' => 'decimal:2',
        'monthly_roi_percentage' => 'decimal:2',
        'duration_months' => 'integer',
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(
            InvestmentCategory::class,
            'category_id'
        );
    }

    public function investments(): HasMany
    {
        return $this->hasMany(
            Investment::class,
            'investment_plan_id'
        );
    }

    // public function isAmountAllowed(int $amount): bool
    // {
    //     if ($amount < $this->min_amount) {
    //         return false;
    //     }

    //     if ($this->max_amount !== null && $amount > $this->max_amount) {
    //         return false;
    //     }

    //     return true;
    // }

     public function isAmountAllowed(float $amount): bool
    {
        if ($amount < (float) $this->min_amount) {
            return false;
        }

        if (
            $this->max_amount !== null &&
            $amount > (float) $this->max_amount
        ) {
            return false;
        }

        return true;
    }
}