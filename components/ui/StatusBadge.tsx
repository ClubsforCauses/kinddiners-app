type StatusBadgeProps = {
  status: string;
};

const statusMap: Record<string, { label: string; className: string }> = {
  active: {
    label: "Active",
    className:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 ring-1 ring-emerald-500/20",
  },
  inactive: {
    label: "Inactive",
    className: "bg-slate-700/50 text-slate-300 border-slate-600/50",
  },
  trialing: {
    label: "Trial",
    className:
      "bg-amber-500/10 text-amber-400 border-amber-500/20 ring-1 ring-amber-500/20",
  },
  trial: {
    label: "Trial",
    className:
      "bg-amber-500/10 text-amber-400 border-amber-500/20 ring-1 ring-amber-500/20",
  },
  pending: {
    label: "Pending",
    className:
      "bg-sky-500/10 text-sky-400 border-sky-500/20 ring-1 ring-sky-500/20",
  },
  canceled: {
    label: "Canceled",
    className:
      "bg-rose-500/10 text-rose-400 border-rose-500/20 ring-1 ring-rose-500/20",
  },
  cancelled: {
    label: "Canceled",
    className:
      "bg-rose-500/10 text-rose-400 border-rose-500/20 ring-1 ring-rose-500/20",
  },
  past_due: {
    label: "Past due",
    className:
      "bg-orange-500/10 text-orange-400 border-orange-500/20 ring-1 ring-orange-500/20",
  },
  gifted: {
    label: "Gifted",
    className:
      "bg-purple-500/10 text-purple-400 border-purple-500/20 ring-1 ring-purple-500/20",
  },
  expired: {
    label: "Expired",
    className: "bg-slate-700/50 text-slate-400 border-slate-600/50",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config =
    statusMap[status] || statusMap.inactive;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}

