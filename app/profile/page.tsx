import { StatCard } from "@/components/ui/Card";
import { SimpleTable } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Plan"
          value="Classic"
          helper="Renews ———"
          trend="Upgradable to Ambassador"
        />
        <StatCard
          title="Eligible restaurants"
          value="——"
          helper="Based on your home region"
        />
        <StatCard
          title="Visits this month"
          value="——"
          helper="Across all partner restaurants"
        />
        <StatCard
          title="Referral earnings"
          value="$——"
          helper="Approved, not yet paid"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">
              Recent visits
            </h2>
            <a
              href="/(member)/visit-log"
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
            >
              View all
            </a>
          </div>
          <SimpleTable
            columns={[
              { key: "restaurant", label: "Restaurant" },
              { key: "date", label: "Visit date" },
              { key: "status", label: "Status" },
            ]}
          >
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                —— Restaurant
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">——</td>
              <td className="px-4 py-3">
                <StatusBadge status="active" />
              </td>
            </tr>
          </SimpleTable>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Referral snapshot
          </h2>
          <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-900">
            <p className="font-semibold">Your referral link</p>
            <p className="mt-1 break-all text-xs text-emerald-800">
              https://kinddiners.com/r/——
            </p>
            <p className="mt-3 text-xs text-emerald-900">
              Share with friends and earn when they become active members.
              Referral tracking and payout logic will be wired up to the new
              database in a later phase.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
