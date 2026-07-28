import type { FieldErrors, Resolver } from "react-hook-form";

import type { CalculatorFormValues } from "@/components/calculator/types";
import { validateCalculatorForm } from "@/lib/calculator/validate-calculator-form";
import type { Dictionary } from "@/types";

export function createCalculatorResolver(
  copy: Dictionary["constructionCalculator"]
): Resolver<CalculatorFormValues> {
  return (values) => {
    const validationErrors = validateCalculatorForm(values, copy);
    const errors = Object.entries(validationErrors).reduce<
      FieldErrors<CalculatorFormValues>
    >((accumulator, [field, message]) => {
      accumulator[field as keyof CalculatorFormValues] = {
        type: "validate",
        message,
      };
      return accumulator;
    }, {});

    if (Object.keys(errors).length > 0) {
      return { values: {}, errors };
    }

    return { values, errors: {} };
  };
}
