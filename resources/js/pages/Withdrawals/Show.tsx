
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowUpRight,
    Building2,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Copy,
    CreditCard,
    Hash,
    UserRound,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import {
    index as withdrawalsIndex,
} from '@/routes/wallet/withdrawals';

import {
    index as transactionsIndex,
} from '@/routes/transactions';

import {
    index as withdrawalCreate,
} from '@/routes/wallet/withdraw';

interface WithdrawalMeta {
    method?: string;
    account_name?: string;
    account_number?: string;
    bank_name?: string;
}

interface Transaction {
    id: number;
    reference: string;
    type: string;
    status:
        | 'pending'
        | 'successful'
        | 'failed'
        | 'reversed'
        | string;
    amount: number;
    currency: string;
    payment_gateway: string | null;
    gateway_reference: string | null;
    gateway_meta: WithdrawalMeta | null;
    description: string | null;
    processed_at: string | null;
    created_at: string;
}

interface Props {
    transaction: Transaction;
}

function formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount / 100);
}

function formatDate(date: string | null): string {
    if (!date) {
        return '—';
    }

    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(date));
}

function getStatusClasses(status: string): string {
    switch (status) {
        case 'successful':
            return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20';

        case 'pending':
            return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';

        case 'failed':
            return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20';

        case 'reversed':
            return 'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-500/20';

        default:
            return 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/20';
    }
}

function getStatusIcon(status: string) {
    switch (status) {
        case 'successful':
            return CheckCircle2;

        case 'failed':
        case 'reversed':
            return XCircle;

        default:
            return Clock3;
    }
}

function maskAccountNumber(accountNumber?: string): string {
    if (!accountNumber) {
        return '—';
    }

    if (accountNumber.length <= 4) {
        return accountNumber;
    }

    return `•••• ${accountNumber.slice(-4)}`;
}

export default function Show({ transaction }: Props) {
    const [copied, setCopied] = useState(false);

    const meta = transaction.gateway_meta ?? {};
    const StatusIcon = getStatusIcon(transaction.status);

    const copyReference = async () => {
        await navigator.clipboard.writeText(
            transaction.reference,
        );

        setCopied(true);

        window.setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <>
            <Head title="Withdrawal Details" />

            <div className="p-4 sm:p-6">
                <div className="mx-auto max-w-4xl">

                    {/* Back */}
                    <div className="mb-6 flex items-center justify-between">
                        <Link
                            href={withdrawalsIndex().url}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#173024]"
                        >
                            <ArrowLeft size={17} />
                            Back to Withdrawals
                        </Link>

                        <Link
                            href={transactionsIndex().url}
                            className="text-sm font-medium text-gray-500 transition hover:text-[#173024]"
                        >
                            All Transactions
                        </Link>
                    </div>

                    {/* Main card */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                        {/* Header */}
                        <div className="border-b border-gray-200 p-5 sm:p-6">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                        <ArrowUpRight size={22} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Withdrawal
                                        </p>

                                        <h1 className="mt-1 text-2xl font-semibold text-gray-900">
                                            {formatAmount(
                                                transaction.amount,
                                                transaction.currency,
                                            )}
                                        </h1>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {transaction.description ||
                                                'Withdrawal request'}
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium capitalize ${getStatusClasses(
                                        transaction.status,
                                    )}`}
                                >
                                    <StatusIcon size={14} />
                                    {transaction.status}
                                </span>
                            </div>
                        </div>

                        {/* Pending notice */}
                        {transaction.status === 'pending' && (
                            <div className="border-b border-amber-100 bg-amber-50 px-5 py-4 sm:px-6">
                                <div className="flex items-start gap-3">
                                    <Clock3
                                        size={18}
                                        className="mt-0.5 shrink-0 text-amber-600"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-amber-800">
                                            Withdrawal is being processed
                                        </p>

                                        <p className="mt-1 text-sm text-amber-700">
                                            Your requested amount has been
                                            reserved from your available
                                            balance and is awaiting
                                            processing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Successful notice */}
                        {transaction.status === 'successful' && (
                            <div className="border-b border-green-100 bg-green-50 px-5 py-4 sm:px-6">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={18}
                                        className="mt-0.5 shrink-0 text-green-600"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-green-800">
                                            Withdrawal completed
                                        </p>

                                        <p className="mt-1 text-sm text-green-700">
                                            This withdrawal has been
                                            successfully processed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Failed notice */}
                        {transaction.status === 'failed' && (
                            <div className="border-b border-red-100 bg-red-50 px-5 py-4 sm:px-6">
                                <div className="flex items-start gap-3">
                                    <XCircle
                                        size={18}
                                        className="mt-0.5 shrink-0 text-red-600"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-red-800">
                                            Withdrawal was unsuccessful
                                        </p>

                                        <p className="mt-1 text-sm text-red-700">
                                            This withdrawal request could not
                                            be completed. The reserved funds
                                            should be returned to your
                                            available balance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Transaction information */}
                        <div className="p-5 sm:p-6">
                            <h2 className="text-sm font-semibold text-gray-900">
                                Transaction Details
                            </h2>

                            <div className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-200">
                                <div className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <Hash
                                            size={17}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-gray-500">
                                            Reference
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="break-all text-sm font-medium text-gray-900 sm:text-right">
                                            {transaction.reference}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={copyReference}
                                            className="shrink-0 rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                                            title="Copy reference"
                                        >
                                            <Copy size={15} />
                                        </button>

                                        {copied && (
                                            <span className="text-xs text-green-600">
                                                Copied
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <CreditCard
                                            size={17}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-gray-500">
                                            Amount
                                        </span>
                                    </div>

                                    <span className="text-sm font-semibold text-gray-900">
                                        {formatAmount(
                                            transaction.amount,
                                            transaction.currency,
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <CalendarDays
                                            size={17}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-gray-500">
                                            Requested
                                        </span>
                                    </div>

                                    <span className="text-right text-sm text-gray-900">
                                        {formatDate(
                                            transaction.created_at,
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2
                                            size={17}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-gray-500">
                                            Processed
                                        </span>
                                    </div>

                                    <span className="text-right text-sm text-gray-900">
                                        {formatDate(
                                            transaction.processed_at,
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Bank Details */}
                            <h2 className="mt-8 text-sm font-semibold text-gray-900">
                                Withdrawal Destination
                            </h2>

                            <div className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between gap-4 px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <Building2
                                            size={17}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-gray-500">
                                            Bank
                                        </span>
                                    </div>

                                    <span className="text-right text-sm font-medium text-gray-900">
                                        {meta.bank_name || '—'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <UserRound
                                            size={17}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-gray-500">
                                            Account Name
                                        </span>
                                    </div>

                                    <span className="text-right text-sm font-medium text-gray-900">
                                        {meta.account_name || '—'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <CreditCard
                                            size={17}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-gray-500">
                                            Account Number
                                        </span>
                                    </div>

                                    <span className="text-right text-sm font-medium text-gray-900">
                                        {maskAccountNumber(
                                            meta.account_number,
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <ArrowUpRight
                                            size={17}
                                            className="text-gray-400"
                                        />

                                        <span className="text-sm text-gray-500">
                                            Method
                                        </span>
                                    </div>

                                    <span className="text-right text-sm font-medium capitalize text-gray-900">
                                        {meta.method?.replace(
                                            '_',
                                            ' ',
                                        ) || 'Bank Transfer'}
                                    </span>
                                </div>
                            </div>

                            {/* Gateway reference */}
                            {transaction.gateway_reference && (
                                <>
                                    <h2 className="mt-8 text-sm font-semibold text-gray-900">
                                        Processing Information
                                    </h2>

                                    <div className="mt-4 rounded-lg border border-gray-200 px-4 py-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-sm text-gray-500">
                                                Gateway Reference
                                            </span>

                                            <span className="break-all text-right text-sm font-medium text-gray-900">
                                                {
                                                    transaction.gateway_reference
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
