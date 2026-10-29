import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { dashboard, login } from '@/routes';
import { register } from '@/routes';

import { ArrowRightIcon, StarIcon, BookmarkIcon,
  XIcon,
  SparklesIcon,
  BookMarkedIcon
   } from "lucide-react";

const navigation = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Services", href: "#" },
  { name: "Investment Plan", href: "#" },
  { name: "Contact Us", href: "#" },
];

export default function HeroSectionFour() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 0;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

  return (
    <div className="bg-white min-h-screen">
      

      <div className="relative isolate pt-24 md:pt-32 pb-0 px-6 lg:px-8">
        {/* Decorative elements */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-indigo-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Announcement badge */}
          <div className="mb-10 sm:mb-16 flex justify-center">
            <div className="relative flex items-center gap-x-2 rounded-full px-4 py-2 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-white/80 backdrop-blur-sm shadow-sm">
              <SparklesIcon
                className="h-4 w-4 text-purple-600"
                aria-hidden="true"
              />
              <span className="font-medium">
                More investment options are now available.
              </span>
              <a
                href="#"
                className="flex items-center gap-x-1 font-semibold text-purple-600"
              >
                <span>See what's new</span>
                <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                <span className="absolute inset-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Main hero content */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl leading-tight">
              The investment platform
              <br className="hidden sm:inline" /> for
              <span className="text-purple-600"> the elite technology brands</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get real value, predictive analytics, and actionable
              recommendations that help you make better investment decisions.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <Link
                href={register()}
                className="rounded-full bg-purple-600 px-6 py-3.5 text-base font-medium text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-1 flex-none w-full sm:w-auto"
              >
                Start your investment journey
              </Link>
              <Link
                href={login()}
                className="rounded-full px-6 py-3.5 text-base font-medium text-gray-700 ring-1 ring-gray-200 hover:ring-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-x-2 flex-none w-full sm:w-auto"
              >
                Log in to your account
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Client ratings */}
            <div className="mt-8 flex items-center justify-center space-x-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">
                Rated 4.9/5 from over 1,200+ reviews
              </span>
            </div>
          </div>

          {/* Full width image below CTAs */}
          <div className="mt-16 sm:mt-24 overflow-hidden rounded-t-3xl shadow-2xl mx-auto max-w-7xl">
            <img
              src="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfZqftiIU9C3gHFdyzTE0q7PpDnjchu6XsKk1l"
              alt="Dashboard preview"
              className="w-full h-auto object-cover object-center"
            />
          </div>
        </div>

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-indigo-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
