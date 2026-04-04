'use client';

const PARTNER_LOGOS = [
  "https://kinddiners.com/images/1.png",
  "https://kinddiners.com/images/2.png",
  "https://kinddiners.com/images/3.png",
  "https://kinddiners.com/images/4.png",
  "https://kinddiners.com/images/5.png",
  "https://kinddiners.com/images/6.png",
  "https://kinddiners.com/images/7.png",
  "https://kinddiners.com/images/8.png",
  "https://kinddiners.com/images/9.png",
  "https://kinddiners.com/images/10.png",
  "https://kinddiners.com/images/11.png",
  "https://kinddiners.com/images/12.png",
];

export function PartnerCarousel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white py-8 shadow-sm">
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Our Partner Restaurants
        </p>
      </div>

      <div className="relative">
        <div className="flex gap-8 animate-scroll-left hover:pause-animation">
          {PARTNER_LOGOS.map((logo, index) => (
            <img
              key={`logo-1-${index}`}
              src={logo}
              alt={`Partner ${index + 1}`}
              className="h-16 w-auto flex-shrink-0 object-contain opacity-90 transition hover:opacity-100 md:h-20 lg:h-[90px]"
            />
          ))}
          {PARTNER_LOGOS.map((logo, index) => (
            <img
              key={`logo-2-${index}`}
              src={logo}
              alt={`Partner ${index + 1}`}
              className="h-16 w-auto flex-shrink-0 object-contain opacity-90 transition hover:opacity-100 md:h-20 lg:h-[90px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
