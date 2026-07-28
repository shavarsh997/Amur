import { useFormContext } from "react-hook-form";

import { ChoiceCards } from "@/components/calculator/form/choice-cards";
import { ChoiceGroup } from "@/components/calculator/form/choice-group";
import { NumberField } from "@/components/calculator/form/number-field";
import { OptionWithArea } from "@/components/calculator/form/option-with-area";
import { StepTitle } from "@/components/calculator/form/step-title";
import type { CalculatorFormValues } from "@/components/calculator/types";
import { calculatorFieldDomId } from "@/components/calculator/types";
import type { Dictionary } from "@/types";

export function ParametersStep({
  copy,
}: {
  copy: Dictionary["constructionCalculator"];
}) {
  const { control, watch } = useFormContext<CalculatorFormValues>();
  const calculationType = watch("calculationType");
  const isConstruction = calculationType === "construction";
  const isRenovation = calculationType === "renovation";
  const isDesign = calculationType === "design";

  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
      <StepTitle number="02" {...copy.steps.parameters} />
      <div className="mt-6 max-w-xs">
        <NumberField
          control={control}
          fieldId={calculatorFieldDomId("area")}
          label={copy.fields.area}
          min={1}
          name="area"
        />
      </div>

      {isConstruction ? (
        <div className="mt-8 space-y-7 border-t border-[var(--border)] pt-7">
          <ChoiceCards
            control={control}
            name="constructionPackage"
            options={copy.construction.packages}
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <ChoiceGroup
              control={control}
              label={copy.fields.houseShape}
              name="houseShape"
              options={copy.construction.houseShapes}
            />
            <ChoiceGroup
              control={control}
              label={copy.fields.constructionType}
              name="material"
              options={copy.construction.materials}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <OptionWithArea
              areaField="basementArea"
              areaName="basementArea"
              control={control}
              fieldLabel={copy.fields.basementArea}
              label={copy.construction.extras.basement}
              toggleName="basement"
            />
            <OptionWithArea
              areaField="garageArea"
              areaName="garageArea"
              control={control}
              fieldLabel={copy.fields.garageArea}
              label={copy.construction.extras.garage}
              toggleName="garage"
            />
            <OptionWithArea
              areaField="terraceArea"
              areaName="terraceArea"
              control={control}
              fieldLabel={copy.fields.terraceArea}
              label={copy.construction.extras.terrace}
              toggleName="terrace"
            />
          </div>
        </div>
      ) : null}

      {isRenovation ? (
        <div className="mt-8 grid gap-5 border-t border-[var(--border)] pt-7 lg:grid-cols-2">
          <ChoiceGroup
            control={control}
            label={copy.fields.currentCondition}
            name="renovationCondition"
            options={copy.renovation.conditions}
          />
          <ChoiceGroup
            control={control}
            label={copy.fields.renovationLevel}
            name="renovationLevel"
            options={copy.renovation.levels}
          />
        </div>
      ) : null}

      {isDesign ? (
        <div className="mt-8 border-t border-[var(--border)] pt-7">
          <ChoiceCards
            control={control}
            name="designPackage"
            options={{
              basic: copy.design.basic,
              full: copy.design.full,
              supervision: copy.design.supervision,
            }}
          />
        </div>
      ) : null}
    </section>
  );
}
