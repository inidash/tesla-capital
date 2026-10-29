
import { Head, Link } from '@inertiajs/react';
import MaturityRing from '@/components/Front-End/MaturityRing';
import { formatMoney, type Investment, type Wallet, type Transaction } from '@/types/investment';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

interface DashboardProps {
  wallet: Wallet;
  activeInvestments: Investment[];
  recentTransactions: Transaction[];
  flash?: {
    success?: string | null;
    error?: string | null;
  };
}


export default function Dashboard({
  wallet,
  activeInvestments,
  recentTransactions,
  flash,
}: DashboardProps) {
  const totalBalance = wallet.available_balance + wallet.locked_balance;
console.log('walet', wallet)
// const formatCurrency = (amount: number | string) => {
//     return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//         minimumFractionDigits: 2,
//     }).format(Number(amount));
// };
  return (
    <div>
      <Head title="Dashboard" />

      <div className="min-h-screen bg-[#F6F3EC]">
        <div className="mx-auto max-w-5xl px-6 py-10">

          {/* Flash messages */}
          {flash?.success && (
            <div className="mb-6 rounded-2xl border border-[#B8D5C0] bg-[#EAF4EC] px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#173024] text-xs text-[#F6F3EC]">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-medium text-[#173024]">
                    Deposit successful
                  </p>
                  <p className="mt-0.5 text-sm text-[#456052]">
                    {flash.success}
                  </p>
                </div>
              </div>
            </div>
          )}

          {flash?.error && (
            <div className="mb-6 rounded-2xl border border-[#E0B9B1] bg-[#FAEEEC] px-5 py-4">
              <p className="text-sm font-medium text-[#8B3F35]">
                {flash.error}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Total portfolio"
              value={formatMoney(totalBalance, wallet.currency)}
              emphasis
            />

            <SummaryCard
              label="Available"
              value={formatMoney(wallet.available_balance, wallet.currency)}
            />

            <SummaryCard
              label="Locked in investments"
              value={formatMoney(wallet.locked_balance, wallet.currency)}
            />
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href="/wallet/deposit"
              className="rounded-full bg-[#173024] px-5 py-2.5 text-sm font-medium text-[#F6F3EC] transition hover:bg-[#0E1E16]"
            >
              Fund wallet
            </Link>

            <Link
              href="/investments/create"
              className="rounded-full border border-[#173024] px-5 py-2.5 text-sm font-medium text-[#173024] transition hover:bg-[#173024] hover:text-[#F6F3EC]"
            >
              Browse investments
            </Link>
          </div>

          <section className="mt-12">
            <h2 className="font-serif text-xl text-[#173024]">
              Active investments
            </h2>

            {activeInvestments.length === 0 ? (
              <EmptyState
                title="No active investments yet"
                body="Money sitting idle earns nothing. Browse plans and put your available balance to work."
                actionLabel="Browse plans"
                actionHref="/plans"
              />
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex items-center gap-4 rounded-2xl border border-[#E4DFD1] bg-white p-5"
                  >
                    <MaturityRing
                      startsOn={investment.starts_on}
                      endsOn={investment.ends_on}
                      principalAmount={investment.principal_amount}
                      monthlyRoiPercentage={
                        investment.locked_monthly_roi_percentage
                      }
                      size={84}
                    />

                    <div className="min-w-0">
                      <p className="truncate font-serif text-base text-[#173024]">
                        {investment.plan.name}
                      </p>

                      <p className="mt-1 text-xs text-[#6B7268]">
                        Next payout{' '}
                        {new Date(
                          investment.next_payout_on,
                        ).toLocaleDateString('en-NG', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-12 pb-16">
            <h2 className="font-serif text-xl text-[#173024]">
              Recent activity
            </h2>

            {recentTransactions.length === 0 ? (
              <p className="mt-4 text-sm text-[#6B7268]">
                Nothing here yet.
              </p>
            ) : (
              <div className="mt-4 divide-y divide-[#E4DFD1] rounded-2xl border border-[#E4DFD1] bg-white">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <div>
                      <p className="text-sm text-[#173024]">
                        {describeTransaction(tx)}
                      </p>

                      <p className="mt-0.5 text-xs text-[#6B7268]">
                        {new Date(tx.created_at).toLocaleString('en-NG')}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-mono text-sm tabular-nums ${
                          tx.type === 'deposit' || tx.type === 'roi_payout'
                            ? 'text-[#1C3829]'
                            : 'text-[#9C4A3D]'
                        }`}
                      >
                        {tx.type === 'deposit' || tx.type === 'roi_payout'
                          ? '+'
                          : '-'}
                        {formatMoney(tx.amount)}
                      </p>

                      <p className="text-[11px] uppercase tracking-wide text-[#6B7268]">
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 ${
        emphasis
          ? 'bg-[#173024] text-[#F6F3EC]'
          : 'border border-[#E4DFD1] bg-white text-[#173024]'
      }`}
    >
      <p
        className={`text-xs uppercase tracking-wide ${
          emphasis ? 'text-[#C89B3C]' : 'text-[#6B7268]'
        }`}
      >
        {label}
      </p>

      <p className="mt-2 font-serif text-2xl tabular-nums">
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  title,
  body,
  actionLabel,
  actionHref,
}: {
  title: string;
  body: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-[#C9C2AE] bg-white/60 px-6 py-10 text-center">
      <p className="font-serif text-lg text-[#173024]">
        {title}
      </p>

      <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7268]">
        {body}
      </p>

      <Link
        href={actionHref}
        className="mt-4 inline-block rounded-full bg-[#173024] px-5 py-2 text-sm font-medium text-[#F6F3EC] hover:bg-[#0E1E16]"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

function describeTransaction(tx: Transaction): string {
  const labels: Record<Transaction['type'], string> = {
    deposit: 'Wallet deposit',
    withdrawal: 'Withdrawal',
    investment_purchase: 'Invested in plan',
    roi_payout: 'ROI payout received',
    refund: 'Refund',
  };

  return tx.description || labels[tx.type];
}

Dashboard.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: dashboard(),
    },
  ],
};
