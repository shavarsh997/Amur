import { calculatorConfig } from "@/config/calculator.config";
import type {
  CalculatorErrors,
  CalculatorStep,
  CalculatorValues,
} from "@/types/calculator";

type ValidationMessages = {
  objectTypeRequired: string;
  workTypeRequired: string;
  areaRequired: string;
  areaInvalid: string;
  regionRequired: string;
  nameRequired: string;
  phoneRequired: string;
  phoneInvalid: string;
};

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return (
    /^\+?[\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15
  );
}

export function validateCalculatorStep(
  step: CalculatorStep,
  values: CalculatorValues,
  messages: ValidationMessages
): CalculatorErrors {
  const errors: CalculatorErrors = {};
  const area = Number(values.area.replace(",", "."));

  if (step === "objectType" && !values.objectType)
    errors.objectType = messages.objectTypeRequired;
  if (step === "workType" && !values.workType)
    errors.workType = messages.workTypeRequired;
  if (step === "area") {
    if (!values.area) {
      errors.area = messages.areaRequired;
    } else if (
      !Number.isFinite(area) ||
      area < calculatorConfig.limits.minArea ||
      area > calculatorConfig.limits.maxArea
    ) {
      errors.area = messages.areaInvalid;
    }
  }
  if (step === "location" && !values.region.trim())
    errors.location = messages.regionRequired;
  if (step === "contact") {
    if (!values.name.trim()) errors.name = messages.nameRequired;
    if (!values.phone.trim()) {
      errors.phone = messages.phoneRequired;
    } else if (!isValidPhone(values.phone)) {
      errors.phone = messages.phoneInvalid;
    }
  }

  return errors;
}
