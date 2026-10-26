"use server";

import {
  parseCalculatorRequest,
  calculatorRequestSummary,
} from "@/lib/calculator/calculator-request";
import { leadFormConfig } from "@/config/lead-form.config";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import { submitLead, type LeadInput } from "@/lib/leads/service";
import { parseLeadAttribution, publicPagePath } from "@/lib/lead-attribution";
import type { Locale } from "@/types";

type LeadField = keyof Omit<LeadInput, "area" | "options"> | "area";

export type LeadActionState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<LeadField, string>>;
  delivered?: boolean;
  errorType?: "validation" | "delivery";
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

  let calculatorRequest = null;
  if (formData.has("calculatorRequest")) {
    const raw = formData.get("calculatorRequest");
    try {
      if (typeof raw === "string" && raw.length <= 2000)
        calculatorRequest = parseCalculatorRequest(JSON.parse(raw));
    } catch {
      /* Invalid JSON is rejected like other invalid parameters. */
    }
    if (!calculatorRequest)
      return {
        status: "error",
        errorType: "validation",
        message: dictionary.constructionCalculator.request.invalidParameters,
        errors: {},
      };
  }
  const objectType =
    calculatorRequest?.calculationType === "construction"
      ? "private-house"
      : readString(formData, "objectType", 40);
  const areaValue = calculatorRequest
    ? String(calculatorRequest.area)
    : readString(formData, "area", 20).replace(",", ".");
  const region = readString(formData, "region", 120);
  const workType =
    calculatorRequest?.calculationType ?? readString(formData, "workType", 40);
  const options = formData
    .getAll("options")
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.slice(0, 80))
    .filter((value) => calculatorOptions.has(value));
  const name = readString(formData, "name", 120);
  const phone = readString(formData, "phone", 40);
  const comment = readString(formData, "comment", 2000);
  const website = readString(formData, "website", 200);
  const area = Number(areaValue);
  const errors: LeadActionState["errors"] = {};
  const submittedFrom = publicPagePath(
    readString(formData, "submittedFrom", 120)
  );
  let attribution;
  try {
    attribution = parseLeadAttribution(
      JSON.parse(readString(formData, "attribution", 500))
    );
  } catch {
    /* Attribution is optional and must not prevent valid submissions. */
  }

  // Honeypot field: bots get a neutral success response, without creating a lead.
  if (website) return { status: "success", message: copy.success, errors: {} };

  if (!objectTypes.has(objectType))
    errors.objectType = copy.errors.objectTypeRequired;
  if (!areaValue) {
    errors.area = copy.errors.areaRequired;
  } else if (!Number.isFinite(area) || area <= 0) {
    errors.area = copy.errors.areaInvalid;
  }
  if (!region) errors.region = copy.errors.regionRequired;
  if (!calculatorRequest && !workTypes.has(workType))
    errors.workType = copy.errors.workTypeRequired;
  if (!name) errors.name = copy.errors.nameRequired;
  if (!phone) {
    errors.phone = copy.errors.phoneRequired;
  } else if (!isValidPhone(phone)) {
    errors.phone = copy.errors.phoneInvalid;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errorType: "validation",
      message: dictionary.common.errors.required,
      errors,
    };
  }

  try {
    await submitLead(
      {
        objectType: calculatorRequest
          ? copy.choices.objectType[
              leadFormConfig.objectTypes.find(
                (item) => item.value === objectType
              )!.labelKey
            ]
          : objectType,
        area,
        region,
        workType: calculatorRequest
          ? dictionary.constructionCalculator.quickScenarios[
              calculatorRequest.calculationType === "construction"
                ? "houseConstruction"
                : "interiorDesign"
            ].title
          : workType,
        options: calculatorRequest
          ? calculatorRequestSummary(
              calculatorRequest,
              dictionary.constructionCalculator,
              locale
            ).map(({ label, value }) => `${label}: ${value}`)
          : options,
        source: [
          calculatorRequest
            ? dictionary.constructionCalculator.request.title
            : "Website",
          submittedFrom ??
            (calculatorRequest ? `/${locale}/calculator` : undefined),
          attribution
            ? `${attribution.source} / ${attribution.medium}; landing: ${attribution.landing_page}`
            : undefined,
        ]
          .filter(Boolean)
          .join(" | "),
        name,
        phone,
        comment,
      },
      dictionary.leadNotification
    );

    return {
      status: "success",
      delivered: true,
      message: calculatorRequest
        ? dictionary.constructionCalculator.request.success
        : copy.success,
      errors: {},
    };
  } catch {
    return {
      status: "error",
      errorType: "delivery",
      message: copy.error,
      errors: {},
    };
  }
}
