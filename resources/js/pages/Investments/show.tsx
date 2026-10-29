
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    CircleDollarSign,
    Clock3,
    TrendingUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    formatMoney,
    type Investment,
    type InvestmentPlan,
    type Payment,
    type Transaction,
} from '@/types/investment';

interface InvestmentShow extends Investment {
    plan: InvestmentPlan;
    payments: Payment[];
    transactions: Transaction[];
}

interface InvestmentShowProps {
    investment: InvestmentShow;
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function statusLabel(status: Investment['status']) {
    switch (status) {
        case 'active':
            return 'Active';
        case 'matured':
            return 'Matured';
        case 'cancelled':
            return 'Cancelled';
        default:
            return status;
    }
}

function statusClass(status: Investment['status']) {
    switch (status) {
        case 'active':
            return 'bg-green-100 text-green-700';
        case 'matured':
            return 'bg-blue-100 text-blue-700';
        case 'cancelled':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
}

function paymentStatusClass(status: Payment['status']) {
    switch (status) {
        case 'paid':
            return 'bg-green-100 text-green-700';
        case 'approved':
            return 'bg-blue-100 text-blue-700';
        case 'failed':
            return 'bg-red-100 text-red-700';
        case 'skipped':
            return 'bg-gray-100 text-gray-700';
        default:
            return 'bg-yellow-100 text-yellow-700';
    }
}

function transactionStatusClass(status: Transaction['status']) {
    switch (status) {
        case 'successful':
            return 'bg-green-100 text-green-700';
        case 'failed':
            return 'bg-red-100 text-red-700';
        case 'reversed':
            return 'bg-orange-100 text-orange-700';
        default:
            return 'bg-yellow-100 text-yellow-700';
    }
}

function transactionTypeLabel(type: Transaction['type']) {
    switch (type) {
        case 'investment_purchase':
            return 'Investment Purchase';
        case 'roi_payout':
            return 'ROI Payout';
        case 'deposit':
            return 'Deposit';
        case 'withdrawal':
            return 'Withdrawal';
        case 'refund':
            return 'Refund';
        default:
            return type;
    }
}

export default function InvestmentShow({
    investment,
}: InvestmentShowProps) {
    const payments = investment.payments ?? [];
    const transactions = investment.transactions ?? [];

    const paidPayments = payments.filter(
        (payment) => payment.status === 'paid',
    ).length;

    const totalPayments = payments.length;

    const totalRoi = investment.monthly_roi_amount * investment.plan.duration_months;

    const paidRoi = payments
        .filter((payment) => payment.status === 'paid')
        .reduce((total, payment) => total + payment.amount, 0);

    const progress =
        totalPayments > 0
            ? Math.round((paidPayments / totalPayments) * 100)
            : 0;

    const formatCurrency = (amount: number | string) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            }).format(Number(amount));
        };
    return (
        <>
            <Head title={`Investment #${investment.id}`} />

            <div className="min-h-screen bg-[#F6F3EC]">
                <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-4">
                    <div>
                        <Button variant="ghost" asChild className="-ml-3">
                            <Link href="/investments">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Investments
                            </Link>
                        </Button>

                        <div className="mt-2">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight">
                                    {investment.plan.name}
                                </h1>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(
                                        investment.status,
                                    )}`}
                                >
                                    {statusLabel(investment.status)}
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Investment #{investment.id}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Principal
                            </CardTitle>
                            <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(
                                    investment.principal_amount,
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Amount invested
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Monthly ROI
                            </CardTitle>
                            <TrendingUp className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(
                                    investment.monthly_roi_amount,
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {investment.locked_monthly_roi_percentage}% per month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total ROI
                            </CardTitle>
                            <TrendingUp className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(totalRoi)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Over {investment.plan.duration_months} months
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Maturity
                            </CardTitle>
                            <CalendarDays className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatDate(investment.ends_on)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {investment.status === 'active'
                                    ? `${progress}% payout progress`
                                    : statusLabel(investment.status)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Investment details */}
                <Card className='my-4'>
                    <CardHeader>
                        <CardTitle>Investment Details</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Investment Plan
                                </p>
                                <p className="mt-1 font-medium">
                                    {investment.plan.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Duration
                                </p>
                                <p className="mt-1 font-medium">
                                    {investment.plan.duration_months} months
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Start Date
                                </p>
                                <p className="mt-1 font-medium">
                                    {formatDate(investment.starts_on)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Maturity Date
                                </p>
                                <p className="mt-1 font-medium">
                                    {formatDate(investment.ends_on)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Next Payout
                                </p>
                                <p className="mt-1 font-medium">
                                    {formatDate(investment.next_payout_on)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Monthly ROI Rate
                                </p>
                                <p className="mt-1 font-medium">
                                    {investment.locked_monthly_roi_percentage}%
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Monthly ROI Amount
                                </p>
                                <p className="mt-1 font-medium">
                                    {formatCurrency(
                                        investment.monthly_roi_amount,
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Expected ROI
                                </p>
                                <p className="mt-1 font-medium">
                                    {formatCurrency(totalRoi)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>ROI Payment Progress</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Payments completed
                            </span>

                            <span className="font-medium">
                                {paidPayments} / {totalPayments}
                            </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full rounded-full bg-primary transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm text-muted-foreground">
                                    ROI Paid
                                </p>
                                <p className="mt-1 text-xl font-semibold">
                                    {formatCurrency(paidRoi)}
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm text-muted-foreground">
                                    ROI Remaining
                                </p>
                                <p className="mt-1 text-xl font-semibold">
                                    {formatCurrency(Math.max(totalRoi - paidRoi, 0))}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment schedule */}
                <Card className='my-4'>
                    <CardHeader>
                        <CardTitle>ROI Payment Schedule</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {payments.length === 0 ? (
                            <div className="py-8 text-center text-sm text-muted-foreground">
                                No payment schedule is available.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-162.5 text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="px-4 py-3 font-medium">
                                                #
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Due Date
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Amount
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Paid Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {payments.map((payment, index) => (
                                            <tr
                                                key={payment.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-4 py-3">
                                                    {index + 1}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {formatDate(payment.due_on)}
                                                </td>

                                                <td className="px-4 py-3 font-medium">
                                                    {formatCurrency(payment.amount)}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${paymentStatusClass(
                                                            payment.status,
                                                        )}`}
                                                    >
                                                        {payment.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            payment.status.slice(
                                                                1,
                                                            )}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3">
                                                    {payment.paid_at
                                                        ? formatDate(
                                                              payment.paid_at,
                                                          )
                                                        : '—'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Transactions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Investment Transactions</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {transactions.length === 0 ? (
                            <div className="py-8 text-center text-sm text-muted-foreground">
                                No transactions found for this investment.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-187.5 text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="px-4 py-3 font-medium">
                                                Reference
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Type
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Amount
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {transactions.map((transaction) => (
                                            <tr
                                                key={transaction.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-4 py-3 font-mono text-xs">
                                                    {transaction.reference}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {transactionTypeLabel(
                                                        transaction.type,
                                                    )}
                                                </td>

                                                <td className="px-4 py-3 font-medium">
                                                    {formatCurrency(
                                                        transaction.amount,
                                                        // transaction.currency ??
                                                        //     'USD',
                                                    )}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${transactionStatusClass(
                                                            transaction.status,
                                                        )}`}
                                                    >
                                                        {transaction.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            transaction.status.slice(
                                                                1,
                                                            )}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3">
                                                    {formatDate(
                                                        transaction.created_at,
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Timing */}
                <Card className='my-4'>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock3 className="h-5 w-5" />
                            Investment Timeline
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Started
                                </p>
                                <p className="mt-1 font-medium">
                                    {formatDate(investment.starts_on)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Next ROI Payment
                                </p>
                                <p className="mt-1 font-medium">
                                    {formatDate(investment.next_payout_on)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Ends
                                </p>
                                <p className="mt-1 font-medium">
                                    {formatDate(investment.ends_on)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </div>
            </div>
        </>
    );
}