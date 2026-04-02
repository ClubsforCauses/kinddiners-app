type CardProps = {
  title: string;
  value?: string;
  helper?: string;
  trend?: string;
};

export function StatCard({ title, value, helper, trend }: CardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 px-5 py-4 shadow-lg transition-all duration-200 hover:border-emerald-500/30 hover:shadow-emerald-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        {value && (
          <p className="mt-3 text-3xl font-bold leading-none text-slate-50">
            {value}
          </p>
        )}
        {(helper || trend) && (
          <div className="mt-3 flex items-center justify-between text-[11px]">
            {helper && <span className="text-slate-500">{helper}</span>}
            {trend && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {trend}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

