
import type { ReactNode } from 'react';

type SplitScreenLayoutProps = {
    children: ReactNode;
    title: string;
    description: string;
    eyebrow?: string;
};

export default function SplitScreenLayout({
    children,
    title,
    description,
    eyebrow = 'Tesla Capital',
}: SplitScreenLayoutProps) {
    return (
        <div className="min-h-screen bg-[#F7F5EF] lg:grid lg:grid-cols-2">
            {/* Brand / Visual Panel */}
            <div className="relative hidden min-h-screen overflow-hidden bg-[#12372A] lg:flex">
                {/* Decorative background */}
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D7B56D]/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#6FA88A]/10 blur-3xl" />

                <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
                    {/* Logo */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl  text-lg font-bold text-[#12372A]">
                                <img src="/tesla-logo.png" alt="logo" className=''/>
                            </div>
{/* bg-[#D7B56D] */}
                            <div>
                                <p className="text-lg font-semibold tracking-wide text-white">
                                    Tesla
                                </p>

                                <p className="text-xs tracking-[0.25em] text-white/50">
                                    Capital
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main message */}
                    <div className="max-w-xl">
                        <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.18em] text-[#D7B56D]">
                            SMARTER FINANCIAL GROWTH
                        </span>

                        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-6xl">
                            Put your money to work with confidence.
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-7 text-white/60 xl:text-lg">
                            Build your financial future with structured
                            investment plans designed to help you grow,
                            track and manage your money with ease.
                        </p>

                        {/* Benefits */}
                        {/* <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#D7B56D]/10 text-[#D7B56D]">
                                    ✓
                                </div>

                                <p className="font-medium text-white">
                                    Flexible Plans
                                </p>

                                <p className="mt-1 text-sm text-white/45">
                                    Choose an investment option that fits
                                    your goals.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#D7B56D]/10 text-[#D7B56D]">
                                    ↗
                                </div>

                                <p className="font-medium text-white">
                                    Track Your Growth
                                </p>

                                <p className="mt-1 text-sm text-white/45">
                                    Monitor your investments and returns
                                    from one place.
                                </p>
                            </div>
                        </div> */}
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/35">
                        <span>© {new Date().getFullYear()} Tesla Capital</span>

                        <span>Invest • Grow • Prosper</span>
                    </div>
                </div>
            </div>

            {/* Form Panel */}
            <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="mb-10 flex items-center gap-3 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white">
                            <img src="/tesla-logo.png" alt="logo" />
                        </div>

                        <div>
                            <p className="font-semibold text-[#12372A]">
                                Tesla Capital
                            </p>

                            <p className="text-[10px] tracking-[0.2em] text-[#12372A]/50">
                                SMARTER FINANCIAL GROWTH
                            </p>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mb-8">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#A47C2C]">
                            {eyebrow}
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight text-[#173024] sm:text-4xl">
                            {title}
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#173024]/55 sm:text-base">
                            {description}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="rounded-3xl border border-[#E5E0D4] bg-white p-6 shadow-[0_20px_60px_rgba(23,48,36,0.06)] sm:p-8">
                        {children}
                    </div>

                    <p className="mt-6 text-center text-xs leading-5 text-[#173024]/40">
                        Your information is protected and handled securely.
                    </p>
                </div>
            </div>
        </div>
    );
}
