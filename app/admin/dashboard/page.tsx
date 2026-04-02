export const dynamic = "force-dynamic";

import { StatCard } from "@/components/ui/Card";
import { SimpleTable } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getDashboardStats, getRecentSignups } from "@/lib/domains/admin/dashboard";

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const recentSignups = await getRecentSignups(5);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Active members"
          value={stats.activeMembers.toString()}
          helper="Across all plans"
        />
        <StatCard
          title="Active restaurants"
          value={stats.activeRestaurants.toString()}
          helper="With live portal access"
        />
        <StatCard
          title="Pending payouts"
          value={formatCurrency(stats.pendingPayoutsCents)}
          helper="Awaiting approval"
        />
        <StatCard
          title="Total gifts"
          value={stats.totalGifts.toString()}
          helper="Gift codes created"
        />
        <StatCard
          title="Referrals"
          value={stats.totalReferrals.toString()}
          helper="All time"
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
            {recentSignups.length === 0 ? (
              <tr className="bg-slate-900">
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-400">
                  No members yet
                </td>
              </tr>
            ) : (
              recentSignups.map((signup) => (
                <tr key={signup.id} className="bg-slate-900 hover:bg-slate-800">
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-slate-50">{signup.name}</div>
                    <div className="text-xs text-slate-400">{signup.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">
                    {signup.planName}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={signup.status} />
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-slate-200">
                    {formatTimeAgo(signup.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </SimpleTable>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-50">
            Quick actions
          </h2>
          <div className="space-y-2 rounded-xl border border-slate-700 bg-slate-900/80 p-4">
            <a
              href="/admin/restaurants/new"
              className="block rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-750 hover:border-emerald-500"
            >
              + Add restaurant
            </a>
            <a
              href="/admin/payouts"
              className="block rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-750 hover:border-emerald-500"
            >
              Manage payouts
            </a>
            <a
              href="/admin/customers"
              className="block rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-750 hover:border-emerald-500"
            >
              View all customers
            </a>
            <a
              href="/admin/referral-report"
              className="block rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-750 hover:border-emerald-500"
            >
              Referral report
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
