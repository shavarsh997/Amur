import { Building2, House, MoreHorizontal, PanelsTopLeft } from "lucide-react";

import { calculatorConfig } from "@/config/calculator.config";
import type { Dictionary } from "@/types";
import type { CalculatorErrors, CalculatorValues } from "@/types/calculator";

const icons = {
  "private-house": House,
  commercial: Building2,
  apartment: PanelsTopLeft,
  other: MoreHorizontal,
};

export function ObjectTypeStep({
  copy,
  values,
  errors,
  onChange,
}: {
  copy: Dictionary["calculator"];
  values: CalculatorValues;
  errors: CalculatorErrors;
  onChange: (value: CalculatorValues["objectType"]) => void;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
        {copy.objectType.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
        {copy.objectType.description}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {calculatorConfig.objectTypes.map((option) => {
          const Icon = icons[option.value];
          const selected = values.objectType === option.value;
          return (
            <button
              aria-pressed={selected}
              className={`flex min-h-24 items-center gap-4 rounded-2xl border p-5 text-left transition ${selected ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] hover:bg-[var(--surface-muted)]"}`}
              key={option.value}
              onClick={() => onChange(option.value)}
              type="button"
            >
              <Icon aria-hidden="true" className="size-6 stroke-[1.35]" />
              <span className="font-semibold text-[var(--text-primary)]">
                {copy.objectType.choices[option.labelKey]}
              </span>
            </button>
          );
        })}
      </div>
      {errors.objectType ? (
        <p className="mt-3 text-sm text-[var(--error)]">{errors.objectType}</p>
      ) : null}
    </section>
  );
}
