<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('investments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('investment_plan_id')->constrained()->restrictOnDelete();
            $table->decimal('principal_amount', 15, 2);
            $table->decimal('locked_monthly_roi_percentage', 5, 2); // snapshot of plan's rate at purchase time
            $table->string('status')->default('active'); // active | matured | cancelled
            $table->date('starts_on');
            $table->date('ends_on');
            $table->date('next_payout_on');
            $table->timestamp('matured_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'next_payout_on']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('investments');
    }
};