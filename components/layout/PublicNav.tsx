import { Logo } from '@/components/ui/Logo';

type NavItem = {
  label: string;
  href: string;
};

const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Memberships", href: "/memberships" },
  { label: "Gifts", href: "/gift-center" },
  { label: "Referral program", href: "/referral-program" },
];

export function PublicNav() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <a href="/" className="flex items-center">
          <Logo className="h-10 object-contain" width={150} height={40} />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-emerald-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Log in
            </a>
            <a
              href="/join/AMBASSADOR"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Join now
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/login"
            className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800"
          >
            Log in
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-gray-700 shadow-sm"
            aria-label="Open main navigation"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

