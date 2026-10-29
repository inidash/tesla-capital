import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

interface Props {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        description: '',
        min_amount: '',
        max_amount: '',
        monthly_roi_percentage: '',
        duration_months: '',
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/admin/plans');
    };

    return (
        <div>
            <Head title="Create Investment Plan" />

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
                            Create Investment Plan
                        </h1>

                        <p className="mt-2 text-sm text-[#6B716B]">
                            Configure a new investment opportunity for your
                            investors.
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

                                    <p className="mt-1 text-sm text-[#7A8079]">
                                        Give your investment plan a name and
                                        assign it to a category.
                                    </p>
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
                                                </option>
                                            ))}
                                        </select>

                                        {errors.category_id && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.category_id}
                                            </p>
                                        )}

                                        {categories.length === 0 && (
                                            <p className="mt-2 text-xs text-amber-600">
                                                No active categories are
                                                available. Create a category
                                                first.
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
                                            placeholder="e.g. Premium Growth Plan"
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
                                            placeholder="Describe the investment plan..."
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

                                    <p className="mt-1 text-sm text-[#7A8079]">
                                        Define the investment limits and
                                        expected ROI.
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                            Minimum Investment
                                        </label>

                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8A8F87]">
                                                $
                                            </span>

                                            <input
                                                type="number"
                                                min="1"
                                                step="1"
                                                value={
                                                    data.min_amount
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'min_amount',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="100000"
                                                className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] py-3 pl-9 pr-4 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                            />
                                        </div>

                                        <p className="mt-1 text-xs text-[#8A8F87]">
                                            Enter amount in dollars.
                                        </p>

                                        {errors.min_amount && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.min_amount}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                            Maximum Investment
                                        </label>

                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8A8F87]">
                                                $
                                            </span>

                                            <input
                                                type="number"
                                                min="1"
                                                step="1"
                                                value={
                                                    data.max_amount
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'max_amount',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="5000000"
                                                className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] py-3 pl-9 pr-4 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                            />
                                        </div>

                                        <p className="mt-1 text-xs text-[#8A8F87]">
                                            Must be greater than or equal to
                                            the minimum.
                                        </p>

                                        {errors.max_amount && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.max_amount}
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
                                                    data.monthly_roi_percentage
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'monthly_roi_percentage',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="10"
                                                className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 pr-10 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                            />

                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#8A8F87]">
                                                %
                                            </span>
                                        </div>

                                        {errors.monthly_roi_percentage && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.monthly_roi_percentage}
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
                                                step="1"
                                                value={
                                                    data.duration_months
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'duration_months',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="30"
                                                className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 pr-16 text-sm text-[#173024] outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                            />

                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8A8F87]">
                                                months
                                            </span>
                                        </div>

                                        {errors.duration_months && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.duration_months}
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
                                            Activate this investment plan
                                        </p>

                                        <p className="mt-1 text-sm text-[#7A8079]">
                                            Active plans can be displayed to
                                            investors and used for new
                                            investments.
                                        </p>
                                    </div>
                                </label>

                                {errors.is_active && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.is_active}
                                    </p>
                                )}
                            </section>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Link
                                href="/admin/plans"
                                className="rounded-xl border border-[#DEDACF] bg-white px-6 py-3 text-center text-sm font-semibold text-[#173024] transition hover:bg-[#FAF9F6]"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173024] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#214534] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />

                                {processing
                                    ? 'Creating Plan...'
                                    : 'Create Investment Plan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}