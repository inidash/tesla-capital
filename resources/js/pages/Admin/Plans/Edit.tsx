import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

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
    minimum_amount: number;
    maximum_amount: number;
    roi_percentage: string | number;
    duration_days: number;
    is_active: boolean;
}

interface Props {
    plan: Plan;
    categories: Category[];
}

export default function Edit({ plan, categories }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        category_id: plan.category_id?.toString() ?? '',
        name: plan.name,
        description: plan.description ?? '',
        minimum_amount: plan.minimum_amount.toString(),
        maximum_amount: plan.maximum_amount.toString(),
        roi_percentage: plan.roi_percentage.toString(),
        duration_days: plan.duration_days.toString(),
        is_active: plan.is_active,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(`/admin/plans/${plan.id}`);
    };

    return (
        <div>
            <Head title={`Edit ${plan.name}`} />

            <div className="min-h-screen bg-[#F7F6F1] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <Link
                        href="/admin/plans"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#687068] hover:text-[#173024]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to plans
                    </Link>

                    <div className="mb-8">
                        <p className="mb-1 text-sm font-medium text-[#8A8F87]">
                            Investment Management
                        </p>

                        <h1 className="text-3xl font-bold text-[#173024]">
                            Edit Investment Plan
                        </h1>

                        <p className="mt-2 text-sm text-[#6B716B]">
                            Update the configuration for {plan.name}.
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <section className="rounded-2xl border border-[#E6E2D8] bg-white p-6 shadow-sm sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-[#173024]">
                                        Basic Information
                                    </h2>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                            Investment Category
                                        </label>

                                        <select
                                            value={data.category_id}
                                            onChange={(e) =>
                                                setData(
                                                    'category_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                        >
                                            <option value="">
                                                Select a category
                                            </option>

                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                    {!category.is_active
                                                        ? ' (Inactive)'
                                                        : ''}
                                                </option>
                                            ))}
                                        </select>

                                        {errors.category_id && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.category_id}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                            Plan Name
                                        </label>

                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                        />

                                        {errors.name && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                            Description
                                        </label>

                                        <textarea
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                            rows={5}
                                            className="w-full resize-none rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                        />

                                        {errors.description && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Financial Configuration */}
                            <section className="rounded-2xl border border-[#E6E2D8] bg-white p-6 shadow-sm sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-[#173024]">
                                        Financial Configuration
                                    </h2>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                            Minimum Investment
                                        </label>

                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8A8F87]">
                                                ₦
                                            </span>

                                            <input
                                                type="number"
                                                min="1"
                                                value={
                                                    data.minimum_amount
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'minimum_amount',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] py-3 pl-9 pr-4 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                            />
                                        </div>

                                        {errors.minimum_amount && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.minimum_amount}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                            Maximum Investment
                                        </label>

                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8A8F87]">
                                                ₦
                                            </span>

                                            <input
                                                type="number"
                                                min="1"
                                                value={
                                                    data.maximum_amount
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'maximum_amount',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] py-3 pl-9 pr-4 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                            />
                                        </div>

                                        {errors.maximum_amount && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.maximum_amount}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                            ROI Percentage
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={
                                                    data.roi_percentage
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'roi_percentage',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 pr-10 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                            />

                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#8A8F87]">
                                                %
                                            </span>
                                        </div>

                                        {errors.roi_percentage && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.roi_percentage}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                            Duration
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="1"
                                                value={
                                                    data.duration_days
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'duration_days',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 pr-16 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                            />

                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8A8F87]">
                                                days
                                            </span>
                                        </div>

                                        {errors.duration_days && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.duration_days}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Status */}
                            <section className="rounded-2xl border border-[#E6E2D8] bg-white p-6 shadow-sm sm:p-8">
                                <label className="flex cursor-pointer items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                'is_active',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-5 w-5 rounded border-gray-300"
                                    />

                                    <div>
                                        <p className="font-semibold text-[#173024]">
                                            Active investment plan
                                        </p>

                                        <p className="mt-1 text-sm text-[#7A8079]">
                                            Investors can use active plans for
                                            new investments.
                                        </p>
                                    </div>
                                </label>
                            </section>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Link
                                href="/admin/plans"
                                className="rounded-xl border border-[#DEDACF] bg-white px-6 py-3 text-center text-sm font-semibold text-[#173024] hover:bg-[#FAF9F6]"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173024] px-7 py-3 text-sm font-semibold text-white hover:bg-[#214534] disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />

                                {processing
                                    ? 'Saving Changes...'
                                    : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}