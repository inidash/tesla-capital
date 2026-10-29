
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    Hash,
    ReceiptText,
    WalletCards,
    XCircle,
} from 'lucide-react';

type Investment = {
    id: number;
    principal_amount?: number;
    starts_on?: string | null;
    ends_on?: string | null;
    plan?: {
        id: number;
        name: string;
    };
};

type Transaction = {
    id: number;
    reference: string;
    amount?: number;
    status?: string;
    created_at?: string;
};

type Payment = {
    id: number;
    amount: number;
    due_on: string | null;
    status: string;
    approved_at: string | null;
    paid_at: string | null;
    created_at: string;
    investment: Investment;
    transaction: Transaction | null;
};

type Props = {
    payment: Payment;
};

const formatAmount = (amount: number | undefined) => {
    if (amount === undefined || amount === null) {
        return '—';
    }

    return `$${Number(amount).toLocaleString('en-US')}`;
};

const formatDate = (date: string | null | undefined) => {
    if (!date) {
        return '—';
    }

    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const formatDateTime = (date: string | null | undefined) => {
    if (!date) {
        return '—';
    }

    return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};

const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
        case 'paid':
        case 'completed':
        case 'approved':
            return {
                label: status === 'approved' ? 'Approved' : 'Paid',
                className:
                    'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
                icon: CheckCircle2,
            };

        case 'pending':
        case 'processing':
            return {
                label:
                    status.charAt(0).toUpperCase() + status.slice(1),
                className:
                    'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
                icon: Clock3,
            };

        case 'failed':
        case 'rejected':
        case 'cancelled':
            return {
                label:
                    status.charAt(0).toUpperCase() + status.slice(1),
                className:
                    'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20',
                icon: XCircle,
            };

        default:
            return {
                label:
                    status.charAt(0).toUpperCase() + status.slice(1),
                className:
                    'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-500/20',
                icon: Clock3,
            };
    }
};

export default function Show({ payment }: Props) {
    const status = getStatusConfig(payment.status);
    const StatusIcon = status.icon;

    return (
        <>
            <Head title={`Payment #${payment.id}`} />

            <div className="p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div>
                    <Link
                        href="/payments"
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#6B7268] transition hover:text-[#173024]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to payments
                    </Link>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B7268]">
                                <ReceiptText className="h-4 w-4" />
                                Payment #{payment.id}
                            </div>

                            <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#173024] sm:text-4xl">
                                Payment details
                            </h1>

                            <p className="mt-2 text-sm text-[#6B7268]">
                                Details and status of this investment payment.
                            </p>
                        </div>

                        <span
                            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${status.className}`}
                        >
                            <StatusIcon className="h-4 w-4" />
                            {status.label}
                        </span>
                    </div>
                </div>

                {/* Amount hero */}
                <div className="overflow-hidden rounded-2xl bg-[#173024]">
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-medium text-white/60">
                                    Payment amount
                                </p>

                                <p className="mt-2 font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                                    {formatAmount(payment.amount)}
                                </p>

                                <p className="mt-3 text-sm text-white/60">
                                    {payment.investment?.plan?.name ??
                                        'Investment payment'}
                                </p>
                            </div>

                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                                <WalletCards className="h-8 w-8" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment information */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-[#E4DFD1] bg-white">
                        <div className="border-b border-[#E4DFD1] px-6 py-5">
                            <h2 className="font-serif text-xl font-semibold text-[#173024]">
                                Payment information
                            </h2>
                        </div>

                        <div className="divide-y divide-[#E4DFD1]">
                            <div className="flex items-start gap-4 px-6 py-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F3EC] text-[#173024]">
                                    <Hash className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#6B7268]">
                                        Payment ID
                                    </p>

                                    <p className="mt-1 font-medium text-[#173024]">
                                        #{payment.id}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 px-6 py-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F3EC] text-[#173024]">
                                    <CalendarDays className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#6B7268]">
                                        Due date
                                    </p>

                                    <p className="mt-1 font-medium text-[#173024]">
                                        {formatDate(payment.due_on)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 px-6 py-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F3EC] text-[#173024]">
                                    <CreditCard className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#6B7268]">
                                        Status
                                    </p>

                                    <p className="mt-1 font-medium text-[#173024]">
                                        {status.label}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 px-6 py-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F3EC] text-[#173024]">
                                    <CalendarDays className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#6B7268]">
                                        Payment recorded
                                    </p>

                                    <p className="mt-1 font-medium text-[#173024]">
                                        {formatDateTime(
                                            payment.created_at,
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 px-6 py-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F3EC] text-[#173024]">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#6B7268]">
                                        Paid at
                                    </p>

                                    <p className="mt-1 font-medium text-[#173024]">
                                        {formatDateTime(payment.paid_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investment information */}
                    <div className="rounded-2xl border border-[#E4DFD1] bg-white">
                        <div className="border-b border-[#E4DFD1] px-6 py-5">
                            <h2 className="font-serif text-xl font-semibold text-[#173024]">
                                Investment
                            </h2>
                        </div>

                        <div className="space-y-6 p-6">
                            <div>
                                <p className="text-xs font-medium text-[#6B7268]">
                                    Investment plan
                                </p>

                                <p className="mt-1 text-lg font-semibold text-[#173024]">
                                    {payment.investment?.plan?.name ??
                                        'Investment'}
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-medium text-[#6B7268]">
                                        Investment ID
                                    </p>

                                    <p className="mt-1 font-medium text-[#173024]">
                                        #{payment.investment?.id}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#6B7268]">
                                        Investment amount
                                    </p>

                                    <p className="mt-1 font-medium text-[#173024]">
                                        {formatAmount(
                                            payment.investment?.principal_amount,
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-medium text-[#6B7268]">
                                        Start date
                                    </p>

                                    <p className="mt-1 font-medium text-[#173024]">
                                        {formatDate(
                                            payment.investment?.starts_on,
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#6B7268]">
                                        End date
                                    </p>

                                    <p className="mt-1 font-medium text-[#173024]">
                                        {formatDate(
                                            payment.investment?.ends_on,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction */}
                <div className="rounded-2xl border border-[#E4DFD1] bg-white">
                    <div className="border-b border-[#E4DFD1] px-6 py-5">
                        <h2 className="font-serif text-xl font-semibold text-[#173024]">
                            Transaction
                        </h2>
                    </div>

                    {payment.transaction ? (
                        <div className="grid gap-6 p-6 sm:grid-cols-3">
                            <div>
                                <p className="text-xs font-medium text-[#6B7268]">
                                    Reference
                                </p>

                                <p className="mt-1 break-all font-medium text-[#173024]">
                                    {payment.transaction.reference}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-[#6B7268]">
                                    Transaction amount
                                </p>

                                <p className="mt-1 font-medium text-[#173024]">
                                    {formatAmount(
                                        payment.transaction.amount,
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-[#6B7268]">
                                    Transaction date
                                </p>

                                <p className="mt-1 font-medium text-[#173024]">
                                    {formatDateTime(
                                        payment.transaction.created_at,
                                    )}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 px-6 py-8">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F3EC] text-[#173024]">
                                <ReceiptText className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="font-medium text-[#173024]">
                                    No transaction linked
                                </p>

                                <p className="mt-1 text-sm text-[#6B7268]">
                                    This payment does not have an associated
                                    transaction yet.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Approval information */}
                {payment.approved_at && (
                    <div className="rounded-2xl border border-[#E4DFD1] bg-white">
                        <div className="flex items-start gap-4 p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-medium text-[#173024]">
                                    Payment approved
                                </h3>

                                <p className="mt-1 text-sm text-[#6B7268]">
                                    This payment was approved on{' '}
                                    {formatDateTime(payment.approved_at)}.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </>
    );
}