// import { Head } from '@inertiajs/react';
// import PublicLayout from '@/layouts/PublicLayout';

// export default function About() {
//   return (
//     <PublicLayout>
//       <Head title="About -- Meridian Capital" />

//       <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
//         <p className="text-xs uppercase tracking-[0.2em] text-[#C89B3C]">About us</p>
//         <h1 className="mt-4 font-serif text-4xl leading-tight">
//           Built to fund real growth -- and to be honest about the terms.
//         </h1>
//         <p className="mt-6 text-[#6B7268]">
//           Meridian Capital exists to connect people with capital to deploy and a business that needs it, on terms
//           both sides can see clearly before committing. We publish our rates, lock-in periods, and minimums up
//           front -- nothing changes after you've invested.
//         </p>

//         <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
//           <div>
//             <h2 className="font-serif text-xl">Our approach</h2>
//             <p className="mt-3 text-sm leading-relaxed text-[#6B7268]">
//               Every plan on the platform maps to a real, ongoing use of capital in the business. Rates are set based
//               on what that use of capital can actually support -- we don't publish a number and work backward to
//               justify it.
//             </p>
//           </div>
//           <div>
//             <h2 className="font-serif text-xl">Transparency, by design</h2>
//             <p className="mt-3 text-sm leading-relaxed text-[#6B7268]">
//               Your dashboard shows exactly what's locked, what's earned, and when your next payout lands -- no PDF
//               statements, no waiting on a reply to "how am I doing."
//             </p>
//           </div>
//           <div>
//             <h2 className="font-serif text-xl">Compliance first</h2>
//             <p className="mt-3 text-sm leading-relaxed text-[#6B7268]">
//               We operate under the applicable regulatory requirements for capital-raising in our jurisdiction, and
//               we verify every investor before they can fund a plan.
//             </p>
//           </div> 
//           <div>
//             <h2 className="font-serif text-xl">Who we serve</h2>
//             <p className="mt-3 text-sm leading-relaxed text-[#6B7268]">
//               Individuals looking for a fixed-term alternative to letting capital sit idle, who want to understand
//               exactly what they're invested in and why.
//             </p>
//           </div>
//         </div>

//         <div className="mt-16 rounded-2xl border border-[#E4DFD1] bg-white p-8">
//           <h2 className="font-serif text-xl">A note on risk</h2>
//           <p className="mt-3 text-sm leading-relaxed text-[#6B7268]">
//             All investing carries risk, including the possibility of loss. We publish our rates because we believe
//             you should be able to make that decision with full information -- not because a published rate is a
//             guarantee. Read our terms in full before investing, and never invest money you can't afford to have
//             locked for the full term.
//           </p>
//         </div>
//       </section>
//     </PublicLayout>
//   );
// }



import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';



const testimonials = [
    {
        quote: 'The platform gives me a much clearer view of my investment activity. I particularly appreciate having my investments and transactions together in one place.',
        name: 'Sarah A.',
        role: 'Investor',
    },
    {
        quote: 'What stood out to me was the simplicity. The investment plans are easy to understand and the dashboard makes it straightforward to keep track of everything.',
        name: 'Daniel O.',
        role: 'Investor',
    },
    {
        quote: 'TSL Investment has created an experience that feels organized and easy to navigate. I can see the information I need without unnecessary complexity.',
        name: 'Garet C.',
        role: 'Investor',
    },
    {
        quote: 'I like being able to review my investment details from one dashboard. It makes following my account activity much more convenient.',
        name: 'Grace N.',
        role: 'Investor',
    },
    {
        quote: 'The overall experience is clean and straightforward. I appreciate having clear information about the plans and being able to monitor my activity easily.',
        name: 'David M.',
        role: 'Investor',
    },
    {
        quote: 'Having my investment information organized in one place makes managing my account much easier. The platform is simple to understand and use.',
        name: 'Emily E.',
        role: 'Investor',
    },
    {
        quote: 'Having my investment information organized in one place makes managing my account much easier. The platform is simple to understand and use.',
        name: 'Reagan O.',
        role: 'Investor',
    },
    {
        quote: 'Having my investment information organized in one place makes managing my account much easier. The platform is simple to understand and use.',
        name: 'Stacy L.',
        role: 'Investor',
    },
    {
        quote: 'Having my investment information organized in one place makes managing my account much easier. The platform is simple to understand and use.',
        name: 'Elizabet H.',
        role: 'Investor',
    },
    {
        quote: 'Having my investment information organized in one place makes managing my account much easier. The platform is simple to understand and use.',
        name: 'Amanda R.',
        role: 'Investor',
    },
];

const managementTeam = [ 
    { 
        // name: 'Elon Musk', 
        role: 'Tesla CEO', 
        image: '/teska-ceo.jpeg', 
        bio: 'Provides strategic leadership and oversees the company’s long-term direction and growth.', 
    }, 
    {   
        // name: 'David Okafor', 
        role: 'Tesla Manager', 
        image: '/tesla-board.jpeg', 
        bio: 'Leads investment operations and works across the platform to maintain disciplined investment processes.', 
    }, 
    {   
        // name: 'Amaka Williams', 
        role: 'Tesla Board Chairwoman', 
        image: '/tesla-wo.jpeg', 
        bio: 'Provides board-level oversight and promotes strong governance, accountability and responsible growth.', 
    }, 
]; 


export default function About({investmentPlan} : any) {

    const [testimonialIndex, setTestimonialIndex] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setTestimonialIndex((current) => {
                if (current >= testimonials.length - 1) {
                    return 0;
                }

                return current + 1;
            });
        }, 5000);

        return () => window.clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="About Us" />

            <div className="min-h-screen bg-[#F7F5EF] text-[#173024]">
                <SiteHeader />
                {/* Hero */}
                <section className="relative overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
                        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                            <div>
                                <span className="inline-flex rounded-full border border-[#D9D3C5] bg-white px-4 py-2 text-sm font-medium text-[#6F756E]">
                                    About Tesla Capital
                                </span>

                                <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                                    Building a simpler path to smarter investing.
                                </h1>

                                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#687067]">
                                    Tesla Capital provides a structured platform
                                    where individuals can participate in carefully
                                    designed investment opportunities and track
                                    their investments with confidence.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Link
                                        href="/plans"
                                        className="rounded-full bg-[#173024] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#254536]"
                                    >
                                        Explore Investment Plans
                                    </Link>

                                    <Link
                                        href="/contact"
                                        className="rounded-full border border-[#D8D2C5] bg-white px-6 py-3 text-sm font-medium text-[#173024] transition hover:bg-[#F0EDE5]"
                                    >
                                        Talk to Us
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="rounded-[2rem] bg-[#173024] p-8 shadow-xl sm:p-10">
                                    <div className="mb-10 flex items-center justify-between">
                                        <span className="text-sm text-white/60">
                                            Our approach
                                        </span>

                                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                                            Tesla Capital
                                        </span>
                                    </div>

                                    <div className="space-y-7">
                                        <div>
                                            <p className="text-3xl font-semibold text-white">
                                                Simple
                                            </p>
                                            <p className="mt-1 text-sm text-white/60">
                                                Clear investment experiences
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-3xl font-semibold text-white">
                                                Structured
                                            </p>
                                            <p className="mt-1 text-sm text-white/60">
                                                Defined plans and investment terms
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-3xl font-semibold text-white">
                                                Transparent
                                            </p>
                                            <p className="mt-1 text-sm text-white/60">
                                                Clear information about your investments
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="border-y border-[#E4DFD1] bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-widest text-[#8A806E]">
                                    Our mission
                                </p>

                                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                    Making investment participation easier to understand.
                                </h2>
                            </div>

                            <div>
                                <p className="text-base leading-8 text-[#687067]">
                                    We believe investing should not feel unnecessarily
                                    complicated. Tesla Capital is designed to give
                                    investors access to clearly defined opportunities,
                                    straightforward account management and useful
                                    information about their investment journey.
                                </p>

                                <p className="mt-5 text-base leading-8 text-[#687067]">
                                    From funding your wallet to selecting an investment
                                    plan and monitoring your returns, our platform is
                                    built around clarity, convenience and responsible
                                    investment participation.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section>
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-widest text-[#8A806E]">
                                What guides us
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                Built around the investor.
                            </h2>
                        </div>

                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            {[
                                {
                                    number: '01',
                                    title: 'Clarity',
                                    text: 'Investment plans, balances and transactions should be easy to understand.',
                                },
                                {
                                    number: '02',
                                    title: 'Discipline',
                                    text: 'We believe structured investment processes help create better experiences.',
                                },
                                {
                                    number: '03',
                                    title: 'Trust',
                                    text: 'We aim to build lasting relationships through transparency and responsible service.',
                                },
                            ].map((item) => (
                                <div
                                    key={item.number}
                                    className="rounded-2xl border border-[#E4DFD1] bg-white p-7"
                                >
                                    <span className="text-sm font-semibold text-[#A39B8A]">
                                        {item.number}
                                    </span>

                                    <h3 className="mt-8 text-xl font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-[#737970]">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Management Team */} 
                <section className="bg-[#F1EFE7]"> 
                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8"> 
                        <div className="mx-auto max-w-2xl text-center"> 
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#58745B]"> 
                                Leadership 
                            </p> 
                            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"> 
                                Meet our management team. 
                            </h2> 
                            <p className="mt-5 text-base leading-7 text-[#173024]/60"> 
                                Experienced leadership helps keep our investment operations focused, 
                                accountable and aligned with the interests of our investors. 
                            </p> 
                        </div> 
                        <div className="mt-14 grid gap-7 md:grid-cols-3"> 
                            {managementTeam.map((member, i) => ( 
                                <div key={member.i} className="overflow-hidden rounded-[2rem] border border-[#DCD6C8] bg-white" > 
                                    <div className="aspect-[4/4.2] overflow-hidden bg-[#E5E1D7]"> 
                                        <img src={member.image} alt={member.i} className="h-full w-full object-cover grayscale-[15%] transition duration-500 hover:scale-105" /> 
                                    </div> <div className="p-7"> 
                                    {/* <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#58745B]"> 
                                        {member.role} 
                                    </p>  */}
                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight"> 
                                        {member.role} 
                                    </h3>
                                    <p className="mt-4 text-sm leading-6 text-[#173024]/55"> 
                                        {member.bio} 
                                    </p> 
                                </div> 
                            </div> 
                        ))} 
                    </div> 
                    <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-[#173024]/40"> 
                        Leadership profiles shown on this page should be replaced with verified company information and official photographs before publication. 
                    </p>
                </div> 
            </section> 


{/* Testimonials */}
<section className="overflow-hidden bg-white">
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#58745B]">
                    Investor experiences
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                    What our investors say.
                </h2>

                <p className="mt-5 text-base leading-7 text-[#173024]/60">
                    A great investment experience starts with clarity,
                    confidence and dependable service.
                </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() =>
                        setTestimonialIndex((current) =>
                            current === 0
                                ? testimonials.length - 1
                                : current - 1,
                        )
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DCD6C8] bg-[#F7F5EF] text-[#173024] transition hover:bg-[#EDE9DD]"
                >
                    ←
                </button>

                <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() =>
                        setTestimonialIndex(
                            (current) =>
                                (current + 1) % testimonials.length,
                        )
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#173024] text-white transition hover:bg-[#214636]"
                >
                    →
                </button>
            </div>
        </div>

        {/* Slider */}
        <div className="relative mt-14 overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                    transform: `translateX(-${
                        testimonialIndex * 100
                    }%)`,
                }}
            >
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.name}
                        className="w-full shrink-0 px-1 sm:w-1/2 lg:w-1/3 lg:px-2"
                    >
                        <div className="flex min-h-[330px] flex-col rounded-[2rem] border border-[#DED8CA] bg-[#F7F5EF] p-7">
                            {/* Quote mark */}
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E2EADF] text-2xl font-serif text-[#58745B]">
                                “
                            </div>

                            {/* Stars */}
                            <div className="mt-6 flex gap-1 text-sm text-[#58745B]">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                            </div>

                            {/* Testimonial */}
                            <p className="mt-5 flex-1 text-sm leading-7 text-[#173024]/65">
                                {testimonial.quote}
                            </p>

                            {/* Author */}
                            <div className="mt-7 flex items-center gap-3 border-t border-[#DED8CA] pt-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173024] text-xs font-semibold text-white">
                                    {testimonial.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#173024]">
                                        {testimonial.name}
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#173024]/45">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Slider indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
                <button
                    key={testimonial.name}
                    type="button"
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => setTestimonialIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                        testimonialIndex === index
                            ? 'w-7 bg-[#173024]'
                            : 'w-2 bg-[#C9C4B8] hover:bg-[#8E897D]'
                    }`}
                />
            ))}
        </div>
    </div>
</section>


                {/* CTA */}
                <section className="bg-[#173024]">
                    <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                            Ready to start your investment journey?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65">
                            Explore the investment opportunities available on TSL
                            Investment and choose a plan that works for you.
                        </p>

                        <Link
                            href="/plans"
                            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#173024] hover:bg-[#F0EDE5]"
                        >
                            View Investment Plans
                        </Link>
                    </div>
                </section>
                <SiteFooter />
            </div>
        </>
    );
}
