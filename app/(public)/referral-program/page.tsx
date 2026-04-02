import { StatCard } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ReferralProgramPage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            Referrals · Ambassadors · Restaurants
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            A referral engine designed for members and restaurants.
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            The Kind Diners referral program is implemented via referral_codes,
            referrals, payouts, and payout_items in the new schema. This page
            introduces how it works for future UI wiring.
          </p>
          <ul className="space-y-1 text-xs text-slate-700 sm:text-sm">
            <li>• Ambassadors earn when friends become active members.</li>
            <li>• Restaurants earn when diners they refer become members.</li>
            <li>• Payouts are calculated monthly and delivered via Tremendous.</li>
          </ul>
        </div>
        <div className="space-y-3 rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Example payouts
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <StatCard
              title="Member referral"
              value="$3"
              helper="AMBASSADOR referring AMBASSADOR"
            />
            <StatCard
              title="Member referral"
              value="$2"
              helper="AMBASSADOR referring CLASSIC"
            />
            <StatCard
              title="Restaurant referral"
              value="$2.50"
              helper="Restaurant referring AMBASSADOR"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="How referrals are tracked"
          description="Based on referral_codes and referrals tables and described in the SaaS architecture spec."
        />
        <ul className="space-y-2 text-sm text-slate-700">
          <li>
            • Each Ambassador or restaurant has a unique referral code mapped to
            referral_codes.
          </li>
          <li>
            • When a new member joins with that code, a referral row is created
            linking member, sponsor, and membership.
          </li>
          <li>
            • Monthly jobs populate payouts and payout_items for eligible
            referrals.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Your referrals (preview)"
          description="This section will eventually show your referrals once you are signed in."
        />
        <EmptyState
          title="Sign in to see your referrals"
          description="The member and restaurant portal dashboards provide live referral reporting. This marketing page is a high-level overview."
          actionLabel="Go to login"
          actionHref="/login"
        />
      </section>
    </div>
  );
}
