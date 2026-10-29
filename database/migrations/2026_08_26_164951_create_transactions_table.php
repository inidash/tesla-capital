<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->uuid('reference')->unique(); // public-safe identifier, exposed to frontend/gateway
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('investment_id')->nullable()->constrained()->nullOnDelete();
            // deposit | withdrawal | investment_purchase | roi_payout | refund
            $table->string('type');
            // pending | successful | failed | reversed
            $table->string('status')->default('pending');
            $table->decimal('amount', 15, 2);
            $table->string('currency', 3)->default('USD'); // ISO 4217 currency code
            $table->string('payment_gateway')->nullable(); // e.g. paystack, flutterwave, stripe
            $table->string('gateway_reference')->nullable();
            $table->json('gateway_meta')->nullable();
            $table->text('description')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'type', 'status']);
            $table->index('gateway_reference');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};