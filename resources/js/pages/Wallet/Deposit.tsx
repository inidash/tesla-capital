import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
// import { deposit } from '@/routes';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Deposit() {
  const [amountNaira, setAmountNaira] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // function handleSubmit() {
  //   setSubmitting(true);
  //   router.post(
  //     '/wallet/deposit',
  //     { amount: Math.round(parseFloat(amountNaira || '0') * 100) },
  //     { onError: () => setSubmitting(false) }
  //   );
  // }
  function handleSubmit() {
    setSubmitting(true);

    router.post(
        '/wallet/deposit',
        {
            amount: Math.round(
                parseFloat(amountNaira || '0') * 100
            ) / 100,
        },
        {
            onError: () => setSubmitting(false),
            onFinish: () => setSubmitting(false),
        }
    );
}

  return (
    <div>
      <Head title="Fund wallet" />

      <div className="flex min-h-screen items-center justify-center bg-[#F6F3EC] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-[#E4DFD1] bg-white p-6">
          <p className="font-serif text-lg text-[#173024]">Fund your wallet</p>
          <p className="mt-1 text-xs text-[#6B7268]">You'll be redirected to Paystack to complete payment.</p>

          <label className="mt-5 block text-xs uppercase tracking-wide text-[#6B7268]">Amount (USD)</label>
          <input
            type="number"
            inputMode="decimal"
            autoFocus
            value={amountNaira}
            onChange={(e) => setAmountNaira(e.target.value)}
            placeholder="0.00"
            className="mt-1 w-full rounded-lg border border-[#E4DFD1] px-3 py-2 text-[#173024] tabular-nums focus:border-[#173024] focus:outline-none focus:ring-1 focus:ring-[#173024]"
          />

          <button
            onClick={handleSubmit}
            disabled={!amountNaira || submitting}
            className="mt-6 w-full rounded-full bg-[#173024] py-2.5 text-sm font-medium text-[#F6F3EC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? 'Processing...' : 'Make Deposit'}
          </button>
        </div>
      </div>
    </div>
  );
}
Deposit.layout = {
    breadcrumbs: [
        {
            title: 'Deposit',
            href: '/wallet/deposit',
        },
    ],
};