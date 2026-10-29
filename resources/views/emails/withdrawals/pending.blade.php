<x-mail::message>
# Withdrawal Request Received

Hello {{ $transaction->user->name }},

We've received your withdrawal request and it is currently being processed.

<x-mail::panel>
**Withdrawal Details**

**Amount:** {{ $transaction->currency ?? 'USD' }}
{{ number_format((float) $transaction->amount, 2) }}

**Reference:** {{ $transaction->reference }}

**Status:** Pending

**Date:** {{ $transaction->created_at->format('F j, Y g:i A') }}
</x-mail::panel>

Your withdrawal amount has been reserved from your available wallet balance while your request is being processed.

No further action is required at this time.

<x-mail::button :url="route('transactions.show', $transaction)">
View Withdrawal
</x-mail::button>

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>