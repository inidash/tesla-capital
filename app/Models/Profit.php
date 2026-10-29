<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'investment_id',
        'amount',
        'type',
        'status',
        'reference',
        'description',
        'earned_at',
        'available_at',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'earned_at' => 'datetime',
        'available_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function investment(): BelongsTo
    {
        return $this->belongsTo(Investment::class);
    }

    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }
}