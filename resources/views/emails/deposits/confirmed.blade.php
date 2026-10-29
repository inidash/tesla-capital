<x-mail::message>
# Deposit Confirmed

Hello {{ $transaction->user->name }},

Good news! Your deposit has been successfully confirmed and credited to your account.

<x-mail::panel>
**Deposit Details**

**Amount:** {{ $transaction->currency }} {{ number_format($transaction->amount, 2) }}

**Reference:** {{ $transaction->reference }}

**Payment Method:** {{ $transaction->payment_gateway ?? 'Manual Deposit' }}

**Status:** Confirmed

**Confirmed:** {{ ($transaction->processed_at ?? $transaction->updated_at)->format('F j, Y g:i A') }}
</x-mail::panel>

Your available balance has been updated accordingly.

You can now use your available funds to make an investment or manage your account.

<x-mail::button :url="route('dashboard')">
Go to Dashboard
</x-mail::button>

Thank you for choosing {{ config('app.name') }}.

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>
