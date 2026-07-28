import { ChoiceCards } from "@/components/calculator/form/choice-cards";
import { ChoiceGroup } from "@/components/calculator/form/choice-group";
import { NumberField } from "@/components/calculator/form/number-field";
import { OptionWithArea } from "@/components/calculator/form/option-with-area";
import { StepTitle } from "@/components/calculator/form/step-title";
import type {
  CalculatorFormValues,
  CalculatorUpdate,
} from "@/components/calculator/types";
import type {
  ConstructionMaterial,
  ConstructionPackage,
  DesignPackage,
  HouseShape,
  RenovationCondition,
  RenovationLevel,
} from "@/config/construction-calculator.config";
import type { Dictionary } from "@/types";

export function ParametersStep({
  copy,
  values,
  update,
}: {
  copy: Dictionary["constructionCalculator"];
  values: CalculatorFormValues;
  update: CalculatorUpdate;
}) {
  const isConstruction = values.calculationType === "construction";
  const isRenovation = values.calculationType === "renovation";
  const isDesign = values.calculationType === "design";

  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
      <StepTitle number="02" {...copy.steps.parameters} />
      <div className="mt-6 max-w-xs">
        <NumberField
          label={copy.fields.area}
          min={1}
          onChange={(area) => update({ area })}
          value={values.area}
        />
      </div>

      {isConstruction ? (
        <div className="mt-8 space-y-7 border-t border-[var(--border)] pt-7">
          <ChoiceCards
            options={copy.construction.packages}
            selected={values.constructionPackage}
            onChange={(constructionPackage) =>
              update({
                constructionPackage: constructionPackage as ConstructionPackage,
              })
            }
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <ChoiceGroup
              label={copy.fields.houseShape}
              options={copy.construction.houseShapes}
              selected={values.houseShape}
              onChange={(houseShape) =>
                update({ houseShape: houseShape as HouseShape })
              }
            />
            <ChoiceGroup
              label={copy.fields.constructionType}
              options={copy.construction.materials}
              selected={values.material}
              onChange={(material) =>
                update({ material: material as ConstructionMaterial })
              }
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <OptionWithArea
              checked={values.basement}
              fieldLabel={copy.fields.basementArea}
              label={copy.construction.extras.basement}
              value={values.basementArea}
              onCheckedChange={(basement) => update({ basement })}
              onValueChange={(basementArea) => update({ basementArea })}
            />
            <OptionWithArea
              checked={values.garage}
              fieldLabel={copy.fields.garageArea}
              label={copy.construction.extras.garage}
              value={values.garageArea}
              onCheckedChange={(garage) => update({ garage })}
              onValueChange={(garageArea) => update({ garageArea })}
            />
            <OptionWithArea
              checked={values.terrace}
              fieldLabel={copy.fields.terraceArea}
              label={copy.construction.extras.terrace}
              value={values.terraceArea}
              onCheckedChange={(terrace) => update({ terrace })}
              onValueChange={(terraceArea) => update({ terraceArea })}
            />
          </div>
        </div>
      ) : null}

      {isRenovation ? (
        <div className="mt-8 grid gap-5 border-t border-[var(--border)] pt-7 lg:grid-cols-2">
          <ChoiceGroup
            label={copy.fields.currentCondition}
            options={copy.renovation.conditions}
            selected={values.renovationCondition}
            onChange={(renovationCondition) =>
              update({
                renovationCondition: renovationCondition as RenovationCondition,
              })
            }
          />
          <ChoiceGroup
            label={copy.fields.renovationLevel}
            options={copy.renovation.levels}
            selected={values.renovationLevel}
            onChange={(renovationLevel) =>
              update({
                renovationLevel: renovationLevel as RenovationLevel,
              })
            }
          />
        </div>
      ) : null}

      {isDesign ? (
        <div className="mt-8 border-t border-[var(--border)] pt-7">
          <ChoiceCards
            options={{
              basic: copy.design.basic,
              full: copy.design.full,
              supervision: copy.design.supervision,
            }}
            selected={values.designPackage}
            onChange={(designPackage) =>
              update({ designPackage: designPackage as DesignPackage })
            }
          />
        </div>
      ) : null}
    </section>
  );
}
