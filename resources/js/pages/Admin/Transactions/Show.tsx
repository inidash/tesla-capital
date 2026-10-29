import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowDownLeft,
    ArrowUpRight,
    CalendarDays,
    CreditCard,
    Hash,
    User,
} from 'lucide-react';

import { index } from '@/routes/admin/transactions';

interface Transaction {
    id: number;
    reference: string;
    type: string;
    status: string;
    amount: number;
    description?: string | null;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    } | null;
}

interface Props {
    transaction: Transaction;
}

const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(date));

const statusClasses = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
        case 'successful':
        case 'success':
            return 'bg-green-50 text-green-700 ring-green-600/20';

        case 'pending':
            return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';

        case 'failed':
        case 'cancelled':
        case 'rejected':
            return 'bg-red-50 text-red-700 ring-red-600/20';

        default:
            return 'bg-gray-50 text-gray-600 ring-gray-500/20';
    }
};

export default function Show({ transaction }: Props) {
    const isCredit =
        transaction.type.toLowerCase().includes('deposit') ||
        transaction.type.toLowerCase().includes('credit') ||
        transaction.type.toLowerCase().includes('payout') ||
        transaction.type.toLowerCase().includes('roi');

    return (
        <>
            <Head title={`Transaction ${transaction.reference}`} />

            <div className="p-6">
                <div className="mx-auto max-w-5xl">

                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={index()}
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Transactions
                        </Link>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Transaction Details
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Review the details of this transaction.
                                </p>
                            </div>

                            <span
                                className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-medium capitalize ring-1 ring-inset ${statusClasses(
                                    transaction.status,
                                )}`}
                            >
                                {transaction.status}
                            </span>
                        </div>
                    </div>

                    {/* Amount card */}
                    <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                                    {isCredit ? (
                                        <ArrowDownLeft className="h-5 w-5 text-gray-600" />
                                    ) : (
                                        <ArrowUpRight className="h-5 w-5 text-gray-600" />
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Transaction Amount
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                                        {formatMoney(transaction.amount)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* Transaction information */}
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h2 className="font-semibold text-gray-900">
                                        Transaction Information
                                    </h2>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <Hash className="h-4 w-4 text-gray-400" />

                                            <span className="text-sm text-gray-500">
                                                Reference
                                            </span>
                                        </div>

                                        <span className="break-all text-sm font-medium text-gray-900">
                                            {transaction.reference}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="h-4 w-4 text-gray-400" />

                                            <span className="text-sm text-gray-500">
                                                Type
                                            </span>
                                        </div>

                                        <span className="text-sm font-medium capitalize text-gray-900">
                                            {transaction.type}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <CalendarDays className="h-4 w-4 text-gray-400" />

                                            <span className="text-sm text-gray-500">
                                                Created
                                            </span>
                                        </div>

                                        <span className="text-sm font-medium text-gray-900">
                                            {formatDate(
                                                transaction.created_at,
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <CalendarDays className="h-4 w-4 text-gray-400" />

                                            <span className="text-sm text-gray-500">
                                                Last Updated
                                            </span>
                                        </div>

                                        <span className="text-sm font-medium text-gray-900">
                                            {formatDate(
                                                transaction.updated_at,
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {transaction.description && (
                                    <div className="border-t border-gray-200 px-6 py-5">
                                        <p className="text-sm font-medium text-gray-900">
                                            Description
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            {transaction.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User */}
                        <div>
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h2 className="font-semibold text-gray-900">
                                        User
                                    </h2>
                                </div>

                                <div className="p-6">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                                        <User className="h-5 w-5 text-gray-500" />
                                    </div>

                                    <p className="mt-4 font-medium text-gray-900">
                                        {transaction.user?.name ?? 'Unknown User'}
                                    </p>

                                    <p className="mt-1 break-all text-sm text-gray-500">
                                        {transaction.user?.email ?? '—'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}