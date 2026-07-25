import { DraftingCompass, Hammer, Paintbrush, Wrench } from "lucide-react";

import { calculatorConfig } from "@/config/calculator.config";
import type { Dictionary } from "@/types";
import type { CalculatorErrors, CalculatorValues } from "@/types/calculator";

const icons = { turnkey: Hammer, design: DraftingCompass, renovation: Paintbrush, "separate-works": Wrench };

export function WorkTypeStep({ copy, values, errors, onChange }: { copy: Dictionary["calculator"]; values: CalculatorValues; errors: CalculatorErrors; onChange: (value: CalculatorValues["workType"]) => void }) {
  return <section><h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{copy.workType.title}</h2><p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{copy.workType.description}</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{calculatorConfig.workTypes.map((option) => { const Icon = icons[option.value]; const selected = values.workType === option.value; return <button aria-pressed={selected} className={`flex min-h-24 items-center gap-4 rounded-2xl border p-5 text-left transition ${selected ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] hover:bg-[var(--surface-muted)]"}`} key={option.value} onClick={() => onChange(option.value)} type="button"><Icon aria-hidden="true" className="size-6 stroke-[1.35]" /><span className="font-semibold text-[var(--text-primary)]">{copy.workType.choices[option.labelKey]}</span></button>; })}</div>{errors.workType ? <p className="mt-3 text-sm text-[var(--error)]">{errors.workType}</p> : null}</section>;
}
