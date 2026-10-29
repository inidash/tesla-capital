import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import {
    ArrowDownLeft,
    ArrowUpRight,
    Eye,
    Search,
    X,
} from 'lucide-react';

import { index, show } from '@/routes/admin/transactions';

interface Transaction {
    id: number;
    reference: string;
    type: string;
    status: string;
    amount: number;
    description?: string | null;
    created_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    } | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface TransactionsPagination {
    data: Transaction[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

interface Props {
    transactions: TransactionsPagination;

    filters?: {
        search?: string;
        type?: string;
        status?: string;
    };

    flash?: {
        success?: string;
        error?: string;
    };
}

const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(date));

const statusClasses = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
        case 'successful':
        case 'success':
            return 'bg-green-50 text-green-700 ring-green-600/20';

        case 'pending':
            return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';

        case 'failed':
        case 'cancelled':
        case 'rejected':
            return 'bg-red-50 text-red-700 ring-red-600/20';

        default:
            return 'bg-gray-50 text-gray-600 ring-gray-500/20';
    }
};

const typeClasses = (type: string) => {
    const normalized = type.toLowerCase();

    if (
        normalized.includes('deposit') ||
        normalized.includes('credit') ||
        normalized.includes('roi') ||
        normalized.includes('payout')
    ) {
        return 'bg-green-50 text-green-700';
    }

    if (
        normalized.includes('withdraw') ||
        normalized.includes('debit') ||
        normalized.includes('investment')
    ) {
        return 'bg-indigo-50 text-indigo-700';
    }

    return 'bg-gray-50 text-gray-600';
};

export default function Index({
    transactions,
    filters = {},
    flash,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [type, setType] = useState(filters.type ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            index({
                query: {
                    search: search || undefined,
                    type: type || undefined,
                    status: status || undefined,
                },
            }).url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const clearFilters = () => {
        setSearch('');
        setType('');
        setStatus('');

        router.get(
            index().url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const hasFilters = Boolean(search || type || status);

    return (
        <>
            <Head title="Transactions" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Transactions
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            View and monitor all financial transactions
                            across the platform.
                        </p>
                    </div>

                    {/* Flash messages */}
                    {flash?.success && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {flash.success}
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {flash.error}
                        </div>
                    )}

                    {/* Filters */}
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <form
                            onSubmit={submitSearch}
                            className="flex flex-col gap-3 lg:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search reference, user or email..."
                                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>

                            <select
                                value={type}
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            >
                                <option value="">All Types</option>
                                <option value="deposit">Deposit</option>
                                <option value="investment">Investment</option>
                                <option value="payout">Payout</option>
                                <option value="withdrawal">Withdrawal</option>
                            </select>

                            <select
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value)
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="successful">Successful</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-lg bg-[#173024] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                            >
                                Search
                            </button>

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    <X className="h-4 w-4" />
                                    Clear
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    All Transactions
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    {transactions.total}{' '}
                                    {transactions.total === 1
                                        ? 'transaction'
                                        : 'transactions'}
                                </p>
                            </div>
                        </div>

                        {transactions.data.length > 0 ? (
                            <>
                                {/* Desktop */}
                                <div className="hidden overflow-x-auto md:block">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Transaction
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    User
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Type
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Amount
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Status
                                                </th>

                                                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {transactions.data.map(
                                                (transaction) => (
                                                    <tr
                                                        key={transaction.id}
                                                        className="transition hover:bg-gray-50"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium text-gray-900">
                                                                {transaction.reference}
                                                            </div>

                                                            <div className="mt-1 text-xs text-gray-500">
                                                                {formatDate(
                                                                    transaction.created_at,
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {transaction.user?.name ??
                                                                    '—'}
                                                            </div>

                                                            <div className="mt-1 text-xs text-gray-500">
                                                                {transaction.user?.email ??
                                                                    '—'}
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${typeClasses(
                                                                    transaction.type,
                                                                )}`}
                                                            >
                                                                {transaction.type}
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                            {formatMoney(
                                                                transaction.amount,
                                                            )}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${statusClasses(
                                                                    transaction.status,
                                                                )}`}
                                                            >
                                                                {
                                                                    transaction.status
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-4 text-right">
                                                            <a
                                                                href={
                                                                    show(
                                                                        transaction.reference,
                                                                    ).url
                                                                }
                                                                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                View
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile */}
                                <div className="divide-y divide-gray-100 md:hidden">
                                    {transactions.data.map(
                                        (transaction) => (
                                            <div
                                                key={transaction.id}
                                                className="p-5"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-gray-900">
                                                            {
                                                                transaction.reference
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {formatDate(
                                                                transaction.created_at,
                                                            )}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`shrink-0 inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${statusClasses(
                                                            transaction.status,
                                                        )}`}
                                                    >
                                                        {
                                                            transaction.status
                                                        }
                                                    </span>
                                                </div>

                                                <div className="mt-4 grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            User
                                                        </p>

                                                        <p className="mt-1 truncate text-sm font-medium text-gray-900">
                                                            {transaction.user
                                                                ?.name ?? '—'}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            Amount
                                                        </p>

                                                        <p className="mt-1 text-sm font-semibold text-gray-900">
                                                            {formatMoney(
                                                                transaction.amount,
                                                            )}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            Type
                                                        </p>

                                                        <span
                                                            className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${typeClasses(
                                                                transaction.type,
                                                            )}`}
                                                        >
                                                            {
                                                                transaction.type
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                <a
                                                    href={
                                                        show(transaction.reference).url
                                                    }
                                                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View Transaction
                                                </a>
                                            </div>
                                        ),
                                    )}
                                </div>

                                {/* Pagination */}
                                {transactions.last_page > 1 && (
                                    <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm text-gray-500">
                                            Showing{' '}
                                            <span className="font-medium text-gray-700">
                                                {transactions.from}
                                            </span>{' '}
                                            to{' '}
                                            <span className="font-medium text-gray-700">
                                                {transactions.to}
                                            </span>{' '}
                                            of{' '}
                                            <span className="font-medium text-gray-700">
                                                {transactions.total}
                                            </span>
                                        </p>

                                        <div className="flex flex-wrap gap-1">
                                            {transactions.links.map(
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
                                                        className={`rounded-lg px-3 py-2 text-sm transition ${
                                                            link.active
                                                                ? 'bg-indigo-600 font-medium text-white'
                                                                : link.url
                                                                  ? 'text-gray-700 hover:bg-gray-100'
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
                            </>
                        ) : (
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                    <ArrowUpRight className="h-5 w-5 text-gray-400" />
                                </div>

                                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                                    No transactions found
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}