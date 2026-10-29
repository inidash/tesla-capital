
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
  formatMoney,
  type InvestmentPlan,
  type Wallet,
} from '@/types/investment';

interface PlansIndexProps {
  plans: InvestmentPlan[];
  wallet: Wallet;
}

export default function PlansIndex({
  plans,
  wallet,
}: PlansIndexProps) {
  const [selectedPlan, setSelectedPlan] =
    useState<InvestmentPlan | null>(null);

  return (
    <div>
      <Head title="Investment plans" />

      <div className="min-h-screen bg-[#F6F3EC]">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h1 className="font-serif text-2xl text-[#173024]">
            Investment plans
          </h1>

          <p className="mt-1 text-sm text-[#6B7268]">
            Available balance:{' '}
            <span className="tabular-nums">
              {formatMoney(wallet.available_balance)}
            </span>
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col rounded-2xl border border-[#E4DFD1] bg-white p-6"
              >
                <p className="font-serif text-lg text-[#173024]">
                  {plan.name}
                </p>

                <p className="mt-1 flex-1 text-sm text-[#6B7268]">
                  {plan.description}
                </p>

                <div className="mt-4 space-y-1 text-sm">
                  <Row
                    label="Monthly ROI"
                    value={`${plan.monthly_roi_percentage}%`}
                    highlight
                  />

                  <Row
                    label="Term"
                    value={`${plan.duration_months} months`}
                  />

                  <Row
                    label="Range"
                    value={`${formatMoney(
                      plan.min_amount,
                    )} - ${
                      plan.max_amount !== null
                        ? formatMoney(plan.max_amount)
                        : 'no cap'
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className="mt-5 w-full rounded-full bg-[#173024] py-2.5 text-sm font-medium text-[#F6F3EC] transition hover:bg-[#0E1E16]"
                >
                  Invest
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPlan && (
        <InvestModal
          plan={selectedPlan}
          availableBalance={wallet.available_balance}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}

function Row({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#6B7268]">{label}</span>

      <span
        className={`tabular-nums ${
          highlight
            ? 'font-medium text-[#1C3829]'
            : 'text-[#173024]'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function InvestModal({
  plan,
  availableBalance,
  onClose,
}: {
  plan: InvestmentPlan;
  availableBalance: number;
  onClose: () => void;
}) {
  const form = useForm({
    investment_plan_id: plan.id,
    amount: '',
  });

  const amountMinorUnits = Math.round(
    parseFloat(form.data.amount || '0') * 100,
  );

  const withinRange =
    amountMinorUnits >= plan.min_amount &&
    (plan.max_amount === null ||
      amountMinorUnits <= plan.max_amount);

  const affordable =
    amountMinorUnits <= availableBalance;

  const canSubmit =
    form.data.amount !== '' &&
    amountMinorUnits > 0 &&
    withinRange &&
    affordable &&
    !form.processing;

  const projectedMonthlyReturn =
    amountMinorUnits > 0
      ? amountMinorUnits *
        (parseFloat(String(plan.monthly_roi_percentage)) / 100)
      : 0;

  function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    form.transform((data) => ({
      investment_plan_id: data.investment_plan_id,
      amount: Math.round(
        parseFloat(data.amount || '0') * 100,
      ),
    }));

    form.post('/investments', {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#173024]/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-serif text-lg text-[#173024]">
              Invest in {plan.name}
            </p>

            <p className="mt-1 text-xs text-[#6B7268]">
              Locked for {plan.duration_months} months.
              No early withdrawal.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={form.processing}
            className="text-lg leading-none text-[#6B7268] hover:text-[#173024]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <label
          htmlFor="investment-amount"
          className="mt-5 block text-xs uppercase tracking-wide text-[#6B7268]"
        >
          Amount
        </label>

        <input
          id="investment-amount"
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          autoFocus
          value={form.data.amount}
          onChange={(event) => {
            form.setData('amount', event.target.value);
            form.clearErrors('amount');
          }}
          placeholder={`Min ${formatMoney(plan.min_amount)}`}
          className="mt-1 w-full rounded-lg border border-[#E4DFD1] px-3 py-2 text-[#173024] tabular-nums focus:border-[#173024] focus:outline-none focus:ring-1 focus:ring-[#173024]"
        />

        {form.data.amount !== '' && !withinRange && (
          <p className="mt-2 text-xs text-[#9C4A3D]">
            Amount must be between{' '}
            {formatMoney(plan.min_amount)} and{' '}
            {plan.max_amount !== null
              ? formatMoney(plan.max_amount)
              : 'no limit'}.
          </p>
        )}

        {form.data.amount !== '' &&
          withinRange &&
          !affordable && (
            <p className="mt-2 text-xs text-[#9C4A3D]">
              Exceeds your available balance of{' '}
              {formatMoney(availableBalance)}.
            </p>
          )}

        {form.errors.amount && (
          <p className="mt-2 text-xs text-[#9C4A3D]">
            {form.errors.amount}
          </p>
        )}

        {form.errors.investment_plan_id && (
          <p className="mt-2 text-xs text-[#9C4A3D]">
            {form.errors.investment_plan_id}
          </p>
        )}

        {amountMinorUnits > 0 && withinRange && (
          <div className="mt-4 rounded-xl bg-[#F6F3EC] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7268]">
                Monthly ROI
              </span>

              <span className="text-sm font-medium text-[#1C3829] tabular-nums">
                {formatMoney(
                  Math.round(projectedMonthlyReturn),
                )}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-[#6B7268]">
                ROI rate
              </span>

              <span className="text-sm text-[#173024] tabular-nums">
                {plan.monthly_roi_percentage}% / month
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={form.processing}
            className="flex-1 rounded-full border border-[#E4DFD1] py-2.5 text-sm text-[#173024] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 rounded-full bg-[#173024] py-2.5 text-sm font-medium text-[#F6F3EC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {form.processing
              ? 'Confirming...'
              : 'Confirm investment'}
          </button>
        </div>
      </div>
    </div>
  );
}
