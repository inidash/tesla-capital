<?php

use App\Http\Controllers\Api\PaystackWebhookController;
use Illuminate\Support\Facades\Route;

Route::post('/webhooks/paystack', [PaystackWebhookController::class, 'handle'])->name('webhooks.paystack');
