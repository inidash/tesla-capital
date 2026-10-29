import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    CircleDollarSign,
    Pencil,
    User
} from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
};

type Profit = {
    id: number;
    amount: string| number;
    type: string;
    status: string;
    reference: string;
    description: string | null;
    earned_at: string | null;
    available_at: string | null;
    paid_at: string | null;

    user: {
        id: number;
        name: string;
        email: string;
    };

    investment: {
        id: number;
        amount: string | number;
        plan?: {
            name: string;
        };
    };
};

export default function Show({
    profit,
}: {
    profit: Profit;
}) {
    
const currency = (amount: number | string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(Number(amount));
};
    const formatDate = (value: string | null) =>
        value
            ? new Date(value).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
              })
            : '—';

    const cancelProfit = () => {
        if (!confirm('Cancel this profit record?')) {
            return;
        }

        router.delete(
            `/admin/profits/${profit.id}`,
        );
    };

    return (
        <>
            <Head title={`Profit ${profit.reference}`} />

           <div className="min-h-screen bg-[#F6F3EC]">
                <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={'/admin/profits'}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>

                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Profit Details
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                {profit.reference}
                            </p>
                        </div>
                    </div>

                    <Link
                        href={`/admin/profits/${profit.id}/edit`}
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit
                    </Link>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:col-span-2">
                        <p className="text-sm text-gray-500">
                            Profit Amount
                        </p>

                        <p className="mt-2 text-3xl font-semibold text-gray-900">
                            {currency(profit.amount)}
                        </p>

                        <div className="mt-5">
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                                {profit.status}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <CircleDollarSign className="h-6 w-6 text-gray-700" />

                        <p className="mt-4 text-sm text-gray-500">
                            Profit Type
                        </p>

                        <p className="mt-1 font-semibold capitalize text-gray-900">
                            {profit.type}
                        </p>
                    </div>

                </div>
                <div className="grid gap-6 lg:grid-cols-2 my-4">
                    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-500" />

                            <h2 className="font-semibold text-gray-900">
                                Investor
                            </h2>
                        </div>

                        <p className="font-medium text-gray-900">
                            {profit.user.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            {profit.user.email}
                        </p>
                    </section>

                    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <CircleDollarSign className="h-5 w-5 text-gray-500" />

                            <h2 className="font-semibold text-gray-900">
                                Investment
                            </h2>
                        </div>

                        <p className="font-medium text-gray-900">
                            {profit.investment.plan?.name ??
                                'Investment'}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Investment:{' '}
                            {currency(
                                profit.investment.amount,
                            )}
                        </p>
                    </section>
                </div>

                <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <CalendarDays className="h-5 w-5 text-gray-500" />

                        <h2 className="font-semibold text-gray-900">
                            Profit Timeline
                        </h2>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                        <TimelineItem
                            title="Earned"
                            value={formatDate(profit.earned_at)}
                        />

                        <TimelineItem
                            title="Available"
                            value={formatDate(
                                profit.available_at,
                            )}
                        />

                        <TimelineItem
                            title="Paid"
                            value={formatDate(profit.paid_at)}
                        />
                    </div>
                </section>

                {profit.description && (
                    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="font-semibold text-gray-900">
                            Description
                        </h2>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                            {profit.description}
                        </p>
                    </section>
                )}

                {profit.status !== 'cancelled' &&
                    profit.status !== 'paid' && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={cancelProfit}
                                className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                                Cancel Profit
                            </button>
                        </div>
                    )}
                    </div>
            </div>
        </>
    );
}

function TimelineItem({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{title}</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
                {value}
            </p>
        </div>
    );
}