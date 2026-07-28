import type { CalculatorFormValues } from "@/components/calculator/types";
import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
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

const parsePositiveInteger = (value: string) => {
  const number = parsePositiveNumber(value);
  return number !== null && Number.isInteger(number) ? number : null;
};

const parseNonNegativeNumber = (value: string) => {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) return null;

  const number = Number(normalized);
  if (!Number.isFinite(number) || number < 0) return null;

  return number;
};

export function validateCalculatorForm(
  values: CalculatorFormValues,
  copy: Dictionary["constructionCalculator"]
): CalculatorValidationErrors {
  const errors: CalculatorValidationErrors = {};
  const messages = copy.validation;

  const area = parsePositiveNumber(values.area);
  if (!area) {
    errors.area = messages.areaRequired;
  } else if (area < config.limits.minArea || area > config.limits.maxArea) {
    errors.area = messages.areaOutOfRange;
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
    if (
      values.distanceKm.trim() &&
      parseNonNegativeNumber(values.distanceKm) === null
    ) {
      errors.distanceKm = messages.distanceInvalid;
    }
  }

  if (values.calculationType === "renovation") {
    if (
      values.renovationExtras.includes("plumbing") &&
      !parsePositiveInteger(values.bathrooms)
    ) {
      errors.bathrooms = messages.bathroomsRequired;
    }
    if (
      values.renovationExtras.includes("doors") &&
      !parsePositiveInteger(values.doorsCount)
    ) {
      errors.doorsCount = messages.doorsCountRequired;
    }
    if (
      values.renovationExtras.includes("airConditioners") &&
      !parsePositiveInteger(values.airConditionersCount)
    ) {
      errors.airConditionersCount = messages.airConditionersCountRequired;
    }
    const heatedFloorArea = parsePositiveNumber(values.heatedFloorArea);
    if (
      values.renovationExtras.includes("heatedFloor") &&
      (!heatedFloorArea || !area || heatedFloorArea > area)
    ) {
      errors.heatedFloorArea = messages.heatedFloorAreaRequired;
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
