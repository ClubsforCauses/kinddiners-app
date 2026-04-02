import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function GiftCenterPage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            Gifts · Membership · Hospitality
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Gift memberships that unlock nights out all year.
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Send 3, 6, or 12 month Classic memberships as a premium gift. Each
            gift generates unique codes that map to gift_orders and gift_codes
            in the new system.
          </p>
          <ul className="space-y-1 text-xs text-slate-600 sm:text-sm">
            <li>• Personalized email delivery with gift certificate PDFs.</li>
            <li>• Codes redeemable once per recipient.</li>
            <li>• Integrates with the same redemption rules as regular plans.</li>
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-white/95 p-6 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(252,211,77,0.18),transparent_55%)]" />
          <div className="relative space-y-3 text-sm text-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              Sample gift certificate
            </p>
            <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100 px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-amber-900">
                  Kind Diners Membership Gift
                </p>
                <p className="text-[11px] text-amber-900/80">
                  3 months · Classic plan · Placeholder visuals
                </p>
              </div>
              <span className="rounded-full bg-amber-600 px-3 py-1 text-[11px] font-semibold text-white">
                VIP
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              Legacy assets like club card and badges from `/static/images`
              will be repurposed here once we wire in real certificates and
              branding from the design system.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Gift options"
          description="Actual pricing and checkout logic will be implemented via the unified billing provider and gift_orders schema."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-800 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              3-month gift
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Introductory experience for new members.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-800 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              6-month gift
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Ideal for holidays and special occasions.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-800 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              12-month gift
            </p>
            <p className="mt-1 text-xs text-slate-600">
              For family, clients, or team appreciation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Your gift orders"
          description="Once backend logic is wired in, this section will list past gift orders pulled from the database."
        />
        <EmptyState
          title="No gift orders yet"
          description="When you purchase Kind Diners gift memberships, they will appear here with status, recipients, and codes."
          actionLabel="Back to memberships"
          actionHref="/memberships"
        />
      </section>
    </div>
  );
}
