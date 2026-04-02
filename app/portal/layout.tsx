import { Sidebar } from "@/components/layout/Sidebar";

const items = [
  { label: "Dashboard", href: "/(portal)/dashboard" },
  { label: "Marketing", href: "/(portal)/marketing" },
  { label: "Referrals", href: "/(portal)/referrals" },
  { label: "Customer referrals", href: "/(portal)/customer-referrals" },
  { label: "Logistics", href: "/(portal)/logistics" },
  { label: "Sub-admins", href: "/(portal)/subadmins" },
  { label: "Contract", href: "/(portal)/contract" },
  { label: "Contact", href: "/(portal)/contact" },
  { label: "Payout", href: "/(portal)/payout" },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar title="Restaurant portal" items={items} />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="border-b border-slate-200 bg-white/80 px-4 py-3 shadow-sm sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                Restaurant portal
              </p>
              <p className="text-sm text-slate-600">
                Manage your Kind Diners presence, marketing, and referrals.
              </p>
            </div>
            <div className="hidden items-center gap-3 text-xs text-slate-600 sm:flex">
              <div className="flex flex-col items-end">
                <span className="font-semibold text-slate-900">
                  Willow Street Wine Bar
                </span>
                <span>restaurant-admin@example.com</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
