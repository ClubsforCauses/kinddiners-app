import kdsLogo from '@/app/assets/kds-logo.svg';

export function MarketingFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <img src={kdsLogo.src} alt="Kind Diners Society" className="h-10 brightness-0 invert" />
            <p className="text-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Discover exceptional restaurants, support local hospitality, and give back with every meal.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Explore
            </h3>
            <ul className="space-y-3 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <li>
                <a href="/restaurants" className="transition-colors hover:text-orange-400">
                  Restaurants
                </a>
              </li>
              <li>
                <a href="/memberships" className="transition-colors hover:text-orange-400">
                  Memberships
                </a>
              </li>
              <li>
                <a href="/gift-center" className="transition-colors hover:text-orange-400">
                  Gift Center
                </a>
              </li>
              <li>
                <a href="/referral-program" className="transition-colors hover:text-orange-400">
                  Referral Program
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Help
            </h3>
            <ul className="space-y-3 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <li>
                <a href="/faq" className="transition-colors hover:text-orange-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/our-mission" className="transition-colors hover:text-orange-400">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="/coming-soon" className="transition-colors hover:text-orange-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/profile" className="transition-colors hover:text-orange-400">
                  My Profile
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Partners
            </h3>
            <ul className="space-y-3 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <li>
                <a href="/restaurant-login" className="transition-colors hover:text-orange-400">
                  Restaurant Login
                </a>
              </li>
              <li>
                <a href="/portal/dashboard" className="transition-colors hover:text-orange-400">
                  Partner Portal
                </a>
              </li>
              <li>
                <a href="/admin/dashboard" className="transition-colors hover:text-orange-400">
                  Admin Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <p>© 2026 Kind Diners Society. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/coming-soon" className="transition-colors hover:text-orange-400">
                Privacy
              </a>
              <a href="/coming-soon" className="transition-colors hover:text-orange-400">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
