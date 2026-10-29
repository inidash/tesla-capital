import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
}

interface Props {
    category: Category;
}

export default function Edit({ category }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name,
        description: category.description ?? '',
        is_active: category.is_active,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(`/admin/investment-categories/${category.id}`);
    };

    return (
        <div>
            <Head title={`Edit ${category.name}`} />

            <div className="min-h-screen bg-[#F7F6F1] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <Link
                        href="/admin/investment-categories"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#687068] hover:text-[#173024]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to categories
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#173024]">
                            Edit Category
                        </h1>

                        <p className="mt-2 text-sm text-[#6B716B]">
                            Update the category information.
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="rounded-2xl border border-[#E6E2D8] bg-white p-6 shadow-sm sm:p-8"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#173024]">
                                    Category Name
                                </label>

                                <input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 text-sm outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                />

                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
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
                                    className="w-full resize-none rounded-xl border border-[#DEDACF] bg-[#FAF9F6] px-4 py-3 text-sm outline-none focus:border-[#173024] focus:ring-2 focus:ring-[#173024]/10"
                                />

                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E6E2D8] bg-[#FAF9F6] p-4">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData(
                                            'is_active',
                                            e.target.checked,
                                        )
                                    }
                                    className="h-4 w-4 rounded border-gray-300"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-[#173024]">
                                        Active category
                                    </p>

                                    <p className="text-xs text-[#7A8079]">
                                        Allow this category to be used for
                                        active investment plans.
                                    </p>
                                </div>
                            </label>
                        </div>

                        <div className="mt-8 flex justify-end gap-3 border-t border-[#ECE9E1] pt-6">
                            <Link
                                href="/admin/investment-categories"
                                className="rounded-xl border border-[#DEDACF] px-5 py-3 text-sm font-semibold text-[#173024]"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#173024] px-6 py-3 text-sm font-semibold text-white hover:bg-[#214534] disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />

                                {processing
                                    ? 'Saving...'
                                    : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}