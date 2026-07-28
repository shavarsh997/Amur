import { SlidersHorizontal } from "lucide-react";

import type { Dictionary } from "@/types";

export function CalculateButton({
  copy,
  onClick,
}: {
  copy: Dictionary["constructionCalculator"];
  onClick: () => void;
}) {
  return (
    <div className="rounded-[28px] border border-[var(--brand-accent)]/30 bg-[var(--background-warm)] p-3 shadow-[var(--shadow-card)] sm:p-4">
      <button
        className="group flex min-h-20 w-full items-center justify-between gap-4 rounded-2xl bg-[var(--button-primary)] px-5 py-4 text-left text-white shadow-[0_16px_28px_-16px_rgb(24_33_42/0.75)] transition hover:-translate-y-0.5 hover:bg-[var(--button-primary-hover)] hover:shadow-[0_20px_32px_-16px_rgb(24_33_42/0.85)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)] sm:min-h-24 sm:px-6"
        onClick={onClick}
        type="button"
      >
        <span className="flex items-center gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/12 text-[var(--warm-accent)] transition group-hover:scale-105 sm:size-12">
            <SlidersHorizontal aria-hidden="true" className="size-5" />
          </span>
          <span>
            <span className="block text-base font-semibold sm:text-lg">
              {copy.result.calculate}
            </span>
            <span className="mt-1 block text-sm leading-5 text-white/65">
              {copy.result.calculateDescription}
            </span>
          </span>
        </span>
        <span
          aria-hidden="true"
          className="text-xl text-[var(--warm-accent)] transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </div>
  );
}
