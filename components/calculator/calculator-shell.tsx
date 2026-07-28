import type { ReactNode } from "react";

import { CalculatorProgress } from "@/components/calculator/calculator-progress";
import type { Dictionary } from "@/types";
import type { CalculatorStep } from "@/types/calculator";

type CalculatorShellProps = {
  copy: Dictionary["calculator"];
  steps: readonly CalculatorStep[];
  currentStep: CalculatorStep;
  children: ReactNode;
  className?: string;
};

export function CalculatorShell({
  copy,
  steps,
  currentStep,
  children,
  className = "",
}: CalculatorShellProps) {
  return (
    <div
      className={`rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[0_20px_45px_-38px_rgb(24_24_27/0.35)] sm:p-7 ${className}`}
    >
      <CalculatorProgress
        currentStep={currentStep}
        labels={copy.steps}
        steps={steps}
      />
      <div className="mt-8">{children}</div>
    </div>
  );
}
