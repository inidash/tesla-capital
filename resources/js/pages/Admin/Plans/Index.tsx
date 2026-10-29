import { Head, Link, router } from '@inertiajs/react';
import {
    Edit,
    Eye,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

interface Plan {
    id: number;
    category_id: number | null;
    name: string;
    description: string | null;
    min_amount: number;
    max_amount: number;
    monthly_roi_percentage: string | number;
    duration_months: number;
    is_active: boolean;
    investments_count: number;
    category: Category | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedPlans {
    data: Plan[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
}

interface Props {
    plans: PaginatedPlans;
    categories: Category[];
    filters: {
        search?: string;
        category_id?: string | number;
    };
}

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
};

export default function Index({
    plans,
    categories,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [categoryId, setCategoryId] = useState(
        filters.category_id?.toString() ?? '',
    );

    const applyFilters = () => {
        router.get(
            '/admin/plans',
            {
                search: search || undefined,
                category_id: categoryId || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const clearFilters = () => {
        setSearch('');
        setCategoryId('');

        router.get(
            '/admin/plans',
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const toggleStatus = (plan: Plan) => {
        router.patch(
            `/admin/plans/${plan.id}/toggle-status`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const deletePlan = (plan: Plan) => {
        if (plan.investments_count > 0) {
            alert(
                'This investment plan cannot be deleted because it has existing investments.',
            );
            return;
        }

        if (
            confirm(
                `Are you sure you want to delete "${plan.name}"?`,
            )
        ) {
            router.delete(`/admin/plans/${plan.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div>
            <Head title="Investment Plans" />

            <div className="min-h-screen bg-[#F7F6F1] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="mb-1 text-sm font-medium text-[#8A8F87]">
                                Investment Management
                            </p>

                            <h1 className="text-2xl font-bold tracking-tight text-[#173024] sm:text-3xl">
                                Investment Plans
                            </h1>

                            <p className="mt-2 text-sm text-[#6B716B]">
                                Create and manage the investment products
                                available to your investors.
                            </p>
                        </div>

                        <Link
                            href="/admin/plans/create"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173024] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#214534]"
                        >
                            <Plus className="h-4 w-4" />
                            Create Plan
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 rounded-2xl border border-[#E6E2D8] bg-white p-4 shadow-sm">
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8F87]" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            applyFilters();
                                        }
                                    }}
                                    placeholder="Search investment plans..."
                                    className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] py-3 pl-10 pr-4 text-sm text-[#173024] outline-none transition focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                />
                            </div>

                            <select
                                value={categoryId}
                                onChange={(e) =>
                                    setCategoryId(e.target.value)
                                }
                                className="rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 text-sm text-[#173024] outline-none focus:border-[#173024] lg:w-56"
                            >
                                <option value="">
                                    All categories
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={applyFilters}
                                className="rounded-xl bg-[#173024] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#214534]"
                            >
                                Search
                            </button>

                            {(search || categoryId) && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="rounded-xl border border-[#DEDACF] px-5 py-3 text-sm font-semibold text-[#173024] transition hover:bg-[#FAF9F6]"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                            <p className="text-sm text-[#7A8079]">
                                Total Plans
                            </p>

                            <p className="mt-2 text-2xl font-bold text-[#173024]">
                                {plans.total}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                            <p className="text-sm text-[#7A8079]">
                                Active Categories
                            </p>

                            <p className="mt-2 text-2xl font-bold text-[#173024]">
                                {
                                    categories.filter(
                                        (category) =>
                                            category.is_active,
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                            <p className="text-sm text-[#7A8079]">
                                Current Page
                            </p>

                            <p className="mt-2 text-2xl font-bold text-[#173024]">
                                {plans.current_page} / {plans.last_page}
                            </p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-2xl border border-[#E6E2D8] bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px]">
                                <thead>
                                    <tr className="border-b border-[#ECE9E1] bg-[#FAF9F6] text-left">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            Plan
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            Investment Range
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            ROI
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            Duration
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            Investors
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-[#ECE9E1]">
                                    {plans.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="px-6 py-16 text-center"
                                            >
                                                <div className="mx-auto max-w-sm">
                                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F1EFE7]">
                                                        <Plus className="h-5 w-5 text-[#173024]" />
                                                    </div>

                                                    <h3 className="font-semibold text-[#173024]">
                                                        No investment plans
                                                        found
                                                    </h3>

                                                    <p className="mt-1 text-sm text-[#7A8079]">
                                                        Create your first
                                                        investment plan to get
                                                        started.
                                                    </p>

                                                    <Link
                                                        href="/admin/plans/create"
                                                        className="mt-5 inline-flex rounded-xl bg-[#173024] px-5 py-3 text-sm font-semibold text-white"
                                                    >
                                                        Create Plan
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        plans.data.map((plan) => (
                                            <tr
                                                key={plan.id}
                                                className="transition hover:bg-[#FCFBF8]"
                                            >
                                                <td className="px-6 py-5">
                                                    <div>
                                                        <p className="font-semibold text-[#173024]">
                                                            {plan.name}
                                                        </p>

                                                        {plan.description && (
                                                            <p className="mt-1 max-w-xs truncate text-sm text-[#7A8079]">
                                                                {
                                                                    plan.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    {plan.category ? (
                                                        <span className="inline-flex rounded-full bg-[#F1EFE7] px-3 py-1 text-xs font-semibold text-[#173024]">
                                                            {
                                                                plan.category
                                                                    .name
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-red-500">
                                                            Uncategorized
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-medium text-[#173024]">
                                                        {formatAmount(
                                                            plan.min_amount,
                                                        )}
                                                    </p>

                                                    <p className="mt-1 text-xs text-[#8A8F87]">
                                                        to{' '}
                                                        {formatAmount(
                                                            plan.max_amount,
                                                        )}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className="font-bold text-[#173024]">
                                                        {
                                                            plan.monthly_roi_percentage
                                                        }
                                                        %
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5 text-sm text-[#5F665F]">
                                                    {plan.duration_months}{' '}
                                                    {plan.duration_months === 1
                                                        ? 'month'
                                                        : 'months'}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-semibold text-[#173024]">
                                                        {
                                                            plan.investments_count
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleStatus(plan)
                                                        }
                                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                                            plan.is_active
                                                                ? 'bg-green-50 text-green-700'
                                                                : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${
                                                                plan.is_active
                                                                    ? 'bg-green-600'
                                                                    : 'bg-gray-400'
                                                            }`}
                                                        />

                                                        {plan.is_active
                                                            ? 'Active'
                                                            : 'Inactive'}
                                                    </button>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link
                                                            href={`/admin/plans/${plan.id}`}
                                                            title="View plan"
                                                            className="rounded-lg p-2 text-[#687068] transition hover:bg-[#F1EFE7] hover:text-[#173024]"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={`/admin/plans/${plan.id}/edit`}
                                                            title="Edit plan"
                                                            className="rounded-lg p-2 text-[#687068] transition hover:bg-[#F1EFE7] hover:text-[#173024]"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            title="Delete plan"
                                                            onClick={() =>
                                                                deletePlan(
                                                                    plan,
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-[#8B6969] transition hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {plans.last_page > 1 && (
                            <div className="flex flex-col gap-3 border-t border-[#ECE9E1] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-[#7A8079]">
                                    Showing {plans.from ?? 0}–{plans.to ?? 0}{' '}
                                    of {plans.total} plans
                                </p>

                                <div className="flex flex-wrap gap-1">
                                    {plans.links.map((link, index) => (
                                        <button
                                            key={index}
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
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className={`rounded-lg px-3 py-2 text-sm ${
                                                link.active
                                                    ? 'bg-[#173024] text-white'
                                                    : 'text-[#687068] hover:bg-[#F1EFE7]'
                                            } disabled:cursor-not-allowed disabled:opacity-40`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}