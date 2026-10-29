
import { Head, Link } from '@inertiajs/react';
import {
    ArrowDownLeft,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    CircleCheck,
    Clock3,
    Eye,
    ReceiptText,
    XCircle,
} from 'lucide-react';

type Investment = {
    id: number;
    plan?: {
        id: number;
        name: string;
    };
};

type Transaction = {
    id: number;
    reference: string;
};

type Payment = {
    id: number;
    amount: number;
    due_on: string | null;
    status: string;
    approved_at: string | null;
    paid_at: string | null;
    investment: Investment;
    transaction: Transaction | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedPayments = {
    data: Payment[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
};


type PaymentStatistics = {
    total: number;
    paid: number;
    pending: number;
    failed: number;
};

type Props = {
    payments: PaginatedPayments;
    statistics: PaymentStatistics;
};

const formatAmount = (amount: number) => {
    return `$${Number(amount).toLocaleString('en-US')}`;
};

const formatDate = (date: string | null) => {
    if (!date) {
        return '—';
    }

    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
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
                icon: CircleCheck,
            };

        case 'pending':
        case 'processing':
            return {
                label: status.charAt(0).toUpperCase() + status.slice(1),
                className:
                    'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
                icon: Clock3,
            };

        case 'failed':
        case 'rejected':
        case 'cancelled':
            return {
                label: status.charAt(0).toUpperCase() + status.slice(1),
                className:
                    'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20',
                icon: XCircle,
            };

        default:
            return {
                label: status.charAt(0).toUpperCase() + status.slice(1),
                className:
                    'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-500/20',
                icon: Clock3,
            };
    }
};
export default function Index({ payments, statistics }: Props) {
    const totalPayments = statistics.total;
    const paidPayments = statistics.paid;
    const pendingPayments = statistics.pending;
    const failedPayments = statistics.failed;

    return (
        <>
            <Head title="Payments" />

            <div className="p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#6B7268]">
                            <ReceiptText className="h-4 w-4" />
                            <span>Financial activity</span>
                        </div>

                        <h1 className="text-3xl font-semibold tracking-tight text-[#173024] sm:text-4xl">
                            Payments
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7268]">
                            View and track payments associated with your
                            investments.
                        </p>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F3EC] text-[#173024]">
                                <ReceiptText className="h-5 w-5" />
                            </div>

                            <span className="text-xs font-medium text-[#6B7268]">
                                Total
                            </span>
                        </div>

                        <p className="mt-5 text-2xl font-semibold text-[#173024]">
                            {totalPayments}
                        </p>

                        <p className="mt-1 text-sm text-[#6B7268]">
                            Payment records
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                <CircleCheck className="h-5 w-5" />
                            </div>

                            <span className="text-xs font-medium text-emerald-700">
                                Completed
                            </span>
                        </div>

                        <p className="mt-5 text-2xl font-semibold text-[#173024]">
                            {paidPayments}
                        </p>

                        <p className="mt-1 text-sm text-[#6B7268]">
                            Paid payments
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                <Clock3 className="h-5 w-5" />
                            </div>

                            <span className="text-xs font-medium text-amber-700">
                                Pending
                            </span>
                        </div>

                        <p className="mt-5 text-2xl font-semibold text-[#173024]">
                            {pendingPayments}
                        </p>

                        <p className="mt-1 text-sm text-[#6B7268]">
                            Awaiting completion
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700">
                                <XCircle className="h-5 w-5" />
                            </div>

                            <span className="text-xs font-medium text-red-700">
                                Unsuccessful
                            </span>
                        </div>

                        <p className="mt-5 text-2xl font-semibold text-[#173024]">
                            {failedPayments}
                        </p>

                        <p className="mt-1 text-sm text-[#6B7268]">
                            Failed or rejected
                        </p>
                    </div>
                </div>

                {/* Payment table */}
                <div className="overflow-hidden rounded-2xl border border-[#E4DFD1] bg-white">
                    <div className="border-b border-[#E4DFD1] px-5 py-5 sm:px-6">
                        <div>
                            <h2 className=" text-xl font-semibold text-[#173024]">
                                Payment history
                            </h2>

                            <p className="mt-1 text-sm text-[#6B7268]">
                                A record of your investment-related payments.
                            </p>
                        </div>
                    </div>

                    {payments.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F6F3EC] text-[#173024]">
                                <ReceiptText className="h-7 w-7" />
                            </div>

                            <h3 className="mt-5  text-xl font-semibold text-[#173024]">
                                No payments yet
                            </h3>

                            <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7268]">
                                Your payment history will appear here once a
                                payment is recorded against one of your
                                investments.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full text-left">
                                    <thead className="border-b border-[#E4DFD1] bg-[#F6F3EC]/60">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                                Investment
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                                Amount
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                                Due date
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                                Status
                                            </th>

                                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#6B7268]">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#E4DFD1]">
                                        {payments.data.map((payment) => {
                                            const status = getStatusConfig(
                                                payment.status,
                                            );

                                            const StatusIcon = status.icon;

                                            return (
                                                <tr
                                                    key={payment.id}
                                                    className="transition-colors hover:bg-[#F6F3EC]/40"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div>
                                                            <p className="font-medium text-[#173024]">
                                                                {payment
                                                                    .investment
                                                                    ?.plan
                                                                    ?.name ??
                                                                    'Investment'}
                                                            </p>

                                                            <p className="mt-1 text-xs text-[#6B7268]">
                                                                Payment #
                                                                {payment.id}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <p className="font-semibold text-[#173024]">
                                                            {formatAmount(
                                                                payment.amount,
                                                            )}
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2 text-sm text-[#6B7268]">
                                                            <CalendarDays className="h-4 w-4" />
                                                            {formatDate(
                                                                payment.due_on,
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
                                                        >
                                                            <StatusIcon className="h-3.5 w-3.5" />
                                                            {status.label}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5 text-right">
                                                        <Link
                                                            href={`/payments/${payment.id}`}
                                                            className="inline-flex items-center gap-2 rounded-xl border border-[#E4DFD1] px-3.5 py-2 text-sm font-medium text-[#173024] transition hover:border-[#173024] hover:bg-[#F6F3EC]"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile cards */}
                            <div className="divide-y divide-[#E4DFD1] md:hidden">
                                {payments.data.map((payment) => {
                                    const status = getStatusConfig(
                                        payment.status,
                                    );

                                    const StatusIcon = status.icon;

                                    return (
                                        <div
                                            key={payment.id}
                                            className="space-y-4 p-5"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="font-medium text-[#173024]">
                                                        {payment.investment
                                                            ?.plan?.name ??
                                                            'Investment'}
                                                    </p>

                                                    <p className="mt-1 text-xs text-[#6B7268]">
                                                        Payment #{payment.id}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
                                                >
                                                    <StatusIcon className="h-3.5 w-3.5" />
                                                    {status.label}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-[#6B7268]">
                                                        Amount
                                                    </p>

                                                    <p className="mt-1 font-semibold text-[#173024]">
                                                        {formatAmount(
                                                            payment.amount,
                                                        )}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-[#6B7268]">
                                                        Due date
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-[#173024]">
                                                        {formatDate(
                                                            payment.due_on,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/payments/${payment.id}`}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E4DFD1] px-4 py-2.5 text-sm font-medium text-[#173024] transition hover:border-[#173024] hover:bg-[#F6F3EC]"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View payment
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {/* Pagination */}
                    {payments.last_page > 1 && (
                        <div className="flex flex-col gap-4 border-t border-[#E4DFD1] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-[#6B7268]">
                                Showing{' '}
                                <span className="font-medium text-[#173024]">
                                    {payments.from ?? 0}
                                </span>{' '}
                                to{' '}
                                <span className="font-medium text-[#173024]">
                                    {payments.to ?? 0}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium text-[#173024]">
                                    {payments.total}
                                </span>{' '}
                                payments
                            </p>

                            <div className="flex items-center gap-1">
                                {payments.links.map((link, index) => {
                                    if (index === 0) {
                                        return link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4DFD1] text-[#173024] transition hover:bg-[#F6F3EC]"
                                                aria-label="Previous page"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Link>
                                        ) : (
                                            <span
                                                key={index}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4DFD1] text-[#C4C0B6]"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </span>
                                        );
                                    }

                                    if (
                                        index ===
                                        payments.links.length - 1
                                    ) {
                                        return link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4DFD1] text-[#173024] transition hover:bg-[#F6F3EC]"
                                                aria-label="Next page"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        ) : (
                                            <span
                                                key={index}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4DFD1] text-[#C4C0B6]"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </span>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url ?? '#'}
                                            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm transition ${
                                                link.active
                                                    ? 'bg-[#173024] font-medium text-white'
                                                    : 'text-[#6B7268] hover:bg-[#F6F3EC] hover:text-[#173024]'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </>
    );
}
