type CardProps = {
  title: string;
  value?: string;
  helper?: string;
  trend?: string;
};

export function StatCard({ title, value, helper, trend }: CardProps) {
  return (
    <div className="rounded-2xl border border-emerald-50 bg-white/90 px-4 py-4 shadow-[0_18px_45px_-30px_rgba(16,185,129,0.9)] ring-1 ring-emerald-50 sm:px-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700/80">
        {title}
      </p>
      {value && (
        <p className="mt-2 text-2xl font-semibold leading-tight text-slate-900">
          {value}
        </p>
      )}
      {(helper || trend) && (
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          {helper && <span>{helper}</span>}
          {trend && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

