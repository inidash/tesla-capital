<x-mail::message>
# Withdrawal Successful

Hello {{ $transaction->user->name }},

Your withdrawal request has been successfully processed.

<x-mail::panel>
**Withdrawal Details**

**Amount:** {{ $transaction->currency ?? 'USD' }}
{{ number_format((float) $transaction->amount, 2) }}

**Reference:** {{ $transaction->reference }} 

**Status:** Successful

**Requested:** {{ $transaction->created_at->format('F j, Y g:i A') }}

**Processed:** {{ $transaction->processed_at?->format('F j, Y g:i A') ?? now()->format('F j, Y g:i A') }}
</x-mail::panel>

Your withdrawal has been processed successfully.

<x-mail::button :url="route('transactions.show', $transaction)">
View Withdrawal
</x-mail::button>

Thank you for using {{ config('app.name') }}.

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>