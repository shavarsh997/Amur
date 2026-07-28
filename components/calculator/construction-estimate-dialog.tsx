"use client";

import { useEffect, useState } from "react";

import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import type { ConstructionEstimate } from "@/lib/calculator/calculate-construction-estimate";
import { formatPrice } from "@/lib/calculator/format-price";
import type { Dictionary, Locale } from "@/types";

export function ConstructionEstimateDialog({
  copy,
  estimate,
  isOpen,
  locale,
  onClose,
}: {
  copy: Dictionary["constructionCalculator"];
  estimate: ConstructionEstimate;
  isOpen: boolean;
  locale: Locale;
  onClose: () => void;
}) {
  const [loadingSessionId, setLoadingSessionId] = useState(0);
  const [readySessionId, setReadySessionId] = useState(-1);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setLoadingSessionId((sessionId) => sessionId + 1);
    }
  }

  const isLoading = isOpen && readySessionId !== loadingSessionId;

  useEffect(() => {
    if (!isOpen) return;

    const session = loadingSessionId;
    const timer = window.setTimeout(() => {
      setReadySessionId(session);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [isOpen, loadingSessionId]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const money = (value: number) => formatPrice(value, locale, config.currency);

  return (
    <div
      aria-labelledby="construction-estimate-title"
      aria-modal="true"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-5"
      role="dialog"
    >
      <button
        aria-label={copy.dialog.close}
        className="absolute inset-0 bg-[rgb(24_33_42/0.52)] backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />
      <div className="relative z-10 w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
              {copy.result.title}
            </p>
            <h2
              className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]"
              id="construction-estimate-title"
            >
              {copy.result.total}
            </h2>
          </div>
          <button
            aria-label={copy.dialog.close}
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        {isLoading ? (
          <div
            aria-busy="true"
            aria-live="polite"
            className="flex min-h-56 flex-col items-center justify-center gap-4 py-8"
          >
            <span
              aria-hidden="true"
              className="size-11 animate-spin rounded-full border-[3px] border-[var(--border)] border-t-[var(--brand-accent)]"
            />
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              {copy.result.loading}
            </p>
          </div>
        ) : estimate.total ? (
          <>
            <p className="mt-7 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-4xl">
              {money(estimate.total)}
            </p>
            <div className="mt-7 border-t border-[var(--border)] pt-5">
              <ul className="space-y-3">
                {estimate.lines.map((line, index) => (
                  <li
                    className="flex justify-between gap-4 text-sm leading-5"
                    key={`${line.label}-${index}`}
                  >
                    <span className="text-[var(--text-secondary)]">
                      {line.label}
                      {line.note ? (
                        <span className="block text-xs text-[var(--text-muted)]">
                          {line.note}
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 font-semibold text-[var(--text-primary)]">
                      {line.amount ? money(line.amount) : copy.result.included}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="mt-7 rounded-2xl bg-[var(--background-warm)] p-5 text-sm leading-6 text-[var(--text-secondary)]">
            {copy.result.empty}
          </p>
        )}
        {!isLoading ? (
          <p className="mt-6 text-sm leading-6 text-[var(--text-secondary)]">
            {copy.result.notice}
          </p>
        ) : null}
      </div>
    </div>
  );
}
