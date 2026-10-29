<x-mail::message>
# Deposit Not Confirmed

Hello {{ $transaction->user->name }},

Unfortunately, we were unable to confirm your deposit.

<x-mail::panel>
**Deposit Details**

**Amount:** {{ $transaction->currency }} {{ number_format($transaction->amount, 2) }}

**Reference:** {{ $transaction->reference }}

**Status:** Failed

**Date:** {{ $transaction->created_at->format('F j, Y g:i A') }}
</x-mail::panel>

If you believe this is an error, please contact our support team with your deposit reference.

<x-mail::button :url="route('transactions.show', $transaction)">
View Transaction
</x-mail::button>

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>
