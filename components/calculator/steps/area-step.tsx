import type { Dictionary } from "@/types";
import type { CalculatorErrors, CalculatorValues } from "@/types/calculator";

export function AreaStep({ copy, values, errors, onChange }: { copy: Dictionary["calculator"]; values: CalculatorValues; errors: CalculatorErrors; onChange: (value: string) => void }) {
  return <section><h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{copy.area.title}</h2><p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{copy.area.description}</p><label className="mt-7 block text-sm font-semibold text-[var(--text-primary)]" htmlFor="calculator-area">{copy.area.label}<input aria-invalid={Boolean(errors.area)} className="mt-2 min-h-14 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-lg outline-none focus:border-[var(--text-primary)]" id="calculator-area" inputMode="decimal" min="0.01" onChange={(event) => onChange(event.target.value)} placeholder={copy.area.placeholder} step="any" type="number" value={values.area} /></label>{errors.area ? <p className="mt-3 text-sm text-[var(--error)]">{errors.area}</p> : null}</section>;
}
