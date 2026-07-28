import {
  Building2,
  Home,
  Paintbrush,
  PenTool,
} from "lucide-react";

import { selectionClass } from "@/components/calculator/constants";
import { StepTitle } from "@/components/calculator/form/step-title";
import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type { CalculatorScenarioId } from "@/config/construction-calculator.config";
import type { Dictionary } from "@/types";

const scenarioIcons = {
  "house-construction": Home,
  commercial: Building2,
  "interior-design": PenTool,
} as const;

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
    <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
      <StepTitle number="01" {...copy.steps.scenario} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {config.quickScenarios.map((scenario) => {
          const Icon =
            scenarioIcons[scenario.id as keyof typeof scenarioIcons] ??
            Paintbrush;
          const option = copy.quickScenarios[scenario.labelKey];
          const selected = selectedQuickScenario === scenario.id;

          return (
            <button
              aria-pressed={selected}
              className={`${selectionClass(selected)} min-h-28`}
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              type="button"
            >
              <Icon
                aria-hidden="true"
                className="size-6 stroke-[1.45] text-[var(--brand-accent)]"
              />
              <span className="mt-4 block font-semibold text-[var(--text-primary)]">
                {option.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
