
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
// import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    CircleDollarSign,
    Clock3,
    Layers3,
    User,
    WalletCards,
} from 'lucide-react';
import { useState } from 'react';

type UserData = {
    id: number;
    name: string;
    email: string;
};

type Category = {
    id: number;
    name: string;
};

type Plan = {
    id: number;
    name: string;
    category?: Category | null;
    roi_percentage?: number | string | null;
    duration_days?: number | null;
};

type Investment = {
    id: number;
    amount: number | string;
    status: string;
    start_on?: string | null;
    end_on?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    expected_roi?: number | string | null;
    actual_roi?: number | string | null;
    profit?: number | string | null;
    user?: UserData | null;
    investment_plan?: Plan | null;
};

type Props = {
    investment: Investment;
};

const money = (value: number | string | null | undefined) => {
    const amount = Number(value ?? 0);

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(amount);
};

const date = (value?: string | null) => {
    if (!value) return '—';

    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
    }).format(new Date(value));
};

const statusClasses = (status: string) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';

        case 'completed':
            return 'bg-blue-50 text-blue-700 ring-blue-600/20';

        case 'pending':
            return 'bg-amber-50 text-amber-700 ring-amber-600/20';

        case 'cancelled':
        case 'canceled':
            return 'bg-red-50 text-red-700 ring-red-600/20';

        case 'matured':
            return 'bg-violet-50 text-violet-700 ring-violet-600/20';

        default:
            return 'bg-slate-50 text-slate-700 ring-slate-600/20';
    }
};

export default function Show({ investment }: Props) {
    const [dialog, setDialog] = useState<
        'activate' | 'complete' | 'cancel' | null
    >(null);

    const [processing, setProcessing] = useState(false);

    const status = investment.status.toLowerCase();

    const canActivate =
        status === 'pending';

    const canComplete =
        status === 'active' || status === 'matured';

    const canCancel =
        status === 'pending' || status === 'active';

    const submitAction = (action: string) => {
        setProcessing(true);

        router.post(
            `/admin/investments/${investment.id}/${action}`,
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setDialog(null);
                },
            },
        );
    };

    return (
        <div>
            <Head title={`Investment #${investment.id}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/investments"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>

                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Investment
                            </p>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                                Investment #{investment.id}
                            </h1>
                        </div>
                    </div>

                    <span
                        className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-sm font-semibold capitalize ring-1 ring-inset ${statusClasses(investment.status)}`}
                    >
                        {investment.status}
                    </span>
                </div>

                {/* Action bar */}
                {(canActivate || canComplete || canCancel) && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Investment actions
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Available actions depend on the current investment status.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {canActivate && (
                                    <button
                                        type="button"
                                        onClick={() => setDialog('activate')}
                                        className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        Activate
                                    </button>
                                )}

                                {canComplete && (
                                    <button
                                        type="button"
                                        onClick={() => setDialog('complete')}
                                        className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        Complete
                                    </button>
                                )}

                                {canCancel && (
                                    <button
                                        type="button"
                                        onClick={() => setDialog('cancel')}
                                        className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                    >
                                        Cancel Investment
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main summary */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                <CircleDollarSign className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Investment Amount
                                </p>

                                <p className="text-xl font-bold text-slate-950">
                                    {money(investment.amount)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                <WalletCards className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Expected ROI
                                </p>

                                <p className="text-xl font-bold text-slate-950">
                                    {money(investment.expected_roi)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                                <Layers3 className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Profit
                                </p>

                                <p className="text-xl font-bold text-slate-950">
                                    {money(investment.profit)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* User */}
                    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 p-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                                    <User className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-slate-950">
                                        Investor
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Account associated with this investment
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 p-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Name
                                </p>

                                <p className="mt-1 font-semibold text-slate-900">
                                    {investment.user?.name ?? '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Email
                                </p>

                                <p className="mt-1 text-slate-700">
                                    {investment.user?.email ?? '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    User ID
                                </p>

                                <p className="mt-1 text-slate-700">
                                    #{investment.user?.id ?? '—'}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Plan */}
                    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 p-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                    <Layers3 className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-slate-950">
                                        Investment Plan
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Plan configuration
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 p-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Plan
                                </p>

                                <p className="mt-1 font-semibold text-slate-900">
                                    {investment.investment_plan?.name ?? '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Category
                                </p>

                                <p className="mt-1 text-slate-700">
                                    {investment.investment_plan?.category?.name ?? '—'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        ROI
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-900">
                                        {investment.investment_plan?.roi_percentage ?? '—'}%
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Duration
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-900">
                                        {investment.investment_plan?.duration_days
                                            ? `${investment.investment_plan.duration_days} days`
                                            : '—'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Timeline */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                                <CalendarDays className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-bold text-slate-950">
                                    Investment Timeline
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Important dates for this investment
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 p-6 sm:grid-cols-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Created
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {date(investment.created_at)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Start Date
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {date(investment.start_on)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                End Date
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {date(investment.end_on)}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Confirmation dialogs */}
            <ConfirmationDialog
                open={dialog === 'activate'}
                title="Activate investment?"
                description="This will activate the investment and allow it to proceed according to its configured plan."
                confirmText="Activate Investment"
                variant="success"
                loading={processing}
                onCancel={() => setDialog(null)}
                onConfirm={() => submitAction('activate')}
            />

            <ConfirmationDialog
                open={dialog === 'complete'}
                title="Complete investment?"
                description="This will mark the investment as completed. Make sure the investment has reached its appropriate completion point before continuing."
                confirmText="Complete Investment"
                variant="primary"
                loading={processing}
                onCancel={() => setDialog(null)}
                onConfirm={() => submitAction('complete')}
            />

            <ConfirmationDialog
                open={dialog === 'cancel'}
                title="Cancel investment?"
                description="This action will cancel the investment. Only continue if you are certain this investment should no longer remain active."
                confirmText="Cancel Investment"
                variant="danger"
                loading={processing}
                onCancel={() => setDialog(null)}
                onConfirm={() => submitAction('cancel')}
            />
        </div>
    );
}
