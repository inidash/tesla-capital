import { Head, Link, router } from '@inertiajs/react';
import { Search, Eye, TrendingUp, Wallet, CheckCircle2, XCircle, Clock3 } from 'lucide-react';
import { useState } from 'react';

// import AdminLayout from '@/layouts/AdminLayout';
import { index as investmentsIndex, show as investmentShow } from '@/routes/admin/investments';

interface User {
id: number;
name: string;
email: string;
}

interface Plan {
id: number;
name: string;
}

interface Investment {
id: number;
principal_amount: number;
locked_monthly_roi_percentage: string | number;
status: 'active' | 'matured' | 'cancelled';
starts_on: string;
ends_on: string;
next_payout_on: string;
matured_at: string | null;
total_payments: number;
paid_payments: number;
user: User;
plan: Plan;
monthly_roi_amount: number;
}

interface PaginationLink {
url: string | null;
label: string;
active: boolean;
}

interface PaginatedInvestments {
data: Investment[];
current_page: number;
last_page: number;
per_page: number;
total: number;
from: number | null;
to: number | null;
links: PaginationLink[];
}

interface Statistics {
total: number;
active: number;
matured: number;
cancelled: number;
principal: number;
active_principal: number;
}

interface Filters {
search: string;
status: string;
}

interface Props {
investments: PaginatedInvestments;
statistics: Statistics;
filters: Filters;
}

const formatMoney = (amount: number) => {
return new Intl.NumberFormat('en-US', {
style: 'currency',
currency: 'USD',
minimumFractionDigits: 2,
}).format(amount);
};

const formatDate = (date: string | null) => {
if (!date) {
return '—';
}

return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
}).format(new Date(date));


};

const statusClasses = (status: Investment['status']) => {
switch (status) {
case 'active':
return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';


    case 'matured':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';

    case 'cancelled':
        return 'bg-red-50 text-red-700 ring-red-600/20';

    default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
}


};

const StatusIcon = ({ status }: { status: Investment['status'] }) => {
if (status === 'active') {
return <CheckCircle2 className="h-3.5 w-3.5" />;
}


if (status === 'matured') {
    return <Clock3 className="h-3.5 w-3.5" />;
}

return <XCircle className="h-3.5 w-3.5" />;


};

export default function Index({
investments,
statistics,
filters,
}: Props) {
const [search, setSearch] = useState(filters.search ?? '');
const [status, setStatus] = useState(filters.status ?? '');

const submitFilters = () => {
    router.get(
        investmentsIndex().url,
        {
            search: search || undefined,
            status: status || undefined,
        },
        {
            preserveState: true,
            preserveScroll: true,
        },
    );
};

const clearFilters = () => {
    setSearch('');
    setStatus('');

    router.get(
        investmentsIndex().url,
        {},
        {
            preserveState: true,
            preserveScroll: true,
        },
    );
};

return (
    <div>
        <Head title="Investments" />
        <div className="min-h-screen bg-[#F7F5EF]">
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">   
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Investments
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Monitor and manage investor investments.
                    </p>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 my-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                            Total
                        </span>
                    </div>

                    <p className="mt-4 text-2xl font-bold text-gray-900">
                        {statistics.total}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Investments
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                            Active
                        </span>
                    </div>

                    <p className="mt-4 text-2xl font-bold text-gray-900">
                        {statistics.active}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Currently running
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                            <Clock3 className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                            Matured
                        </span>
                    </div>

                    <p className="mt-4 text-2xl font-bold text-gray-900">
                        {statistics.matured}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Completed investments
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="rounded-xl bg-red-50 p-2.5 text-red-600">
                            <XCircle className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                            Cancelled
                        </span>
                    </div>

                    <p className="mt-4 text-2xl font-bold text-gray-900">
                        {statistics.cancelled}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Cancelled investments
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                            Principal
                        </span>
                    </div>

                    <p className="mt-4 text-xl font-bold text-gray-900">
                        {formatMoney(statistics.principal)}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Total invested
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                            Active Principal
                        </span>
                    </div>

                    <p className="mt-4 text-xl font-bold text-gray-900">
                        {formatMoney(statistics.active_principal)}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Funds currently locked
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    submitFilters();
                                }
                            }}
                            placeholder="Search investor name, email or plan..."
                            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(event) => {
                            setStatus(event.target.value);

                            router.get(
                                investmentsIndex().url,
                                {
                                    search: search || undefined,
                                    status:
                                        event.target.value || undefined,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                },
                            );
                        }}
                        className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 lg:w-48"
                    >
                        <option value="">All statuses</option>
                        <option value="active">Active</option>
                        <option value="matured">Matured</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                        type="button"
                        onClick={submitFilters}
                        className="h-11 rounded-xl bg-[#173024] px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Search
                    </button>

                    {(search || status) && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="h-11 rounded-xl border border-gray-200 px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Desktop table */}
            <div className="my-4 hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-600">
                                    Investor
                                </th>
                                <th className="px-6 py-4 font-semibold text-gray-600">
                                    Plan
                                </th>
                                <th className="px-6 py-4 font-semibold text-gray-600">
                                    Principal
                                </th>
                                <th className="px-6 py-4 font-semibold text-gray-600">
                                    ROI
                                </th>
                                <th className="px-6 py-4 font-semibold text-gray-600">
                                    Duration
                                </th>
                                <th className="px-6 py-4 font-semibold text-gray-600">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-right font-semibold text-gray-600">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {investments.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-6 py-16 text-center"
                                    >
                                        <TrendingUp className="mx-auto h-10 w-10 text-gray-300" />
                                        <p className="mt-3 font-medium text-gray-900">
                                            No investments found
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Try adjusting your search or
                                            filters.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                investments.data.map((investment) => (
                                    <tr
                                        key={investment.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {investment.user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {investment.user.email}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900">
                                                {investment.plan.name}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {formatMoney(
                                                investment.principal_amount,
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-emerald-600">
                                                {investment.locked_monthly_roi_percentage}
                                                %
                                            </span>
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                {formatMoney(
                                                    investment.monthly_roi_amount,
                                                )}
                                                / month
                                            </p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="text-gray-900">
                                                {formatDate(
                                                    investment.starts_on,
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                to{' '}
                                                {formatDate(
                                                    investment.ends_on,
                                                )}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses(
                                                    investment.status,
                                                )}`}
                                            >
                                                <StatusIcon
                                                    status={
                                                        investment.status
                                                    }
                                                />
                                                {investment.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    investment.status.slice(
                                                        1,
                                                    )}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={
                                                    investmentShow(
                                                        investment.id,
                                                    ).url
                                                }
                                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {investments.last_page > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                        <p className="text-sm text-gray-500">
                            Showing{' '}
                            <span className="font-medium text-gray-900">
                                {investments.from ?? 0}
                            </span>{' '}
                            to{' '}
                            <span className="font-medium text-gray-900">
                                {investments.to ?? 0}
                            </span>{' '}
                            of{' '}
                            <span className="font-medium text-gray-900">
                                {investments.total}
                            </span>
                        </p>

                        <div className="flex gap-1">
                            {investments.links.map((link, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (link.url) {
                                            router.get(
                                                link.url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                },
                                            );
                                        }
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : link.url
                                              ? 'text-gray-600 hover:bg-gray-100'
                                              : 'cursor-not-allowed text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 lg:hidden">
                {investments.data.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                        <TrendingUp className="mx-auto h-10 w-10 text-gray-300" />
                        <p className="mt-3 font-medium text-gray-900">
                            No investments found
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your filters.
                        </p>
                    </div>
                ) : (
                    investments.data.map((investment) => (
                        <div
                            key={investment.id}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {investment.user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {investment.user.email}
                                    </p>
                                </div>

                                <span
                                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses(
                                        investment.status,
                                    )}`}
                                >
                                    <StatusIcon
                                        status={investment.status}
                                    />
                                    {investment.status}
                                </span>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Plan
                                    </p>
                                    <p className="mt-1 font-medium text-gray-900">
                                        {investment.plan.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Principal
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-900">
                                        {formatMoney(
                                            investment.principal_amount,
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Monthly ROI
                                    </p>
                                    <p className="mt-1 font-semibold text-emerald-600">
                                        {
                                            investment.locked_monthly_roi_percentage
                                        }
                                        %
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Next payout
                                    </p>
                                    <p className="mt-1 font-medium text-gray-900">
                                        {formatDate(
                                            investment.next_payout_on,
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 border-t border-gray-100 pt-4">
                                <Link
                                    href={
                                        investmentShow(investment.id).url
                                    }
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    <Eye className="h-4 w-4" />
                                    View Investment
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
            </div>
        </div>
    </div>
);


}
