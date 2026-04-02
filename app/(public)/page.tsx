export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Membership · Restaurant discovery · Give-back
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Discover local restaurants, reward your referrals, and fund good
            causes.
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Kind Diners Society is a membership that unlocks curated
            restaurants, one visit at a time. Refer friends, earn payouts, and
            help fund the hospitality community.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/join/CLASSIC"
              className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(16,185,129,0.9)] hover:bg-emerald-700"
            >
              Join now
            </a>
            <a
              href="/restaurants"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Browse restaurants
            </a>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-4 text-xs text-gray-600 sm:text-sm">
            <div>
              <dt className="font-medium text-gray-800">Members</dt>
              <dd>——</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-800">Partner restaurants</dt>
              <dd>——</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-800">Cities</dt>
              <dd>——</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-white/80 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            How it works
          </p>
          <ol className="mt-4 space-y-3 text-sm text-gray-700">
            <li>
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                1
              </span>
              Join as a Classic or Ambassador member.
            </li>
            <li>
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                2
              </span>
              Explore curated restaurants and redeem your visits.
            </li>
            <li>
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                3
              </span>
              Share your referral link and earn payouts when friends join.
            </li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
            Featured restaurants
          </h2>
          <a
            href="/restaurants"
            className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
          >
            View all
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Downtown Wine Bar", "Neighborhood Bistro", "Rooftop Lounge"].map(
            (name) => (
              <div
                key={name}
                className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    —— Neighborhood · Cuisine · $$ · One visit every 7 days
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Member favorite</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                    Featured
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
