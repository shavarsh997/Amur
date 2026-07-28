import type { CalculatorStep } from "@/types/calculator";

type CalculatorProgressProps = {
  steps: readonly CalculatorStep[];
  currentStep: CalculatorStep;
  labels: Record<CalculatorStep, string>;
};

export function CalculatorProgress({
  steps,
  currentStep,
  labels,
}: CalculatorProgressProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
        <span>
          {currentIndex + 1} / {steps.length}
        </span>
        <span>{labels[currentStep]}</span>
      </div>
      <ol
        className="mt-3 grid grid-flow-col auto-cols-fr gap-1.5"
        aria-label={labels[currentStep]}
      >
        {steps.map((step, index) => (
          <li
            className="h-1 overflow-hidden rounded-full bg-[var(--border)]"
            key={step}
          >
            <div
              className={`h-full rounded-full transition-all ${index <= currentIndex ? "bg-[var(--text-primary)]" : "bg-transparent"}`}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
