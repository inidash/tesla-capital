import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Layers } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';

interface Plan {
    id: number;
    name: string;
    minimum_amount: number;
    maximum_amount: number;
    roi_percentage: string;
    duration_days: number;
    is_active: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    investment_plans: Plan[];
}

interface Props {
    category: Category;
}

export default function Show({ category }: Props) {
    return (
        <div>
            <Head title={category.name} />

            <div className="min-h-screen bg-[#F7F6F1] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 flex items-center justify-between">
                        <Link
                            href="/admin/investment-categories"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#687068] hover:text-[#173024]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to categories
                        </Link>

                        <Link
                            href={`/admin/investment-categories/${category.id}/edit`}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#173024] px-5 py-3 text-sm font-semibold text-white"
                        >
                            <Edit className="h-4 w-4" />
                            Edit Category
                        </Link>
                    </div>

                    <div className="rounded-2xl border border-[#E6E2D8] bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F1EFE7]">
                                <Layers className="h-6 w-6 text-[#173024]" />
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl font-bold text-[#173024]">
                                        {category.name}
                                    </h1>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            category.is_active
                                                ? 'bg-green-50 text-green-700'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {category.is_active
                                            ? 'Active'
                                            : 'Inactive'}
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-[#8A8F87]">
                                    /{category.slug}
                                </p>

                                {category.description && (
                                    <p className="mt-4 max-w-3xl leading-7 text-[#687068]">
                                        {category.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="mb-4 text-xl font-bold text-[#173024]">
                            Investment Plans
                        </h2>

                        {category.investment_plans.length === 0 ? (
                            <div className="rounded-2xl border border-[#E6E2D8] bg-white p-10 text-center">
                                <p className="font-semibold text-[#173024]">
                                    No plans in this category
                                </p>

                                <p className="mt-1 text-sm text-[#7A8079]">
                                    Investment plans assigned to this category
                                    will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2">
                                {category.investment_plans.map((plan) => (
                                    <Link
                                        key={plan.id}
                                        href={`/admin/plans/${plan.id}`}
                                        className="rounded-2xl border border-[#E6E2D8] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-bold text-[#173024]">
                                                    {plan.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-[#7A8079]">
                                                    {plan.duration_days} days
                                                </p>
                                            </div>

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

                                        <div className="mt-5 grid grid-cols-2 gap-3">
                                            <div className="rounded-xl bg-[#FAF9F6] p-3">
                                                <p className="text-xs text-[#8A8F87]">
                                                    ROI
                                                </p>

                                                <p className="mt-1 font-bold text-[#173024]">
                                                    {
                                                        plan.roi_percentage
                                                    }
                                                    %
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-[#FAF9F6] p-3">
                                                <p className="text-xs text-[#8A8F87]">
                                                    Duration
                                                </p>

                                                <p className="mt-1 font-bold text-[#173024]">
                                                    {plan.duration_days} days
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}