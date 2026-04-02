import { StatCard } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function MembershipsPage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            Memberships · Classic · Ambassador
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Choose the membership that matches how you dine.
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Every plan includes access to curated partner restaurants and
            supports hospitality workers through referral payouts and programs
            described in the Kind Diners system architecture.
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• One visit per restaurant every 7 days.</li>
            <li>• Clear referral attribution with configurable payout rates.</li>
            <li>• Gift plans that convert into Classic memberships.</li>
          </ul>
        </div>
        <div className="space-y-3 rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Snapshot
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <StatCard title="Classic" value="——" helper="Primary plan" />
            <StatCard title="Ambassador" value="——" helper="Referral-eligible" />
            <StatCard title="Gift" value="3 · 6 · 12" helper="Month options" />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Compare plans"
          description="Exact pricing and billing provider integration will be wired via the memberships and plans tables in platform-v2."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white/95 p-5 shadow-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Classic
              </p>
              <p className="text-sm text-slate-600">
                Core membership with access to all eligible partner restaurants.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                <li>• One visit per restaurant every 7 days</li>
                <li>• Eligible for some referral programs</li>
                <li>• Ideal for regular local dining</li>
              </ul>
            </div>
            <a
              href="/join/CLASSIC"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Continue with Classic
            </a>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm ring-1 ring-emerald-100">
            <div className="space-y-2">
              <p className="inline-flex items-center rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                Ambassador
              </p>
              <p className="text-sm text-emerald-900">
                Everything in Classic plus enhanced referral benefits.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-emerald-900/90">
                <li>• Eligible to own referral codes</li>
                <li>• Higher payout rates (e.g. $3 per AMBASSADOR referral)</li>
                <li>• Best for members who share Kind Diners often</li>
              </ul>
            </div>
            <a
              href="/join/AMBASSADOR"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-800"
            >
              Continue with Ambassador
            </a>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-amber-100 bg-white/95 p-5 shadow-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
                Gift memberships
              </p>
              <p className="text-sm text-slate-700">
                Gift 3, 6, or 12 month Classic memberships with unique gift
                codes.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                <li>• Codes redeemable once per recipient</li>
                <li>• Integrates with the gift_orders and gift_codes tables</li>
                <li>• Ideal for holidays and celebrations</li>
              </ul>
            </div>
            <a
              href="/gift-center"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-amber-300 px-4 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-50"
            >
              Explore gift options
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
