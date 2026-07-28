import type { CalculatorFormValues } from "@/components/calculator/types";
import type { Dictionary } from "@/types";

import {
  CALCULATOR_FIELD_ORDER,
  type CalculatorFieldId,
  type CalculatorValidationErrors,
} from "@/components/calculator/types";

const parsePositiveNumber = (value: string) => {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) return null;

  const number = Number(normalized);
  if (!Number.isFinite(number) || number <= 0) return null;

  return number;
};

export function validateCalculatorForm(
  values: CalculatorFormValues,
  copy: Dictionary["constructionCalculator"]
): CalculatorValidationErrors {
  const errors: CalculatorValidationErrors = {};
  const messages = copy.validation;

  if (!parsePositiveNumber(values.area)) {
    errors.area = messages.areaRequired;
  }

  if (values.calculationType === "construction") {
    if (values.basement && !parsePositiveNumber(values.basementArea)) {
      errors.basementArea = messages.basementAreaRequired;
    }
    if (values.garage && !parsePositiveNumber(values.garageArea)) {
      errors.garageArea = messages.garageAreaRequired;
    }
    if (values.terrace && !parsePositiveNumber(values.terraceArea)) {
      errors.terraceArea = messages.terraceAreaRequired;
    }
  }

  if (values.calculationType === "renovation") {
    if (
      values.renovationExtras.includes("plumbing") &&
      !parsePositiveNumber(values.bathrooms)
    ) {
      errors.bathrooms = messages.bathroomsRequired;
    }
    if (
      values.renovationExtras.includes("doors") &&
      !parsePositiveNumber(values.doorsCount)
    ) {
      errors.doorsCount = messages.doorsCountRequired;
    }
    if (
      values.renovationExtras.includes("airConditioners") &&
      !parsePositiveNumber(values.airConditionersCount)
    ) {
      errors.airConditionersCount = messages.airConditionersCountRequired;
    }
  }

  return errors;
}

export function getFirstValidationError(
  errors: CalculatorValidationErrors
): CalculatorFieldId | null {
  return CALCULATOR_FIELD_ORDER.find((field) => errors[field]) ?? null;
}

export function clearErrorsForPatch(
  errors: CalculatorValidationErrors,
  patch: Partial<CalculatorFormValues>
): CalculatorValidationErrors {
  const next = { ...errors };

  for (const field of Object.keys(patch) as CalculatorFieldId[]) {
    delete next[field];
  }

  if ("basement" in patch && !patch.basement) delete next.basementArea;
  if ("garage" in patch && !patch.garage) delete next.garageArea;
  if ("terrace" in patch && !patch.terrace) delete next.terraceArea;

  if ("renovationExtras" in patch) {
    if (!patch.renovationExtras?.includes("plumbing")) delete next.bathrooms;
    if (!patch.renovationExtras?.includes("doors")) delete next.doorsCount;
    if (!patch.renovationExtras?.includes("airConditioners")) {
      delete next.airConditionersCount;
    }
  }

  return next;
}
