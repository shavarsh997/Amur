export function SwitchRow({
  checked,
  description,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  description?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 ${checked ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] bg-white"}`}
    >
      <span>
        <span className="block text-sm font-semibold text-[var(--text-primary)]">
          {label}
        </span>
        {description ? (
          <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">
            {description}
          </span>
        ) : null}
      </span>
      <input
        checked={checked}
        className="peer sr-only"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span
        aria-hidden="true"
        className="relative h-6 w-11 shrink-0 rounded-full bg-[var(--border-strong)] transition peer-checked:bg-[var(--text-primary)] after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"
      />
    </label>
  );
}
