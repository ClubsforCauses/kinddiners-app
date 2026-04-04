import { MarketingLayout } from '@/components/layout/MarketingLayout';

export default function RestaurantsPage() {
  const restaurants = [
    { name: 'Willow Street Wine Bar', neighborhood: 'Downtown', cuisine: 'Modern American', featured: true },
    { name: 'La Plaza Cantina', neighborhood: 'Midtown', cuisine: 'Mexican', featured: true },
    { name: 'Harbor Roof Lounge', neighborhood: 'Waterfront', cuisine: 'Cocktails & Small Plates', featured: false },
    { name: 'The Garden Bistro', neighborhood: 'Uptown', cuisine: 'French', featured: false },
    { name: 'Sakura Sushi House', neighborhood: 'Downtown', cuisine: 'Japanese', featured: true },
    { name: 'Bella Italia Trattoria', neighborhood: 'Little Italy', cuisine: 'Italian', featured: false },
  ];

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Partner Restaurants
            </h1>
            <p className="text-lg text-gray-600">
              Explore our curated collection of exceptional dining experiences.
              Each partner restaurant offers unique visits exclusive to Kind Diners Society members.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border-2 border-orange-600 bg-orange-50 px-5 py-2 text-sm font-semibold text-orange-700 transition-all hover:bg-orange-100">
              All Cuisines
            </button>
            <button className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-all hover:border-orange-600 hover:text-orange-700">
              Featured
            </button>
            <button className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-all hover:border-orange-600 hover:text-orange-700">
              Nearby
            </button>
            <button className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-all hover:border-orange-600 hover:text-orange-700">
              New Additions
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.name}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-200 hover:shadow-lg"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600">
                      {restaurant.name}
                    </h3>
                    {restaurant.featured && (
                      <span className="flex-shrink-0 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {restaurant.neighborhood}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                      </svg>
                      {restaurant.cuisine}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      One visit every 7 days
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a
                    href={`/restaurants/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-center rounded-lg bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition-all hover:bg-orange-100"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
