import { StatCard } from "@/components/ui/Card";
import { SimpleTable } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active members"
          value="——"
          helper="Across all plans"
        />
        <StatCard
          title="Active restaurants"
          value="——"
          helper="With live portal access"
        />
        <StatCard
          title="Pending payouts"
          value="$——"
          helper="Awaiting approval or Tremendous"
        />
        <StatCard
          title="Errors (24h)"
          value="——"
          helper="From err / err_400 tables"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-50">
              Recent signups
            </h2>
            <a
              href="/admin/customers"
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
            >
              View all
            </a>
          </div>
          <SimpleTable
            columns={[
              { key: "name", label: "Member" },
              { key: "plan", label: "Plan" },
              { key: "status", label: "Status" },
              { key: "created", label: "Joined", align: "right" },
            ]}
          >
            <tr className="bg-slate-900 hover:bg-slate-800">
              <td className="px-4 py-3 text-sm font-medium text-slate-50">
                —— Member
              </td>
              <td className="px-4 py-3 text-sm text-slate-200">AMBASSADOR</td>
              <td className="px-4 py-3">
                <StatusBadge status="active" />
              </td>
              <td className="px-4 py-3 text-right text-sm text-slate-200">
                —— ago
              </td>
            </tr>
          </SimpleTable>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-50">
            Operations queue
          </h2>
          <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-200">
            <div className="flex items-center justify-between">
              <span>Membership sync</span>
              <StatusBadge status="pending" />
            </div>
            <div className="flex items-center justify-between">
              <span>Payout population</span>
              <StatusBadge status="inactive" />
            </div>
            <div className="flex items-center justify-between">
              <span>Tremendous release</span>
              <StatusBadge status="inactive" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

