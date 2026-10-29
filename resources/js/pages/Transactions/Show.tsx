
import { Head, Link } from '@inertiajs/react';
import {
    ArrowDownLeft,
    ArrowLeft,
    ArrowUpRight,
    CircleDollarSign,
    CreditCard,
    Copy,
    CheckCircle2,
    Clock3,
    RotateCcw,
    TrendingUp,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

import { index as transactionsIndex } from '@/routes/transactions';

interface InvestmentPlan {
    id: number;
    name: string;
}

interface Investment {
    id: number;
    investment_plan_id: number;
    plan?: InvestmentPlan | null;
}

interface Transaction {
    id: number;
    reference: string;
    type: string;
    status: string;
    amount: number;
    currency: string;
    payment_gateway: string | null;
    gateway_reference: string | null;
    gateway_meta?: Record<string, unknown> | null;
    description: string | null;
    processed_at: string | null;
    created_at: string;
    updated_at: string;
    investment?: Investment | null;
}

interface Props {
    transaction: Transaction;
}

function formatType(type: string): string {
    return type
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatAmount(
    amount: number,
    currency: string,
): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

function formatDate(
    date: string | null,
): string {
    if (!date) {
        return '—';
    }

    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(date));
}

function getTypeIcon(type: string) {
    switch (type) {
        case 'deposit':
            return ArrowDownLeft;

        case 'withdrawal':
            return ArrowUpRight;

        case 'investment_purchase':
            return TrendingUp;

        case 'roi_payout':
            return CircleDollarSign;

        case 'refund':
            return RotateCcw;

        default:
            return CreditCard;
    }
}

function getTypeIconClasses(type: string): string {
    switch (type) {
        case 'deposit':
            return 'bg-green-50 text-green-600';

        case 'withdrawal':
            return 'bg-orange-50 text-orange-600';

        case 'investment_purchase':
            return 'bg-indigo-50 text-indigo-600';

        case 'roi_payout':
            return 'bg-blue-50 text-blue-600';

        case 'refund':
            return 'bg-gray-100 text-gray-600';

        default:
            return 'bg-gray-100 text-gray-600';
    }
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

        case 'pending':
            return Clock3;

        case 'failed':
            return XCircle;

        default:
            return RotateCcw;
    }
}

export default function Show({
    transaction,
}: Props) {
    const [copied, setCopied] = useState(false);

    const TypeIcon = getTypeIcon(transaction.type);
    const StatusIcon = getStatusIcon(transaction.status);

    const copyReference = async () => {
        try {
            await navigator.clipboard.writeText(
                transaction.reference,
            );

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            // Clipboard may be unavailable in some browsers.
        }
    };

    return (
        <>
            <Head title="Transaction Details" />

            <div className="p-4 sm:p-6">
                <div className="mx-auto max-w-5xl">
                    {/* Back */}
                    <div className="mb-6">
                        <Link
                            href={transactionsIndex()}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                        >
                            <ArrowLeft size={17} />
                            Back to Transactions
                        </Link>
                    </div>

                    {/* Header card */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-5 py-6 sm:px-8">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getTypeIconClasses(transaction.type)}`}
                                    >
                                        <TypeIcon size={22} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Transaction
                                        </p>

                                        <h1 className="mt-0.5 text-xl font-semibold text-gray-900">
                                            {formatType(
                                                transaction.type,
                                            )}
                                        </h1>
                                    </div>
                                </div>

                                <div
                                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium capitalize ${getStatusClasses(transaction.status)}`}
                                >
                                    <StatusIcon size={16} />
                                    {transaction.status}
                                </div>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="border-b border-gray-200 px-5 py-8 text-center sm:px-8">
                            <p className="text-sm font-medium text-gray-500">
                                Transaction Amount
                            </p>

                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {formatAmount(
                                    transaction.amount,
                                    transaction.currency,
                                )}
                            </p>
                        </div>

                        {/* Details */}
                        <div className="px-5 py-6 sm:px-8">
                            <h2 className="text-base font-semibold text-gray-900">
                                Transaction Details
                            </h2>

                            <div className="mt-5 divide-y divide-gray-100 rounded-lg border border-gray-200">
                                <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="text-sm text-gray-500">
                                        Transaction Reference
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <span className="break-all text-sm font-medium text-gray-900">
                                            {transaction.reference}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={copyReference}
                                            className="shrink-0 rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                                            title="Copy reference"
                                        >
                                            {copied ? (
                                                <CheckCircle2
                                                    size={16}
                                                    className="text-green-600"
                                                />
                                            ) : (
                                                <Copy size={16} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="text-sm text-gray-500">
                                        Transaction Type
                                    </span>

                                    <span className="text-sm font-medium text-gray-900">
                                        {formatType(
                                            transaction.type,
                                        )}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="text-sm text-gray-500">
                                        Currency
                                    </span>

                                    <span className="text-sm font-medium uppercase text-gray-900">
                                        {transaction.currency}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="text-sm text-gray-500">
                                        Created
                                    </span>

                                    <span className="text-sm font-medium text-gray-900">
                                        {formatDate(
                                            transaction.created_at,
                                        )}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="text-sm text-gray-500">
                                        Processed
                                    </span>

                                    <span className="text-sm font-medium text-gray-900">
                                        {formatDate(
                                            transaction.processed_at,
                                        )}
                                    </span>
                                </div>

                                {transaction.payment_gateway && (
                                    <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                        <span className="text-sm text-gray-500">
                                            Payment Gateway
                                        </span>

                                        <span className="text-sm font-medium capitalize text-gray-900">
                                            {
                                                transaction.payment_gateway
                                            }
                                        </span>
                                    </div>
                                )}

                                {transaction.gateway_reference && (
                                    <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                        <span className="text-sm text-gray-500">
                                            Gateway Reference
                                        </span>

                                        <span className="break-all text-sm font-medium text-gray-900">
                                            {
                                                transaction.gateway_reference
                                            }
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Related investment */}
                        {transaction.investment && (
                            <div className="border-t border-gray-200 px-5 py-6 sm:px-8">
                                <h2 className="text-base font-semibold text-gray-900">
                                    Related Investment
                                </h2>

                                <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                Investment
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-900">
                                                {transaction
                                                    .investment
                                                    .plan?.name ??
                                                    `Investment #${transaction.investment.id}`}
                                            </p>
                                        </div>

                                        <TrendingUp
                                            size={20}
                                            className="text-indigo-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {transaction.description && (
                            <div className="border-t border-gray-200 px-5 py-6 sm:px-8">
                                <h2 className="text-base font-semibold text-gray-900">
                                    Description
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    {transaction.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
