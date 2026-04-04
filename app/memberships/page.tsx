import { MarketingLayout } from '@/components/layout/MarketingLayout';

export default function MembershipsPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="space-y-16">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
              Choose Your Membership
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Join Kind Diners Society
            </h1>
            <p className="text-lg text-gray-600">
              Every membership unlocks curated restaurant experiences, referral rewards, and supports the hospitality community.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:border-orange-200 hover:shadow-xl">
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Classic</h2>
                  <p className="mt-2 text-gray-600">
                    Perfect for regular diners who love exploring local restaurants.
                  </p>
                </div>
                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Unlimited Access</p>
                      <p className="text-sm text-gray-600">Visit partner restaurants once every 7 days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Curated Partners</p>
                      <p className="text-sm text-gray-600">50+ exceptional restaurants across multiple cities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Member Support</p>
                      <p className="text-sm text-gray-600">Dedicated customer service and community access</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-gray-50 p-4 text-center">
                  <p className="text-sm text-gray-600">Starting at</p>
                  <p className="text-3xl font-bold text-gray-900">$XX<span className="text-lg font-medium text-gray-600">/mo</span></p>
                </div>
                <a
                  href="/join/CLASSIC"
                  className="block rounded-full border-2 border-orange-600 bg-white px-6 py-3 text-center text-base font-semibold text-orange-600 transition-all hover:bg-orange-50"
                >
                  Select Classic
                </a>
              </div>
            </div>

            <div className="relative flex flex-col rounded-3xl border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-white p-8 shadow-2xl shadow-orange-500/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1 text-sm font-bold text-white shadow-lg">
                  Most Popular
                </span>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Ambassador</h2>
                  <p className="mt-2 text-gray-600">
                    For members who love to share and earn referral rewards.
                  </p>
                </div>
                <div className="space-y-4 border-t border-orange-100 pt-6">
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Everything in Classic</p>
                      <p className="text-sm text-gray-600">All restaurant access and member benefits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Enhanced Referrals</p>
                      <p className="text-sm text-gray-600">Higher payout rates for every referral you bring</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Personal Link</p>
                      <p className="text-sm text-gray-600">Custom referral code with tracking dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Priority Support</p>
                      <p className="text-sm text-gray-600">Fast-track customer service and early feature access</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-center text-white">
                  <p className="text-sm opacity-90">Starting at</p>
                  <p className="text-3xl font-bold">$XX<span className="text-lg font-medium opacity-90">/mo</span></p>
                </div>
                <a
                  href="/join/AMBASSADOR"
                  className="block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-center text-base font-semibold text-white shadow-xl shadow-orange-500/30 transition-all hover:shadow-2xl hover:shadow-orange-500/40"
                >
                  Select Ambassador
                </a>
              </div>
            </div>

            <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:border-orange-200 hover:shadow-xl">
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Gift Membership</h2>
                  <p className="mt-2 text-gray-600">
                    Share the experience with friends and family.
                  </p>
                </div>
                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Flexible Terms</p>
                      <p className="text-sm text-gray-600">Choose 3, 6, or 12-month gift memberships</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Unique Codes</p>
                      <p className="text-sm text-gray-600">Redeemable gift codes delivered instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Perfect Gift</p>
                      <p className="text-sm text-gray-600">Ideal for holidays, celebrations, and special occasions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-gray-50 p-4 text-center">
                  <p className="text-sm text-gray-600">Starting at</p>
                  <p className="text-3xl font-bold text-gray-900">$XX</p>
                </div>
                <a
                  href="/gift-center"
                  className="block rounded-full border-2 border-orange-600 bg-white px-6 py-3 text-center text-base font-semibold text-orange-600 transition-all hover:bg-orange-50"
                >
                  Give a Gift
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-3xl rounded-3xl border border-orange-100 bg-white p-8 shadow-lg lg:p-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              All Memberships Include
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Restaurant Access</p>
                  <p className="text-sm text-gray-600">Visit partner venues once every 7 days</p>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">QR Redemption</p>
                  <p className="text-sm text-gray-600">Simple mobile code system</p>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Community Impact</p>
                  <p className="text-sm text-gray-600">Support local hospitality workers</p>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="h-6 w-6 flex-shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">No Commitments</p>
                  <p className="text-sm text-gray-600">Cancel anytime, no questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
