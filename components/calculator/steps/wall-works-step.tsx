import { Controller, useFormContext } from "react-hook-form";

import { StepTitle } from "@/components/calculator/form/step-title";
import { SwitchRowInput } from "@/components/calculator/form/switch-row";
import type { CalculatorFormValues } from "@/components/calculator/types";
import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type { WallWork } from "@/config/construction-calculator.config";
import type { Dictionary } from "@/types";

const wallWorks = Object.keys(
  config.renovation.internalWalls.works
) as WallWork[];

export function WallWorksStep({
  copy,
}: {
  copy: Dictionary["constructionCalculator"];
}) {
  const { control } = useFormContext<CalculatorFormValues>();

  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
      <StepTitle number="04" {...copy.steps.wallWorks} />
      <Controller
        control={control}
        name="selectedWallWorks"
        render={({ field }) => {
          const selectedWorks = field.value ?? [];
          const toggle = (work: WallWork) =>
            field.onChange(
              selectedWorks.includes(work)
                ? selectedWorks.filter((item) => item !== work)
                : [...selectedWorks, work]
            );

          return (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {wallWorks.map((work) => (
                <SwitchRowInput
                  inputRef={null}
                  key={work}
                  label={copy.wallWorks.works[work]}
                  name="selectedWallWorks"
                  onBlur={field.onBlur}
                  onChange={() => toggle(work)}
                  value={selectedWorks.includes(work)}
                />
              ))}
            </div>
          );
        }}
      />
    </section>
  );
}
