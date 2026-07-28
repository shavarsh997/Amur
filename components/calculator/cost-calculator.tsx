"use client";

import { useMemo, useState } from "react";

import { ConstructionEstimateDialog } from "@/components/calculator/construction-estimate-dialog";
import { CalculateButton } from "@/components/calculator/steps/calculate-button";
import { ConstructionExtrasStep } from "@/components/calculator/steps/construction-extras-step";
import { ParametersStep } from "@/components/calculator/steps/parameters-step";
import { RenovationExtrasStep } from "@/components/calculator/steps/renovation-extras-step";
import { ScenarioStep } from "@/components/calculator/steps/scenario-step";
import type { CalculatorFormValues } from "@/components/calculator/types";
import { valuesForScenario } from "@/components/calculator/utils";
import {
  constructionCalculatorConfig as config,
  type CalculatorScenarioId,
  type CalculationType,
  type RenovationExtra,
} from "@/config/construction-calculator.config";
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
  const [values, setValues] = useState(() =>
    valuesForScenario(defaultCalculationType, defaultScenarioId)
  );
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const estimate = useMemo(
    () => calculateConstructionEstimate(values, copy),
    [values, copy]
  );
  const isConstruction = values.calculationType === "construction";
  const isRenovation = values.calculationType === "renovation";

  const update = (patch: Partial<CalculatorFormValues>) =>
    setValues((current) => ({ ...current, ...patch }));

  const toggleRenovationExtra = (extra: RenovationExtra) =>
    update({
      renovationExtras: values.renovationExtras.includes(extra)
        ? values.renovationExtras.filter((item) => item !== extra)
        : [...values.renovationExtras, extra],
    });

  const selectedQuickScenario = config.quickScenarios.find(
    (scenario) =>
      scenario.calculationType === values.calculationType &&
      (scenario.renovationObjectType === undefined ||
        scenario.renovationObjectType === values.renovationObjectType)
  )?.id;

  const selectScenario = (scenarioId: CalculatorScenarioId) => {
    const scenario = config.quickScenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;

    setValues((current) =>
      valuesForScenario(scenario.calculationType, scenario.id, current.area)
    );
  };

  return (
    <div
      className={`grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] ${className}`}
    >
      <div className="space-y-5">
        <ScenarioStep
          copy={copy}
          onSelectScenario={selectScenario}
          selectedQuickScenario={selectedQuickScenario}
        />

        <ParametersStep copy={copy} update={update} values={values} />

        {isConstruction ? (
          <ConstructionExtrasStep copy={copy} update={update} values={values} />
        ) : null}

        {isRenovation ? (
          <RenovationExtrasStep
            copy={copy}
            onToggleExtra={toggleRenovationExtra}
            update={update}
            values={values}
          />
        ) : null}

        <CalculateButton
          copy={copy}
          onClick={() => setIsEstimateOpen(true)}
        />
      </div>

      <ConstructionEstimateDialog
        copy={copy}
        estimate={estimate}
        isOpen={isEstimateOpen}
        locale={locale}
        onClose={() => setIsEstimateOpen(false)}
      />
    </div>
  );
}
