import { MapPin } from "lucide-react";

import type { Dictionary } from "@/types";
import type { CalculatorErrors, CalculatorValues } from "@/types/calculator";

export function LocationStep({ copy, values, errors, onChange }: { copy: Dictionary["calculator"]; values: CalculatorValues; errors: CalculatorErrors; onChange: (value: string) => void }) {
  return <section><MapPin aria-hidden="true" className="size-6 stroke-[1.35] text-[var(--text-primary)]" /><h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{copy.location.title}</h2><p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{copy.location.description}</p><label className="mt-7 block text-sm font-semibold text-[var(--text-primary)]" htmlFor="calculator-region">{copy.location.label}<input aria-invalid={Boolean(errors.location)} className="mt-2 min-h-14 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-lg outline-none focus:border-[var(--text-primary)]" id="calculator-region" onChange={(event) => onChange(event.target.value)} placeholder={copy.location.placeholder} type="text" value={values.region} /></label>{errors.location ? <p className="mt-3 text-sm text-[var(--error)]">{errors.location}</p> : null}</section>;
}
