import { MarketingLayout } from '@/components/layout/MarketingLayout';

export default function OurMissionPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Mission & Impact
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
              Kind Diners Society exists to strengthen local hospitality communities,
              support independent restaurants, and create meaningful connections through dining.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Support Local Restaurants
              </h3>
              <p className="text-sm text-gray-600">
                Every membership directly supports independent restaurants and helps sustain local culinary culture.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Build Community
              </h3>
              <p className="text-sm text-gray-600">
                Connect diners with exceptional experiences and foster a community that values quality hospitality.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Give Back
              </h3>
              <p className="text-sm text-gray-600">
                A portion of every membership supports hospitality workers and local food programs.
              </p>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-orange-100 bg-white p-8 shadow-lg lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Why We Exist
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The hospitality industry is the heart of our communities. Independent restaurants
                create gathering places, preserve culinary traditions, and provide livelihoods for
                millions of workers.
              </p>
              <p>
                Kind Diners Society was founded to create a sustainable model that benefits everyone:
                members discover incredible dining experiences, restaurants gain loyal patrons, and
                the broader community receives ongoing support.
              </p>
              <p>
                Through our membership model and referral program, we create a virtuous cycle where
                every meal matters, every referral counts, and every member contributes to something
                larger than themselves.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-center text-white shadow-xl lg:p-12">
            <h2 className="mb-4 text-2xl font-bold">
              Join Our Movement
            </h2>
            <p className="mb-6 text-lg opacity-90">
              Become part of a community that values exceptional dining and meaningful impact.
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
