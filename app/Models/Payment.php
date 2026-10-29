<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'investment_id',
        'transaction_id',
        'amount',
        'due_on',
        'status',
        'approved_by',
        'approved_at',
        'paid_at',
    ];

    protected $casts = [
    'amount' => 'decimal:2',
    'due_on' => 'date',
    'approved_at' => 'datetime',
    'paid_at' => 'datetime',
];

    public function investment(): BelongsTo
    {
        return $this->belongsTo(Investment::class);
    }

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}