<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'available_balance',
        'locked_balance',
        'currency',
    ];

   protected $casts = [
    'available_balance' => 'decimal:2',
    'locked_balance' => 'decimal:2',
];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Total funds owned by the user (spendable + tied up in active investments).
     */
    public function totalBalance(): int
    {
        return $this->available_balance + $this->locked_balance;
    }
}