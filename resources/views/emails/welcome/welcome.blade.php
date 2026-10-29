<x-mail::message>
# Welcome to {{ config('app.name') }}

Hello {{ $user->name }},

Your account has been successfully created.

<x-mail::panel>
**Account Details**

**Name:** {{ $user->name }}

**Email:** {{ $user->email }}

**Status:** Active

**Registered:** {{ $user->created_at?->format('F j, Y g:i A') ?? now()->format('F j, Y g:i A') }}
</x-mail::panel>

You can now access your investment dashboard, manage your account, make deposits, and track your investments from one secure location.

<x-mail::button :url="$dashboardUrl">
Go to Dashboard
</x-mail::button>

If you did not create this account, please contact our support team immediately.

Thank you for joining {{ config('app.name') }}.

Regards,<br>
{{ config('app.name') }} Team
</x-mail::message>