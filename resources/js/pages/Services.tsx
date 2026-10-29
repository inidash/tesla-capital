// import { Head, Link } from '@inertiajs/react';
// import PublicLayout from '@/layouts/PublicLayout';
// import { formatMoney, type InvestmentPlan } from '@/types/investment';

// interface ServicesProps {
//   plans: InvestmentPlan[];
// }

// export default function Services({ plans }: ServicesProps) {
//   return (
//     <PublicLayout>
//       <Head title="Plans -- Meridian Capital" />

//       <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
//         <p className="text-xs uppercase tracking-[0.2em] text-[#C89B3C]">Investment plans</p>
//         <h1 className="mt-4 font-serif text-4xl leading-tight">Every plan, plainly stated.</h1>
//         <p className="mt-4 max-w-xl text-[#6B7268]">
//           Rate, term, and minimum -- the three things that actually matter -- before you fund a single naira. Rates
//           shown are locked to your investment for the full term once you invest.
//         </p>

//         <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {plans.map((plan) => (
//             <div key={plan.id} className="flex flex-col rounded-2xl border border-[#E4DFD1] bg-white p-7">
//               <p className="font-serif text-xl">{plan.name}</p>
//               <p className="mt-2 flex-1 text-sm text-[#6B7268]">{plan.description}</p>

//               <div className="mt-6 border-t border-[#E4DFD1] pt-6">
//                 <p className="font-serif text-4xl text-[#1C3829]">
//                   {plan.monthly_roi_percentage}
//                   <span className="text-lg text-[#6B7268]">% / month</span>
//                 </p>
//                 <dl className="mt-4 space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <dt className="text-[#6B7268]">Term</dt>
//                     <dd>{plan.duration_months} months</dd>
//                   </div>
//                   <div className="flex justify-between">
//                     <dt className="text-[#6B7268]">Minimum</dt>
//                     <dd>{formatMoney(plan.min_amount)}</dd>
//                   </div>
//                   <div className="flex justify-between">
//                     <dt className="text-[#6B7268]">Maximum</dt>
//                     <dd>{plan.max_amount ? formatMoney(plan.max_amount) : 'No cap'}</dd>
//                   </div>
//                 </dl>
//               </div>

//               <Link href="/register" className="mt-6 rounded-full bg-[#173024] py-2.5 text-center text-sm font-medium text-[#F6F3EC] hover:bg-[#0E1E16]">
//                 Get started
//               </Link>
//             </div>
//           ))}
//         </div>

//         <p className="mt-10 text-xs text-[#6B7268]">
//           Principal is locked for the full term with no early withdrawal. Monthly payouts land in your wallet
//           automatically on the schedule shown at checkout.
//         </p>
//       </section>
//     </PublicLayout>
//   );
// }




import { Head, Link } from '@inertiajs/react';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';

const services = [
    {
        number: '01',
        title: 'Investment Plans',
        description:
            'Choose from structured investment plans with clearly defined terms, durations and expected returns.',
    },
    {
        number: '02',
        title: 'Digital Wallet',
        description:
            'Fund and manage your investment wallet from one convenient account while keeping track of your available balance.',
    },
    {
        number: '03',
        title: 'Investment Tracking',
        description:
            'Monitor your active investments, investment status and returns from your personal dashboard.',
    },
    {
        number: '04',
        title: 'Transaction Management',
        description:
            'Keep a clear record of deposits, investments, returns and other account transactions.',
    },
    {
        number: '05',
        title: 'ROI & Payouts',
        description:
            'Track eligible returns and payout activity as your investment plans progress through their terms.',
    },
    {
        number: '06',
        title: 'Investor Support',
        description:
            'Get assistance when you need help understanding your account, investments or transactions.',
    },
];
type InvestmentPlan = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    min_amount: number | string;
    max_amount: number | string | null;
    monthly_roi_percentage: number | string;
    duration_months: number;
};

type InvestmentCategory = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    plans: InvestmentPlan[];
};

type HomeProps = {
    categories: InvestmentCategory[];
};

export default function Services({ categories }: HomeProps) {
    console.log('categories', categories);
    return (
        <>
            <Head title="Services" />

            <div className="min-h-screen bg-[#F7F5EF] text-[#173024]">
                <SiteHeader />
                {/* Hero */}
                <section className="bg-[#173024]">
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">
                                Our Services
                            </span>

                            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Everything you need to manage your investment journey.
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                                Tesla Capital combines investment opportunities with
                                simple digital tools that help you manage and monitor
                                your account.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section>
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <div
                                    key={service.number}
                                    className="group rounded-2xl border border-[#E4DFD1] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-[#A39B8A]">
                                            {service.number}
                                        </span>

                                        <span className="text-[#B2AA99] transition group-hover:translate-x-1">
                                            →
                                        </span>
                                    </div>

                                    <h2 className="mt-10 text-xl font-semibold">
                                        {service.title}
                                    </h2>

                                    <p className="mt-3 text-sm leading-7 text-[#737970]">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="border-y border-[#E4DFD1] bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-widest text-[#8A806E]">
                                How it works
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                Investing made straightforward.
                            </h2>
                        </div>

                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {[
                                ['01', 'Create your account', 'Register and set up your investor profile.'],
                                ['02', 'Fund your wallet', 'Add funds to your wallet and prepare to invest.'],
                                ['03', 'Choose a plan', 'Select an available plan and start your investment.'],
                            ].map(([number, title, text]) => (
                                <div key={number}>
                                    <span className="text-sm font-semibold text-[#A39B8A]">
                                        {number}
                                    </span>

                                    <h3 className="mt-5 text-xl font-semibold">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-[#737970]">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section>
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <div className="rounded-[2rem] bg-[#EAE6DB] px-7 py-12 text-center sm:px-12">
                            <h2 className="text-3xl font-semibold sm:text-4xl">
                                Find an investment plan that suits you.
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6F756E]">
                                Explore the plans currently available on the platform.
                            </p>

                            <Link
                                href="/plans"
                                className="mt-8 inline-flex rounded-full bg-[#173024] px-6 py-3 text-sm font-medium text-white hover:bg-[#254536]"
                            >
                                Explore Plans
                            </Link>
                            {categories.length > 0 ? (
                                <div className="mt-14 grid gap-7 lg:grid-cols-2">

                                    {categories.map((category, categoryIndex) => {
                                        const plans = category.plans ?? [];

                                        return (
                                            <div
                                                key={category.id}
                                                className="group overflow-hidden rounded-[2rem] border border-[#DDD7C9] bg-white"
                                            >
                                                {/* Category Header */}
                                                <div className="relative overflow-hidden bg-[#173024] px-7 py-8 text-white">
                                                    <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full border border-white/10" />
                                                    <div className="absolute -bottom-24 -right-5 h-40 w-40 rounded-full border border-white/5" />

                                                    <div className="relative">
                                                        <div className="flex items-start justify-between gap-5">
                                                            <div className="flex items-center gap-4">
                                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold">
                                                                    {String(categoryIndex + 1).padStart(2, '0')}
                                                                </div>

                                                                <div>
                                                                    <h3 className="text-2xl font-semibold tracking-tight">
                                                                        {category.name}
                                                                    </h3>

                                                                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                                                                        Investment category
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/65">
                                                                {plans.length}{' '}
                                                                {plans.length === 1 ? 'plan' : 'plans'}
                                                            </span>
                                                        </div>

                                                        {category.description && (
                                                            <p className="mt-6 max-w-xl text-sm leading-6 text-white/60">
                                                                {category.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Plans */}
                                                <div className="p-5">
                                                    {category.plans.length > 0 ? (
                                                        <>
                                                            <div className="space-y-3">
                                                                {category.plans.map((plan, planIndex) => (
                                                                    <div
                                                                        key={plan.id}
                                                                        className={`rounded-2xl border p-5 transition ${
                                                                            planIndex === 0
                                                                                ? 'border-[#BFCDBB] bg-[#F4F7F1]'
                                                                                : 'border-[#E5E0D5] bg-[#FBFAF7]'
                                                                        }`}
                                                                    >
                                                                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                                                            <div className="min-w-0">
                                                                                <div className="flex items-center gap-3">
                                                                                    <h4 className="text-base font-semibold">
                                                                                        {plan.name}
                                                                                    </h4>

                                                                                    {planIndex === 0 && (
                                                                                        <span className="rounded-full bg-[#DCE7D8] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#36563A]">
                                                                                            Popular
                                                                                        </span>
                                                                                    )}
                                                                                </div>

                                                                                {plan.description && (
                                                                                    <p className="mt-1.5 max-w-md text-xs leading-5 text-[#173024]/50">
                                                                                        {plan.description}
                                                                                    </p>
                                                                                )}
                                                                            </div>

                                                                            <div className="sm:text-right">
                                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#173024]/40">
                                                                                    Monthly ROI
                                                                                </p>

                                                                                <p className="mt-1 text-2xl font-semibold text-[#58745B]">
                                                                                    {Number(
                                                                                        plan.monthly_roi_percentage,
                                                                                    ).toFixed(2)}
                                                                                    %
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        <div className="my-5 h-px bg-[#E7E2D8]" />

                                                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                                                                <div>
                                                                                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#173024]/40">
                                                                                        Investment
                                                                                    </p>

                                                                                    <p className="mt-1 text-sm font-semibold">
                                                                                        $
                                                                                        {(
                                                                                            Number(
                                                                                                plan.min_amount,
                                                                                            ) 
                                                                                        ).toLocaleString(
                                                                                            undefined,
                                                                                            {
                                                                                                minimumFractionDigits: 0,
                                                                                                maximumFractionDigits: 0,
                                                                                            },
                                                                                        )}

                                                                                        {plan.max_amount !==
                                                                                            null && (
                                                                                            <>
                                                                                                {' '}
                                                                                                – $
                                                                                                {(
                                                                                                    Number(
                                                                                                        plan.max_amount,
                                                                                                    ) 
                                                                                                ).toLocaleString(
                                                                                                    undefined,
                                                                                                    {
                                                                                                        minimumFractionDigits: 0,
                                                                                                        maximumFractionDigits: 0,
                                                                                                    },
                                                                                                )}
                                                                                            </>
                                                                                        )}
                                                                                    </p>
                                                                                </div>

                                                                                <div>
                                                                                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#173024]/40">
                                                                                        Duration
                                                                                    </p>

                                                                                    <p className="mt-1 text-sm font-semibold">
                                                                                        {plan.duration_months}{' '}
                                                                                        {plan.duration_months === 1
                                                                                            ? 'month'
                                                                                            : 'months'}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            <Link
                                                                                href={`/investments/create?plan=${plan.id}`}
                                                                                className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#173024] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#214636]"
                                                                            >
                                                                                Invest
                                                                                <span className="ml-2">→</span>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <Link
                                                                href={`/plans?category=${category.slug}`}
                                                                className="mt-4 flex items-center justify-center rounded-2xl border border-[#DDD7C9] px-5 py-3 text-xs font-semibold text-[#173024]/65 transition hover:bg-[#F5F2EA] hover:text-[#173024]"
                                                            >
                                                                View all {category.name} plans
                                                                <span className="ml-2">→</span>
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        <div className="rounded-2xl border border-dashed border-[#DDD7C9] px-5 py-8 text-center">
                                                            <p className="text-sm font-medium text-[#173024]/60">
                                                                No active plans available
                                                            </p>

                                                            <p className="mt-1 text-xs text-[#173024]/40">
                                                                Investment plans for this category will appear here
                                                                when they become available.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    

                                </div>
                            ) : (
                                <div className="mt-14 rounded-[2rem] border border-[#DDD7C9] bg-white px-6 py-16 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5ECE1] text-xl text-[#58745B]">
                                        ◇
                                    </div>

                                    <h3 className="mt-5 text-xl font-semibold">
                                        Investment opportunities are coming soon
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#173024]/55">
                                        We are preparing investment opportunities for our
                                        investors. Please check back soon.
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="mt-6 inline-flex rounded-full border border-[#D8D2C3] px-5 py-3 text-sm font-semibold text-[#173024] transition hover:bg-[#F0EDE4]"
                                    >
                                        Contact us
                                    </Link>
                                </div>
                            )}
                        
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        </>
    );
}