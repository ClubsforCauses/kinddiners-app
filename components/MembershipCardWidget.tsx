'use client';

export function MembershipCardWidget() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-80 w-80 rounded-full bg-orange-500/20 blur-3xl lg:h-96 lg:w-96"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="rounded-2xl border-2 border-orange-500 bg-white p-6 shadow-lg md:p-8">
          <div className="mb-4 flex justify-center">
            <div className="relative w-[150px] md:w-[170px]">
              <div className="animate-float">
                <svg
                  viewBox="0 0 340 214"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full rotate-[-4deg] drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)] opacity-[0.97]"
                >
                  <rect width="340" height="214" rx="16" fill="url(#silver-gradient)" />

                  <defs>
                    <linearGradient id="silver-gradient" x1="0" y1="0" x2="340" y2="214" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E5E7EB" />
                      <stop offset="0.5" stopColor="#F3F4F6" />
                      <stop offset="1" stopColor="#D1D5DB" />
                    </linearGradient>
                  </defs>

                  <circle cx="40" cy="40" r="20" fill="#F97316" opacity="0.9" />

                  <text x="40" y="48" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Plus Jakarta Sans, sans-serif">
                    KDS
                  </text>

                  <text x="20" y="85" fill="#6B7280" fontSize="14" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
                    Kind Diners Society
                  </text>

                  <text x="20" y="110" fill="#9CA3AF" fontSize="11" fontFamily="DM Sans, sans-serif">
                    MEMBER SINCE 2026
                  </text>

                  <rect x="20" y="130" width="120" height="8" rx="4" fill="#E5E7EB" />
                  <rect x="20" y="145" width="90" height="8" rx="4" fill="#E5E7EB" />

                  <text x="20" y="180" fill="#9CA3AF" fontSize="10" fontFamily="DM Sans, sans-serif">
                    •••• •••• •••• 4242
                  </text>

                  <g opacity="0.1">
                    <circle cx="280" cy="60" r="60" fill="#F97316" />
                    <circle cx="300" cy="140" r="40" fill="#F97316" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-sm font-medium text-gray-600">
              No active membership yet
            </p>

            <div className="space-y-3">
              <a
                href="/memberships"
                className="block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40"
              >
                Join Now
              </a>
              <a
                href="/restaurants"
                className="block rounded-full border-2 border-orange-600 bg-white px-6 py-3 text-sm font-semibold text-orange-600 transition-all hover:bg-orange-50"
              >
                Browse Restaurants
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
