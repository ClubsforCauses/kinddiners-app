'use client';

import { useState } from 'react';
import kdsLogo from '@/app/assets/kds-logo.svg';

type NavItem = {
  label: string;
  href: string;
};

const navLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Restaurants', href: '/restaurants' },
  { label: 'Impact', href: '/our-mission' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/coming-soon' },
];

export function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-amber-100/50 bg-amber-50/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <img src={kdsLogo.src} alt="Kind Diners Society" className="h-10 md:h-12" />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-orange-600"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-white/60 hover:text-gray-900"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Log In
            </a>
            <a
              href="/memberships"
              className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Join Now
            </a>
          </div>
        </div>

        <button
          type="button"
          className="lg:hidden rounded-lg p-2 text-gray-700 hover:bg-white/60"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-amber-100/50 bg-amber-50/95 backdrop-blur-md lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-6 pb-4 pt-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-white/60 hover:text-orange-600"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href="/login"
                className="block rounded-lg border border-gray-300 bg-white px-4 py-3 text-center text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </a>
              <a
                href="/memberships"
                className="block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-orange-500/25"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
