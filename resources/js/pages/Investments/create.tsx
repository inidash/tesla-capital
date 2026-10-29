
import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    formatMoney,
    type InvestmentPlan,
    type Wallet,
} from '@/types/investment';

interface InvestmentsCreateProps {
    plans: InvestmentPlan[];
    wallet: Wallet;
}

export default function InvestmentsCreate({
    plans,
    wallet,
}: InvestmentsCreateProps) {
    const [selectedPlan, setSelectedPlan] =
        useState<InvestmentPlan | null>(plans[0] ?? null);

    /*
     * The form amount is always what the USER sees/enters:
     *
     * 1000 = $1,000.00
     *
     * We convert it to minor units only when submitting.
     */
    const form = useForm({
        investment_plan_id: plans[0]?.id ?? 0,
        amount: '',
    });

    /*
     * Amount entered by the user in major currency units.
     *
     * Example:
     * 1000 -> $1,000
     */
    const enteredAmount = Number.parseFloat(form.data.amount || '0');

    /*
     * Convert the entered amount to minor currency units.
     *
     * Example:
     * $1,000 -> 100000 cents
     */
    const formAmount = Number.isFinite(enteredAmount)
      ? Math.round(enteredAmount * 100) / 100
      : 0;

    /*
     * Plan amounts are stored in minor units, so formAmount
     * must also be compared in minor units.
     */
    const withinRange =
        selectedPlan !== null &&
        formAmount >= Number(selectedPlan.min_amount) &&
        (
            selectedPlan.max_amount === null ||
            formAmount <= Number(selectedPlan.max_amount)
        );

    /*
     * Wallet balance is stored in minor units.
     */
    const affordable =
        formAmount <= Number(wallet.available_balance);

    /*
     * Calculate ROI in minor units.
     *
     * Example:
     *
     * Investment = 100000 cents ($1,000)
     * ROI = 5%
     *
     * 100000 * 5 / 100 = 5000 cents ($50)
     */
    // const monthlyRoi =
    //     selectedPlan && formAmount > 0
    //         ? Math.round(
    //               formAmount *
    //                   (
    //                       Number(
    //                           selectedPlan.monthly_roi_percentage
    //                       ) / 100
    //                   )
    //           )
    //         : 0;

            const monthlyRoi =
    selectedPlan && formAmount > 0
        ? Math.round(
              (
                  formAmount *
                  Number(selectedPlan.monthly_roi_percentage)
              ) / 100 * 100
          ) / 100
        : 0;

    /*
     * Total ROI for the entire investment term.
     */
    // const totalRoi =
    //     selectedPlan && monthlyRoi > 0
    //         ? monthlyRoi * Number(selectedPlan.duration_months)
    //         : 0;

    const totalRoi =
    selectedPlan && monthlyRoi > 0
        ? Math.round(
              monthlyRoi *
              Number(selectedPlan.duration_months) *
              100
          ) / 100
        : 0;
    const canSubmit =
        selectedPlan !== null &&
        formAmount > 0 &&
        withinRange &&
        affordable &&
        !form.processing;

    function selectPlan(plan: InvestmentPlan) {
        setSelectedPlan(plan);

        form.setData('investment_plan_id', plan.id);
        form.clearErrors();
    }

    // function handleSubmit() {
    //     if (!canSubmit || !selectedPlan) {
    //         return;
    //     }

    //     /*
    //      * IMPORTANT:
    //      *
    //      * The user enters:
    //      *
    //      * 1000
    //      *
    //      * But Laravel expects:
    //      *
    //      * 100000
    //      *
    //      * because financial values are stored in minor units.
    //      */
    //     form.transform((data) => ({
    //         investment_plan_id: data.investment_plan_id,
    //         amount: Math.round(
    //             Number.parseFloat(data.amount || '0') * 100
    //         ),
    //     }));

    //     form.post('/investments', {
    //         onSuccess: () => {
    //             form.reset('amount');
    //         },
    //     });
    // }

    function handleSubmit() {
    if (!canSubmit || !selectedPlan) {
        return;
    }

    form.transform((data) => ({
        investment_plan_id: data.investment_plan_id,
        amount: Math.round(
            Number.parseFloat(data.amount || '0') * 100
        ) / 100,
    }));

    form.post('/investments', {
        onSuccess: () => {
            form.reset('amount');
        },
    });
}

    /*
     * Database amounts are stored in minor units.
     *
     * 100000 -> $1,000.00
     * 10000  -> $100.00
     * 1000   -> $10.00
     */
    const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(amount));
};

    return (
        <div>
            <Head title="New investment" />

            <div className="min-h-screen bg-[#F6F3EC]">
                <div className="mx-auto max-w-5xl px-6 py-10">

                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="font-serif text-2xl text-[#173024]">
                                New investment
                            </h1>

                            <p className="mt-1 text-sm text-[#6B7268]">
                                Choose a plan and decide how much you want to
                                invest.
                            </p>
                        </div>

                        <Link
                            href="/investments"
                            className="rounded-full border border-[#E4DFD1] bg-white px-4 py-2 text-sm text-[#173024]"
                        >
                            My investments
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">

                        {/* LEFT COLUMN */}
                        <div>

                            {/* Plans */}
                            <div className="rounded-2xl border border-[#E4DFD1] bg-white p-6">
                                <div>
                                    <h2 className="font-serif text-lg text-[#173024]">
                                        Choose an investment plan
                                    </h2>

                                    <p className="mt-1 text-xs text-[#6B7268]">
                                        Available balance:{' '}
                                        <span className="font-medium text-[#173024]">
                                            {formatMoney(
                                                wallet.available_balance
                                            )}
                                        </span>
                                    </p>
                                </div>

                                <div className="mt-5 space-y-3">
                                    {plans.map((plan) => {
                                        const selected =
                                            selectedPlan?.id === plan.id;

                                        return (
                                            <button
                                                key={plan.id}
                                                type="button"
                                                onClick={() =>
                                                    selectPlan(plan)
                                                }
                                                className={`w-full rounded-xl border p-4 text-left transition ${
                                                    selected
                                                        ? 'border-[#173024] bg-[#F7F8F4]'
                                                        : 'border-[#E4DFD1] bg-white hover:border-[#A9B1A8]'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="font-serif text-base text-[#173024]">
                                                            {plan.name}
                                                        </p>

                                                        {plan.description && (
                                                            <p className="mt-1 text-xs leading-5 text-[#6B7268]">
                                                                {
                                                                    plan.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <span className="shrink-0 rounded-full bg-[#E8F0EA] px-2.5 py-1 text-xs font-medium text-[#1C3829]">
                                                        {
                                                            plan.monthly_roi_percentage
                                                        }
                                                        % / month
                                                    </span>
                                                </div>

                                                <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">

                                                    {/* Term */}
                                                    <div>
                                                        <p className="text-[#6B7268]">
                                                            Term
                                                        </p>

                                                        <p className="mt-1 text-[#173024]">
                                                            {
                                                                plan.duration_months
                                                            }{' '}
                                                            months
                                                        </p>
                                                    </div>

                                                    {/* Minimum */}
                                                    <div>
                                                        <p className="text-[#6B7268]">
                                                            Minimum
                                                        </p>

                                                        <p className="mt-1 text-[#173024] tabular-nums">
                                                            {formatCurrency(
                                                                plan.min_amount
                                                            )}
                                                        </p>
                                                    </div>

                                                    {/* Maximum */}
                                                    <div>
                                                        <p className="text-[#6B7268]">
                                                            Maximum
                                                        </p>

                                                        <p className="mt-1 text-[#173024] tabular-nums">
                                                            {plan.max_amount !==
                                                            null
                                                                ? formatCurrency(
                                                                      plan.max_amount
                                                                  )
                                                                : 'No cap'}
                                                        </p>
                                                    </div>

                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {plans.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-[#D8D2C3] px-5 py-10 text-center">
                                        <p className="font-serif text-lg text-[#173024]">
                                            No investment plans available
                                        </p>

                                        <p className="mt-2 text-sm text-[#6B7268]">
                                            There are currently no active
                                            investment plans.
                                        </p>
                                    </div>
                                )}

                                {form.errors.investment_plan_id && (
                                    <p className="mt-3 text-xs text-[#9C4A3D]">
                                        {form.errors.investment_plan_id}
                                    </p>
                                )}
                            </div>

                            {/* Amount */}
                            {selectedPlan && (
                                <div className="mt-6 rounded-2xl border border-[#E4DFD1] bg-white p-6">

                                    <h2 className="font-serif text-lg text-[#173024]">
                                        Investment amount
                                    </h2>

                                    <p className="mt-1 text-xs text-[#6B7268]">
                                        Enter the amount you want to invest in{' '}
                                        <span className="font-medium text-[#173024]">
                                            {selectedPlan.name}
                                        </span>
                                        .
                                    </p>

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
                                        value={form.data.amount}
                                        onChange={(event) => {
                                            form.setData(
                                                'amount',
                                                event.target.value
                                            );

                                            form.clearErrors('amount');
                                        }}
                                        placeholder={formatCurrency(
                                            selectedPlan.min_amount
                                        )}
                                        className="mt-1 w-full rounded-lg border border-[#E4DFD1] px-3 py-3 text-lg text-[#173024] tabular-nums focus:border-[#173024] focus:outline-none focus:ring-1 focus:ring-[#173024]"
                                    />

                                    <div className="mt-2 flex justify-between text-xs">
                                        <span className="text-[#6B7268]">
                                            Minimum:{' '}
                                            {formatCurrency(
                                                selectedPlan.min_amount
                                            )}
                                        </span>

                                        <span className="text-[#6B7268]">
                                            Available:{' '}
                                            {formatMoney(
                                                wallet.available_balance
                                            )}
                                        </span>
                                    </div>

                                    {/* Amount range error */}
                                    {form.data.amount !== '' &&
                                        !withinRange && (
                                            <p className="mt-3 text-xs text-[#9C4A3D]">
                                                Amount must be between{' '}
                                                {formatCurrency(
                                                    selectedPlan.min_amount
                                                )}{' '}
                                                and{' '}
                                                {selectedPlan.max_amount !==
                                                null
                                                    ? formatCurrency(
                                                          selectedPlan.max_amount
                                                      )
                                                    : 'no limit'}
                                                .
                                            </p>
                                        )}

                                    {/* Balance error */}
                                    {form.data.amount !== '' &&
                                        withinRange &&
                                        !affordable && (
                                            <p className="mt-3 text-xs text-[#9C4A3D]">
                                                This amount exceeds your
                                                available wallet balance.
                                            </p>
                                        )}

                                    {form.errors.amount && (
                                        <p className="mt-3 text-xs text-[#9C4A3D]">
                                            {form.errors.amount}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN */}
                        {selectedPlan && (
                            <div>
                                <div className="sticky top-6 rounded-2xl border border-[#E4DFD1] bg-white p-6">

                                    <h2 className="font-serif text-lg text-[#173024]">
                                        Investment summary
                                    </h2>

                                    <div className="mt-5 space-y-4">

                                        <SummaryRow
                                            label="Plan"
                                            value={selectedPlan.name}
                                        />

                                        <SummaryRow
                                            label="Investment"
                                            value={
                                                formAmount > 0
                                                    ? formatCurrency(
                                                          formAmount
                                                      )
                                                    : '—'
                                            }
                                        />

                                        <SummaryRow
                                            label="Monthly ROI"
                                            value={`${selectedPlan.monthly_roi_percentage}%`}
                                        />

                                        <SummaryRow
                                            label="Monthly payout"
                                            value={
                                                monthlyRoi > 0
                                                    ? formatCurrency(
                                                          monthlyRoi
                                                      )
                                                    : '—'
                                            }
                                        />

                                        <SummaryRow
                                            label="Investment term"
                                            value={`${selectedPlan.duration_months} months`}
                                        />

                                        <div className="border-t border-[#EEEAE0] pt-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-[#6B7268]">
                                                    Estimated total ROI
                                                </span>

                                                <span className="font-serif text-lg text-[#173024] tabular-nums">
                                                    {totalRoi > 0
                                                        ? formatCurrency(
                                                              totalRoi
                                                          )
                                                        : '—'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-xl bg-[#F6F3EC] p-4">
                                        <p className="text-xs leading-5 text-[#6B7268]">
                                            Your investment principal will be
                                            locked for the selected term. ROI
                                            payments are scheduled monthly
                                            according to the selected plan.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={!canSubmit}
                                        className="mt-6 w-full rounded-full bg-[#173024] py-3 text-sm font-medium text-[#F6F3EC] transition hover:bg-[#0E1E16] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {form.processing
                                            ? 'Creating investment...'
                                            : 'Confirm investment'}
                                    </button>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#6B7268]">
                {label}
            </span>

            <span className="text-sm font-medium text-[#173024] tabular-nums">
                {value}
            </span>
        </div>
    );
}