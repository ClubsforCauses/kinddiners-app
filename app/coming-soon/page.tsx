import { MarketingLayout } from '@/components/layout/MarketingLayout';

export default function ComingSoonPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="space-y-12 text-center">
          <div className="space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-xl">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-xl text-lg text-gray-600">
              We're building something special and would love to hear from you.
              Contact support is coming soon.
            </p>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-lg lg:p-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                In the Meantime
              </h2>
              <div className="grid gap-6 text-left sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Check the FAQ
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Most common questions are answered in our FAQ section.
                  </p>
                  <a
                    href="/faq"
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Visit FAQ →
                  </a>
                </div>

                <div className="rounded-xl border border-gray-200 p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Read Our Mission
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Learn more about our vision and community impact.
                  </p>
                  <a
                    href="/our-mission"
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Our Mission →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white shadow-xl lg:p-12">
            <h2 className="mb-4 text-2xl font-bold">
              Ready to Join?
            </h2>
            <p className="mb-6 text-lg opacity-90">
              Don't wait to start discovering exceptional restaurants and earning referral rewards.
            </p>
            <a
              href="/memberships"
              className="inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-orange-600 shadow-lg transition-all hover:bg-gray-50"
            >
              Explore Memberships
            </a>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
