import type { RenovationObjectType } from "@/config/construction-calculator.config";
import type { ConstructionCalculatorValues } from "@/lib/calculator/calculate-construction-estimate";

export type CalculatorFormValues = ConstructionCalculatorValues & {
  renovationObjectType: RenovationObjectType;
};

export type CalculatorFieldId =
  | "area"
  | "basementArea"
  | "garageArea"
  | "terraceArea"
  | "distanceKm"
  | "bathrooms"
  | "heatedFloorArea"
  | "doorsCount";

export type CalculatorValidationErrors = Partial<
  Record<CalculatorFieldId, string>
>;

export const CALCULATOR_FIELD_ORDER: CalculatorFieldId[] = [
  "area",
  "basementArea",
  "garageArea",
  "terraceArea",
  "distanceKm",
  "bathrooms",
  "heatedFloorArea",
  "doorsCount",
];

export function calculatorFieldDomId(field: CalculatorFieldId) {
  return `calculator-field-${field}`;
}
