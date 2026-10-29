<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'user_id',
        'investment_id',
        'type',
        'status',
        'amount',
        'currency',
        'payment_gateway',
        'gateway_reference',
        'gateway_meta',
        'description',
        'processed_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'gateway_meta' => 'array',
        'processed_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (Transaction $transaction) {
            $transaction->reference ??= (string) Str::uuid();
        });
        }
    public function getRouteKeyName(): string
    {
        return 'reference';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function investment(): BelongsTo
    {
        return $this->belongsTo(Investment::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
   
}