"use client";

import { useMemo, useState } from "react";
import {
  FormProvider,
  useForm,
  useWatch,
  type FieldErrors,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";

import { ConstructionEstimateDialog } from "@/components/calculator/construction-estimate-dialog";
import { CalculateButton } from "@/components/calculator/steps/calculate-button";
import { ConstructionExtrasStep } from "@/components/calculator/steps/construction-extras-step";
import { ParametersStep } from "@/components/calculator/steps/parameters-step";
import { RenovationExtrasStep } from "@/components/calculator/steps/renovation-extras-step";
import { ScenarioStep } from "@/components/calculator/steps/scenario-step";
import type {
  CalculatorFieldId,
  CalculatorFormValues,
} from "@/components/calculator/types";
import { CALCULATOR_FIELD_ORDER } from "@/components/calculator/types";
import {
  scrollToCalculatorField,
  valuesForScenario,
} from "@/components/calculator/utils";
import {
  constructionCalculatorConfig as config,
  type CalculatorScenarioId,
  type CalculationType,
} from "@/config/construction-calculator.config";
import { createCalculatorResolver } from "@/lib/calculator/calculator-form-resolver";
import { calculateConstructionEstimate } from "@/lib/calculator/calculate-construction-estimate";
import type { Dictionary, Locale } from "@/types";

export function CostCalculator({
  copy,
  locale,
  defaultCalculationType = "renovation",
  defaultScenarioId,
  className = "",
}: {
  copy: Dictionary["constructionCalculator"];
  locale: Locale;
  defaultCalculationType?: CalculationType;
  defaultScenarioId?: CalculatorScenarioId;
  className?: string;
}) {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const form = useForm<CalculatorFormValues>({
    defaultValues: valuesForScenario(defaultCalculationType, defaultScenarioId),
    resolver: createCalculatorResolver(copy),
  });
  const watchedValues = useWatch({ control: form.control });
  const calculationType = useWatch({
    control: form.control,
    name: "calculationType",
    defaultValue: defaultCalculationType,
  });
  const estimate = useMemo(
    () =>
      calculateConstructionEstimate(
        { ...form.getValues(), ...watchedValues } as CalculatorFormValues,
        copy
      ),
    [watchedValues, copy, form]
  );
  const isConstruction = calculationType === "construction";
  const isRenovation = calculationType === "renovation";

  const selectedQuickScenario = config.quickScenarios.find(
    (scenario) =>
      scenario.calculationType === calculationType &&
      (scenario.renovationObjectType === undefined ||
        scenario.renovationObjectType ===
          form.getValues("renovationObjectType"))
  )?.id;

  const selectScenario = (scenarioId: CalculatorScenarioId) => {
    const scenario = config.quickScenarios.find(
      (item) => item.id === scenarioId
    );
    if (!scenario) return;

    form.reset(
      valuesForScenario(
        scenario.calculationType,
        scenario.id,
        form.getValues("area")
      )
    );
  };

  const scrollToFirstError = (
    errors: FieldErrors<CalculatorFormValues>
  ): CalculatorFieldId | null =>
    CALCULATOR_FIELD_ORDER.find((field) => errors[field]) ?? null;

  const onSubmit: SubmitHandler<CalculatorFormValues> = () => {
    setIsEstimateOpen(true);
  };

  const onInvalid: SubmitErrorHandler<CalculatorFormValues> = (errors) => {
    const firstInvalidField = scrollToFirstError(errors);
    if (firstInvalidField) {
      requestAnimationFrame(() => scrollToCalculatorField(firstInvalidField));
    }
  };

  return (
    <FormProvider {...form}>
      <div
        className={`grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] ${className}`}
      >
        <div className="space-y-5">
          <ScenarioStep
            copy={copy}
            onSelectScenario={selectScenario}
            selectedQuickScenario={selectedQuickScenario}
          />

          <ParametersStep copy={copy} />

          {isConstruction ? <ConstructionExtrasStep copy={copy} /> : null}

          {isRenovation ? <RenovationExtrasStep copy={copy} /> : null}

          <CalculateButton
            copy={copy}
            onClick={form.handleSubmit(onSubmit, onInvalid)}
          />
        </div>

        {isEstimateOpen ? (
          <ConstructionEstimateDialog
            copy={copy}
            estimate={estimate}
            locale={locale}
            onClose={() => setIsEstimateOpen(false)}
          />
        ) : null}
      </div>
    </FormProvider>
  );
}
