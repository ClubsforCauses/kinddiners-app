import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { MembershipCardWidget } from '@/components/MembershipCardWidget';
import { PartnerCarousel } from '@/components/PartnerCarousel';
import { Logo } from '@/components/ui/Logo';

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

        <section className="mt-32 space-y-12">
          <div className="text-center">
            <Logo className="mx-auto h-10 md:h-12 mb-4 opacity-90 object-contain" width={180} height={48} />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join Kind Diners Society in three simple steps and start experiencing exceptional dining.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Choose Your Membership</h3>
              <p className="text-gray-600">
                Select the plan that fits your dining style. All members get access to our curated restaurant network.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Discover & Book</h3>
              <p className="text-gray-600">
                Browse our partner restaurants, view exclusive discounts, and make reservations directly through the app.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Dine & Save</h3>
              <p className="text-gray-600">
                Show your digital membership card, enjoy amazing food, and save on every visit. It pays for itself quickly.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex justify-center">
              <img
                src="/assets/receipt-proof.svg"
                alt="Member savings receipt proof"
                className="w-full max-w-[320px] rounded-lg shadow-sm"
              />
            </div>

            <div className="rounded-3xl border-2 border-orange-600 bg-white p-8">
              <div className="space-y-6">
                <div>
                  <div className="mb-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                    Most Popular
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Annual Membership</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">$199</span>
                    <span className="text-lg text-gray-600">/year</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    'Unlimited restaurant visits every 7 days',
                    'Access to 50+ partner venues',
                    'Average savings of $29 per visit',
                    'Exclusive member-only events',
                    'Priority reservations',
                    'Referral rewards program',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Average visits per year</span>
                    <span className="font-semibold text-gray-900">50+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total potential savings</span>
                    <span className="font-semibold text-orange-600">$1,450+</span>
                  </div>
                </div>

                <a
                  href="/memberships"
                  className="block w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-center text-base font-semibold text-white shadow-xl shadow-orange-500/30 transition-all hover:shadow-2xl hover:shadow-orange-500/40"
                >
                  Get Started Today
                </a>

                <p className="text-center text-xs text-gray-500">
                  30-day money-back guarantee · Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100/50 p-8 md:p-12">
            <Logo className="h-8 opacity-80 mb-6 object-contain" width={120} height={32} />

            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Making a Difference</h2>
              <p className="text-lg text-gray-700 mb-8">
                Every meal you enjoy as a Kind Diners Society member directly supports local restaurants and hospitality workers.
                We're building a community that values exceptional dining experiences while making a positive impact on the industry.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 mb-8">
                <div className="rounded-xl bg-white/80 backdrop-blur p-6 shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-2">$150K+</div>
                  <div className="text-sm font-medium text-gray-900">Revenue to Local Restaurants</div>
                </div>
                <div className="rounded-xl bg-white/80 backdrop-blur p-6 shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-2">2,500+</div>
                  <div className="text-sm font-medium text-gray-900">Member Dining Experiences</div>
                </div>
              </div>

              <div className="relative rounded-xl border-2 border-orange-200 bg-white p-6 shadow-sm">
                <Logo className="absolute top-4 right-4 h-6 opacity-70 object-contain" width={80} height={24} />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 italic mb-3">
                      "As a restaurant owner, Kind Diners Society has brought us consistent business and introduced us to wonderful customers who truly appreciate hospitality."
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900">Marcus Chen</div>
                      <div className="text-sm text-gray-600">Owner, Willow Street Wine Bar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32 space-y-12">
          <div className="text-center">
            <Logo className="mx-auto h-10 mb-4 opacity-90 object-contain" width={150} height={40} />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Members Are Saying</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join hundreds of food lovers who are discovering amazing restaurants and saving money.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Logo className="w-64 opacity-5 object-contain" width={256} height={100} alt="" />
            </div>

            <div className="relative grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "This membership has completely changed how we dine out. We've discovered incredible restaurants we never would have tried, and the savings are real."
                </p>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Member since 2025</div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Best decision I made this year. The membership paid for itself in the first month, and I'm supporting local businesses at the same time."
                </p>
                <div>
                  <div className="font-semibold text-gray-900">David Martinez</div>
                  <div className="text-sm text-gray-600">Member since 2024</div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Love the variety of restaurants and the exclusive experiences. The referral program is a nice bonus too. Highly recommend!"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">Emily Chen</div>
                  <div className="text-sm text-gray-600">Member since 2025</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
