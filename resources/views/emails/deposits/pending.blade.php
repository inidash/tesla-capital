<x-mail::message>
# Deposit Pending

Hello {{ $transaction->user->name }},

We've received your deposit request and it is currently being processed.

<x-mail::panel>
**Deposit Details**

**Amount:** {{ $transaction->currency }} {{ number_format($transaction->amount, 2) }}

**Reference:** {{ $transaction->reference }}

**Payment Method:** {{ $transaction->payment_gateway ?? 'Manual Deposit' }}

**Status:** Pending

**Date:** {{ $transaction->created_at->format('F j, Y g:i A') }}
</x-mail::panel>

Your deposit will be credited to your account once it has been successfully confirmed.

<x-mail::button :url="route('transactions.show', $transaction)">
View Deposit
</x-mail::button>

If you have already completed the payment, no further action is required.

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>
