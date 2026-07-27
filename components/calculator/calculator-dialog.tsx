"use client";

import { useEffect, useRef, useState } from "react";
import { Calculator, X } from "lucide-react";

import { CostCalculator } from "@/components/calculator/cost-calculator";
import type { Dictionary, Locale } from "@/types";

const calculatorOpenEvent = "open-project-calculator";

export function CalculatorTrigger({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button
      aria-haspopup="dialog"
      className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--button-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--button-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)] ${className}`}
      onClick={() => window.dispatchEvent(new Event(calculatorOpenEvent))}
      type="button"
    >
      <Calculator aria-hidden="true" className="mr-2 size-4" />
      {label}
    </button>
  );
}

/** Rendered once at the locale-layout level so it always sits above the header. */
export function CalculatorDialog({ copy, locale }: { copy: Dictionary["constructionCalculator"]; locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openCalculator = () => setIsOpen(true);
    window.addEventListener(calculatorOpenEvent, openCalculator);

    return () => window.removeEventListener(calculatorOpenEvent, openCalculator);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div aria-labelledby="calculator-dialog-title" aria-modal="true" className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-5" role="dialog">
      <button
        aria-label={copy.dialog.close}
        className="absolute inset-0 cursor-default bg-[rgb(24_33_42/0.52)] backdrop-blur-[2px]"
        onClick={() => setIsOpen(false)}
        type="button"
      />
      <div ref={dialogRef} className="relative z-10 flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[28px] bg-[var(--background-soft)] shadow-2xl outline-none sm:rounded-[28px]" tabIndex={-1}>
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">{copy.dialog.eyebrow}</p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]" id="calculator-dialog-title">{copy.dialog.title}</h2>
          </div>
          <button aria-label={copy.dialog.close} className="grid size-10 place-items-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]" onClick={() => setIsOpen(false)} type="button">
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-4 sm:p-6">
          <CostCalculator copy={copy} locale={locale} />
        </div>
      </div>
    </div>
  );
}
