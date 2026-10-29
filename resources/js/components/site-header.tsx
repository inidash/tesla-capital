
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Services',
        href: '/services',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
];

export default function SiteHeader() {
    const { url } = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    const isActive = (href: string) => {
        if (href === '/') {
            return url === '/';
        }

        return url === href || url.startsWith(`${href}/`);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-[#E6E1D7] bg-[#F7F5EF]/95 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-[#F7F5EF]">
                        <img src="/tesla-logo.png" alt="logo" />
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm font-bold tracking-wide text-[#173024]">
                            Tesla Capital
                        </p>

                        <p className="text-xs text-[#6B746E]">
                            Invest with clarity
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navigation.map((item) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className={[
                                    'relative py-2 text-sm transition-colors',
                                    active
                                        ? 'font-semibold text-[#173024]'
                                        : 'font-medium text-[#4F5B53] hover:text-[#173024]',
                                ].join(' ')}
                            >
                                {item.label}

                                {active && (
                                    <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#173024]" />
                                )}
                            </Link>
                        );
                    })}

                    {/* Account Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="rounded-xl border border-[#173024] px-5 py-2.5 text-sm font-semibold text-[#173024] transition hover:bg-[#E9E6DD]"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-xl bg-[#173024] px-5 py-2.5 text-sm font-semibold text-[#F7F5EF] transition hover:bg-[#234636]"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((open) => !open)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9D5CB] text-[#173024] transition hover:bg-[#ECE9E0] md:hidden"
                    aria-label={
                        mobileOpen
                            ? 'Close navigation menu'
                            : 'Open navigation menu'
                    }
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <div className="border-t border-[#E6E1D7] bg-[#F7F5EF] md:hidden">
                    <nav className="mx-auto max-w-7xl px-5 py-4 sm:px-6">
                        <div className="flex flex-col">
                            {navigation.map((item) => {
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={closeMobileMenu}
                                        className={[
                                            'border-b border-[#E6E1D7] py-4 text-sm transition-colors',
                                            active
                                                ? 'font-semibold text-[#173024]'
                                                : 'font-medium text-[#4F5B53] hover:text-[#173024]',
                                        ].join(' ')}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{item.label}</span>

                                            {active && (
                                                <span className="h-2 w-2 rounded-full bg-[#173024]" />
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}

                            {/* Mobile Account Actions */}
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <Link
                                    href="/login"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center rounded-xl border border-[#173024] px-4 py-3 text-sm font-semibold text-[#173024] transition hover:bg-[#E9E6DD]"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/investments/create"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center rounded-xl bg-[#173024] px-4 py-3 text-sm font-semibold text-[#F7F5EF] transition hover:bg-[#234636]"
                                >
                                    Start Investing
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
