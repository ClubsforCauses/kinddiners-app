import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { MembershipCardWidget } from '@/components/MembershipCardWidget';

export default function HomePage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <section className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Membership · Discovery · Impact
              </span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Discover exceptional restaurants, support hospitality.
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                Kind Diners Society connects you to curated dining experiences.
                Each membership unlocks restaurant visits, referral rewards, and gives back to the community.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/memberships"
                className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-orange-500/30 transition-all hover:shadow-2xl hover:shadow-orange-500/40"
              >
                Join Now
              </a>
              <a
                href="/restaurants"
                className="rounded-full border-2 border-orange-600 px-8 py-4 text-base font-semibold text-orange-600 transition-all hover:bg-orange-50"
              >
                View Restaurants
              </a>
            </div>
            <dl className="grid grid-cols-3 gap-6 pt-4">
              <div>
                <dt className="text-sm font-medium text-gray-600">Active Members</dt>
                <dd className="mt-1 text-2xl font-bold text-gray-900">500+</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Partner Venues</dt>
                <dd className="mt-1 text-2xl font-bold text-gray-900">50+</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Cities</dt>
                <dd className="mt-1 text-2xl font-bold text-gray-900">5+</dd>
              </div>
            </dl>
          </div>

          <MembershipCardWidget />
        </section>

        <section className="mt-20 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Restaurants
            </h2>
            <a
              href="/restaurants"
              className="text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
            >
              View All →
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Willow Street Wine Bar', neighborhood: 'Downtown', cuisine: 'Modern American' },
              { name: 'La Plaza Cantina', neighborhood: 'Midtown', cuisine: 'Mexican' },
              { name: 'Harbor Roof Lounge', neighborhood: 'Waterfront', cuisine: 'Cocktails & Small Plates' },
            ].map((restaurant) => (
              <div
                key={restaurant.name}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-200 hover:shadow-lg"
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600">
                    {restaurant.name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{restaurant.neighborhood} · {restaurant.cuisine}</p>
                    <p className="text-xs">One visit every 7 days</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">Member Favorite</span>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                      Featured
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
