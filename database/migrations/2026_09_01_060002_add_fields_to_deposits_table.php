<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('deposits', function (Blueprint $table) {
            $table->foreignId('user_id')
                ->after('id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('transaction_id')
                ->nullable()
                ->after('user_id')
                ->constrained()
                ->nullOnDelete();

            $table->uuid('reference')
                ->unique()
                ->after('transaction_id');

            $table->unsignedBigInteger('amount')
                ->after('reference');

            $table->string('currency', 3)
                ->default('USD')
                ->after('amount');

            $table->string('status')
                ->default('pending')
                ->after('currency');

            $table->string('payment_gateway')
                ->nullable()
                ->after('status');

            $table->text('description')
                ->nullable()
                ->after('payment_gateway');

            $table->timestamp('processed_at')
                ->nullable()
                ->after('description');

            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::table('deposits', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['transaction_id']);

            $table->dropIndex(['user_id', 'status']);

            $table->dropColumn([
                'user_id',
                'transaction_id',
                'reference',
                'amount',
                'currency',
                'status',
                'payment_gateway',
                'description',
                'processed_at',
            ]);
        });
    }
};