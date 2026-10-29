import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import {
    ArrowRight,
    Search,
    ShieldCheck,
    ShieldOff,
    Trash2,
    Users as UsersIcon,
} from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    email_verified_at: string | null;
    created_at: string;
    investments_count: number;
    transactions_count: number;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedUsers = {
    data: User[];
    current_page: number;
    last_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
};

type Props = {
    users: PaginatedUsers;
    filters: {
        search?: string;
        admin?: boolean | null;
    };
};

type DialogAction = 'toggle-admin' | 'delete' | null;

export default function Index({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const [dialogAction, setDialogAction] =
        useState<DialogAction>(null);

    const [selectedUser, setSelectedUser] =
        useState<User | null>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/admin/users',
                {
                    search: search || undefined,
                    admin:
                        filters.admin !== null &&
                        filters.admin !== undefined
                            ? filters.admin
                            : undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 350);

        return () => clearTimeout(timeout);
    }, [search]);

    const filterAdmins = (value: boolean | null) => {
        router.get(
            '/admin/users',
            {
                search: search || undefined,
                admin:
                    value === null
                        ? undefined
                        : value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const openToggleAdminDialog = (user: User) => {
        setSelectedUser(user);
        setDialogAction('toggle-admin');
    };

    const openDeleteDialog = (user: User) => {
        setSelectedUser(user);
        setDialogAction('delete');
    };

    const closeDialog = () => {
        if (loading) {
            return;
        }

        setDialogAction(null);
        setSelectedUser(null);
    };

    const confirmAction = () => {
        if (!selectedUser || !dialogAction) {
            return;
        }

        setLoading(true);

        if (dialogAction === 'toggle-admin') {
            router.patch(
                `/admin/users/${selectedUser.id}/toggle-admin`,
                {},
                {
                    preserveScroll: true,
                    onFinish: () => {
                        setLoading(false);
                        setDialogAction(null);
                        setSelectedUser(null);
                    },
                },
            );

            return;
        }

        router.delete(
            `/admin/users/${selectedUser.id}`,
            {
                preserveScroll: true,
                onFinish: () => {
                    setLoading(false);
                    setDialogAction(null);
                    setSelectedUser(null);
                },
            },
        );
    };

    return (
        <>
            <div>
                <Head title="Users" />

                <div className="min-h-screen bg-[#F7F6F1] px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl space-y-6">
                        {/* Header */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="mb-2 flex items-center gap-2 text-sm text-[#7A8079]">
                                    <UsersIcon className="h-4 w-4" />
                                    <span>Administration</span>
                                </div>

                                <h1 className="text-2xl font-semibold tracking-tight text-[#173024]">
                                    Users
                                </h1>

                                <p className="mt-1 text-sm text-[#6B716B]">
                                    Manage platform users and administrator
                                    access.
                                </p>
                            </div>

                            <div className="rounded-xl border border-[#E6E2D8] bg-white px-4 py-3 shadow-sm">
                                <p className="text-xs font-medium uppercase tracking-wide text-[#7A8079]">
                                    Total users
                                </p>

                                <p className="mt-1 text-xl font-semibold text-[#173024]">
                                    {users.total}
                                </p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="rounded-xl border border-[#E6E2D8] bg-white p-4 shadow-sm">
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                <div className="relative w-full lg:max-w-md">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A8079]" />

                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Search by name or email..."
                                        className="w-full rounded-lg border border-[#E4DFD1] bg-[#FCFBF8] py-2.5 pl-10 pr-4 text-sm text-[#173024] outline-none transition placeholder:text-[#9A9E98] focus:border-[#173024] focus:ring-1 focus:ring-[#173024]"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            filterAdmins(null)
                                        }
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                                            filters.admin === null ||
                                            filters.admin === undefined
                                                ? 'bg-[#173024] text-white'
                                                : 'bg-[#F1EFE7] text-[#66736B] hover:bg-[#E9E6DC]'
                                        }`}
                                    >
                                        All
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            filterAdmins(true)
                                        }
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                                            filters.admin === true
                                                ? 'bg-[#173024] text-white'
                                                : 'bg-[#F1EFE7] text-[#66736B] hover:bg-[#E9E6DC]'
                                        }`}
                                    >
                                        Administrators
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            filterAdmins(false)
                                        }
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                                            filters.admin === false
                                                ? 'bg-[#173024] text-white'
                                                : 'bg-[#F1EFE7] text-[#66736B] hover:bg-[#E9E6DC]'
                                        }`}
                                    >
                                        Users
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-hidden rounded-xl border border-[#E6E2D8] bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px] text-left">
                                    <thead className="border-b border-[#E6E2D8] bg-[#FCFBF8]">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                User
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Access
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Activity
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Joined
                                            </th>

                                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#7A8079]">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#EDE9E0]">
                                        {users.data.length > 0 ? (
                                            users.data.map(
                                                (user) => (
                                                    <tr
                                                        key={user.id}
                                                        className="transition hover:bg-[#FCFBF8]"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <Link
                                                                href={`/admin/users/${user.id}`}
                                                                className="group flex items-center gap-3"
                                                            >
                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF0EB] text-sm font-semibold text-[#173024]">
                                                                    {user.name
                                                                        .charAt(
                                                                            0,
                                                                        )
                                                                        .toUpperCase()}
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <p className="truncate font-medium text-[#173024] group-hover:underline">
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </p>

                                                                    <p className="truncate text-sm text-[#7A8079]">
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            {user.is_admin ? (
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2EA] px-2.5 py-1 text-xs font-medium text-[#2E6540]">
                                                                    <ShieldCheck className="h-3.5 w-3.5" />
                                                                    Administrator
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center rounded-full bg-[#F1EFE7] px-2.5 py-1 text-xs font-medium text-[#66736B]">
                                                                    User
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-[#66736B]">
                                                                <span className="font-medium text-[#173024]">
                                                                    {
                                                                        user.investments_count
                                                                    }
                                                                </span>{' '}
                                                                investments
                                                            </div>

                                                            <div className="mt-1 text-xs text-[#8A8F89]">
                                                                {
                                                                    user.transactions_count
                                                                }{' '}
                                                                transactions
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-[#66736B]">
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
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <Link
                                                                    href={`/admin/users/${user.id}`}
                                                                    className="rounded-lg p-2 text-[#66736B] transition hover:bg-[#F1EFE7] hover:text-[#173024]"
                                                                    title="View user"
                                                                >
                                                                    <ArrowRight className="h-4 w-4" />
                                                                </Link>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        openToggleAdminDialog(
                                                                            user,
                                                                        )
                                                                    }
                                                                    className="rounded-lg p-2 text-[#66736B] transition hover:bg-[#F1EFE7] hover:text-[#173024]"
                                                                    title={
                                                                        user.is_admin
                                                                            ? 'Remove administrator access'
                                                                            : 'Make administrator'
                                                                    }
                                                                >
                                                                    {user.is_admin ? (
                                                                        <ShieldOff className="h-4 w-4" />
                                                                    ) : (
                                                                        <ShieldCheck className="h-4 w-4" />
                                                                    )}
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        openDeleteDialog(
                                                                            user,
                                                                        )
                                                                    }
                                                                    className="rounded-lg p-2 text-[#8B4A4A] transition hover:bg-[#F9ECEC]"
                                                                    title="Delete user"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-6 py-16 text-center"
                                                >
                                                    <UsersIcon className="mx-auto h-10 w-10 text-[#B5B8B2]" />

                                                    <p className="mt-3 font-medium text-[#173024]">
                                                        No users found
                                                    </p>

                                                    <p className="mt-1 text-sm text-[#7A8079]">
                                                        Try adjusting your
                                                        search or filters.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {users.last_page > 1 && (
                                <div className="flex flex-col gap-3 border-t border-[#E6E2D8] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm text-[#7A8079]">
                                        Showing {users.from} to {users.to} of{' '}
                                        {users.total} users
                                    </p>

                                    <div className="flex flex-wrap gap-1">
                                        {users.links.map(
                                            (link, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    disabled={!link.url}
                                                    onClick={() => {
                                                        if (link.url) {
                                                            router.get(
                                                                link.url,
                                                                {},
                                                                {
                                                                    preserveState:
                                                                        true,
                                                                    preserveScroll:
                                                                        true,
                                                                },
                                                            );
                                                        }
                                                    }}
                                                    className={`rounded-lg px-3 py-1.5 text-sm transition ${
                                                        link.active
                                                            ? 'bg-[#173024] text-white'
                                                            : link.url
                                                              ? 'text-[#66736B] hover:bg-[#F1EFE7]'
                                                              : 'cursor-not-allowed text-[#C1C3BE]'
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationDialog
                open={
                    dialogAction !== null &&
                    selectedUser !== null
                }
                title={
                    dialogAction === 'delete'
                        ? 'Delete user'
                        : selectedUser?.is_admin
                          ? 'Remove administrator access'
                          : 'Grant administrator access'
                }
                description={
                    dialogAction === 'delete'
                        ? `You are about to permanently delete ${selectedUser?.name}. This action cannot be undone.`
                        : selectedUser?.is_admin
                          ? `Remove administrator access from ${selectedUser?.name}? They will no longer be able to access the administrator area.`
                          : `Grant administrator access to ${selectedUser?.name}? They will gain access to the administrator area.`
                }
                confirmText={
                    dialogAction === 'delete'
                        ? 'Delete User'
                        : selectedUser?.is_admin
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