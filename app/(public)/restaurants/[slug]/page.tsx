import { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";

type Props = { params: { slug: string } };

export default function RestaurantDetailPage({ params }: Props) {
  const { slug } = params;

  const badge = (label: string): ReactNode => (
    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
      {label}
    </span>
  );

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-6 rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Restaurant
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {slug.replace(/-/g, " ")}
          </h1>
          <p className="text-sm text-gray-600">
            Placeholder copy for a featured Kind Diners partner restaurant.
            This will map to the new restaurants table in the future-state
            schema.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-700">
            {badge("Modern American")}
            {badge("Downtown")}
            {badge("$$")}
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-800">
              1 visit every 7 days
            </span>
          </div>
        </div>
        <div className="space-y-2 text-xs text-gray-600">
          <p className="font-semibold text-gray-900">Availability</p>
          <p>Available to active Classic and Ambassador members.</p>
          <p className="mt-2 text-[11px] text-gray-500">
            Redemption limits and visit rules will be enforced via the
            redemptions table and membership engine in platform-v2.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <SectionHeader
            title="Why members love it"
            description="Highlight what makes this restaurant special from a Kind Diners point of view."
          />
          <div className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-700">
            Placeholder description. In the rebuilt system this will come from
            structured restaurant content (why_should_visit, fine_print, and
            related fields).
          </div>
        </div>
        <div className="space-y-4">
          <SectionHeader
            title="Location & hours"
            description="Address and opening hours from the restaurants table."
          />
          <div className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">
              Address (placeholder)
            </p>
            <p className="mt-1 text-sm text-gray-700">
              123 Sample Street, Sample City, ST 00000
            </p>
            <a
              href="#"
              className="mt-3 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View on map
            </a>
          </div>
          <EmptyState
            title="Upcoming events"
            description="Use this section for special nights, campaigns, or seasonal menus once content is wired up."
          />
        </div>
      </section>
    </div>
  );
}
