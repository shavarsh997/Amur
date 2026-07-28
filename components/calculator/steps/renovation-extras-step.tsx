import { StepTitle } from "@/components/calculator/form/step-title";
import { RenovationExtrasField } from "@/components/calculator/form/renovation-extras-field";
import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type { RenovationExtra } from "@/config/construction-calculator.config";
import type { Dictionary } from "@/types";

export function RenovationExtrasStep({
  copy,
}: {
  copy: Dictionary["constructionCalculator"];
}) {
  const extras = Object.keys(
    config.renovation.extras
  ) as RenovationExtra[];

  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
      <StepTitle number="03" {...copy.steps.renovationExtras} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <RenovationExtrasField copy={copy} extras={extras} />
      </div>
    </section>
  );
}
