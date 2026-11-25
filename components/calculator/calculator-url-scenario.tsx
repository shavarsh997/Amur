"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";

import type { CalculatorFormValues } from "./types";
import { valuesForScenario } from "./utils";
import { constructionCalculatorConfig } from "@/config/construction-calculator.config";

/** A small Suspense island keeps the calculator and its SEO copy prerendered. */
export function CalculatorUrlScenario() {
  const searchParams = useSearchParams();
  const requestedScenario = searchParams.get("scenario");
  const { reset, getValues } = useFormContext<CalculatorFormValues>();

  useEffect(() => {
    const scenario = constructionCalculatorConfig.quickScenarios.find(
      ({ id }) => id === requestedScenario
    );
    // Only configured scenarios are accepted; a bare/invalid URL starts with
    // the apartment renovation quote, like the statically rendered page.
    reset(
      valuesForScenario(
        scenario?.calculationType ?? "renovation",
        scenario?.id,
        getValues("area")
      )
    );
  }, [requestedScenario, reset, getValues]);

  return null;
}
