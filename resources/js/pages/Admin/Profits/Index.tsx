import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDownRight,
    ArrowUpRight,
    CircleDollarSign,
    Clock3,
    Eye,
    Plus,
    Search,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

type Profit = {
    id: number;
    amount: string | number;
    type: string;
    status: string;
    reference: string;
    earned_at: string | null;
    user: {
        id: number;
        name: string;
        email: string;
    };
    investment: {
        id: number;
        amount: string | number;
        plan?: {
            id: number;
            name: string;
        };
    };
};

type Props = {
    profits: {
        data: Profit[];
        current_page: number;
        last_page: number;
        total: number;
    };
    summary: {
        total: number;
        pending: number;
        available: number;
        paid: number;
    };
    filters: {
        search: string;
        status: string;
    };
};

const currency = (amount: number | string) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(Number(amount));

const date = (value: string | null) =>
    value
        ? new Date(value).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
          })
        : '—';

const statusClass = (status: string) => {
    switch (status) {
        case 'available':
            return 'bg-emerald-50 text-emerald-700';

        case 'paid':
            return 'bg-blue-50 text-blue-700';

        case 'pending':
            return 'bg-amber-50 text-amber-700';

        case 'cancelled':
            return 'bg-red-50 text-red-700';

        default:
            return 'bg-gray-100 text-gray-600';
    }
};

export default function Index({
    profits,
    summary,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const submitSearch = () => {
        router.get('/admin/profits',
            {
                search,
                status: filters.status,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <>
            <Head title="Profit Management" />
 
            <div className="min-h-full bg-[#F6F3EC] p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Profit Management
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage investor profits and earnings.
                        </p>
                    </div>

                    <Link
                        href={'/admin/profits/create'}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Profit
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        title="Total Profit"
                        value={currency(summary.total)}
                        icon={TrendingUp}
                    />

                    <SummaryCard
                        title="Available"
                        value={currency(summary.available)}
                        icon={CircleDollarSign}
                    />

                    <SummaryCard
                        title="Pending"
                        value={currency(summary.pending)}
                        icon={Clock3}
                    />

                    <SummaryCard
                        title="Paid"
                        value={currency(summary.paid)}
                        icon={ArrowUpRight}
                    />
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full lg:max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        submitSearch();
                                    }
                                }}
                                placeholder="Search investor or reference..."
                                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-0"
                            />
                        </div>

                        <select
                            value={filters.status}
                            onChange={(event) =>
                                router.get(
                                    '/admin/profits',
                                    {
                                        search,
                                        status: event.target.value,
                                    },
                                    {
                                        preserveState: true,
                                        replace: true,
                                    },
                                )
                            }
                            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none"
                        >
                            <option value="">All statuses</option>
                            <option value="pending">Pending</option>
                            <option value="available">Available</option>
                            <option value="paid">Paid</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Investor
                                    </th>

                                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Investment
                                    </th>

                                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Profit
                                    </th>

                                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4" />
                                </tr>
                            </thead>

                            <tbody>
                                {profits.data.map((profit) => (
                                    <tr
                                        key={profit.id}
                                        className="border-b border-gray-100 last:border-0"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {profit.user.name}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {profit.user.email}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-900">
                                                {profit.investment?.plan?.name ??
                                                    'Investment'}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {currency(
                                                    profit.investment.principal_amount,
                                                )}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">
                                                {currency(profit.amount)}
                                            </p>

                                            <p className="mt-1 text-xs capitalize text-gray-500">
                                                {profit.type}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {date(profit.earned_at)}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClass(
                                                    profit.status,
                                                )}`}
                                            >
                                                {profit.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/profits/${profit.id}`}
                                                className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {profits.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-14 text-center"
                                        >
                                            <CircleDollarSign className="mx-auto h-10 w-10 text-gray-300" />

                                            <p className="mt-3 font-medium text-gray-900">
                                                No profit records
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Profit records will appear here
                                                once they are created.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

function SummaryCard({
    title,
    value,
    icon: Icon,
}: {
    title: string;
    value: string;
    icon: typeof TrendingUp;
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>

                    <p className="mt-2 text-xl font-semibold text-gray-900">
                        {value}
                    </p>
                </div>

                <div className="rounded-xl bg-gray-100 p-3">
                    <Icon className="h-5 w-5 text-gray-700" />
                </div>
            </div>
        </div>
    );
}