import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDownLeft,
    CheckCircle2,
    Clock3,
    Eye,
    Search,
    XCircle,
} from 'lucide-react';
import { FormEvent, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Transaction {
    id: number;
    reference: string;
    status: string;
    gateway_reference: string | null;
    processed_at: string | null;
}

interface Deposit {
    id: number;
    user_id: number;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    payment_gateway: string | null;
    description: string | null;
    processed_at: string | null;
    created_at: string;
    user: User;
    transaction: Transaction;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Pagination {
    data: Deposit[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

interface Stats {
    pending: number;
    successful: number;
    failed: number;
    pending_amount: number;
    successful_amount: number;
}

interface Props {
    deposits: Pagination;
    filters?: {
        status?: string;
        search?: string;
    };
    stats: Stats;
}

const formatMoney = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};
 
const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};

const statusClasses = (status: string) => {
    switch (status) {
        case 'successful':
            return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';

        case 'failed':
            return 'bg-red-50 text-red-700 ring-red-600/20';

        default:
            return 'bg-amber-50 text-amber-700 ring-amber-600/20';
    }
};

export default function Index({
    deposits,
    filters = {},
    stats,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    console.log(['stats',stats])

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/admin/deposits',
            {
                search: search || undefined,
                status: filters.status || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const filterStatus = (status?: string) => {
        router.get(
            '/admin/deposits',
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

    return (
        <>
            <Head title="Deposits" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                                <ArrowDownLeft className="h-5 w-5 text-indigo-600" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Deposits
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Review and manage investor wallet deposits.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <button
                            type="button"
                            onClick={() => filterStatus('pending')}
                            className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-indigo-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Pending
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                                        {stats.pending}
                                    </p>
                                </div>

                                <Clock3 className="h-5 w-5 text-amber-500" />
                            </div>

                            <p className="mt-2 text-xs text-gray-500">
                                {formatMoney(stats.pending_amount)} awaiting review
                            </p>
                        </button>

                        <button
                            type="button"
                            onClick={() => filterStatus('successful')}
                            className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-indigo-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Confirmed
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                                        {stats.successful}
                                    </p>
                                </div>

                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            </div>

                            <p className="mt-2 text-md text-green-500">
                                {formatMoney(stats.successful_amount)} credited
                            </p>
                        </button>

                        <button
                            type="button"
                            onClick={() => filterStatus('failed')}
                            className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-indigo-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Rejected
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                                        {stats.failed}
                                    </p>
                                </div>

                                <XCircle className="h-5 w-5 text-red-500" />
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => filterStatus()}
                            className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-indigo-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        All Deposits
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                                        {deposits.total}
                                    </p>
                                </div>

                                <ArrowDownLeft className="h-5 w-5 text-indigo-500" />
                            </div>

                            <p className="mt-2 text-xs text-gray-500">
                                All deposit requests
                            </p>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <form
                            onSubmit={submitSearch}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search by reference, name or email..."
                                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>

                            <button
                                type="submit"
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                            >
                                Search
                            </button>

                            {filters.search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');

                                        router.get(
                                            '/admin/deposits',
                                            {},
                                            {
                                                preserveState: true,
                                                preserveScroll: true,
                                            },
                                        );
                                    }}
                                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    Clear
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="font-semibold text-gray-900">
                                Deposit Requests
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {deposits.total}{' '}
                                {deposits.total === 1
                                    ? 'deposit'
                                    : 'deposits'}
                            </p>
                        </div>

                        {deposits.data.length > 0 ? (
                            <>
                                {/* Desktop */}
                                <div className="hidden overflow-x-auto md:block">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Investor
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Amount
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Reference
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Status
                                                </th>

                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Date
                                                </th>

                                                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {deposits.data.map((deposit) => (
                                                <tr
                                                    key={deposit.id}
                                                    className="transition hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {deposit.user.name}
                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                {deposit.user.email}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {formatMoney(
                                                                deposit.amount,
                                                                deposit.currency,
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span className="font-mono text-xs text-gray-600">
                                                            {deposit.reference}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusClasses(
                                                                deposit.status,
                                                            )}`}
                                                        >
                                                            {deposit.status
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                deposit.status.slice(
                                                                    1,
                                                                )}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {formatDate(
                                                            deposit.created_at,
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-right">
                                                        <Link
                                                            href={`/admin/deposits/${deposit.id}`}
                                                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile */}
                                <div className="divide-y divide-gray-100 md:hidden">
                                    {deposits.data.map((deposit) => (
                                        <div
                                            key={deposit.id}
                                            className="p-5"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {deposit.user.name}
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        {deposit.user.email}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusClasses(
                                                        deposit.status,
                                                    )}`}
                                                >
                                                    {deposit.status}
                                                </span>
                                            </div>

                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        Amount
                                                    </p>

                                                    <p className="mt-1 font-semibold text-gray-900">
                                                        {formatMoney(
                                                            deposit.amount,
                                                            deposit.currency,
                                                        )}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        Date
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-700">
                                                        {formatDate(
                                                            deposit.created_at,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/admin/deposits/${deposit.id}`}
                                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View Deposit
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="px-6 py-16 text-center">
                                <ArrowDownLeft className="mx-auto h-10 w-10 text-gray-300" />

                                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                                    No deposits found
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    There are no deposits matching your current
                                    filters.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {deposits.last_page > 1 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {deposits.links.map((link, index) => (
                                <button
                                    key={index}
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
                                    className={`rounded-lg px-3 py-2 text-sm ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                    } ${
                                        !link.url
                                            ? 'cursor-not-allowed opacity-40'
                                            : ''
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}