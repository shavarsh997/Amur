import { Building2, Home, Paintbrush, PenTool } from "lucide-react";

import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type { CalculatorScenarioId } from "@/config/construction-calculator.config";
import type { Dictionary } from "@/types";

const scenarioIcons = {
  "house-construction": Home,
  commercial: Building2,
  "interior-design": PenTool,
} as const;

const chipClass = (selected: boolean) =>
  `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-1.5 text-center text-sm font-semibold leading-tight transition sm:justify-start ${selected ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-white" : "border-[var(--border)] bg-white text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]"}`;

/** Compact service switcher: chips keep the first form field near the top on phones. */
export function ScenarioStep({
  copy,
  selectedQuickScenario,
  onSelectScenario,
}: {
  copy: Dictionary["constructionCalculator"];
  selectedQuickScenario?: CalculatorScenarioId;
  onSelectScenario: (scenarioId: CalculatorScenarioId) => void;
}) {
  return (
    <section aria-labelledby="calculator-scenario-title" className="min-w-0">
      <h2
        className="text-sm font-semibold text-[var(--text-primary)]"
        id="calculator-scenario-title"
      >
        {copy.steps.scenario.title}
      </h2>
      <p className="mt-1 hidden max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:block">
        {copy.steps.scenario.description}
      </p>
      <div
        className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
        role="group"
        aria-labelledby="calculator-scenario-title"
      >
        {config.quickScenarios.map((scenario) => {
          const Icon =
            scenarioIcons[scenario.id as keyof typeof scenarioIcons] ??
            Paintbrush;
          const option = copy.quickScenarios[scenario.labelKey];
          const selected = selectedQuickScenario === scenario.id;

          return (
            <button
              aria-pressed={selected}
              className={chipClass(selected)}
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              title={option.description}
              type="button"
            >
              <Icon
                aria-hidden="true"
                className="hidden size-4 shrink-0 stroke-[1.6] sm:block"
              />
              <span>{option.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
