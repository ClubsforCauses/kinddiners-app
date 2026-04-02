import { Sidebar } from "@/components/layout/Sidebar";

const items = [
  { label: "Overview", href: "/(member)/profile" },
  { label: "Restaurants", href: "/(public)/restaurants" },
  { label: "Referrals", href: "/(member)/my-referrals" },
  { label: "Membership", href: "/(member)/manage-membership" },
  { label: "Gifts", href: "/(public)/gift-center" },
  { label: "Settings", href: "/(member)/settings/promo-code" },
];

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar title="Member navigation" items={items} />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="border-b border-gray-200 bg-white/80 px-4 py-3 shadow-sm sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Member dashboard
              </p>
              <p className="text-sm text-gray-600">
                Overview of your membership, referrals, and visits.
              </p>
            </div>
            <div className="hidden items-center gap-3 text-xs text-gray-600 sm:flex">
              <div className="flex flex-col items-end">
                <span className="font-semibold text-gray-900">
                  Signed in as
                </span>
                <span>member@example.com</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
