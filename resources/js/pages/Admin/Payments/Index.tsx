
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import { Head, router } from '@inertiajs/react';
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    CircleDollarSign,
    Clock3,
    Search,
    Send,
    WalletCards,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

type Investment = {
    id: number;
    amount?: number | string;
};

type Payout = {
    id: number;
    amount: number | string;
    status: string;
    created_at?: string | null;
    approved_at?: string | null;
    disbursed_at?: string | null;
    user?: User | null;
    investment?: Investment | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedPayouts = {
    data: Payout[];
    links: PaginationLink[];
    current_page?: number;
    last_page?: number;
    total?: number;
};

type Props = {
    payouts: PaginatedPayouts;
    filters?: {
        search?: string;
        status?: string;
    };
};

const money = (value: number | string | null | undefined) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(Number(value ?? 0));
};

const date = (value?: string | null) => {
    if (!value) return '—';

    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
    }).format(new Date(value));
};

const statusClasses = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'bg-amber-50 text-amber-700 ring-amber-600/20';

        case 'approved':
            return 'bg-blue-50 text-blue-700 ring-blue-600/20';

        case 'disbursed':
        case 'paid':
        case 'completed':
            return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';

        case 'failed':
        case 'cancelled':
        case 'canceled':
            return 'bg-red-50 text-red-700 ring-red-600/20';

        default:
            return 'bg-slate-50 text-slate-700 ring-slate-600/20';
    }
};

export default function Index({ payouts, filters }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [status, setStatus] = useState(filters?.status ?? 'all');

    const [dialog, setDialog] = useState<
        | { type: 'approve'; payout: Payout }
        | { type: 'disburse'; payout: Payout }
        | { type: 'disburse-all' }
        | null
    >(null);

    const [processing, setProcessing] = useState(false);

    const filteredPayouts = useMemo(() => {
        let rows = payouts.data ?? [];

        if (search.trim()) {
            const query = search.toLowerCase();

            rows = rows.filter((payout) =>
                [
                    payout.id,
                    payout.user?.name,
                    payout.user?.email,
                    payout.status,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()
                    .includes(query),
            );
        }

        if (status !== 'all') {
            rows = rows.filter(
                (payout) =>
                    payout.status.toLowerCase() === status.toLowerCase(),
            );
        }

        return rows;
    }, [payouts.data, search, status]);

    const pendingCount = payouts.data.filter(
        (payout) => payout.status.toLowerCase() === 'pending',
    ).length;

    const approvedCount = payouts.data.filter(
        (payout) => payout.status.toLowerCase() === 'approved',
    ).length;

    const disbursedCount = payouts.data.filter((payout) =>
        ['disbursed', 'paid', 'completed'].includes(
            payout.status.toLowerCase(),
        ),
    ).length;

    const approve = (payout: Payout) => {
        setProcessing(true);

        router.post(
            `/admin/payouts/${payout.id}/approve`,
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

    const disburse = (payout: Payout) => {
        setProcessing(true);

        router.post(
            `/admin/payouts/${payout.id}/disburse`,
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

    const disburseAll = () => {
        setProcessing(true);

        router.post(
            '/admin/payouts/disburse-all',
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

    const resetFilters = () => {
        setSearch('');
        setStatus('all');
    };

    return (
        <div>
            <Head title="Payouts" />

            <div className="min-h-screen bg-[#F7F5EF]">
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8"> 

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#173024]">
                            Finance
                        </p>

                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                            Payouts
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            Review, approve and disburse investment returns.
                        </p>
                    </div>

                    {approvedCount > 0 && (
                        <button
                            type="button"
                            onClick={() => setDialog({ type: 'disburse-all' })}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                        >
                            <Send className="h-4 w-4" />
                            Disburse All Approved
                        </button>
                    )}
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Total Payouts
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-950">
                                    {payouts.total ?? payouts.data.length}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                                <WalletCards className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Pending
                                </p>

                                <p className="mt-1 text-2xl font-bold text-amber-600">
                                    {pendingCount}
                                </p>
                            </div>

                            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                                <Clock3 className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Approved
                                </p>

                                <p className="mt-1 text-2xl font-bold text-blue-600">
                                    {approvedCount}
                                </p>
                            </div>

                            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Disbursed
                                </p>

                                <p className="mt-1 text-2xl font-bold text-emerald-600">
                                    {disbursedCount}
                                </p>
                            </div>

                            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                <CircleDollarSign className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 lg:flex-row">
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search by investor, email or payout ID..."
                                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                            />
                        </div>

                        <select
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value)
                            }
                            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                        >
                            <option value="all">All statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="disbursed">Disbursed</option>
                            <option value="paid">Paid</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        {(search || status !== 'all') && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-225 text-left">
                            <thead className="border-b border-slate-100 bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Payout
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Investor
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Amount
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Investment
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredPayouts.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-16 text-center"
                                        >
                                            <WalletCards className="mx-auto h-10 w-10 text-slate-300" />

                                            <h3 className="mt-4 font-semibold text-slate-900">
                                                No payouts found
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Try changing your search or status filter.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayouts.map((payout) => {
                                        const payoutStatus =
                                            payout.status.toLowerCase();

                                        const canApprove =
                                            payoutStatus === 'pending';

                                        const canDisburse =
                                            payoutStatus === 'approved';

                                        const isComplete =
                                            [
                                                'disbursed',
                                                'paid',
                                                'completed',
                                            ].includes(payoutStatus);

                                        return (
                                            <tr
                                                key={payout.id}
                                                className="transition hover:bg-slate-50/70"
                                            >
                                                <td className="px-6 py-5">
                                                    <div>
                                                        <p className="font-bold text-slate-900">
                                                            #{payout.id}
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {date(
                                                                payout.created_at,
                                                            )}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="font-semibold text-slate-900">
                                                        {payout.user?.name ?? '—'}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {payout.user?.email ?? '—'}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="font-bold text-slate-900">
                                                        {money(payout.amount)}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    {payout.investment?.id ? (
                                                        <span className="font-medium text-slate-700">
                                                            #
                                                            {
                                                                payout
                                                                    .investment
                                                                    .id
                                                            }
                                                        </span>
                                                    ) : (
                                                        '—'
                                                    )}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusClasses(payout.status)}`}
                                                    >
                                                        {payout.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex justify-end gap-2">
                                                        {canApprove && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDialog({
                                                                        type: 'approve',
                                                                        payout,
                                                                    })
                                                                }
                                                                className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                                                            >
                                                                Approve
                                                            </button>
                                                        )}

                                                        {canDisburse && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDialog({
                                                                        type: 'disburse',
                                                                        payout,
                                                                    })
                                                                }
                                                                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                                                            >
                                                                Disburse
                                                            </button>
                                                        )}

                                                        {isComplete && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
                                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                                Complete
                                                            </span>
                                                        )}

                                                        {!canApprove &&
                                                            !canDisburse &&
                                                            !isComplete && (
                                                                <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
                                                                    No actions
                                                                </span>
                                                            )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {payouts.links?.length > 0 && (
                        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                            <p className="text-sm text-slate-500">
                                Page {payouts.current_page ?? 1} of{' '}
                                {payouts.last_page ?? 1}
                            </p>

                            <div className="flex items-center gap-1">
                                {payouts.links.map((link, index) => {
                                    const isPrevious = index === 0;
                                    const isNext =
                                        index === payouts.links.length - 1;

                                    return (
                                        <button
                                            key={`${link.label}-${index}`}
                                            type="button"
                                            disabled={!link.url}
                                            onClick={() => {
                                                if (link.url) {
                                                    router.get(link.url, {}, {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    });
                                                }
                                            }}
                                            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                                                link.active
                                                    ? 'bg-slate-950 text-white'
                                                    : 'text-slate-600 hover:bg-slate-100'
                                            } disabled:pointer-events-none disabled:opacity-30`}
                                        >
                                            {isPrevious ? (
                                                <ChevronLeft className="h-4 w-4" />
                                            ) : isNext ? (
                                                <ChevronRight className="h-4 w-4" />
                                            ) : (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>

            {/* Approve */}
            <ConfirmationDialog
                open={dialog?.type === 'approve'}
                title="Approve payout?"
                description={
                    dialog?.type === 'approve'
                        ? `You are about to approve payout #${dialog.payout.id} for ${money(dialog.payout.amount)}.`
                        : ''
                }
                confirmText="Approve Payout"
                variant="success"
                loading={processing}
                onCancel={() => setDialog(null)}
                onConfirm={() => {
                    if (dialog?.type === 'approve') {
                        approve(dialog.payout);
                    }
                }}
            />

            {/* Disburse */}
            <ConfirmationDialog
                open={dialog?.type === 'disburse'}
                title="Disburse payout?"
                description={
                    dialog?.type === 'disburse'
                        ? `This will disburse payout #${dialog.payout.id} for ${money(dialog.payout.amount)} to the investor.`
                        : ''
                }
                confirmText="Disburse Payout"
                variant="success"
                loading={processing}
                onCancel={() => setDialog(null)}
                onConfirm={() => {
                    if (dialog?.type === 'disburse') {
                        disburse(dialog.payout);
                    }
                }}
            />

            {/* Disburse all */}
            <ConfirmationDialog
                open={dialog?.type === 'disburse-all'}
                title="Disburse all approved payouts?"
                description={`This will process all currently approved payouts. There are ${approvedCount} approved payout${approvedCount === 1 ? '' : 's'} ready for disbursement.`}
                confirmText="Disburse All"
                variant="warning"
                loading={processing}
                onCancel={() => setDialog(null)}
                onConfirm={disburseAll}
            />
        </div>
    );
}
