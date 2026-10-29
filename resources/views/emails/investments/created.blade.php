<x-mail::message>
# Investment Activated

Hello {{ $investment->user->name }},

Your investment has been successfully created and is now active.

<x-mail::panel>
**Investment Details**

**Investment Plan:** {{ $investment->plan->name }}

**Principal Amount:** {{ $investment->currency ?? $investment->user->wallet?->currency ?? 'USD' }}
{{ number_format((float) $investment->principal_amount, 2) }}

**Investment ID:** #{{ $investment->id }}

**Status:** Active

**Start Date:** {{ $investment->starts_on?->format('F j, Y') }}

**Maturity Date:** {{ $investment->ends_on?->format('F j, Y') }}

**Monthly ROI:** {{ number_format((float) $investment->locked_monthly_roi_percentage, 2) }}%
</x-mail::panel>

Your investment is now active and your scheduled returns will be processed according to the investment plan.

<x-mail::button :url="route('investments.show', $investment)">
View Investment
</x-mail::button>

Thank you for investing with us.

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>