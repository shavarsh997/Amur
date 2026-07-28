import { Check } from "lucide-react";

import { calculatorConfig } from "@/config/calculator.config";
import type { Dictionary } from "@/types";
import type { CalculatorOption, CalculatorValues } from "@/types/calculator";

export function OptionsStep({
  copy,
  values,
  onChange,
}: {
  copy: Dictionary["calculator"];
  values: CalculatorValues;
  onChange: (value: CalculatorOption[]) => void;
}) {
  function toggle(option: CalculatorOption) {
    onChange(
      values.options.includes(option)
        ? values.options.filter((value) => value !== option)
        : [...values.options, option]
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
        {copy.options.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
        {copy.options.description}
      </p>
      <div className="mt-6 space-y-3">
        {calculatorConfig.options.map((option) => {
          const selected = values.options.includes(option.value);
          return (
            <button
              aria-pressed={selected}
              className={`flex w-full items-center justify-between gap-5 rounded-2xl border p-5 text-left transition ${selected ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] hover:bg-[var(--surface-muted)]"}`}
              key={option.value}
              onClick={() => toggle(option.value)}
              type="button"
            >
              <span className="font-semibold text-[var(--text-primary)]">
                {copy.options.choices[option.labelKey]}
              </span>
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full border ${selected ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-white" : "border-[var(--border-strong)]"}`}
              >
                {selected ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
