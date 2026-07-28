import { NumberField } from "@/components/calculator/form/number-field";
import { StepTitle } from "@/components/calculator/form/step-title";
import { SwitchRow } from "@/components/calculator/form/switch-row";
import type {
  CalculatorFormValues,
  CalculatorUpdate,
  CalculatorValidationErrors,
} from "@/components/calculator/types";
import { calculatorFieldDomId } from "@/components/calculator/types";
import type { Dictionary } from "@/types";

export function ConstructionExtrasStep({
  copy,
  values,
  update,
  errors = {},
}: {
  copy: Dictionary["constructionCalculator"];
  values: CalculatorFormValues;
  update: CalculatorUpdate;
  errors?: CalculatorValidationErrors;
}) {
  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
      <StepTitle number="03" {...copy.steps.constructionExtras} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <SwitchRow
          checked={values.highCeilings}
          label={copy.construction.extras.highCeilings}
          onChange={(highCeilings) => update({ highCeilings })}
        />
        <SwitchRow
          checked={values.difficultSite}
          label={copy.construction.extras.difficultSite}
          onChange={(difficultSite) => update({ difficultSite })}
        />
      </div>
      <div className="mt-4 max-w-xs">
        <NumberField
          error={errors.distanceKm}
          fieldId={calculatorFieldDomId("distanceKm")}
          hint={copy.fields.distanceHint}
          label={copy.fields.distance}
          onChange={(distanceKm) => update({ distanceKm })}
          value={values.distanceKm}
        />
      </div>
    </section>
  );
}
