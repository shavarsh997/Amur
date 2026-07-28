import { NumberField } from "@/components/calculator/form/number-field";
import { StepTitle } from "@/components/calculator/form/step-title";
import { SwitchRow } from "@/components/calculator/form/switch-row";
import type {
  CalculatorFormValues,
  CalculatorUpdate,
  CalculatorValidationErrors,
} from "@/components/calculator/types";
import { calculatorFieldDomId } from "@/components/calculator/types";
import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type { RenovationExtra } from "@/config/construction-calculator.config";
import type { Dictionary } from "@/types";

export function RenovationExtrasStep({
  copy,
  values,
  update,
  onToggleExtra,
  errors = {},
}: {
  copy: Dictionary["constructionCalculator"];
  values: CalculatorFormValues;
  update: CalculatorUpdate;
  onToggleExtra: (extra: RenovationExtra) => void;
  errors?: CalculatorValidationErrors;
}) {
  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
      <StepTitle number="03" {...copy.steps.renovationExtras} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {(Object.keys(config.renovation.extras) as RenovationExtra[]).map(
          (extra) => {
            const selected = values.renovationExtras.includes(extra);
            const needsCount = extra === "doors" || extra === "airConditioners";
            const needsBathrooms = extra === "plumbing";
            const needsArea = extra === "heatedFloor";

            return (
              <div className="space-y-2" key={extra}>
                <SwitchRow
                  checked={selected}
                  label={copy.renovation.extras[extra]}
                  onChange={() => onToggleExtra(extra)}
                />
                {selected && needsCount ? (
                  <NumberField
                    error={
                      extra === "doors"
                        ? errors.doorsCount
                        : errors.airConditionersCount
                    }
                    fieldId={calculatorFieldDomId(
                      extra === "doors" ? "doorsCount" : "airConditionersCount"
                    )}
                    label={
                      extra === "doors"
                        ? copy.fields.doorsCount
                        : copy.fields.airConditionersCount
                    }
                    min={1}
                    onChange={(value) =>
                      update(
                        extra === "doors"
                          ? { doorsCount: value }
                          : { airConditionersCount: value }
                      )
                    }
                    value={
                      extra === "doors"
                        ? values.doorsCount
                        : values.airConditionersCount
                    }
                  />
                ) : null}
                {selected && needsBathrooms ? (
                  <NumberField
                    error={errors.bathrooms}
                    fieldId={calculatorFieldDomId("bathrooms")}
                    label={copy.fields.bathrooms}
                    min={1}
                    onChange={(bathrooms) => update({ bathrooms })}
                    value={values.bathrooms}
                  />
                ) : null}
                {selected && needsArea ? (
                  <NumberField
                    error={errors.heatedFloorArea}
                    fieldId={calculatorFieldDomId("heatedFloorArea")}
                    label={copy.fields.heatedFloorArea}
                    min={1}
                    onChange={(heatedFloorArea) => update({ heatedFloorArea })}
                    value={values.heatedFloorArea}
                  />
                ) : null}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}
