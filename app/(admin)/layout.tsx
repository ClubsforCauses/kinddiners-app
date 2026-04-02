import { Sidebar } from "@/components/layout/Sidebar";

const items = [
  { label: "Dashboard", href: "/(admin)/dashboard" },
  { label: "Restaurants", href: "/(admin)/restaurants" },
  { label: "Users", href: "/(admin)/users" },
  { label: "Customers", href: "/(admin)/customers" },
  { label: "Payouts", href: "/(admin)/payouts" },
  { label: "Referral report", href: "/(admin)/referral-report" },
  { label: "Content", href: "/(admin)/content/faq" },
  { label: "Gifts", href: "/(admin)/gifts" },
  { label: "Admins", href: "/(admin)/admins" },
  { label: "Logs", href: "/(admin)/logs" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar title="Admin navigation" items={items} />
      <div className="flex min-h-screen flex-1 flex-col bg-slate-900">
        <header className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 shadow-sm sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Admin dashboard
              </p>
              <p className="text-sm text-slate-400">
                Operate memberships, restaurants, payouts, and content.
              </p>
            </div>
            <div className="hidden items-center gap-3 text-xs text-slate-300 sm:flex">
              <span className="rounded-full bg-slate-800 px-3 py-1 font-medium">
                Signed in as admin@example.com
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
