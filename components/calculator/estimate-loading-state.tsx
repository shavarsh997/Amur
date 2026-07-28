import { SlidersHorizontal } from "lucide-react";

const skeletonRows = [
  { labelWidth: "w-[72%]", amountWidth: "w-20" },
  { labelWidth: "w-[58%]", amountWidth: "w-16" },
  { labelWidth: "w-[64%]", amountWidth: "w-24" },
] as const;

export function EstimateLoadingState({ message }: { message: string }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="estimate-loading mt-7 overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--background-warm)] p-5 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-white shadow-[0_12px_24px_-18px_rgb(24_33_42/0.35)]">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl border border-[var(--border)]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-[var(--brand-accent)]/12"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-[var(--brand-accent)] animate-spin"
          />
          <SlidersHorizontal
            aria-hidden="true"
            className="relative size-6 stroke-[1.5] text-[var(--brand-accent)]"
          />
        </div>

        <div className="min-w-0 pt-1">
          <p className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
            {message}
          </p>
          <p
            aria-hidden="true"
            className="mt-2 inline-flex items-center gap-1"
          >
            {Array.from({ length: 3 }, (_, index) => (
              <span
                className="estimate-loading-dot size-1.5 rounded-full bg-[var(--brand-accent)]"
                key={index}
                style={{ animationDelay: `${index * 160}ms` }}
              />
            ))}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="estimate-loading-shimmer h-11 w-2/3 rounded-2xl bg-white/75" />

        <div className="space-y-3 border-t border-[var(--border)]/80 pt-5">
          {skeletonRows.map((row, index) => (
            <div className="flex items-center justify-between gap-4" key={index}>
              <div
                className={`estimate-loading-shimmer h-4 rounded-lg bg-white/70 ${row.labelWidth}`}
                style={{ animationDelay: `${index * 120}ms` }}
              />
              <div
                className={`estimate-loading-shimmer h-4 rounded-lg bg-white/70 ${row.amountWidth}`}
                style={{ animationDelay: `${index * 120 + 60}ms` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/80"
      >
        <span className="estimate-loading-progress block h-full rounded-full bg-[var(--brand-accent)]" />
      </div>
    </div>
  );
}
