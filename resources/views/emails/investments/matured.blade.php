<x-mail::message>
# Investment Matured

Hello {{ $investment->user->name }},

Your investment has reached its maturity date.

<x-mail::panel>
**Investment Details**

**Investment Plan:** {{ $investment->plan->name }}

**Principal Amount:** {{ $investment->user->wallet?->currency ?? 'USD' }}
{{ number_format((float) $investment->principal_amount, 2) }}

**Investment ID:** #{{ $investment->id }}

**Status:** Matured

**Start Date:** {{ $investment->starts_on?->format('F j, Y') }}

**Maturity Date:** {{ $investment->ends_on?->format('F j, Y') }}

**Matured On:** {{ $investment->matured_at?->format('F j, Y g:i A') }}
</x-mail::panel>

Your investment principal has been released back to your available wallet balance.

<x-mail::button :url="route('investments.show', $investment)">
View Investment
</x-mail::button>

Thank you for investing with {{ config('app.name') }}.

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>