type StatusBadgeProps = {
  status: "active" | "inactive" | "trial" | "pending" | "cancelled";
};

const styles: Record<StatusBadgeProps["status"], string> = {
  active:
    "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-200",
  inactive:
    "bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-800 dark:text-gray-200",
  trial:
    "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/40 dark:text-amber-200",
  pending:
    "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-900/40 dark:text-sky-200",
  cancelled:
    "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/40 dark:text-rose-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}

