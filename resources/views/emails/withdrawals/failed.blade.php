<x-mail::message>
# Withdrawal Request Rejected

Hello {{ $transaction->user->name }},

Your withdrawal request could not be completed and has been rejected.

<x-mail::panel>
**Withdrawal Details**

**Amount:** {{ $transaction->currency ?? 'USD' }}
{{ number_format((float) $transaction->amount, 2) }}

**Reference:** {{ $transaction->reference }}

**Status:** Rejected

**Requested:** {{ $transaction->created_at->format('F j, Y g:i A') }}

**Processed:** {{ $transaction->processed_at?->format('F j, Y g:i A') ?? now()->format('F j, Y g:i A') }}
</x-mail::panel>

The withdrawal amount has been returned to your available wallet balance.

If you believe this rejection was made in error, please contact our support team.

<x-mail::button :url="route('transactions.show', $transaction)">
View Withdrawal
</x-mail::button>

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>