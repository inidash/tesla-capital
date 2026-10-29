import React from 'react'
import { Link } from '@inertiajs/react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Plans' },
  { href: '/contact', label: 'Contact' },
];


export default function PublicLayout() {
    return(
        <header
        className={'fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-sm bg-white/20 shadow-sm'}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto transition-all duration-300"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2 cursor-pointer">
              <span className="sr-only">TSL INVEST</span>
              <div className="bg-purple-600 p-2 rounded-lg">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=600"
                  className="h-6 w-auto"
                />
              </div>
              <span className="font-bold text-xl text-gray-900">TSL INVEST</span>
            </Link>
          </div>

          {/* mobile menu button (visible on small screens) */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <BookMarkedIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* desktop navigation (visible on large screens) */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-md font-medium text-gray-700 hover:text-purple-600 transition-colors cursor-pointer transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link
              href={login()}
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors flex items-center"
            >
              Log in
            </Link>
            <Link
              href={register()}
              className="text-md font-medium px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
          <DialogContent className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=600"
                    className="h-6 w-auto"
                  />
                </div>
                <span className="font-bold text-xl text-gray-900">TSL INVEST</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-full p-2.5 text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <XIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-1 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <Link
                    href={login()}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                  <Link
                    href={register()}
                    className="block rounded-full px-3 py-2.5 text-base font-medium text-center text-white bg-black-600 hover:bg-purple-700 transition-colors shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
    );
}
