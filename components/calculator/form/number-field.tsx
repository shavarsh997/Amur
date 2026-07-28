export function NumberField({
  label,
  value,
  onChange,
  hint,
  min = 0,
  fieldId,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  min?: number;
  fieldId?: string;
  error?: string;
}) {
  const errorId = fieldId ? `${fieldId}-error` : undefined;
  const inputClassName = error
    ? "mt-2 min-h-12 w-full rounded-xl border-2 border-[var(--error)] bg-white px-3 text-base font-medium text-[var(--text-primary)] outline-none transition focus:border-[var(--error)] focus:ring-2 focus:ring-[var(--error)]/15"
    : "mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-base font-medium text-[var(--text-primary)] outline-none transition focus:border-[var(--text-primary)] focus:ring-2 focus:ring-black/5";

  return (
    <label
      className="block text-sm font-semibold text-[var(--text-primary)]"
      id={fieldId}
    >
      {label}
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={inputClassName}
        inputMode="decimal"
        min={min}
        onChange={(event) => onChange(event.target.value)}
        pattern="[0-9]*[.,]?[0-9]*"
        // This accepts both comma and period decimal separators. Native number
        // inputs silently discard comma decimals in several browsers.
        type="text"
        value={value}
      />
      {error ? (
        <span
          className="mt-1.5 block text-xs font-normal leading-5 text-[var(--error)]"
          id={errorId}
          role="alert"
        >
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs font-normal leading-5 text-[var(--text-muted)]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
