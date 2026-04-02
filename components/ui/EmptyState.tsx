type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      {description && (
        <p className="mt-2 max-w-md text-xs text-gray-600 sm:text-sm">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          className="mt-4 inline-flex items-center rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}

