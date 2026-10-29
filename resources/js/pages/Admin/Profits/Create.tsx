
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    CircleDollarSign,
    Loader2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

type Investment = {
    id: number;
    principal_amount: string | number;
    status: string;
    started_at: string | null;
    plan?: {
        id: number;
        name: string;
    };
};

type Props = {
    users: User[];
};

type FormData = {
    user_id: string;
    investment_id: string;
    principal_amount: string;
    type: 'profit' | 'bonus' | 'adjustment';
    status: 'pending' | 'available' | 'paid' | 'cancelled';
    description: string;
    earned_at: string;
    available_at: string;
};

const currency = (amount: number | string) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(Number(amount));

export default function Create({ users }: Props) {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [loadingInvestments, setLoadingInvestments] = useState(false);

    const { data, setData, post, processing, errors } =
        useForm<FormData>({
            user_id: '',
            investment_id: '',
            principal_amount: '',
            type: 'profit',
            status: 'pending',
            description: '',
            earned_at: new Date().toISOString().slice(0, 16),
            available_at: '',
        });

    // useEffect(() => {
    //     if (!data.user_id) {
    //         setInvestments([]);
    //         return;
    //     }

    //     setLoadingInvestments(true);
    //     console.log(data)
    //     fetch(
    //         `/admin/users/${data.user_id}/investments`,
    //         {
    //             headers: {
    //                 Accept: 'application/json',
    //             },
    //         },
    //     )
    //         .then(async (response) => {
    //             if (!response.ok) {
    //                 throw new Error(
    //                     'Unable to load investments.',
    //                 );
    //             }

    //             return response.json();
    //         })
    //         .then((result) => {
    //             setInvestments(result);
    //         })
    //         .catch(() => {
    //             setInvestments([]);
    //         })
    //         .finally(() => {
    //             setLoadingInvestments(false);
    //         });
    // }, [data.user_id]);

    useEffect(() => {
    if (!data.user_id) {
        setInvestments([]);
        return;
    }

    setLoadingInvestments(true);

    console.log('Selected user ID:', data.user_id);

    fetch(`/admin/users/${data.user_id}/investments`, {
        headers: {
            Accept: 'application/json',
        },
    })
        .then(async (response) => {
            console.log('Response status:', response.status);

            const result = await response.json();

            console.log('Investment API response:', result);

            if (!response.ok) {
                throw new Error('Unable to load investments.');
            }

            return result;
        })
        .then((result) => {
            console.log('Setting investments:', result);
            setInvestments(result);
        })
        .catch((error) => {
            console.error('Investment loading error:', error);
            setInvestments([]);
        })
        .finally(() => {
            setLoadingInvestments(false);
        });
    }, [data.user_id]);

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        post('/admin/profits');
    };

    const selectedInvestment = investments.find(
        (investment) =>
            String(investment.id) === data.investment_id
    );

    return (
        <>
            <Head title="Add Profit" />

            <div className="min-h-full bg-[#F6F3EC] p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={'/admin/profits'}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Add Profit
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Create a profit record for an investor.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Investor & Investment */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-xl bg-gray-100 p-3">
                                <CircleDollarSign className="h-5 w-5 text-gray-700" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    Investment Details
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Select the investor and investment that
                                    generated this profit.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Investor */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Investor
                                </label>

                                <select
                                    value={data.user_id}
                                    onChange={(event) => {
                                        setData(
                                            'user_id',
                                            event.target.value,
                                        );

                                        setData(
                                            'investment_id',
                                            '',
                                        );
                                    }}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-400"
                                >
                                    <option value="">
                                        Select investor
                                    </option>

                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name} — {user.email}
                                        </option>
                                    ))}
                                </select>

                                {errors.user_id && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.user_id}
                                    </p>
                                )}
                            </div>

                            {/* Investment */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Investment
                                </label>

                                <div className="relative">
                                    <select
                                        value={
                                            data.investment_id
                                        }
                                        disabled={
                                            !data.user_id ||
                                            loadingInvestments
                                        }
                                        onChange={(event) =>
                                            setData(
                                                'investment_id',
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50"
                                    >
                                        <option value="">
                                            {!data.user_id
                                                ? 'Select investor first'
                                                : loadingInvestments
                                                  ? 'Loading investments...'
                                                  : investments.length ===
                                                      0
                                                    ? 'No investments found'
                                                    : 'Select investment'}
                                        </option>

                                        {investments.map(
                                            (investment) => (
                                                <option
                                                    key={
                                                        investment.id
                                                    }
                                                    value={
                                                        investment.id
                                                    }
                                                >
                                                    {investment.plan
                                                        ?.name ??
                                                        'Investment'}{' '}
                                                    —{' '}
                                                    {currency(
                                                        investment.principal_amount,
                                                    )}
                                                </option>
                                            ),
                                        )}
                                    </select>

                                    {loadingInvestments && (
                                        <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
                                    )}
                                </div>

                                {errors.investment_id && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.investment_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Selected Investment */}
                        {selectedInvestment && (
                            <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Investment Plan
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-gray-900">
                                            {selectedInvestment.plan
                                                ?.name ??
                                                'Investment'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Investment Amount
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-gray-900">
                                            {currency(
                                                selectedInvestment.principal_amount,
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Investment Status
                                        </p>

                                        <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                                            {
                                                selectedInvestment.status
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profit Details */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="font-semibold text-gray-900">
                                Profit Details
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Enter the amount and lifecycle status of
                                this profit.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Amount */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Profit Amount
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                        $
                                    </span>

                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={data.principal_amount}
                                        onChange={(event) =>
                                            setData(
                                                'principal_amount',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="0.00"
                                        className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-gray-400"
                                    />
                                </div>

                                {errors.principal_amount && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.principal_amount}
                                    </p>
                                )}
                            </div>

                            {/* Type */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Profit Type
                                </label>

                                <select
                                    value={data.type}
                                    onChange={(event) =>
                                        setData(
                                            'type',
                                            event.target.value as FormData['type'],
                                        )
                                    }
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                                >
                                    <option value="profit">
                                        Investment Profit
                                    </option>

                                    <option value="bonus">
                                        Bonus
                                    </option>

                                    <option value="adjustment">
                                        Adjustment
                                    </option>
                                </select>

                                {errors.type && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.type}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Status
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(event) =>
                                        setData(
                                            'status',
                                            event.target.value as FormData['status'],
                                        )
                                    }
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                                >
                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="available">
                                        Available
                                    </option>

                                    <option value="paid">
                                        Paid
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>
                                </select>

                                {errors.status && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            {/* Earned At */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Earned Date
                                </label>

                                <input
                                    type="datetime-local"
                                    value={data.earned_at}
                                    onChange={(event) =>
                                        setData(
                                            'earned_at',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                                />

                                {errors.earned_at && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.earned_at}
                                    </p>
                                )}
                            </div>

                            {/* Available At */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Available Date
                                </label>

                                <input
                                    type="datetime-local"
                                    value={data.available_at}
                                    onChange={(event) =>
                                        setData(
                                            'available_at',
                                            event.target.value,
                                        )
                                    }
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                                />

                                {errors.available_at && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.available_at}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={(event) =>
                                    setData(
                                        'description',
                                        event.target.value,
                                    )
                                }
                                placeholder="Add a note about this profit..."
                                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                            />

                            {errors.description && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Notice */}
                    <div className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />

                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                Profit reference
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                A unique profit reference will be generated
                                automatically when this record is created.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={'/admin/profits'}
                            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={
                                processing ||
                                !data.user_id ||
                                !data.investment_id
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}

                            {processing
                                ? 'Creating...'
                                : 'Create Profit'}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
}