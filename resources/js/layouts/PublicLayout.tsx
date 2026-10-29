
import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Plans' },
    { href: '/contact', label: 'Contact' },
];

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <>
            <header className="border-b border-[#E4DFD1]">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <Link
                        href="/"
                        className="font-serif text-lg tracking-tight"
                    >
                        Tesla Capital
                    </Link>

                    <nav className="hidden gap-8 text-sm sm:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[#173024] hover:text-[#C89B3C]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex gap-3">
                        <Link
                            href="/login"
                            className="hidden text-sm sm:block sm:self-center"
                        >
                            Log in
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-full bg-[#173024] px-5 py-2 text-sm font-medium text-[#F6F3EC] hover:bg-[#0E1E16]"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </header>

            <main>{children}</main>

            <footer className="mt-24 border-t border-[#E4DFD1] bg-white">
                <div className="mx-auto max-w-6xl px-6 py-12">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        <div className="col-span-2">
                            <p className="font-serif text-lg">
                                Tesla Capital
                            </p>

                            <p className="mt-2 max-w-xs text-sm text-[#6B7268]">
                                Capital-raising made transparent -- fixed-term
                                plans, published rates, and a statement you can
                                actually read.
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-[#6B7268]">
                                Company
                            </p>

                            <ul className="mt-3 space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/about"
                                        className="hover:text-[#C89B3C]"
                                    >
                                        About
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/services"
                                        className="hover:text-[#C89B3C]"
                                    >
                                        Plans
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:text-[#C89B3C]"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-[#6B7268]">
                                Account
                            </p>

                            <ul className="mt-3 space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/login"
                                        className="hover:text-[#C89B3C]"
                                    >
                                        Log in
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/register"
                                        className="hover:text-[#C89B3C]"
                                    >
                                        Create account
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-[#E4DFD1] pt-6">
                        <p className="text-xs leading-relaxed text-[#6B7268]">
                            Investing involves risk, including possible loss of
                            principal. Monthly returns reflect the rate stated
                            on your plan at the time of investment and are not
                            guaranteed by any government agency. Past
                            performance is not indicative of future results.
                            Please review our terms before investing.
                        </p>

                        <p className="mt-4 text-xs text-[#6B7268]">
                            &copy; {new Date().getFullYear()} Meridian Capital.
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
