import { calculatorConfig } from "@/config/calculator.config";
import type { CalculatorValues, EstimateResult } from "@/types/calculator";

export function calculateEstimate(values: CalculatorValues): EstimateResult {
  const area = Number(values.area.replace(",", "."));
  const rate = calculatorConfig.pricing.rates.find(
    (item) =>
      item.objectType === values.objectType && item.workType === values.workType
  );

  if (!rate || !Number.isFinite(area) || area <= 0) {
    return {
      status: "unavailable",
      currency: calculatorConfig.pricing.currency,
    };
  }

  const multiplier = values.options.reduce(
    (total, option) =>
      total * calculatorConfig.pricing.optionMultipliers[option],
    1
  );

  return {
    status: "available",
    currency: calculatorConfig.pricing.currency,
    min: Math.round(rate.minPerSquareMeter * area * multiplier),
    max: Math.round(rate.maxPerSquareMeter * area * multiplier),
  };
}
