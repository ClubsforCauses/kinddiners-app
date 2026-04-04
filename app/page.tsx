import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { MembershipCardWidget } from '@/components/MembershipCardWidget';
import { PartnerCarousel } from '@/components/PartnerCarousel';

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

        <section className="mt-20">
          <PartnerCarousel />
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Willow Street Wine Bar',
                location: 'Downtown',
                cuisine: 'Modern American',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
                discount: '20% Off'
              },
              {
                name: 'La Plaza Cantina',
                location: 'Midtown',
                cuisine: 'Mexican',
                image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&h=400&fit=crop',
                discount: '15% Off'
              },
              {
                name: 'Harbor Roof Lounge',
                location: 'Waterfront',
                cuisine: 'Cocktails & Small Plates',
                image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop',
                discount: '25% Off'
              },
            ].map((restaurant) => (
              <div
                key={restaurant.name}
                className="group overflow-hidden rounded-2xl border border-black/6 bg-white transition hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {restaurant.name}
                    </h3>
                    <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                      {restaurant.discount}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">{restaurant.cuisine}</p>
                    <p className="text-sm text-gray-600">{restaurant.location}</p>
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
