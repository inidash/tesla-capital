<x-mail::message>
# ROI Payment Credited

Hello {{ $payment->investment->user->name }},

Your scheduled return on investment has been successfully credited to your wallet.

<x-mail::panel>
**ROI Payment Details**

**Investment Plan:** {{ $payment->investment->plan->name ?? 'Investment Plan' }}

**ROI Amount:** {{ $payment->transaction?->currency ?? $payment->investment->user->wallet?->currency ?? 'USD' }}
{{ number_format((float) $payment->amount, 2) }}

**Investment ID:** #{{ $payment->investment->id }}

**Payment ID:** #{{ $payment->id }}

**Status:** Paid

**Payment Date:**
{{ $payment->paid_at?->format('F j, Y g:i A') ?? now()->format('F j, Y g:i A') }}

@if($payment->transaction?->reference)
**Transaction Reference:** {{ $payment->transaction->reference }}
@endif
</x-mail::panel>

The ROI amount has been added to your available wallet balance.

<x-mail::button :url="route('investments.show', $payment->investment)">
View Investment
</x-mail::button>

Thank you for investing with {{ config('app.name') }}.

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>