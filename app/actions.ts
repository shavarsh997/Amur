"use server";

import {
  calculationTypes,
  constructionCalculatorConfig,
} from "@/config/construction-calculator.config";
import { leadFormConfig } from "@/config/lead-form.config";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import {
  submitCalculatorLead,
  submitLead,
  type LeadInput,
} from "@/lib/leads/service";
import type { Locale } from "@/types";

type LeadField = keyof Omit<LeadInput, "area" | "options"> | "area";

export type LeadActionState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<LeadField, string>>;
};

export type CalculatorLeadActionState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"area" | "name" | "phone", string>>;
};

const objectTypes = new Set<string>(
  leadFormConfig.objectTypes.map(({ value }) => value)
);
const workTypes = new Set<string>(
  leadFormConfig.workTypes.map(({ value }) => value)
);
const calculatorOptions = new Set<string>(
  leadFormConfig.options.map(({ value }) => value)
);

function readString(
  formData: FormData,
  key: string,
  maxLength: number
): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

const supportedCalculationTypes = new Set<string>(calculationTypes);

function isValidPhone(value: string): boolean {
  if (!/^\+?[\d\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export async function submitLeadAction(
  requestedLocale: Locale,
  _previousState: LeadActionState,
  formData: FormData
): Promise<LeadActionState> {
  const locale: Locale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale;
  const dictionary = await getDictionary(locale);
  const copy = dictionary.estimate;

  const objectType = readString(formData, "objectType", 40);
  const areaValue = readString(formData, "area", 20).replace(",", ".");
  const region = readString(formData, "region", 120);
  const workType = readString(formData, "workType", 40);
  const options = formData
    .getAll("options")
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.slice(0, 80))
    .filter((value) => calculatorOptions.has(value));
  const name = readString(formData, "name", 120);
  const phone = readString(formData, "phone", 40);
  const comment = readString(formData, "comment", 2000);
  const area = Number(areaValue);
  const errors: LeadActionState["errors"] = {};

  if (!objectTypes.has(objectType))
    errors.objectType = copy.errors.objectTypeRequired;
  if (!areaValue) {
    errors.area = copy.errors.areaRequired;
  } else if (!Number.isFinite(area) || area <= 0) {
    errors.area = copy.errors.areaInvalid;
  }
  if (!region) errors.region = copy.errors.regionRequired;
  if (!workTypes.has(workType)) errors.workType = copy.errors.workTypeRequired;
  if (!name) errors.name = copy.errors.nameRequired;
  if (!phone) {
    errors.phone = copy.errors.phoneRequired;
  } else if (!isValidPhone(phone)) {
    errors.phone = copy.errors.phoneInvalid;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: dictionary.common.errors.required,
      errors,
    };
  }

  try {
    await submitLead({
      objectType,
      area,
      region,
      workType,
      options,
      name,
      phone,
      comment,
    });

    return { status: "success", message: copy.success, errors: {} };
  } catch {
    return { status: "error", message: copy.error, errors: {} };
  }
}

export async function submitCalculatorLeadAction(
  requestedLocale: Locale,
  _previousState: CalculatorLeadActionState,
  formData: FormData
): Promise<CalculatorLeadActionState> {
  const locale: Locale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale;
  const dictionary = await getDictionary(locale);
  const copy = dictionary.estimate;
  const calculationType = readString(formData, "calculationType", 40);
  const areaValue = readString(formData, "area", 20).replace(",", ".");
  const details = readString(formData, "details", 4000);
  const name = readString(formData, "name", 120);
  const phone = readString(formData, "phone", 40);
  const comment = readString(formData, "comment", 2000);
  const area = Number(areaValue);
  const errors: CalculatorLeadActionState["errors"] = {};

  if (
    !Number.isFinite(area) ||
    area < constructionCalculatorConfig.limits.minArea ||
    area > constructionCalculatorConfig.limits.maxArea
  ) {
    errors.area = copy.errors.areaInvalid;
  }
  if (!name) errors.name = copy.errors.nameRequired;
  if (!phone) {
    errors.phone = copy.errors.phoneRequired;
  } else if (!isValidPhone(phone)) {
    errors.phone = copy.errors.phoneInvalid;
  }

  if (
    Object.keys(errors).length ||
    !supportedCalculationTypes.has(calculationType)
  ) {
    return {
      status: "error",
      message: dictionary.common.errors.required,
      errors,
    };
  }

  try {
    await submitCalculatorLead({
      calculationType,
      area,
      details,
      name,
      phone,
      comment,
    });

    return { status: "success", message: copy.success, errors: {} };
  } catch {
    return { status: "error", message: copy.error, errors: {} };
  }
}
