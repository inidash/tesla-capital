<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\User;
use App\Models\InvestmentPlan;
use App\Models\Payment;
use App\Models\Transaction;
use App\Models\Profit;


class Investment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'investment_plan_id',
        'principal_amount',
        'locked_monthly_roi_percentage',
        'status',
        'starts_on',
        'ends_on',
        'next_payout_on',
        'matured_at',
    ];

    protected $casts = [
        'principal_amount' => 'decimal:2',
        'locked_monthly_roi_percentage' => 'decimal:2',
        'starts_on' => 'date',
        'ends_on' => 'date',
        'next_payout_on' => 'date',
        'matured_at' => 'datetime',
    ];
    protected $appends = [
    'monthly_roi_amount',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(InvestmentPlan::class, 'investment_plan_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
    

    /**
     * Monthly ROI amount in minor units, using the rate locked in at purchase time
     * (so later plan-rate changes never retroactively affect existing investors).
     */
    // public function monthlyRoiAmount(): int
    // {
    //     return (int) round($this->principal_amount * ($this->locked_monthly_roi_percentage / 100));
    // }

    public function monthlyRoiAmount(): float
    {
        return round(
            (float) $this->principal_amount *
            ((float) $this->locked_monthly_roi_percentage / 100),
            2
        );
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function getMonthlyRoiAmountAttribute(): int
    {
        return $this->monthlyRoiAmount();
    }

    public function profits(): HasMany
    {
        return $this->hasMany(Profit::class);
    }
}