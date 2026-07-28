import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type {
  CalculationType,
  CalculatorScenarioId,
} from "@/config/construction-calculator.config";

import { initialValues } from "@/components/calculator/constants";
import type {
  CalculatorFieldId,
  CalculatorFormValues,
} from "@/components/calculator/types";
import { calculatorFieldDomId } from "@/components/calculator/types";

export function valuesForScenario(
  calculationType: CalculationType,
  scenarioId?: CalculatorScenarioId,
  area = ""
): CalculatorFormValues {
  const scenario = config.quickScenarios.find((item) => item.id === scenarioId);

  return {
    ...initialValues,
    area,
    calculationType,
    renovationObjectType:
      scenario?.renovationObjectType ?? initialValues.renovationObjectType,
  };
}

export function scrollToCalculatorField(field: CalculatorFieldId) {
  const element = document.getElementById(calculatorFieldDomId(field));
  element?.scrollIntoView({ behavior: "smooth", block: "center" });

  const input = element?.querySelector("input");
  if (input instanceof HTMLInputElement) {
    window.setTimeout(() => input.focus({ preventScroll: true }), 300);
  }
}
