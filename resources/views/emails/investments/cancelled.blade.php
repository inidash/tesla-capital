<x-mail::message>
# Investment Cancelled

Hello {{ $investment->user->name }},

Your investment has been cancelled successfully.

<x-mail::panel>
**Investment Details**

**Investment Plan:** {{ $investment->plan->name }}

**Principal Amount:** {{ $investment->user->wallet?->currency ?? 'USD' }}
{{ number_format((float) $investment->principal_amount, 2) }}

**Investment ID:** #{{ $investment->id }}

**Status:** Cancelled

**Start Date:** {{ $investment->starts_on?->format('F j, Y') }}

**Cancellation Date:** {{ now()->format('F j, Y g:i A') }}
</x-mail::panel>

The principal amount of your investment has been released back to your available wallet balance.

<x-mail::button :url="route('investments.show', $investment)">
View Investment
</x-mail::button>

If you did not request this cancellation, please contact our support team immediately.

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>