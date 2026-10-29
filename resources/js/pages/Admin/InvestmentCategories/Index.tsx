import { Head, Link, router } from '@inertiajs/react';
import {
    Edit,
    Eye,
    FolderPlus,
    MoreHorizontal,
    Power,
    Search,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    investment_plans_count: number;
    created_at: string;
}

interface Props {
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        search?: string;
        status?: string;
    };
}

export default function Index({ categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();

        router.get(
            '/admin/investment-categories',
            {
                search: search || undefined,
                status: filters.status || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const toggleStatus = (category: Category) => {
        router.patch(
            `/admin/investment-categories/${category.id}/toggle-status`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const deleteCategory = (category: Category) => {
        if (category.investment_plans_count > 0) {
            alert(
                'This category cannot be deleted because it contains investment plans.',
            );
            return;
        }

        if (
            confirm(
                `Are you sure you want to delete "${category.name}"?`,
            )
        ) {
            router.delete(
                `/admin/investment-categories/${category.id}`,
                {
                    preserveScroll: true,
                },
            );
        }
    };

    return (
        <div>
            <Head title="Investment Categories" />

            <div className="min-h-screen bg-[#F7F6F1] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <p className="mb-1 text-sm font-medium text-[#8A8F87]">
                                Investment Management
                            </p>

                            <h1 className="text-2xl font-bold tracking-tight text-[#173024] sm:text-3xl">
                                Plan Categories
                            </h1>

                            <p className="mt-2 text-sm text-[#6B716B]">
                                Organize your investment plans into categories.
                            </p>
                        </div>

                        <Link
                            href="/admin/investment-categories/create"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173024] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#214534]"
                        >
                            <FolderPlus className="h-4 w-4" />
                            New Category
                        </Link>
                    </div>

                    {/* Search / Filters */}
                    <div className="mb-6 rounded-2xl border border-[#E6E2D8] bg-white p-4 shadow-sm">
                        <form
                            onSubmit={submitSearch}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8F87]" />

                                <input
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search categories..."
                                    className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] py-3 pl-10 pr-4 text-sm text-[#173024] outline-none transition focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                />
                            </div>

                            <select
                                value={filters.status ?? ''}
                                onChange={(e) =>
                                    router.get(
                                        '/admin/investment-categories',
                                        {
                                            search:
                                                search || undefined,
                                            status:
                                                e.target.value ||
                                                undefined,
                                        },
                                        {
                                            preserveState: true,
                                            replace: true,
                                        },
                                    )
                                }
                                className="rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 text-sm text-[#173024] outline-none focus:border-[#173024]"
                            >
                                <option value="">All statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            <button
                                type="submit"
                                className="rounded-xl bg-[#173024] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#214534]"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-2xl border border-[#E6E2D8] bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-[#ECE9E1] bg-[#FAF9F6] text-left">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#7A8079]">
                                            Plans
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
                                    {categories.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-16 text-center"
                                            >
                                                <div className="mx-auto max-w-sm">
                                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F1EFE7]">
                                                        <FolderPlus className="h-5 w-5 text-[#173024]" />
                                                    </div>

                                                    <h3 className="font-semibold text-[#173024]">
                                                        No categories found
                                                    </h3>

                                                    <p className="mt-1 text-sm text-[#7A8079]">
                                                        Create your first
                                                        investment category to
                                                        get started.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.data.map((category) => (
                                            <tr
                                                key={category.id}
                                                className="transition hover:bg-[#FCFBF8]"
                                            >
                                                <td className="px-6 py-5">
                                                    <div>
                                                        <p className="font-semibold text-[#173024]">
                                                            {category.name}
                                                        </p>

                                                        <p className="mt-1 text-xs text-[#8A8F87]">
                                                            /{category.slug}
                                                        </p>

                                                        {category.description && (
                                                            <p className="mt-1 max-w-md truncate text-sm text-[#6B716B]">
                                                                {
                                                                    category.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className="rounded-full bg-[#F1EFE7] px-3 py-1 text-sm font-medium text-[#173024]">
                                                        {
                                                            category.investment_plans_count
                                                        }{' '}
                                                        {category.investment_plans_count ===
                                                        1
                                                            ? 'plan'
                                                            : 'plans'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleStatus(
                                                                category,
                                                            )
                                                        }
                                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                                            category.is_active
                                                                ? 'bg-green-50 text-green-700'
                                                                : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${
                                                                category.is_active
                                                                    ? 'bg-green-600'
                                                                    : 'bg-gray-400'
                                                            }`}
                                                        />

                                                        {category.is_active
                                                            ? 'Active'
                                                            : 'Inactive'}
                                                    </button>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/admin/investment-categories/${category.id}`}
                                                            className="rounded-lg p-2 text-[#687068] transition hover:bg-[#F1EFE7] hover:text-[#173024]"
                                                            title="View"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>

                                                        <Link
                                                            href={`/admin/investment-categories/${category.id}/edit`}
                                                            className="rounded-lg p-2 text-[#687068] transition hover:bg-[#F1EFE7] hover:text-[#173024]"
                                                            title="Edit"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteCategory(
                                                                    category,
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-[#8B6969] transition hover:bg-red-50 hover:text-red-600"
                                                            title="Delete"
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
                        {categories.last_page > 1 && (
                            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ECE9E1] px-6 py-4">
                                <p className="text-sm text-[#7A8079]">
                                    Page {categories.current_page} of{' '}
                                    {categories.last_page}
                                </p>

                                <div className="flex gap-1">
                                    {categories.links.map((link, index) => (
                                        <button
                                            key={index}
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url &&
                                                router.get(
                                                    link.url,
                                                    {},
                                                    {
                                                        preserveState: true,
                                                    },
                                                )
                                            }
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