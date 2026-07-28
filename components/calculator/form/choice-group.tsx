import { Check } from "lucide-react";

export function ChoiceGroup({
  label,
  onChange,
  options,
  selected,
}: {
  label: string;
  selected: string;
  options: Record<string, string>;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </legend>
      <div className="mt-3 space-y-2">
        {Object.entries(options).map(([value, option]) => (
          <button
            aria-pressed={selected === value}
            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${selected === value ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] hover:bg-[var(--surface-muted)]"}`}
            key={value}
            onClick={() => onChange(value)}
            type="button"
          >
            <span>{option}</span>
            {selected === value ? (
              <Check aria-hidden="true" className="size-4 shrink-0" />
            ) : null}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
