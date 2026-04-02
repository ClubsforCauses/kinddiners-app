import { StatCard } from "@/components/ui/Card";
import { SimpleTable } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function PortalDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Members this month"
          value="——"
          helper="Joined with your referral or promo"
        />
        <StatCard
          title="Visits this month"
          value="——"
          helper="Redemptions at your location"
        />
        <StatCard
          title="Pending payouts"
          value="$——"
          helper="Awaiting Kind Diners approval"
        />
        <StatCard
          title="Marketing assets"
          value="——"
          helper="Available to download"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Recent member visits
            </h2>
            <a
              href="/(portal)/logistics"
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
            >
              View all
            </a>
          </div>
          <SimpleTable
            columns={[
              { key: "member", label: "Member" },
              { key: "date", label: "Visit date" },
              { key: "status", label: "Status" },
            ]}
          >
            <tr className="hover:bg-slate-50">
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                —— Member
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">——</td>
              <td className="px-4 py-3">
                <StatusBadge status="active" />
              </td>
            </tr>
          </SimpleTable>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Quick actions
          </h2>
          <div className="space-y-3 rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700">
            <button className="w-full rounded-md border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-800 hover:border-emerald-500 hover:text-emerald-700">
              Download latest marketing kit
            </button>
            <button className="w-full rounded-md border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-800 hover:border-emerald-500 hover:text-emerald-700">
              Invite a new sub-admin
            </button>
            <button className="w-full rounded-md border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-800 hover:border-emerald-500 hover:text-emerald-700">
              Review pending payouts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
