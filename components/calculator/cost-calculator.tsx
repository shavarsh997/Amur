"use client";

import {
  FormProvider,
  useForm,
  useWatch,
  type FieldErrors,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";

import { contactMessageEvent } from "@/components/forms/contact-methods";
import {
  calculatorRequestFromValues,
  calculatorRequestSummary,
  type CalculatorRequestContext,
} from "@/lib/calculator/calculator-request";
import { CalculateButton } from "@/components/calculator/steps/calculate-button";
import { ConstructionExtrasStep } from "@/components/calculator/steps/construction-extras-step";
import { ParametersStep } from "@/components/calculator/steps/parameters-step";
import { RenovationContact } from "@/components/calculator/renovation-contact";
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
  const form = useForm<CalculatorFormValues>({
    defaultValues: valuesForScenario(defaultCalculationType, defaultScenarioId),
    resolver: createCalculatorResolver(copy),
  });
  const calculationType = useWatch({
    control: form.control,
    name: "calculationType",
    defaultValue: defaultCalculationType,
  });
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

  const onSubmit: SubmitHandler<CalculatorFormValues> = (values) => {
    if (values.calculationType === "renovation") return;
    const request = calculatorRequestFromValues(values);
    if (!request) return;
    window.dispatchEvent(
      new CustomEvent<CalculatorRequestContext>(contactMessageEvent, {
        detail: {
          request,
          summary: calculatorRequestSummary(request, copy, locale),
        },
      })
    );
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
        className={`w-full min-w-0 flex flex-col items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] ${className}`}
      >
        <div className="min-w-0 space-y-5">
          <ScenarioStep
            copy={copy}
            onSelectScenario={selectScenario}
            selectedQuickScenario={selectedQuickScenario}
          />

          {isRenovation ? (
            <RenovationContact copy={copy.renovationContact} />
          ) : (
            <>
              <ParametersStep copy={copy} />
              {isConstruction ? <ConstructionExtrasStep copy={copy} /> : null}
              <CalculateButton
                copy={copy}
                onClick={form.handleSubmit(onSubmit, onInvalid)}
              />
            </>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
