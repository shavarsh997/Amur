import type { RenovationObjectType } from "@/config/construction-calculator.config";
import type { ConstructionCalculatorValues } from "@/lib/calculator/calculate-construction-estimate";

export type CalculatorFormValues = ConstructionCalculatorValues & {
  renovationObjectType: RenovationObjectType;
};

export type CalculatorUpdate = (patch: Partial<CalculatorFormValues>) => void;
