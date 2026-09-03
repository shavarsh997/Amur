import { useFormContext } from "react-hook-form";

import { ChoiceCards } from "@/components/calculator/form/choice-cards";
import { ChoiceGroup } from "@/components/calculator/form/choice-group";
import { NumberField } from "@/components/calculator/form/number-field";
import { OptionWithArea } from "@/components/calculator/form/option-with-area";
import { StepTitle } from "@/components/calculator/form/step-title";
import type { CalculatorFormValues } from "@/components/calculator/types";
import { calculatorFieldDomId } from "@/components/calculator/types";
import type { Dictionary, Locale } from "@/types";

export function ParametersStep({
  copy,
  locale,
}: {
  copy: Dictionary["constructionCalculator"];
  locale: Locale;
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
          max={isRenovation ? 2000 : 100_000}
          min={isRenovation ? 10 : 1}
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
        <div className="mt-8 space-y-7 border-t border-[var(--border)] pt-7">
          <div className="grid gap-5 lg:grid-cols-2">
            <ChoiceGroup
              control={control}
              label={copy.fields.currentCondition}
              name="renovationCondition"
              options={copy.renovation.conditions}
            />
            {locale === "hy" &&
            copy.fields.renovationType &&
            copy.fields.finishLevel &&
            copy.renovation.types &&
            copy.renovation.finishLevels ? (
              <div className="grid gap-5">
                <ChoiceGroup
                  control={control}
                  label={copy.fields.renovationType}
                  name="renovationType"
                  options={copy.renovation.types}
                />
                <ChoiceGroup
                  control={control}
                  label={copy.fields.finishLevel}
                  name="finishLevel"
                  options={copy.renovation.finishLevels}
                />
              </div>
            ) : (
              <ChoiceGroup
                control={control}
                label={copy.fields.renovationLevel}
                name="renovationLevel"
                options={copy.renovation.levels}
              />
            )}
          </div>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)]">
            <NumberField
              control={control}
              fieldId={calculatorFieldDomId("ceilingHeight")}
              label={copy.fields.ceilingHeight}
              max={6}
              min={2}
              name="ceilingHeight"
            />
            <NumberField
              control={control}
              fieldId={calculatorFieldDomId("roomsCount")}
              label={copy.fields.roomsCount}
              max={50}
              min={1}
              name="roomsCount"
            />
            <ChoiceGroup
              control={control}
              label={copy.fields.layoutDensity}
              name="layoutDensity"
              options={copy.wallWorks.layoutDensity}
            />
          </div>
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
