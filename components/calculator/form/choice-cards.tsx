import { selectionClass } from "@/components/calculator/constants";

export function ChoiceCards({
  options,
  selected,
  onChange,
}: {
  options: Record<string, { title: string; description: string }>;
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {Object.entries(options).map(([value, option]) => (
        <button
          aria-pressed={selected === value}
          className={`${selectionClass(selected === value)} min-h-28`}
          key={value}
          onClick={() => onChange(value)}
          type="button"
        >
          <span className="font-semibold text-[var(--text-primary)]">
            {option.title}
          </span>
          <span className="mt-2 block text-xs leading-5 text-[var(--text-secondary)]">
            {option.description}
          </span>
        </button>
      ))}
    </div>
  );
}
