
import { Link } from '@inertiajs/react';

export default function SiteFooter() {
    return (
        <footer className="border-t border-[#E4DFD1] bg-[#173024] text-white">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center text-xl font-semibold tracking-tight"
                        >
                            <img src="/tesla-logo.png" alt="" className='h-10 w-10'/>
                            Tesla Capital
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
                            A structured investment platform designed to make
                            investment participation simpler, clearer and easier
                            to manage.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Platform
                        </h3>

                        <div className="mt-4 space-y-3">
                            <Link
                                href="/plans"
                                className="block text-sm text-white/60 transition hover:text-white"
                            >
                                Investment Plans
                            </Link>

                            <Link
                                href="/about"
                                className="block text-sm text-white/60 transition hover:text-white"
                            >
                                About Us
                            </Link>

                            <Link
                                href="/services"
                                className="block text-sm text-white/60 transition hover:text-white"
                            >
                                Services
                            </Link>

                            <Link
                                href="/contact"
                                className="block text-sm text-white/60 transition hover:text-white"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Account
                        </h3>

                        <div className="mt-4 space-y-3">
                            <Link
                                href="/login"
                                className="block text-sm text-white/60 transition hover:text-white"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/register"
                                className="block text-sm text-white/60 transition hover:text-white"
                            >
                                Create Account
                            </Link>

                            <Link
                                href="/dashboard"
                                className="block text-sm text-white/60 transition hover:text-white"
                            >
                                Investor Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Contact
                        </h3>

                        <div className="mt-4 space-y-3 text-sm text-white/60">
                            <p>teslashare731@gmail.com</p>

                            <p className="leading-6">
                                For account, investment and transaction enquiries,
                                please contact our support team.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-white/45">
                        © {new Date().getFullYear()} Tesla Capital. All rights
                        reserved.
                    </p>

                    <div className="flex gap-5">
                        <Link
                            href="/"
                            className="text-xs text-white/45 transition hover:text-white"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/"
                            className="text-xs text-white/45 transition hover:text-white"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
