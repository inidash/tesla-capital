<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profits', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('investment_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->decimal('amount', 15, 2);

            $table->enum('type', [
                'profit',
                'bonus',
                'adjustment',
            ])->default('profit');

            $table->enum('status', [
                'pending',
                'available',
                'paid',
                'cancelled',
            ])->default('pending');

            $table->string('reference')->unique();

            $table->text('description')->nullable();

            $table->timestamp('earned_at')->nullable();

            $table->timestamp('available_at')->nullable();

            $table->timestamp('paid_at')->nullable();

            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['investment_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profits');
    }
};