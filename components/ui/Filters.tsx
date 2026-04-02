type FilterChip = {
  label: string;
  value: string;
  active?: boolean;
};

type FilterBarProps = {
  chips: FilterChip[];
};

export function FilterBar({ chips }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {chips.map((chip) => (
        <button
          key={chip.value}
          type="button"
          className={`rounded-full border px-3 py-1 transition-colors ${
            chip.active
              ? "border-emerald-600 bg-emerald-50 text-emerald-800"
              : "border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-700"
          }`}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

