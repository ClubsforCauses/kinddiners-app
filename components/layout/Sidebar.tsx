type SidebarItem = {
  label: string;
  href: string;
  badge?: string;
};

type SidebarProps = {
  title: string;
  items: SidebarItem[];
};

export function Sidebar({ title, items }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white/80 px-4 py-4 lg:flex lg:flex-col">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {title}
        </p>
      </div>
      <nav className="space-y-1 text-sm">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>
    </aside>
  );
}

