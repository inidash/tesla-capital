
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    Landmark,
    User,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import { show as withdrawalShow } from '@/routes/admin/withdrawals';
import { index as withdrawalsIndex } from '@/routes/admin/withdrawals';

type Transaction = {
    id: number;
    reference: string;
    type: string;
    status: 'pending' | 'successful' | 'failed' | 'reversed';
    amount: number;
    currency: string;
    description?: string | null;
    created_at: string;
    processed_at?: string | null;
    gateway_reference?: string | null;

    gateway_meta?: {
        method?: string;
        account_name?: string;
        account_number?: string;
        bank_name?: string;
        [key: string]: unknown;
    } | null;

    user: {
        id: number;
        name: string;
        email: string;
    };
};

type Props = {
    transaction: Transaction;
};

const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
};

const formatDate = (date: string | null | undefined) => {
    if (!date) return '—';

    return new Date(date).toLocaleString('en-NG', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

const statusConfig = {
    pending: {
        label: 'Pending',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: Clock3,
    },
    successful: {
        label: 'Approved',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: CheckCircle2,
    },
    failed: {
        label: 'Rejected',
        className: 'bg-red-50 text-red-700 border-red-200',
        icon: XCircle,
    },
    reversed: {
        label: 'Reversed',
        className: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: XCircle,
    },
};

export default function Show({ transaction }: Props) {
    const [approveDialogOpen, setApproveDialogOpen] = useState(false);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const status = statusConfig[transaction.status];
    const StatusIcon = status.icon;

    const bankDetails = transaction.gateway_meta ?? {};

    const approveWithdrawal = () => {
        setProcessing(true);

        router.post(
            `/admin/withdrawals/${transaction.reference}/approve`,
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setApproveDialogOpen(false);
                },
            },
        );
    };

    const rejectWithdrawal = () => {
        setProcessing(true);

        router.post(
            `/admin/withdrawals/${transaction.reference}/reject`,
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessing(false);
                    setRejectDialogOpen(false);
                },
            },
        );
    };

    return (
        <>
            <Head title={`Withdrawal ${transaction.reference}`} />

            <div className="min-h-screen bg-[#F7F5EF] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <Link
                                href={withdrawalsIndex().url}
                                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#6B7268] transition hover:text-[#173024]"
                            >
                                <ArrowLeft size={16} />
                                Back to Withdrawals
                            </Link>

                            <h1 className="font-serif text-3xl font-semibold text-[#173024]">
                                Withdrawal Details
                            </h1>

                            <p className="mt-1 text-sm text-[#6B7268]">
                                Review and process this withdrawal request.
                            </p>
                        </div>

                        <div
                            className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${status.className}`}
                        >
                            <StatusIcon size={16} />
                            {status.label}
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

                        {/* Left */}
                        <div className="space-y-6">

                            {/* Amount Card */}
                            <div className="rounded-2xl border border-[#E4DFD5] bg-white p-6">
                                <p className="text-sm font-medium text-[#6B7268]">
                                    Withdrawal Amount
                                </p>

                                <h2 className="mt-2 font-serif text-4xl font-semibold text-[#173024]">
                                    {formatAmount(
                                        transaction.amount,
                                        transaction.currency,
                                    )}
                                </h2>

                                <p className="mt-2 text-sm text-[#6B7268]">
                                    Reference: {transaction.reference}
                                </p>
                            </div>

                            {/* Investor */}
                            <div className="rounded-2xl border border-[#E4DFD5] bg-white p-6">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F5EF] text-[#173024]">
                                        <User size={19} />
                                    </div>

                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-[#173024]">
                                            Investor
                                        </h3>

                                        <p className="text-sm text-[#6B7268]">
                                            Withdrawal account owner
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Name
                                        </p>

                                        <p className="mt-1 font-medium text-[#173024]">
                                            {transaction.user.name}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Email
                                        </p>

                                        <p className="mt-1 text-[#6B7268]">
                                            {transaction.user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bank Details */}
                            <div className="rounded-2xl border border-[#E4DFD5] bg-white p-6">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F5EF] text-[#173024]">
                                        <Landmark size={19} />
                                    </div>

                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-[#173024]">
                                            Withdrawal Destination
                                        </h3>

                                        <p className="text-sm text-[#6B7268]">
                                            Bank account provided by the investor
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Bank Name
                                        </p>

                                        <p className="mt-1 font-medium text-[#173024]">
                                            {bankDetails.bank_name || '—'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Account Name
                                        </p>

                                        <p className="mt-1 font-medium text-[#173024]">
                                            {bankDetails.account_name || '—'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Account Number
                                        </p>

                                        <p className="mt-1 font-medium tracking-wide text-[#173024]">
                                            {bankDetails.account_number
                                                ? `••••${String(bankDetails.account_number).slice(-4)}`
                                                : '—'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Method
                                        </p>

                                        <p className="mt-1 font-medium capitalize text-[#173024]">
                                            {bankDetails.method
                                                ? bankDetails.method.replace('_', ' ')
                                                : 'Bank Transfer'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction Information */}
                            <div className="rounded-2xl border border-[#E4DFD5] bg-white p-6">
                                <h3 className="mb-5 font-serif text-xl font-semibold text-[#173024]">
                                    Transaction Information
                                </h3>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Reference
                                        </p>

                                        <p className="mt-1 break-all text-sm font-medium text-[#173024]">
                                            {transaction.reference}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Gateway Reference
                                        </p>

                                        <p className="mt-1 break-all text-sm text-[#6B7268]">
                                            {transaction.gateway_reference || '—'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Requested
                                        </p>

                                        <p className="mt-1 text-sm text-[#6B7268]">
                                            {formatDate(transaction.created_at)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-[#8A9087]">
                                            Processed
                                        </p>

                                        <p className="mt-1 text-sm text-[#6B7268]">
                                            {formatDate(transaction.processed_at)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="lg:sticky lg:top-6 lg:self-start">
                            <div className="rounded-2xl border border-[#E4DFD5] bg-white p-6">
                                <h3 className="font-serif text-xl font-semibold text-[#173024]">
                                    Withdrawal Action
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[#6B7268]">
                                    Review the bank details carefully before
                                    processing this withdrawal.
                                </p>

                                {transaction.status === 'pending' ? (
                                    <div className="mt-6 space-y-3">

                                        {/* Approve */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setApproveDialogOpen(true)
                                            }
                                            disabled={processing}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173024] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0E1E16] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <CheckCircle2 size={18} />
                                            Approve Withdrawal
                                        </button>

                                        {/* Reject */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setRejectDialogOpen(true)
                                            }
                                            disabled={processing}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <XCircle size={18} />
                                            Reject Withdrawal
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-6 rounded-xl bg-[#F7F5EF] p-4">
                                        <p className="text-sm leading-6 text-[#6B7268]">
                                            This withdrawal has already been
                                            processed and no further action is
                                            available.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* APPROVE DIALOG */}
            <ConfirmationDialog
                open={approveDialogOpen}
                title="Approve Withdrawal?"
                description={`You are about to approve a withdrawal of ${formatAmount(
                    transaction.amount,
                    transaction.currency,
                )} for ${transaction.user.name}. The reserved funds will be permanently deducted from the user's locked balance.`}
                confirmText={
                    processing ? 'Processing...' : 'Approve Withdrawal'
                }
                cancelText="Cancel"
                variant="success"
                onConfirm={approveWithdrawal}
                onCancel={() => {
                    if (!processing) {
                        setApproveDialogOpen(false);
                    }
                }}
            />

            {/* REJECT DIALOG */}
            <ConfirmationDialog
                open={rejectDialogOpen}
                title="Reject Withdrawal?"
                description={`You are about to reject the ${formatAmount(
                    transaction.amount,
                    transaction.currency,
                )} withdrawal request from ${transaction.user.name}. The reserved funds will be returned to the user's available balance.`}
                confirmText={
                    processing ? 'Processing...' : 'Reject Withdrawal'
                }
                cancelText="Cancel"
                variant="danger"
                onConfirm={rejectWithdrawal}
                onCancel={() => {
                    if (!processing) {
                        setRejectDialogOpen(false);
                    }
                }}
            />
        </>
    );
}
