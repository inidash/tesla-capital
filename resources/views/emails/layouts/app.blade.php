<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? config('app.name') }}</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #f5f7fa;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color:#f5f7fa; padding:40px 15px;">

    <tr>
        <td align="center">

            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="
                        max-width:620px;
                        background:#ffffff;
                        border-radius:12px;
                        overflow:hidden;
                        box-shadow:0 2px 10px rgba(0,0,0,0.05);
                   ">

                {{-- Header --}}
                <tr>
                    <td style="
                        padding:28px 30px;
                        background:#111827;
                        text-align:center;
                    ">
                        <div style="
                            font-size:24px;
                            font-weight:700;
                            color:#ffffff;
                        ">
                            {{ config('app.name') }}
                        </div>

                        <div style="
                            margin-top:6px;
                            font-size:13px;
                            color:#d1d5db;
                        ">
                            Investment Management Platform
                        </div>
                    </td>
                </tr>

                {{-- Content --}}
                <tr>
                    <td style="padding:35px 30px;">

                        {{ $slot }}

                    </td>
                </tr>

                {{-- Footer --}}
                <tr>
                    <td style="
                        padding:25px 30px;
                        background:#f9fafb;
                        border-top:1px solid #e5e7eb;
                        text-align:center;
                    ">

                        <p style="
                            margin:0 0 8px;
                            font-size:13px;
                            color:#6b7280;
                        ">
                            Need help? Contact our support team.
                        </p>

                        <p style="
                            margin:0;
                            font-size:12px;
                            color:#9ca3af;
                        ">
                            &copy; {{ date('Y') }} {{ config('app.name') }}.
                            All rights reserved.
                        </p>

                    </td>
                </tr>

            </table>

        </td>
    </tr>

</table>

</body>
</html>
