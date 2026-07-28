type CalculatorNavigationProps = {
  backLabel: string;
  nextLabel: string;
  showBack: boolean;
  showNext?: boolean;
  onBack: () => void;
  onNext: () => void;
};

export function CalculatorNavigation({
  backLabel,
  nextLabel,
  showBack,
  showNext = true,
  onBack,
  onNext,
}: CalculatorNavigationProps) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      {showBack ? (
        <button
          className="min-h-12 rounded-xl border border-[var(--border)] px-5 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
          onClick={onBack}
          type="button"
        >
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      {showNext ? (
        <button
          className="min-h-12 rounded-xl bg-[var(--button-primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--button-primary-hover)]"
          onClick={onNext}
          type="button"
        >
          {nextLabel}
        </button>
      ) : null}
    </div>
  );
}
