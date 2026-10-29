import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowDownToLine,
    ArrowLeft,
    Building2,
    CheckCircle2,
    Clock3,
    Info,
    Wallet,
} from 'lucide-react';
import { FormEvent } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Withdrawal = {
    id: number;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    description: string | null;
    created_at: string;
};

type Props = {
    balance: number;
    currency: string;
    recentWithdrawals: Withdrawal[];
};

const formatMoney = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

const statusClasses = (status: string) => {
    switch (status) {
        case 'successful':
            return 'bg-emerald-50 text-emerald-700';

        case 'failed':
            return 'bg-red-50 text-red-700';

        case 'reversed':
            return 'bg-gray-100 text-gray-700';

        default:
            return 'bg-amber-50 text-amber-700';
    }
};

export default function Create({
    balance,
    currency,
    recentWithdrawals,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        method: 'bank_transfer',
        account_name: '',
        account_number: '',
        bank_name: '',
    });


    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post('/wallet/withdraw', {
            preserveScroll: true,
        });
    };

    const formatCurrency = (amount: number | string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(Number(amount));
    };

    return (
        <>
            <Head title="Withdraw Funds" />

            <div className="min-h-screen bg-[#F6F3EC] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/dashboard"
                            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#173024] transition hover:opacity-70"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to dashboard
                        </Link>

                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-[#173024]">
                                Withdraw funds
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                                Request a withdrawal from your available
                                investment wallet balance.
                            </p>
                        </div>
                    </div>

                    {/* Balance */}
                    <div className="mb-6 rounded-2xl bg-[#173024] p-6 text-white shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm text-white/65">
                                    Available balance
                                </p>

                                <p className="mt-2 text-3xl font-semibold tracking-tight">
                                    {formatMoney(balance, currency)}
                                </p>

                                <p className="mt-2 text-xs text-white/55">
                                    This is the maximum amount currently
                                    available for withdrawal.
                                </p>
                            </div>

                            <div className="rounded-xl bg-white/10 p-3">
                                <Wallet className="h-6 w-6" />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
                        {/* Form */}
                        <div className="rounded-2xl border border-[#DED8CB] bg-white p-6 shadow-sm sm:p-8">
                            <div className="mb-7">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6F3EC] text-[#173024]">
                                    <ArrowDownToLine className="h-5 w-5" />
                                </div>

                                <h2 className="text-xl font-semibold text-[#173024]">
                                    Withdrawal details
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Enter the bank account where you want your
                                    funds sent.
                                </p>
                            </div>

                            <form
                                onSubmit={submit}
                                className="space-y-6"
                            >
                                {/* Amount */}
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">
                                        Withdrawal amount
                                    </Label>

                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                                            $
                                        </span>

                                        <Input
                                            id="amount"
                                            type="number"
                                            min="1"
                                            step="0.01"
                                            value={data.amount}
                                            onChange={(event) =>
                                                setData(
                                                    'amount',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="0.00"
                                            className="pl-8"
                                        />
                                    </div>

                                    <div className="flex justify-between gap-4 text-xs text-gray-500">
                                        <span>
                                            Minimum withdrawal: $1.00
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    'amount',
                                                    balance.toFixed(2),
                                                )
                                            }
                                            className="font-medium text-[#173024] hover:underline"
                                        >
                                            Withdraw maximum
                                        </button>
                                    </div>

                                    <InputError message={errors.amount} />
                                </div>

                                {/* Method */}
                                <div className="grid gap-2">
                                    <Label>Withdrawal method</Label>

                                    <div className="flex items-center gap-3 rounded-xl border border-[#DED8CB] bg-[#F6F3EC]/50 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#173024]">
                                            <Building2 className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#173024]">
                                                Bank transfer
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Funds will be sent to your
                                                registered bank account.
                                            </p>
                                        </div>
                                    </div>

                                    <InputError message={errors.method} />
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    {/* Account name */}
                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="account_name">
                                            Account name
                                        </Label>

                                        <Input
                                            id="account_name"
                                            value={data.account_name}
                                            onChange={(event) =>
                                                setData(
                                                    'account_name',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Enter account name"
                                        />

                                        <InputError
                                            message={errors.account_name}
                                        />
                                    </div>

                                    {/* Bank */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="bank_name">
                                            Bank name
                                        </Label>

                                        <Input
                                            id="bank_name"
                                            value={data.bank_name}
                                            onChange={(event) =>
                                                setData(
                                                    'bank_name',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Enter bank name"
                                        />

                                        <InputError
                                            message={errors.bank_name}
                                        />
                                    </div>

                                    {/* Account number */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="account_number">
                                            Account number
                                        </Label>

                                        <Input
                                            id="account_number"
                                            inputMode="numeric"
                                            value={data.account_number}
                                            onChange={(event) =>
                                                setData(
                                                    'account_number',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Enter account number"
                                        />

                                        <InputError
                                            message={errors.account_number}
                                        />
                                    </div>
                                </div>

                                {/* Notice */}
                                <div className="flex gap-3 rounded-xl border border-[#DED8CB] bg-[#F6F3EC] p-4">
                                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#173024]" />

                                    <div>
                                        <p className="text-sm font-medium text-[#173024]">
                                            Processing notice
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-600">
                                            Withdrawal requests are reviewed
                                            before funds are released. Your
                                            request will remain pending until
                                            it is processed.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={
                                        processing ||
                                        balance <= 0
                                    }
                                    className="h-11 w-full rounded-xl bg-[#173024] text-white hover:bg-[#0E1E16]"
                                >
                                    {processing
                                        ? 'Submitting request...'
                                        : 'Submit withdrawal request'}
                                </Button>
                            </form>
                        </div>

                        {/* Side information */}
                        <div className="space-y-6">
                            <div className="rounded-2xl border border-[#DED8CB] bg-white p-6 shadow-sm">
                                <h3 className="font-semibold text-[#173024]">
                                    How it works
                                </h3>

                                <div className="mt-5 space-y-5">
                                    <div className="flex gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6F3EC] text-sm font-semibold text-[#173024]">
                                            1
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#173024]">
                                                Submit request
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Enter the amount and bank
                                                details.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6F3EC] text-sm font-semibold text-[#173024]">
                                            2
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#173024]">
                                                Review
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Your request is reviewed and
                                                approved for processing.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6F3EC] text-sm font-semibold text-[#173024]">
                                            3
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-[#173024]">
                                                Funds released
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Approved withdrawals are sent
                                                to the supplied account.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent withdrawals */}
                            <div className="rounded-2xl border border-[#DED8CB] bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-[#173024]">
                                        Recent withdrawals
                                    </h3>

                                    <Link
                                        href="/transactions?type=withdrawal"
                                        className="text-xs font-medium text-[#173024] hover:underline"
                                    >
                                        View all
                                    </Link>
                                </div>

                                <div className="mt-5 space-y-4">
                                    {recentWithdrawals.length > 0 ? (
                                        recentWithdrawals.map(
                                            (withdrawal) => (
                                                <Link
                                                    key={withdrawal.id}
                                                    href={`/transactions/${withdrawal.id}`}
                                                    className="flex items-center justify-between gap-4 rounded-xl border border-[#E8E3D9] p-3 transition hover:bg-[#F6F3EC]"
                                                >
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F6F3EC] text-[#173024]">
                                                            {withdrawal.status ===
                                                            'successful' ? (
                                                                <CheckCircle2 className="h-4 w-4" />
                                                            ) : (
                                                                <Clock3 className="h-4 w-4" />
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-medium text-[#173024]">
                                                                Withdrawal
                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                {new Date(
                                                                    withdrawal.created_at,
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="shrink-0 text-right">
                                                        <p className="text-sm font-semibold text-[#173024]">
                                                            -
                                                            {formatMoney(
                                                                withdrawal.amount /
                                                                    100,
                                                                withdrawal.currency,
                                                            )}
                                                        </p>

                                                        <span
                                                            className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${statusClasses(
                                                                withdrawal.status,
                                                            )}`}
                                                        >
                                                            {
                                                                withdrawal.status
                                                            }
                                                        </span>
                                                    </div>
                                                </Link>
                                            ),
                                        )
                                    ) : (
                                        <div className="py-6 text-center">
                                            <p className="text-sm text-gray-500">
                                                No withdrawal requests yet.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}