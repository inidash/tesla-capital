import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import {
    ArrowLeft,
    CalendarDays,
    Mail,
    ShieldCheck,
    ShieldOff,
    Trash2,
} from 'lucide-react';

type Investment = {
    id: number;
    principal_amount: number;
    status: string;
    starts_on: string | null;
    ends_on: string | null;
    plan?: {
        name: string;
    } | null;
};

type Transaction = {
    id: number;
    reference: string;
    type: string;
    status: string;
    amount: number;
    currency: string;
    description: string | null;
    created_at: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    email_verified_at: string | null;
    created_at: string;
    wallet?: {
        available_balance: number;
        currency: string;
    } | null;
    investments: Investment[];
    transactions: Transaction[];
};

type Props = {
    user: User;
};

type DialogAction = 'toggle-admin' | 'delete' | null;

const formatMoney = (
    amount: number,
    currency = 'USD',
) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};

const statusClasses = (status: string) => {
    switch (status) {
        case 'successful':
        case 'active':
        case 'matured':
            return 'bg-[#E8F2EA] text-[#2E6540]';

        case 'pending':
            return 'bg-[#FFF4DD] text-[#8A641F]';

        case 'failed':
        case 'cancelled':
            return 'bg-[#F9ECEC] text-[#8B4A4A]';

        case 'reversed':
            return 'bg-[#EEF0F2] text-[#5F6870]';

        default:
            return 'bg-[#F1EFE7] text-[#66736B]';
    }
};

export default function Show({ user }: Props) {
    const [dialogAction, setDialogAction] =
        useState<DialogAction>(null);

    const [loading, setLoading] = useState(false);

    const closeDialog = () => {
        if (loading) {
            return;
        }

        setDialogAction(null);
    };

    const confirmAction = () => {
        if (!dialogAction) {
            return;
        }

        setLoading(true);

        if (dialogAction === 'toggle-admin') {
            router.patch(
                `/admin/users/${user.id}/toggle-admin`,
                {},
                {
                    preserveScroll: true,
                    onFinish: () => {
                        setLoading(false);
                        setDialogAction(null);
                    },
                },
            );

            return;
        }

        router.delete(
            `/admin/users/${user.id}`,
            {
                onFinish: () => {
                    setLoading(false);
                    setDialogAction(null);
                },
            },
        );
    };

    return (
        <>
            <div>
                <Head title={user.name} />

                <div className="min-h-screen bg-[#F7F6F1] px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl space-y-6">
                        {/* Back */}
                        <Link
                            href="/admin/users"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#66736B] transition hover:text-[#173024]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to users
                        </Link>

                        {/* Profile */}
                        <div className="rounded-xl border border-[#E6E2D8] bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EAF0EB] text-xl font-semibold text-[#173024]">
                                        {user.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h1 className="text-2xl font-semibold text-[#173024]">
                                                {user.name}
                                            </h1>

                                            {user.is_admin && (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2EA] px-2.5 py-1 text-xs font-medium text-[#2E6540]">
                                                    <ShieldCheck className="h-3.5 w-3.5" />
                                                    Administrator
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#7A8079]">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Mail className="h-4 w-4" />
                                                {user.email}
                                            </span>

                                            <span className="inline-flex items-center gap-1.5">
                                                <CalendarDays className="h-4 w-4" />
                                                Joined{' '}
                                                {new Date(
                                                    user.created_at,
                                                ).toLocaleDateString(
                                                    'en-US',
                                                    {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    },
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDialogAction(
                                                'toggle-admin',
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-lg border border-[#E4DFD1] bg-white px-4 py-2.5 text-sm font-medium text-[#173024] transition hover:bg-[#F1EFE7]"
                                    >
                                        {user.is_admin ? (
                                            <>
                                                <ShieldOff className="h-4 w-4" />
                                                Remove Admin
                                            </>
                                        ) : (
                                            <>
                                                <ShieldCheck className="h-4 w-4" />
                                                Make Admin
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDialogAction('delete')
                                        }
                                        className="inline-flex items-center gap-2 rounded-lg bg-[#8B4A4A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#763D3D]"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete User
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                                <p className="text-sm text-[#7A8079]">
                                    Wallet Balance
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-[#173024]">
                                    {user.wallet
                                        ? formatMoney(
                                              user.wallet.available_balance,
                                              user.wallet.currency,
                                          )
                                        : '$0.00'}
                                </p>
                            </div>

                            <div className="rounded-xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                                <p className="text-sm text-[#7A8079]">
                                    Investments
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-[#173024]">
                                    {user.investments.length}
                                </p>
                            </div>

                            <div className="rounded-xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                                <p className="text-sm text-[#7A8079]">
                                    Transactions
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-[#173024]">
                                    {user.transactions.length}
                                </p>
                            </div>

                            <div className="rounded-xl border border-[#E6E2D8] bg-white p-5 shadow-sm">
                                <p className="text-sm text-[#7A8079]">
                                    Verification
                                </p>

                                <p className="mt-2 text-sm font-medium text-[#173024]">
                                    {user.email_verified_at
                                        ? 'Email verified'
                                        : 'Email not verified'}
                                </p>
                            </div>
                        </div>

                        {/* Investments */}
                        <div className="rounded-xl border border-[#E6E2D8] bg-white shadow-sm">
                            <div className="border-b border-[#E6E2D8] px-6 py-4">
                                <h2 className="font-semibold text-[#173024]">
                                    Investments
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px] text-left">
                                    <thead className="bg-[#FCFBF8]">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Plan
                                            </th>

                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Amount
                                            </th>

                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Status
                                            </th>

                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Started
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#EDE9E0]">
                                        {user.investments.length > 0 ? (
                                            user.investments.map(
                                                (investment) => (
                                                    <tr
                                                        key={investment.id}
                                                        className="transition hover:bg-[#FCFBF8]"
                                                    >
                                                        <td className="px-6 py-4 font-medium text-[#173024]">
                                                            {investment.plan
                                                                ?.name ?? '—'}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-[#66736B]">
                                                            {formatMoney(
                                                                investment.principal_amount,
                                                            )}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClasses(
                                                                    investment.status,
                                                                )}`}
                                                            >
                                                                {
                                                                    investment.status
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-[#66736B]">
                                                            {investment.starts_on
                                                                ? new Date(
                                                                      investment.starts_on,
                                                                  ).toLocaleDateString(
                                                                      'en-US',
                                                                  )
                                                                : '—'}
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-10 text-center text-sm text-[#7A8079]"
                                                >
                                                    No investments found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Transactions */}
                        <div className="rounded-xl border border-[#E6E2D8] bg-white shadow-sm">
                            <div className="border-b border-[#E6E2D8] px-6 py-4">
                                <h2 className="font-semibold text-[#173024]">
                                    Recent Transactions
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px] text-left">
                                    <thead className="bg-[#FCFBF8]">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Reference
                                            </th>

                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Type
                                            </th>

                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Amount
                                            </th>

                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Status
                                            </th>

                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#EDE9E0]">
                                        {user.transactions.length > 0 ? (
                                            user.transactions.map(
                                                (transaction) => (
                                                    <tr
                                                        key={transaction.id}
                                                        className="transition hover:bg-[#FCFBF8]"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <p className="font-medium text-[#173024]">
                                                                {
                                                                    transaction.reference
                                                                }
                                                            </p>

                                                            {transaction.description && (
                                                                <p className="mt-1 max-w-xs truncate text-xs text-[#8A8F89]">
                                                                    {
                                                                        transaction.description
                                                                    }
                                                                </p>
                                                            )}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm capitalize text-[#66736B]">
                                                            {transaction.type.replace(
                                                                /_/g,
                                                                ' ',
                                                            )}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm font-medium text-[#173024]">
                                                            {formatMoney(
                                                                transaction.amount,
                                                                transaction.currency,
                                                            )}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClasses(
                                                                    transaction.status,
                                                                )}`}
                                                            >
                                                                {
                                                                    transaction.status
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-[#66736B]">
                                                            {new Date(
                                                                transaction.created_at,
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                            )}
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-6 py-10 text-center text-sm text-[#7A8079]"
                                                >
                                                    No transactions found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationDialog
                open={dialogAction !== null}
                title={
                    dialogAction === 'delete'
                        ? 'Delete user'
                        : user.is_admin
                          ? 'Remove administrator access'
                          : 'Grant administrator access'
                }
                description={
                    dialogAction === 'delete'
                        ? `You are about to permanently delete ${user.name}. This action cannot be undone.`
                        : user.is_admin
                          ? `Remove administrator access from ${user.name}? They will no longer be able to access the administrator area.`
                          : `Grant administrator access to ${user.name}? They will gain access to the administrator area.`
                }
                confirmText={
                    dialogAction === 'delete'
                        ? 'Delete User'
                        : user.is_admin
                          ? 'Remove Admin'
                          : 'Make Admin'
                }
                cancelText="Cancel"
                variant={
                    dialogAction === 'delete'
                        ? 'danger'
                        : 'primary'
                }
                loading={loading}
                onConfirm={confirmAction}
                onCancel={closeDialog}
            />
        </>
    );
}