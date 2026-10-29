<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\User;
use App\Services\PaystackService;
use App\Services\WalletService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Route (in routes/api.php), CSRF-exempt since it's called by Paystack's
 * servers, not the browser:
 *   Route::post('/webhooks/paystack', [PaystackWebhookController::class, 'handle']);
 *
 * Register /webhooks/* in the 'except' array of VerifyCsrfToken, or if
 * using Sanctum's stateful middleware, exclude it there instead.
 */
class PaystackWebhookController extends Controller
{
    public function __construct(
        private readonly PaystackService $paystack,
        private readonly WalletService $wallets
    ) {}

    public function handle(Request $request)
    {
        $signature = $request->header('X-Paystack-Signature', '');

        if (! $this->paystack->verifyWebhookSignature($request->getContent(), $signature)) {
            Log::warning('Paystack webhook signature mismatch.');
            return response()->json(['message' => 'Invalid signature'], 401);
        }

        $event = $request->input('event');
        $data = $request->input('data');

        if ($event !== 'charge.success') {
            return response()->json(['message' => 'Ignored']); // 200 so Paystack stops retrying
        }

        $reference = $data['reference'] ?? null;

        // Idempotency guard: Paystack may deliver the same webhook more than once.
        if (Transaction::where('gateway_reference', $reference)->where('status', 'successful')->exists()) {
            return response()->json(['message' => 'Already processed']);
        }

        // Always re-verify server-side rather than trusting the webhook body directly.
        $verified = $this->paystack->verifyTransaction($reference);

        if ($verified['status'] !== 'success') {
            return response()->json(['message' => 'Not successful']);
        }

        $user = User::where('email', $verified['customer']['email'])->firstOrFail();

        $this->wallets->credit(
            user: $user,
            amountMinorUnits: $verified['amount'],
            type: 'deposit',
            attributes: [
                'payment_gateway' => 'paystack',
                'gateway_reference' => $reference,
                'gateway_meta' => $verified,
                'description' => 'Wallet deposit via Paystack',
            ]
        );

        return response()->json(['message' => 'Processed']);
    }
}
