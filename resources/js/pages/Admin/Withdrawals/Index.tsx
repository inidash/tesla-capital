
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDownToLine,
    CheckCircle2,
    Clock3,
    Eye,
    Search,
    X,
    XCircle,
} from 'lucide-react';
import { FormEvent, useState } from 'react';

import {
    index as withdrawalsIndex,
    show as withdrawalShow,
} from '@/routes/admin/withdrawals';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Withdrawal {
    id: number;
    reference: string;
    status: string;
    amount: number;
    currency: string;
    description: string | null;
    created_at: string;
    processed_at: string | null;
    user: User;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Pagination {
    data: Withdrawal[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
}

interface Props {
    withdrawals: Pagination;

    filters?: {
        search?: string;
        status?: string;
    };

    statistics: {
        pending_count: number;
        pending_amount: number;
        successful_count: number;
        successful_amount: number;
        failed_count: number;
    };
}

const statuses = [
    {
        value: '',
        label: 'All Statuses',
    },
    {
        value: 'pending',
        label: 'Pending',
    },
    {
        value: 'successful',
        label: 'Successful',
    },
    {
        value: 'failed',
        label: 'Failed',
    },
    {
        value: 'reversed',
        label: 'Reversed',
    },
];

function formatAmount(
    amount: number,
    currency: string,
): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

function formatDate(date: string): string {
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(date));
}

function statusClasses(status: string): string {
    switch (status) {
        case 'successful':
            return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20';

        case 'pending':
            return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';

        case 'failed':
            return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20';

        case 'reversed':
            return 'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-500/20';

        default:
            return 'bg-gray-100 text-gray-600';
    }
}

export default function Index({
    withdrawals,
    filters = {},
    statistics,
}: Props) {
    const [search, setSearch] = useState(
        filters.search ?? '',
    );

    const [status, setStatus] = useState(
        filters.status ?? '',
    );

    const applyFilters = (
        event?: FormEvent<HTMLFormElement>,
    ) => {
        event?.preventDefault();

        router.get(
            withdrawalsIndex().url,
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
            withdrawalsIndex().url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const hasFilters =
        Boolean(search) || Boolean(status);

    return (
        <>
            <Head title="Withdrawals" />

            <div className="min-h-full bg-[#F6F3EC] p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-medium text-[#6B7268]">
                                Administration
                            </p>

                            <h1 className="mt-1 font-serif text-3xl font-semibold text-[#173024]">
                                Withdrawals
                            </h1>

                            <p className="mt-1 text-sm text-[#6B7268]">
                                Review and process investor withdrawal requests.
                            </p>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

                        <div className="rounded-2xl border border-[#E5E0D5] bg-white p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-[#6B7268]">
                                    Pending
                                </p>

                                <Clock3
                                    size={19}
                                    className="text-amber-600"
                                />
                            </div>

                            <p className="mt-3 text-2xl font-semibold text-[#173024]">
                                {statistics.pending_count}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E5E0D5] bg-white p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-[#6B7268]">
                                    Pending Amount
                                </p>

                                <ArrowDownToLine
                                    size={19}
                                    className="text-amber-600"
                                />
                            </div>

                            <p className="mt-3 text-2xl font-semibold text-[#173024]">
                                {formatAmount(
                                    statistics.pending_amount,
                                    'USD',
                                )}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E5E0D5] bg-white p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-[#6B7268]">
                                    Successful
                                </p>

                                <CheckCircle2
                                    size={19}
                                    className="text-green-600"
                                />
                            </div>

                            <p className="mt-3 text-2xl font-semibold text-[#173024]">
                                {statistics.successful_count}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E5E0D5] bg-white p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-[#6B7268]">
                                    Paid Out
                                </p>

                                <CheckCircle2
                                    size={19}
                                    className="text-green-600"
                                />
                            </div>

                            <p className="mt-3 text-2xl font-semibold text-[#173024]">
                                {formatAmount(
                                    statistics.successful_amount,
                                    'USD',
                                )}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E5E0D5] bg-white p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-[#6B7268]">
                                    Failed
                                </p>

                                <XCircle
                                    size={19}
                                    className="text-red-600"
                                />
                            </div>

                            <p className="mt-3 text-2xl font-semibold text-[#173024]">
                                {statistics.failed_count}
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 rounded-2xl border border-[#E5E0D5] bg-white p-4 shadow-sm">
                        <form
                            onSubmit={applyFilters}
                            className="flex flex-col gap-3 lg:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search user, email or reference..."
                                    className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                />
                            </div>

                            <select
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value)
                                }
                                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#173024]"
                            >
                                {statuses.map((item) => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173024] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0E1E16]"
                            >
                                <Search size={17} />
                                Filter
                            </button>

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <X size={17} />
                                    Clear
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-2xl border border-[#E5E0D5] bg-white shadow-sm">

                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#FAF9F5]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                            Investor
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                            Reference
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {withdrawals.data.map(
                                        (withdrawal) => (
                                            <tr
                                                key={withdrawal.id}
                                                className="transition hover:bg-[#FAF9F5]"
                                            >
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {withdrawal.user.name}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500">
                                                        {withdrawal.user.email}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-xs text-gray-600">
                                                        {withdrawal.reference.slice(
                                                            0,
                                                            12,
                                                        )}
                                                        ...
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                                                    {formatAmount(
                                                        withdrawal.amount,
                                                        withdrawal.currency,
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClasses(
                                                            withdrawal.status,
                                                        )}`}
                                                    >
                                                        {withdrawal.status}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {formatDate(
                                                        withdrawal.created_at,
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={
                                                            withdrawalShow({
                                                                transaction:
                                                                    withdrawal.reference,
                                                            }).url
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#173024] hover:bg-[#173024]/10"
                                                    >
                                                        <Eye size={16} />
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile */}
                        <div className="divide-y divide-gray-100 md:hidden">
                            {withdrawals.data.map(
                                (withdrawal) => (
                                    <Link
                                        key={withdrawal.id}
                                        href={
                                            withdrawalShow({
                                                transaction:
                                                    withdrawal.reference,
                                            }).url
                                        }
                                        className="block p-4 hover:bg-[#FAF9F5]"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {withdrawal.user.name}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {withdrawal.user.email}
                                                </p>

                                                <p className="mt-3 text-sm font-semibold text-[#173024]">
                                                    {formatAmount(
                                                        withdrawal.amount,
                                                        withdrawal.currency,
                                                    )}
                                                </p>
                                            </div>

                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClasses(
                                                    withdrawal.status,
                                                )}`}
                                            >
                                                {withdrawal.status}
                                            </span>
                                        </div>

                                        <div className="mt-3 flex justify-between text-xs text-gray-500">
                                            <span>
                                                {withdrawal.reference.slice(
                                                    0,
                                                    10,
                                                )}
                                                ...
                                            </span>

                                            <span>
                                                {formatDate(
                                                    withdrawal.created_at,
                                                )}
                                            </span>
                                        </div>
                                    </Link>
                                ),
                            )}
                        </div>

                        {withdrawals.data.length === 0 && (
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                    <ArrowDownToLine
                                        size={24}
                                        className="text-gray-400"
                                    />
                                </div>

                                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                                    No withdrawals found
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    There are no withdrawal requests matching
                                    your current filters.
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {withdrawals.last_page > 1 && (
                            <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                <p className="text-sm text-gray-500">
                                    Showing {withdrawals.from ?? 0} to{' '}
                                    {withdrawals.to ?? 0} of{' '}
                                    {withdrawals.total} withdrawals
                                </p>

                                <div className="flex flex-wrap gap-1">
                                    {withdrawals.links.map(
                                        (link, index) => (
                                            <button
                                                key={`${link.label}-${index}`}
                                                type="button"
                                                disabled={!link.url}
                                                onClick={() => {
                                                    if (link.url) {
                                                        router.get(
                                                            link.url,
                                                            {},
                                                            {
                                                                preserveState:
                                                                    true,
                                                                preserveScroll:
                                                                    true,
                                                            },
                                                        );
                                                    }
                                                }}
                                                className={`rounded-lg px-3 py-2 text-sm ${
                                                    link.active
                                                        ? 'bg-[#173024] text-white'
                                                        : link.url
                                                          ? 'text-gray-600 hover:bg-gray-100'
                                                          : 'cursor-not-allowed text-gray-300'
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
