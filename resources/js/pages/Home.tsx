// import { Head, Link } from '@inertiajs/react';
// import PublicLayout from '@/layouts/PublicLayout';
// import { formatMoney, type InvestmentPlan } from '@/types/investment';
// import HeroSectionFour from '@/components/Front-End/HeroSection';
// import Features from '@/components/Front-End/Features';

// interface HomeProps {
//   featuredPlans: InvestmentPlan[];
// }

// export default function Home({ featuredPlans }: HomeProps) {
//   return (
//     <PublicLayout>
//       <Head title="Tesla Capital -- Fixed-term investment plans" />
//       <HeroSectionFour />
//       <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
//         <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
//           <div>
//             <p className="text-xs uppercase tracking-[0.2em] text-[#C89B3C]">Fixed-term investing</p>
//             <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
//               Put capital to work, on terms you can see up front.
//             </h1>
//             <p className="mt-5 max-w-md text-[#6B7268]">
//               Every plan states its monthly rate and lock-in period before you commit. No surprises after you've
//               funded your wallet, no rate that moves once you're in.
//             </p>
//             <div className="mt-8 flex gap-3">
//               <Link href="/register" className="rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-[#F6F3EC] hover:bg-[#0E1E16]">
//                 Create an account
//               </Link>
//               <Link href="/services" className="rounded-full border border-[#173024] px-6 py-3 text-sm font-medium hover:bg-[#173024] hover:text-[#F6F3EC]">
//                 View plans
//               </Link>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <svg width="280" height="280" viewBox="0 0 280 280" className="-rotate-90">
//               <circle cx="140" cy="140" r="120" fill="none" stroke="#6B7268" strokeWidth="14" />
//               <circle
//                 cx="140"
//                 cy="140"
//                 r="120"
//                 fill="none"
//                 stroke="#920ddf"
//                 strokeWidth="14"
//                 strokeLinecap="round"
//                 strokeDasharray={2 * Math.PI * 120}
//                 strokeDashoffset={2 * Math.PI * 120 * 0.32}
//               />
//               <text x="140" y="140" textAnchor="middle" dominantBaseline="middle" transform="rotate(90 140 140)" fill="#173024" fontSize="42" fontFamily="Fraunces, serif">
//                 4.5%
//               </text>
//               <text x="140" y="178" textAnchor="middle" transform="rotate(90 140 140)" fill="#6B7268" fontSize="13" letterSpacing="1">
//                 MONTHLY, TYPICAL PLAN
//               </text>
//             </svg>
//           </div>
//         </div>
//       </section>
//       <Features />
//       <section className="border-y border-[#E4DFD1] bg-white py-16">
//         <div className="mx-auto max-w-6xl px-6">
//           <h2 className="font-serif text-2xl">How it works</h2>
//           <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
//             <Step n="1" title="Fund your wallet" body="Deposit securely by card or bank transfer. Funds land in your available balance immediately." />
//             <Step n="2" title="Choose a plan" body="Every plan lists its monthly rate, minimum, and lock-in term before you invest a naira." />
//             <Step n="3" title="Get paid monthly" body="Returns land in your wallet on schedule. Principal returns in full at the end of the term." />
//           </div>
//         </div>
//       </section>

//       {featuredPlans.length > 0 && (
//         <section className="mx-auto max-w-6xl px-6 py-16">
//           <div className="flex items-end justify-between">
//             <h2 className="font-serif text-2xl">Current plans</h2>
//             <Link href="/services" className="text-sm text-[#C89B3C] hover:underline">
//               View all &rarr;
//             </Link>
//           </div>
//           <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
//             {featuredPlans.map((plan) => (
//               <div key={plan.id} className="rounded-2xl border border-[#E4DFD1] bg-white p-6">
//                 <p className="font-serif text-lg">{plan.name}</p>
//                 <p className="mt-3 font-serif text-3xl text-[#1C3829]">
//                   {plan.monthly_roi_percentage}<span className="text-base text-[#6B7268]">%/mo</span>
//                 </p>
//                 <p className="mt-3 text-sm text-[#6B7268]">
//                   {plan.duration_months}-month term &middot; from {formatMoney(plan.min_amount)}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       <section className="bg-[#173024] py-16">
//         <div className="mx-auto max-w-6xl px-6 text-center">
//           <h2 className="font-serif text-2xl text-[#F6F3EC]">Ready to see the numbers for yourself?</h2>
//           <Link href="/register" className="mt-6 inline-block rounded-full bg-[#C89B3C] px-6 py-3 text-sm font-medium text-[#173024] hover:bg-[#B98A2E]">
//             Create your account
//           </Link>
//         </div>
//       </section>
//     </PublicLayout>
//   );
// }

// function Step({ n, title, body }: { n: string; title: string; body: string }) {
//   return (
//     <div>
//       <p className="font-serif text-3xl text-[#C89B3C]">{n}</p>
//       <p className="mt-2 font-medium">{title}</p>
//       <p className="mt-1 text-sm text-[#6B7268]">{body}</p>
//     </div>
//   );
// }

import { Head, Link } from '@inertiajs/react';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';

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
    plans?: InvestmentPlan[] | undefined;
};


type HomeProps = {
    categories: InvestmentCategory[];
};


export default function Home({ categories }: HomeProps) {
    console.log('plans', categories);
    return (
        <>
            <Head title="Tesla Capital — Grow With Purpose" />

            <div className="min-h-screen bg-[#F7F5EF] text-[#173024]">
                {/* Navigation */}
                {/* <header className="border-b border-[#E4DFD1] bg-[#F7F5EF]/95 backdrop-blur">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173024] text-sm font-bold text-white">
                                T
                            </div>

                            <div>
                                <div className="text-lg font-bold tracking-tight">
                                    Tesla Capital
                                </div>
                                <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#173024]/50">
                                    Grow With Purpose
                                </div>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-8 md:flex">
                            <Link
                                href="/"
                                className="text-sm font-medium text-[#173024]"
                            >
                                Home
                            </Link>

                            <Link
                                href="/about"
                                className="text-sm font-medium text-[#173024]/65 transition hover:text-[#173024]"
                            >
                                About
                            </Link>

                            <Link
                                href="/services"
                                className="text-sm font-medium text-[#173024]/65 transition hover:text-[#173024]"
                            >
                                Services
                            </Link>

                            <Link
                                href="/contact"
                                className="text-sm font-medium text-[#173024]/65 transition hover:text-[#173024]"
                            >
                                Contact
                            </Link>
                        </nav>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="hidden rounded-full px-4 py-2 text-sm font-medium text-[#173024] transition hover:bg-[#EDE9DD] sm:inline-flex"
                            >
                                Sign in
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-full bg-[#173024] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#214636]"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </header> */}
                <SiteHeader />

                <main>
                    {/* Hero */}
                    <section className="relative overflow-hidden">
                        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#DDE7D8] blur-3xl" />
                        <div className="absolute -left-40 top-48 h-80 w-80 rounded-full bg-[#E9DFC9] blur-3xl" />

                        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
                            <div>
                                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D8D2C3] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#173024]/70">
                                    <span className="h-2 w-2 rounded-full bg-[#6B8E68]" />
                                    Investment made simple
                                </div>

                                <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                                    Put your money to work with{' '}
                                    <span className="text-[#58745B]">
                                        purpose.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-2xl text-lg leading-8 text-[#173024]/65">
                                    Tesla Capital gives you a simple way to
                                    participate in carefully structured
                                    investment opportunities and track your
                                    financial journey from one secure platform.
                                </p>

                                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href="/plans"
                                        className="inline-flex items-center justify-center rounded-full bg-[#173024] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#214636]"
                                    >
                                        Explore investment plans
                                        <span className="ml-2">→</span>
                                    </Link>

                                    <Link
                                        href="/about"
                                        className="inline-flex items-center justify-center rounded-full border border-[#D8D2C3] bg-white px-7 py-3.5 text-sm font-semibold text-[#173024] transition hover:bg-[#F0EDE4]"
                                    >
                                        Learn more
                                    </Link>
                                </div>

                                <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#173024]/55">
                                    <span className="flex items-center gap-2">
                                        <span className="text-[#58745B]">✓</span>
                                        Simple investment process
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <span className="text-[#58745B]">✓</span>
                                        Transparent tracking
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <span className="text-[#58745B]">✓</span>
                                        Secure account
                                    </span>
                                </div>
                            </div>

                            {/* Hero Card */}
                            <div className="relative">
                                <div className="rounded-[2rem] border border-[#DCD6C8] bg-[#173024] p-5 shadow-2xl shadow-[#173024]/10">
                                    <div className="rounded-[1.5rem] bg-[#F7F5EF] p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wider text-[#173024]/45">
                                                    Investment overview
                                                </p>
                                                <p className="mt-1 text-sm font-semibold">
                                                    Your portfolio
                                                </p>
                                            </div>

                                            <div className="rounded-full bg-[#DDE7D8] px-3 py-1 text-xs font-semibold text-[#36563A]">
                                                Active
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <p className="text-sm text-[#173024]/50">
                                                Total invested
                                            </p>

                                            <p className="mt-2 text-4xl font-semibold tracking-tight">
                                                $766, 654, 600.00
                                            </p>

                                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E5E0D5]">
                                                <div className="h-full w-[68%] rounded-full bg-[#58745B]" />
                                            </div>
                                        </div>

                                        <div className="mt-8 grid grid-cols-1 gap-3">
                                            {/* <div className="rounded-2xl bg-white p-4">
                                                <p className="text-xs text-[#173024]/45">
                                                    Active plans
                                                </p>
                                                <p className="mt-2 text-xl font-semibold">
                                                    0
                                                </p>
                                            </div> */}

                                            <div className="rounded-2xl bg-white p-4">
                                                <p className="text-xs text-[#173024]/45">
                                                    Returns
                                                </p>
                                                <p className="mt-2 text-xl font-semibold">
                                                    $2, 349, 654, 098.00
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-[#DCD6C8] bg-white p-5 shadow-xl sm:block">
                                    <p className="text-xs text-[#173024]/45">
                                        Built for clarity
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        Know where your money stands.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Value Proposition */}
                    <section className="border-y border-[#E4DFD1] bg-white">
                        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                            <div className="grid gap-10 md:grid-cols-3">
                                <div>
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7EEE2] text-lg">
                                        ↗
                                    </div>

                                    <h3 className="text-lg font-semibold">
                                        Structured opportunities
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-[#173024]/60">
                                        Access investment plans designed with
                                        clear terms, timelines and expected
                                        outcomes.
                                    </p>
                                </div>

                                <div>
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE7D8] text-lg">
                                        ◇
                                    </div>

                                    <h3 className="text-lg font-semibold">
                                        One place to manage everything
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-[#173024]/60">
                                        Monitor investments, deposits,
                                        transactions and returns from your
                                        personal dashboard.
                                    </p>
                                </div>

                                <div>
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5EAE7] text-lg">
                                        ✓
                                    </div>

                                    <h3 className="text-lg font-semibold">
                                        Built around transparency
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-[#173024]/60">
                                        We believe investors should have a clear
                                        view of their activity and investment
                                        journey.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How It Works */}
                    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#58745B]">
                                How it works
                            </p>

                            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                                Start investing in three simple steps.
                            </h2>

                            <p className="mt-5 text-base leading-7 text-[#173024]/60">
                                We keep the process straightforward so you can
                                focus on understanding your investment rather
                                than navigating complicated systems.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-6 md:grid-cols-3">
                            <div className="rounded-3xl border border-[#E0DACD] bg-white p-7">
                                <span className="text-sm font-bold text-[#58745B]">
                                    01
                                </span>

                                <h3 className="mt-8 text-xl font-semibold">
                                    Create your account
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-[#173024]/60">
                                    Register securely and complete your profile
                                    so your investment account is ready.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-[#E0DACD] bg-white p-7">
                                <span className="text-sm font-bold text-[#58745B]">
                                    02
                                </span>

                                <h3 className="mt-8 text-xl font-semibold">
                                    Choose a plan
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-[#173024]/60">
                                    Review available investment plans and select
                                    an opportunity that suits your goals.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-[#E0DACD] bg-white p-7">
                                <span className="text-sm font-bold text-[#58745B]">
                                    03
                                </span>

                                <h3 className="mt-8 text-xl font-semibold">
                                    Track your investment
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-[#173024]/60">
                                    Follow your investment activity, transactions
                                    and returns directly from your dashboard.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Trust Section */}
                    <section className="bg-[#173024] text-white">
                        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-8">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B9C9B5]">
                                    A better investment experience
                                </p>

                                <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                                    Your financial journey deserves clarity.
                                </h2>

                                <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
                                    From your first deposit to monitoring active
                                    investments, TSL Investment brings your
                                    essential investment activities together in
                                    one streamlined experience.
                                </p>

                                <Link
                                    href="/register"
                                    className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#173024] transition hover:bg-[#EDE9DD]"
                                >
                                    Create your account
                                    <span className="ml-2">→</span>
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <p className="text-3xl font-semibold">
                                        01
                                    </p>
                                    <p className="mt-3 text-sm text-white/55">
                                        Simple onboarding
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <p className="text-3xl font-semibold">
                                        02
                                    </p>
                                    <p className="mt-3 text-sm text-white/55">
                                        Clear investment plans
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <p className="text-3xl font-semibold">
                                        03
                                    </p>
                                    <p className="mt-3 text-sm text-white/55">
                                        Personal dashboard
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <p className="text-3xl font-semibold">
                                        04
                                    </p>
                                    <p className="mt-3 text-sm text-white/55">
                                        Transparent activity
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#58745B]">
                            Ready when you are
                        </p>

                        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                            Take the next step toward smarter investing.
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#173024]/60">
                            Explore our investment plans and discover an
                            investment experience designed around simplicity
                            and transparency.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/plans"
                                className="rounded-full bg-[#173024] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#214636]"
                            >
                                View investment plans
                            </Link>

                            <Link
                                href="/contact"
                                className="rounded-full border border-[#D8D2C3] bg-white px-7 py-3.5 text-sm font-semibold text-[#173024] transition hover:bg-[#F0EDE4]"
                            >
                                Talk to us
                            </Link>
                        </div>
                    </section>
                    {/* Investment Categories & Plans */}
                    <section className="bg-[#F1EFE7]">
                        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                            {/* Section heading */}
                            <div className="mx-auto max-w-3xl text-center">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#58745B]">
                                    Investment opportunities
                                </p>

                                <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                                    Find the right investment for you.
                                </h2>

                                <p className="mt-5 text-base leading-7 text-[#173024]/60">
                                    Explore our investment categories and choose from carefully
                                    structured plans designed around different investment goals,
                                    amounts and time horizons.
                                </p>
                            </div>

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

                            {/* Bottom CTA */}
                            {categories.length > 0 && (
                                <div className="mt-10 text-center">
                                    <Link
                                        href="/plans"
                                        className="inline-flex items-center text-sm font-semibold text-[#173024] transition hover:text-[#58745B]"
                                    >
                                        Explore all investment plans
                                        <span className="ml-2">→</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>

                </main>

                <SiteFooter />
            </div>
        </>
    );
}