
import { Head, Link } from '@inertiajs/react';

type DashboardProps = {
    stats?: {
        totalInvestors?: number;
        totalInvestments?: number;
        totalDeposits?: number;
        pendingPayouts?: number;
    };
};

export default function Dashboard({ stats }: DashboardProps) {
    const dashboardStats = [
        // {
        //     label: 'Total Investors',
        //     value: stats?.totalInvestors ?? 0,
        //     href: '/admin/investors',
        // },
        {
            label: 'Total Investments',
            value: stats?.totalInvestments ?? 0,
            href: '/admin/investments',
        },
        {
            label: 'Total Deposits',
            value: stats?.totalDeposits ?? 0,
            href: '/admin/deposits',
        },
        {
            label: 'Pending Payouts',
            value: stats?.pendingPayouts ?? 0,
            href: '/admin/payments',
        },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-[#F7F5EF]">
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-[#8A806E]">
                                Administration
                            </p>

                            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#173024]">
                                Admin Dashboard
                            </h1>

                            <p className="mt-2 text-sm text-[#6F756E]">
                                Manage investors, investment plans and payouts.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/admin/investments"
                                className="rounded-full border border-[#D8D2C5] bg-white px-5 py-2.5 text-sm font-medium text-[#173024] transition hover:bg-[#F0EDE5]"
                            >
                                Investors
                            </Link>

                            <Link
                                href="/admin/plans"
                                className="rounded-full bg-[#173024] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#254536]"
                            >
                                Manage Plans
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {dashboardStats.map((stat) => (
                            <Link
                                key={stat.label}
                                href={stat.href}
                                className="group rounded-2xl border border-[#E4DFD1] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <p className="text-sm font-medium text-[#77796F]">
                                        {stat.label}
                                    </p>

                                    <span className="text-[#A39B8A] transition group-hover:translate-x-1">
                                        →
                                    </span>
                                </div>

                                <p className="mt-4 text-3xl font-semibold text-[#173024]">
                                    {stat.value.toLocaleString()}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Management */}
                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                        <section className="rounded-2xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                            <div className="mb-5">
                                <h2 className="text-lg font-semibold text-[#173024]">
                                    Investor Management
                                </h2>

                                <p className="mt-1 text-sm text-[#77796F]">
                                    Review investors and manage their account and
                                    KYC information.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Link
                                    href="/admin/investments"
                                    className="flex items-center justify-between rounded-xl border border-[#E8E3D8] px-4 py-4 transition hover:bg-[#F8F6F0]"
                                >
                                    <div>
                                        <p className="font-medium text-[#173024]">
                                            All Investors
                                        </p>

                                        <p className="mt-1 text-sm text-[#77796F]">
                                            View registered investors
                                        </p>
                                    </div>

                                    <span className="text-[#8A806E]">→</span>
                                </Link>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
                            <div className="mb-5">
                                <h2 className="text-lg font-semibold text-[#173024]">
                                    Financial Management
                                </h2>

                                <p className="mt-1 text-sm text-[#77796F]">
                                    Manage plans and process investor payouts.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Link
                                    href="/admin/plans"
                                    className="flex items-center justify-between rounded-xl border border-[#E8E3D8] px-4 py-4 transition hover:bg-[#F8F6F0]"
                                >
                                    <div>
                                        <p className="font-medium text-[#173024]">
                                            Investment Plans
                                        </p>

                                        <p className="mt-1 text-sm text-[#77796F]">
                                            Create and manage investment plans
                                        </p>
                                    </div>

                                    <span className="text-[#8A806E]">→</span>
                                </Link>

                                <Link
                                    href="/admin/payments"
                                    className="flex items-center justify-between rounded-xl border border-[#E8E3D8] px-4 py-4 transition hover:bg-[#F8F6F0]"
                                >
                                    <div>
                                        <p className="font-medium text-[#173024]">
                                            Payouts
                                        </p>

                                        <p className="mt-1 text-sm text-[#77796F]">
                                            Review and disburse approved payouts
                                        </p>
                                    </div>

                                    <span className="text-[#8A806E]">→</span>
                                </Link>
                            </div>
                        </section>
                    </div>

                    {/* Quick Actions */}
                    <section className="mt-6 rounded-2xl border border-[#E4DFD1] bg-[#173024] p-6 text-white shadow-sm">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Quick Actions
                                </h2>

                                <p className="mt-1 text-sm text-white/70">
                                    Access the main administration areas.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/admin/investments"
                                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#173024] hover:bg-[#F0EDE5]"
                                >
                                    Investors
                                </Link>

                                <Link
                                    href="/admin/plans"
                                    className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                                >
                                    Plans
                                </Link>

                                <Link
                                    href="/admin/payments"
                                    className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                                >
                                    Payouts
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}