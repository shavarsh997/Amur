import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type {
  CalculationType,
  CalculatorScenarioId,
} from "@/config/construction-calculator.config";

import { initialValues } from "@/components/calculator/constants";
import type { CalculatorFormValues } from "@/components/calculator/types";

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
