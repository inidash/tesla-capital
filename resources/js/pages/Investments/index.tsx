import { Head, Link } from '@inertiajs/react';
import { formatMoney, type Investment, type InvestmentPlan } from '@/types/investment';

interface InvestmentWithPlan extends Investment {
plan: InvestmentPlan;
total_payments?: number;
paid_payments?: number;
}

interface InvestmentsIndexProps {
investments: InvestmentWithPlan[];
}

export default function InvestmentsIndex({
investments,
}: InvestmentsIndexProps) {
    const activeInvestments = investments.filter(
    (investment) => investment.status === 'active',
    );

    const completedInvestments = investments.filter(
    (investment) => investment.status !== 'active',
    );

    const totalInvested = activeInvestments.reduce(
    (total, investment) => total + investment.principal_amount,
    0,
    );

    const totalMonthlyRoi = activeInvestments.reduce(
    (total, investment) => total + investment.monthly_roi_amount,
    0,
    );

const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(Number(amount));
};
return ( 
<div> 
    <Head title="My investments" />

  <div className="min-h-screen bg-[#F6F3EC]">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-2xl text-[#173024]">
            My investments
          </h1>

          <p className="mt-1 text-sm text-[#6B7268]">
            Track your active investments, ROI payments and maturity dates.
          </p>
        </div>

        <Link
          href="/investments/create"
          className="inline-flex items-center justify-center rounded-full bg-[#173024] px-5 py-2.5 text-sm font-medium text-[#F6F3EC] transition hover:bg-[#0E1E16]"
        >
          New investment
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Active investments"
          value={String(activeInvestments.length)}
        />

        <SummaryCard
          label="Total invested"
          value={formatCurrency(totalInvested)}
        />

        <SummaryCard
          label="Monthly ROI"
          value={formatCurrency(totalMonthlyRoi)}
        />
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg text-[#173024]">
            Active investments
          </h2>

          <span className="text-xs text-[#6B7268]">
            {activeInvestments.length}{' '}
            {activeInvestments.length === 1 ? 'investment' : 'investments'}
          </span>
        </div>

        {activeInvestments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-4 space-y-4">
            {activeInvestments.map((investment) => (
              <InvestmentCard
                key={investment.id}
                investment={investment}
              />
            ))}
          </div>
        )}
      </section>

      {completedInvestments.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-lg text-[#173024]">
            Investment history
          </h2>

          <div className="mt-4 space-y-3">
            {completedInvestments.map((investment) => (
              <InvestmentCard
                key={investment.id}
                investment={investment}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
</div>

);
}

function SummaryCard({
label,
value,
}: {
label: string;
value: string;
}) {
return ( <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5"> <p className="text-xs uppercase tracking-wide text-[#6B7268]">
{label} </p>

  <p className="mt-2 font-serif text-xl text-[#173024] tabular-nums">
    {value}
  </p>
</div>

);
}

function InvestmentCard({
investment,
}: {
investment: InvestmentWithPlan;
}) {
const monthlyRoi =
investment.monthly_roi_amount ??
Math.round(
investment.principal_amount *
(parseFloat(String(investment.locked_monthly_roi_percentage)) / 100),
);

const statusLabel =
investment.status === 'active'
? 'Active'
: investment.status === 'matured'
? 'Matured'
: 'Cancelled';

const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(Number(amount));
};

return (
        <Link
        href={`/investments/${investment.id}`}
        className="block rounded-2xl border border-[#E4DFD1] bg-white p-5 transition hover:border-[#173024] hover:shadow-sm"
        > <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"> <div> <div className="flex items-center gap-2"> <h3 className="font-serif text-lg text-[#173024]">
        {investment.plan?.name ?? 'Investment'} </h3>

                <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    investment.status === 'active'
                    ? 'bg-[#E8F0EA] text-[#1C3829]'
                    : 'bg-[#F0EDE5] text-[#6B7268]'
                }`}
                >
                {statusLabel}
                </span>
            </div>

            <p className="mt-1 text-xs text-[#6B7268]">
                Started {formatDate(investment.starts_on)}
            </p>
            </div>

            <div className="text-left sm:text-right">
            <p className="text-xs text-[#6B7268]">Principal</p>

            <p className="mt-1 font-serif text-lg text-[#173024] tabular-nums">
                {formatCurrency(investment.principal_amount)}
            </p>
            </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#EEEAE0] pt-4 sm:grid-cols-4">
            <Detail
            label="Monthly ROI"
            value={`${investment.locked_monthly_roi_percentage}%`}
            />

            <Detail
            label="Monthly payout"
            value={formatCurrency(monthlyRoi)}
            />

            <Detail
            label="Next payout"
            value={formatDate(investment.next_payout_on)}
            />

            <Detail
            label="Maturity"
            value={formatDate(investment.ends_on)}
            />
        </div>
        </Link>

    );
}

function Detail({
    label,
    value,
    }: {
    label: string;
    value: string;
    }) {
    return ( <div> <p className="text-xs text-[#6B7268]">{label}</p> <p className="mt-1 text-sm text-[#173024] tabular-nums">{value}</p> </div>
    );
}

function EmptyState() {
return ( 
        <div className="mt-4 rounded-2xl border border-dashed border-[#D8D2C3] bg-white px-6 py-12 text-center"> <h3 className="font-serif text-lg text-[#173024]">
        No active investments </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-[#6B7268]">
            You don't have an active investment yet. Choose an investment plan to
            get started.
        </p>

        <Link
            href="/investments/create"
            className="mt-5 inline-flex rounded-full bg-[#173024] px-5 py-2.5 text-sm font-medium text-[#F6F3EC]"
        >
            Explore plans
        </Link>
        </div>

);
}


function formatDate(value: string | null | undefined): string {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

