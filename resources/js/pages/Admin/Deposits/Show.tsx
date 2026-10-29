import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    CreditCard,
    User,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

import ConfirmationDialog from '@/components/admin/confirmation-dialog';

interface UserData {
    id: number;
    name: string;
    email: string;
}

interface Transaction {
    id: number;
    reference: string;
    status: string;
    gateway_reference: string | null;
    payment_gateway: string | null;
    processed_at: string | null;
    created_at: string;
}

interface Deposit {
    id: number;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    payment_gateway: string | null;
    description: string | null;
    processed_at: string | null;
    created_at: string;
    user: UserData;
    transaction: Transaction;
}

interface Props {
    deposit: Deposit;
}

const formatMoney = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};

const formatDate = (date: string | null) => {
    if (!date) {
        return '—';
    }

    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};

const statusClasses = (status: string) => {
    switch (status) {
        case 'successful':
            return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';

        case 'failed':
            return 'bg-red-50 text-red-700 ring-red-600/20';

        default:
            return 'bg-amber-50 text-amber-700 ring-amber-600/20';
    }
};

export default function Show({ deposit }: Props) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const isPending = deposit.status === 'pending';

    const confirmDeposit = () => {
        setProcessing(true);

        router.patch(
            `/admin/deposits/${deposit.id}/confirm`,
            {},
            {
                preserveScroll: true,

                onSuccess: () => {
                    setConfirmOpen(false);
                },

                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    const rejectDeposit = () => {
        setProcessing(true);

        router.patch(
            `/admin/deposits/${deposit.id}/reject`,
            {},
            {
                preserveScroll: true,

                onSuccess: () => {
                    setRejectOpen(false);
                },

                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <>
            <Head title={`Deposit ${deposit.reference}`} />

            <div className="p-6">
                <div className="mx-auto max-w-5xl space-y-6">

                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <Link
                                href="/admin/deposits"
                                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to deposits
                            </Link>

                            <h1 className="text-2xl font-semibold text-gray-900">
                                Deposit Details
                            </h1>

                            <p className="mt-1 font-mono text-xs text-gray-500">
                                {deposit.reference}
                            </p>
                        </div>

                        <span
                            className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-inset ${statusClasses(
                                deposit.status,
                            )}`}
                        >
                            {deposit.status
                                .charAt(0)
                                .toUpperCase() +
                                deposit.status.slice(1)}
                        </span>
                    </div>

                    {/* Pending actions */}
                    {isPending && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-3">
                                    <Clock3 className="mt-0.5 h-5 w-5 text-amber-600" />

                                    <div>
                                        <h2 className="font-semibold text-amber-900">
                                            Deposit requires confirmation
                                        </h2>

                                        <p className="mt-1 text-sm text-amber-800">
                                            Review the payment details before
                                            confirming. The user's wallet will
                                            only be credited after confirmation.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={() => setRejectOpen(true)}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <XCircle className="h-4 w-4" />
                                        Reject
                                    </button>

                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={() => setConfirmOpen(true)}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        Confirm Deposit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Deposit summary */}
                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* Amount */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Deposit Amount
                            </p>

                            <p className="mt-3 text-3xl font-semibold text-gray-900">
                                {formatMoney(
                                    deposit.amount,
                                    deposit.currency,
                                )}
                            </p>

                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                <CreditCard className="h-4 w-4" />

                                {deposit.payment_gateway ?? 'Transfer'}
                            </div>
                        </div>

                        {/* Investor */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Investor
                            </p>

                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                                    <User className="h-5 w-5 text-indigo-600" />
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {deposit.user.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {deposit.user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Submitted
                            </p>

                            <p className="mt-3 font-medium text-gray-900">
                                {formatDate(deposit.created_at)}
                            </p>

                            <p className="mt-2 text-xs text-gray-500">
                                Processed:{' '}
                                {formatDate(deposit.processed_at)}
                            </p>
                        </div>
                    </div>

                    {/* Deposit information */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="font-semibold text-gray-900">
                                Deposit Information
                            </h2>
                        </div>

                        <div className="grid gap-6 p-6 sm:grid-cols-2">

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Deposit Reference
                                </p>

                                <p className="mt-2 break-all font-mono text-sm text-gray-900">
                                    {deposit.reference}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Payment Gateway
                                </p>

                                <p className="mt-2 text-sm text-gray-900">
                                    {deposit.payment_gateway ?? 'Transfer'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Currency
                                </p>

                                <p className="mt-2 text-sm text-gray-900">
                                    {deposit.currency}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Description
                                </p>

                                <p className="mt-2 text-sm text-gray-900">
                                    {deposit.description ?? '—'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="font-semibold text-gray-900">
                                Transaction
                            </h2>
                        </div>

                        <div className="grid gap-6 p-6 sm:grid-cols-2">

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Transaction Reference
                                </p>

                                <p className="mt-2 break-all font-mono text-sm text-gray-900">
                                    {deposit.transaction.reference}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Transaction Status
                                </p>

                                <span
                                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusClasses(
                                        deposit.transaction.status,
                                    )}`}
                                >
                                    {deposit.transaction.status}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Gateway Reference
                                </p>

                                <p className="mt-2 break-all font-mono text-sm text-gray-900">
                                    {deposit.transaction.gateway_reference ??
                                        '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Processed At
                                </p>

                                <p className="mt-2 text-sm text-gray-900">
                                    {formatDate(
                                        deposit.transaction.processed_at,
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Dialog */}
            <ConfirmationDialog
                open={confirmOpen}
                title="Confirm Deposit"
                description={`Confirm this ${formatMoney(
                    deposit.amount,
                    deposit.currency,
                )} deposit from ${deposit.user.name}? The amount will be credited to the user's available wallet balance and the transaction will be marked successful.`}
                confirmText="Confirm Deposit"
                cancelText="Cancel"
                variant="success"
                onConfirm={confirmDeposit}
                onCancel={() => setConfirmOpen(false)}
                processing={processing}
            />

            {/* Reject Dialog */}
            <ConfirmationDialog
                open={rejectOpen}
                title="Reject Deposit"
                description={`Are you sure you want to reject this ${formatMoney(
                    deposit.amount,
                    deposit.currency,
                )} deposit from ${deposit.user.name}? The user's wallet will not be credited.`}
                confirmText="Reject Deposit"
                cancelText="Cancel"
                variant="danger"
                onConfirm={rejectDeposit}
                onCancel={() => setRejectOpen(false)}
                processing={processing}
            />
        </>
    );
}