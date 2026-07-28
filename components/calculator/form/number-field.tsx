export function NumberField({
  label,
  value,
  onChange,
  hint,
  min = 0,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  min?: number;
}) {
  return (
    <label className="block text-sm font-semibold text-[var(--text-primary)]">
      {label}
      <input
        className="mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-base font-medium outline-none transition focus:border-[var(--text-primary)]"
        inputMode="decimal"
        min={min}
        onChange={(event) => onChange(event.target.value)}
        step="any"
        type="number"
        value={value}
      />
      {hint ? (
        <span className="mt-1.5 block text-xs font-normal leading-5 text-[var(--text-muted)]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
