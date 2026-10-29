
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDownLeft,
    ArrowUpRight,
    ChevronRight,
    CircleDollarSign,
    Clock3,
    CreditCard,
    Eye,
    RotateCcw,
    Search,
    TrendingUp,
    X,
} from 'lucide-react';
import { FormEvent, useState } from 'react';

import { index as transactionsIndex } from '@/routes/transactions';
import { show as transactionShow } from '@/routes/transactions';

interface InvestmentPlan {
    id: number;
    name: string;
}

interface Investment {
    id: number;
    investment_plan_id: number;
    plan?: InvestmentPlan | null;
}

interface Transaction {
    id: number;
    reference: string;
    type:
        | 'deposit'
        | 'withdrawal'
        | 'investment_purchase'
        | 'roi_payout'
        | 'refund'
        | string;
    status:
        | 'pending'
        | 'successful'
        | 'failed'
        | 'reversed'
        | string;
    amount: number;
    currency: string;
    payment_gateway: string | null;
    gateway_reference: string | null;
    description: string | null;
    processed_at: string | null;
    created_at: string;
    investment?: Investment | null;
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
        type?: string;
        status?: string;
        search?: string;
    };
}

const transactionTypes = [
    { value: '', label: 'All Types' },
    { value: 'deposit', label: 'Deposits' },
    { value: 'withdrawal', label: 'Withdrawals' },
    {
        value: 'investment_purchase',
        label: 'Investment Purchases',
    },
    { value: 'roi_payout', label: 'ROI Payouts' },
    { value: 'refund', label: 'Refunds' },
];

const transactionStatuses = [
    { value: '', label: 'All Statuses' },
    { value: 'successful', label: 'Successful' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'reversed', label: 'Reversed' },
];

function formatType(type: string): string {
    return type
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatAmount(amount: number, currency: string): string {
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

function getTypeIcon(type: string) {
    switch (type) {
        case 'deposit':
            return ArrowDownLeft;

        case 'withdrawal':
            return ArrowUpRight;

        case 'investment_purchase':
            return TrendingUp;

        case 'roi_payout':
            return CircleDollarSign;

        case 'refund':
            return RotateCcw;

        default:
            return CreditCard;
    }
}

function getTypeIconClasses(type: string): string {
    switch (type) {
        case 'deposit':
            return 'bg-green-50 text-green-600';

        case 'withdrawal':
            return 'bg-orange-50 text-orange-600';

        case 'investment_purchase':
            return 'bg-indigo-50 text-indigo-600';

        case 'roi_payout':
            return 'bg-blue-50 text-blue-600';

        case 'refund':
            return 'bg-gray-100 text-gray-600';

        default:
            return 'bg-gray-100 text-gray-600';
    }
}

function getStatusClasses(status: string): string {
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
            return 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/20';
    }
}

export default function Index({
    transactions,
    filters = {},
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [type, setType] = useState(filters.type ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const applyFilters = (
        event?: FormEvent<HTMLFormElement>,
    ) => {
        event?.preventDefault();

        router.get(
            transactionsIndex().url,
            {
                search: search || undefined,
                type: type || undefined,
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
        setType('');
        setStatus('');

        router.get(
            transactionsIndex().url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const hasFilters =
        Boolean(search) ||
        Boolean(type) ||
        Boolean(status);

    return (
        <>
            <Head title="Transactions" />

            <div className="p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Transactions
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            View and track all your financial
                            transactions.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
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
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search reference, gateway reference..."
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>

                            <select
                                value={type}
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            >
                                {transactionTypes.map((item) => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value)
                                }
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            >
                                {transactionStatuses.map((item) => (
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
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#173024] cursor-pointer px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#173024]/60"
                            >
                                <Search size={17} />
                                Filter
                            </button>

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    <X size={17} />
                                    Clear
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Transactions */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        {/* Desktop table */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Transaction
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Type
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Amount
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Date
                                        </th>

                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {transactions.data.map(
                                        (transaction) => {
                                            const Icon =
                                                getTypeIcon(
                                                    transaction.type,
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        transaction.id
                                                    }
                                                    className="transition hover:bg-gray-50"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getTypeIconClasses(transaction.type)}`}
                                                            >
                                                                <Icon
                                                                    size={
                                                                        18
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="max-w-[220px] truncate text-sm font-medium text-gray-900">
                                                                    {transaction.description ||
                                                                        formatType(
                                                                            transaction.type,
                                                                        )}
                                                                </p>

                                                                <p className="mt-0.5 text-xs text-gray-500">
                                                                    {transaction.reference.slice(
                                                                        0,
                                                                        8,
                                                                    )}
                                                                    ...
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {formatType(
                                                            transaction.type,
                                                        )}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                                                        {formatAmount(
                                                            transaction.amount,
                                                            transaction.currency,
                                                        )}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses(transaction.status)}`}
                                                        >
                                                            {transaction.status}
                                                        </span>
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {formatDate(
                                                            transaction.created_at,
                                                        )}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-right">
                                                        <Link
                                                            href={
                                                                transactionShow(
                                                                    {
                                                                        transaction:
                                                                            transaction.reference,
                                                                    },
                                                                ).url
                                                            }
                                                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                                                        >
                                                            <Eye
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="divide-y divide-gray-100 md:hidden">
                            {transactions.data.map(
                                (transaction) => {
                                    const Icon =
                                        getTypeIcon(
                                            transaction.type,
                                        );

                                    return (
                                        <Link
                                            key={transaction.reference}
                                            href={
                                                transactionShow({
                                                    transaction:
                                                        transaction.reference,
                                                }).url
                                            }
                                            className="block p-4 transition hover:bg-gray-50"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getTypeIconClasses(transaction.type)}`}
                                                >
                                                    <Icon size={18} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                                {transaction.description ||
                                                                    formatType(
                                                                        transaction.type,
                                                                    )}
                                                            </p>

                                                            <p className="mt-0.5 truncate text-xs text-gray-500">
                                                                {
                                                                    transaction.reference
                                                                }
                                                            </p>
                                                        </div>

                                                        <ChevronRight
                                                            size={18}
                                                            className="mt-1 shrink-0 text-gray-400"
                                                        />
                                                    </div>

                                                    <div className="mt-3 flex items-center justify-between">
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {formatAmount(
                                                                transaction.amount,
                                                                transaction.currency,
                                                            )}
                                                        </span>

                                                        <span
                                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses(transaction.status)}`}
                                                        >
                                                            {
                                                                transaction.status
                                                            }
                                                        </span>
                                                    </div>

                                                    <p className="mt-2 text-xs text-gray-500">
                                                        {formatDate(
                                                            transaction.created_at,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                },
                            )}
                        </div>

                        {/* Empty state */}
                        {transactions.data.length === 0 && (
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                    <Clock3
                                        size={24}
                                        className="text-gray-400"
                                    />
                                </div>

                                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                                    {hasFilters
                                        ? 'No transactions found'
                                        : 'No transactions yet'}
                                </h3>

                                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                                    {hasFilters
                                        ? 'Try adjusting your search or filters and try again.'
                                        : 'Your transactions will appear here once you start using your investment account.'}
                                </p>

                                {hasFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Pagination */}
                        {transactions.last_page > 1 && (
                            <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing{' '}
                                    <span className="font-medium text-gray-700">
                                        {transactions.from ?? 0}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium text-gray-700">
                                        {transactions.to ?? 0}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium text-gray-700">
                                        {transactions.total}
                                    </span>{' '}
                                    transactions
                                </p>

                                <div className="flex flex-wrap gap-1">
                                    {transactions.links.map(
                                        (link, linkIndex) => (
                                            <button
                                                key={`${link.label}-${linkIndex}`}
                                                type="button"
                                                disabled={!link.url}
                                                onClick={() => {
                                                    if (
                                                        link.url
                                                    ) {
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
                                                        ? 'bg-indigo-600 text-white'
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

// Transaction.layout = {
//     breadcrumbs: [
//         {
//             title: 'Transactions',
//             href: '/transactions',
//         },
//     ],
// };
