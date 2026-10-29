import { Head } from '@inertiajs/react';
import {
    ArrowDownToLine,
    ArrowUpRight,
    CalendarDays,
    CircleDollarSign,
    Clock3,
    TrendingUp,
} from 'lucide-react';

type InvestmentPlan = {
    id: number;
    name: string;
};

type Investment = {
    id: number;
    plan?: InvestmentPlan;
};

type Profit = {
    id: number;
    amount: string | number;
    type: 'profit' | 'bonus' | 'adjustment';
    status: 'pending' | 'available' | 'paid' | 'cancelled';
    reference: string;
    description?: string | null;
    earned_at?: string | null;
    available_at?: string | null;
    paid_at?: string | null;
    investment: Investment;
};

type PaginatedProfits = {
    data: Profit[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

type Summary = {
    total: number;
    available: number;
    pending: number;
    thisMonth: number;
};

type Props = {
    profits: PaginatedProfits;
    summary: Summary;
    
};
const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(Number(amount));
};

const formatDate = (date?: string | null) => {
    if (!date) {
        return '—';
    }

    return new Date(date).toLocaleDateString('en-NG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const statusClasses = (status: Profit['status']) => {
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
            return 'bg-gray-50 text-gray-700';
    }
};

export default function Index({ profits, summary }: Props) {
    return (
        <>
            <Head title="Profits" />

            <div className="min-h-screen bg-[#F6F3EC]">
                <div className="mx-auto max-w-7xl px-6 py-10">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Profits
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Track your investment earnings and profit history.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 my-4">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Profit
                                </p>

                                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                                    {formatCurrency(summary.total)}
                                </h2>
                            </div>

                            <div className="rounded-xl bg-emerald-50 p-3">
                                <TrendingUp className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Available Profit
                                </p>

                                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                                    {formatCurrency(summary.available)}
                                </h2>
                            </div>

                            <div className="rounded-xl bg-blue-50 p-3">
                                <CircleDollarSign className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pending Profit
                                </p>

                                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                                    {formatCurrency(summary.pending)}
                                </h2>
                            </div>

                            <div className="rounded-xl bg-amber-50 p-3">
                                <Clock3 className="h-5 w-5 text-amber-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    This Month
                                </p>

                                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                                    {formatCurrency(summary.thisMonth)}
                                </h2>
                            </div>

                            <div className="rounded-xl bg-violet-50 p-3">
                                <CalendarDays className="h-5 w-5 text-violet-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Profit */}
                <div className="rounded-2xl bg-gray-900 p-6 text-white shadow-sm mb-4">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-sm text-gray-400">
                                Available for withdrawal
                            </p>

                            <p className="mt-2 text-3xl font-semibold">
                                {formatCurrency(summary.available)}
                            </p>

                            <p className="mt-2 text-sm text-gray-400">
                                Profit that has been released and is available
                                for withdrawal.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
                        >
                            <ArrowDownToLine className="h-4 w-4" />
                            Withdraw Profit
                        </button>
                    </div>
                </div>

                {/* History */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-6 py-5">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Profit History
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            A record of profits generated from your investments.
                        </p>
                    </div>

                    {profits.data.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <CircleDollarSign className="mx-auto h-10 w-10 text-gray-300" />

                            <h3 className="mt-4 text-sm font-semibold text-gray-900">
                                No profit records yet
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Your investment profits will appear here once
                                they are generated.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                                            <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                                Investment
                                            </th>

                                            <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                                Amount
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
                                                            {profit.investment
                                                                ?.plan?.name ??
                                                                'Investment'}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {profit.reference}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {formatCurrency(
                                                        profit.amount,
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {formatDate(
                                                        profit.earned_at,
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClasses(
                                                            profit.status,
                                                        )}`}
                                                    >
                                                        {profit.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
                                                    >
                                                        View
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile */}
                            <div className="divide-y divide-gray-100 md:hidden">
                                {profits.data.map((profit) => (
                                    <div
                                        key={profit.id}
                                        className="space-y-4 p-5"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {profit.investment?.plan
                                                        ?.name ??
                                                        'Investment'}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {profit.reference}
                                                </p>
                                            </div>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClasses(
                                                    profit.status,
                                                )}`}
                                            >
                                                {profit.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Profit
                                                </p>

                                                <p className="mt-1 font-semibold text-gray-900">
                                                    {formatCurrency(
                                                        profit.amount,
                                                    )}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">
                                                    Earned
                                                </p>

                                                <p className="mt-1 text-sm text-gray-700">
                                                    {formatDate(
                                                        profit.earned_at,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                </div>
            </div>
        </>
    );
}