import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    Edit,
    Layers,
    Users,
    Wallet,
} from 'lucide-react';

import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Investment {
    id: number;
    amount: number;
    status: string;
    created_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

interface Plan {
    id: number;
    category_id: number | null;
    name: string;
    description: string | null;
    minimum_amount: number;
    maximum_amount: number;
    roi_percentage: string | number;
    duration_days: number;
    is_active: boolean;
    category: Category | null;
    investments: Investment[];
}

interface Props {
    plan: Plan;
}

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
    }).format(amount / 100);
};

export default function Show({ plan }: Props) {
    const toggleStatus = () => {
        router.patch(
            `/admin/plans/${plan.id}/toggle-status`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <div>
            <Head title={plan.name} />

            <div className="min-h-screen bg-[#F7F6F1] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {/* Top Navigation */}
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            href="/admin/plans"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#687068] hover:text-[#173024]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to plans
                        </Link>

                        <div className="flex gap-2">
                            <Link
                                href={`/admin/plans/${plan.id}/edit`}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#173024] px-5 py-3 text-sm font-semibold text-white"
                            >
                                <Edit className="h-4 w-4" />
                                Edit Plan
                            </Link>

                            <button
                                type="button"
                                onClick={toggleStatus}
                                className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                                    plan.is_active
                                        ? 'border-red-200 bg-white text-red-600 hover:bg-red-50'
                                        : 'border-green-200 bg-white text-green-700 hover:bg-green-50'
                                }`}
                            >
                                {plan.is_active
                                    ? 'Deactivate'
                                    : 'Activate'}
                            </button>
                        </div>
                    </div>

                    {/* Hero */}
                    <section className="rounded-2xl border border-[#E6E2D8] bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F1EFE7]">
                                    <Wallet className="h-6 w-6 text-[#173024]" />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-3xl font-bold text-[#173024]">
                                            {plan.name}
                                        </h1>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                plan.is_active
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {plan.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </div>

                                    {plan.category && (
                                        <Link
                                            href={`/admin/investment-categories/${plan.category.id}`}
                                            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#687068] hover:text-[#173024]"
                                        >
                                            <Layers className="h-4 w-4" />
                                            {plan.category.name}
                                        </Link>
                                    )}

                                    {plan.description && (
                                        <p className="mt-5 max-w-3xl leading-7 text-[#687068]">
                                            {plan.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Metrics */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                            <p className="text-sm text-[#7A8079]">
                                ROI
                            </p>

                            <p className="mt-2 text-2xl font-bold text-[#173024]">
                                {plan.roi_percentage}%
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                            <p className="text-sm text-[#7A8079]">
                                Duration
                            </p>

                            <p className="mt-2 text-2xl font-bold text-[#173024]">
                                {plan.duration_days}
                            </p>

                            <p className="mt-1 text-xs text-[#8A8F87]">
                                days
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                            <p className="text-sm text-[#7A8079]">
                                Investors
                            </p>

                            <p className="mt-2 text-2xl font-bold text-[#173024]">
                                {plan.investments.length}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                            <p className="text-sm text-[#7A8079]">
                                Category
                            </p>

                            <p className="mt-2 truncate text-lg font-bold text-[#173024]">
                                {plan.category?.name ??
                                    'Uncategorized'}
                            </p>
                        </div>
                    </div>

                    {/* Plan Configuration */}
                    <section className="mt-6 rounded-2xl border border-[#E6E2D8] bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="text-xl font-bold text-[#173024]">
                            Plan Configuration
                        </h2>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <div className="rounded-xl bg-[#FAF9F6] p-5">
                                <p className="text-sm text-[#8A8F87]">
                                    Minimum Investment
                                </p>

                                <p className="mt-2 text-xl font-bold text-[#173024]">
                                    {formatAmount(
                                        plan.minimum_amount,
                                    )}
                                </p>
                            </div>

                            <div className="rounded-xl bg-[#FAF9F6] p-5">
                                <p className="text-sm text-[#8A8F87]">
                                    Maximum Investment
                                </p>

                                <p className="mt-2 text-xl font-bold text-[#173024]">
                                    {formatAmount(
                                        plan.maximum_amount,
                                    )}
                                </p>
                            </div>

                            <div className="rounded-xl bg-[#FAF9F6] p-5">
                                <p className="text-sm text-[#8A8F87]">
                                    ROI
                                </p>

                                <p className="mt-2 text-xl font-bold text-[#173024]">
                                    {plan.roi_percentage}%
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Investors */}
                    <section className="mt-6 overflow-hidden rounded-2xl border border-[#E6E2D8] bg-white shadow-sm">
                        <div className="border-b border-[#ECE9E1] px-6 py-5">
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-[#173024]" />

                                <div>
                                    <h2 className="font-bold text-[#173024]">
                                        Investors
                                    </h2>

                                    <p className="text-sm text-[#7A8079]">
                                        Investors currently associated with
                                        this plan.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {plan.investments.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <p className="font-semibold text-[#173024]">
                                    No investments yet
                                </p>

                                <p className="mt-1 text-sm text-[#7A8079]">
                                    Investments in this plan will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px]">
                                    <thead>
                                        <tr className="bg-[#FAF9F6] text-left">
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                                Investor
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                                Amount
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                                Status
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#ECE9E1]">
                                        {plan.investments.map(
                                            (investment) => (
                                                <tr
                                                    key={investment.id}
                                                    className="hover:bg-[#FCFBF8]"
                                                >
                                                    <td className="px-6 py-5">
                                                        <p className="font-semibold text-[#173024]">
                                                            {investment.user
                                                                ?.name ??
                                                                'Unknown Investor'}
                                                        </p>

                                                        <p className="mt-1 text-xs text-[#8A8F87]">
                                                            {
                                                                investment
                                                                    .user
                                                                    ?.email
                                                            }
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-5 text-sm font-semibold text-[#173024]">
                                                        {formatAmount(
                                                            investment.amount,
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span className="rounded-full bg-[#F1EFE7] px-3 py-1 text-xs font-semibold capitalize text-[#173024]">
                                                            {
                                                                investment.status
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2 text-sm text-[#687068]">
                                                            <CalendarDays className="h-4 w-4" />

                                                            {new Date(
                                                                investment.created_at,
                                                            ).toLocaleDateString(
                                                                'en-NG',
                                                                {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                },
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}