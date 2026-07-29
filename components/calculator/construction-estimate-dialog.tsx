"use client";

import { useEffect, useMemo, useState } from "react";

import type { CalculatorFormValues } from "@/components/calculator/types";
import { EstimateLoadingState } from "@/components/calculator/estimate-loading-state";
import { constructionCalculatorConfig as config } from "@/config/construction-calculator.config";
import { calculateConstructionEstimate } from "@/lib/calculator/calculate-construction-estimate";
import { adjustRenovationEstimateSurfaces } from "@/lib/calculator/adjust-renovation-estimate-surfaces";
import type { RenovationSurfaceOverrides } from "@/lib/calculator/adjust-renovation-estimate-surfaces";
import { formatPrice } from "@/lib/calculator/format-price";
import type { Dictionary, Locale } from "@/types";

export function ConstructionEstimateDialog({
  copy,
  locale,
  onClose,
  values,
}: {
  copy: Dictionary["constructionCalculator"];
  locale: Locale;
  onClose: () => void;
  values: CalculatorFormValues;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const baseEstimate = useMemo(
    () => calculateConstructionEstimate(values, copy),
    [values, copy]
  );
  const [surfaceOverrides, setSurfaceOverrides] =
    useState<RenovationSurfaceOverrides>(() => {
      const surfaces = baseEstimate.surfaceCalculation;
      return {
        floorArea: surfaces?.floorArea ?? 0,
        ceilingArea: surfaces?.ceilingArea ?? 0,
        internalWallArea: surfaces?.internalWallArea ?? 0,
        exteriorWallArea: surfaces?.exteriorWallArea ?? 0,
      };
    });
  const estimate = useMemo(
    () => adjustRenovationEstimateSurfaces(baseEstimate, surfaceOverrides),
    [baseEstimate, surfaceOverrides]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const money = (value: number) => formatPrice(value, locale, config.currency);
  const number = (value: number) =>
    new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
  const changeSurface = (
    key: keyof RenovationSurfaceOverrides,
    value: string
  ) => {
    const parsed = Number(value.replace(",", "."));
    if (!Number.isFinite(parsed) || parsed <= 0) return;
    setSurfaceOverrides((current) => ({ ...current, [key]: parsed }));
  };
  const surfaceInput = (
    key: keyof RenovationSurfaceOverrides,
    label: string
  ) => (
    <dd className="mt-1 flex items-center gap-2">
      <input
        aria-label={label}
        className="min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-white px-2 py-1 font-semibold text-[var(--text-primary)] outline-none focus:border-[var(--text-primary)]"
        inputMode="decimal"
        onChange={(event) => changeSurface(key, event.target.value)}
        type="number"
        value={surfaceOverrides[key]}
      />
      <span className="text-sm text-[var(--text-secondary)]">
        {copy.result.units.squareMeter}
      </span>
    </dd>
  );

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
      <div className="relative z-10 max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
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
          <EstimateLoadingState message={copy.result.loading} />
        ) : estimate.total ? (
          <>
            <p className="mt-7 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-4xl">
              {money(estimate.total)}
            </p>
            {values.calculationType === "renovation" &&
            estimate.surfaceCalculation ? (
              <section className="mt-7 rounded-2xl border border-[var(--border)] bg-white p-5">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {copy.result.renovationScopeTitle}
                </h3>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-xs text-[var(--text-muted)]">
                      {copy.result.floorAreaLabel}
                    </dt>
                    {surfaceInput("floorArea", copy.result.floorAreaLabel)}
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--text-muted)]">
                      {copy.result.surfaceWorks.ceiling}
                    </dt>
                    {surfaceInput(
                      "ceilingArea",
                      copy.result.surfaceWorks.ceiling
                    )}
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--text-muted)]">
                      {copy.result.surfaceWorks.internalWalls}
                    </dt>
                    {surfaceInput(
                      "internalWallArea",
                      copy.result.surfaceWorks.internalWalls
                    )}
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--text-muted)]">
                      {copy.result.surfaceWorks.exteriorWalls}
                    </dt>
                    {surfaceInput(
                      "exteriorWallArea",
                      copy.result.surfaceWorks.exteriorWalls
                    )}
                  </div>
                </dl>
              </section>
            ) : null}
            <div className="mt-7 border-t border-[var(--border)] pt-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {copy.result.workBreakdownTitle}
              </h3>
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
                      {line.quantity !== undefined &&
                      line.pricePerUnit !== undefined &&
                      line.unit ? (
                        <span className="mt-1 block text-xs text-[var(--text-muted)]">
                          {number(line.quantity)} {copy.result.units[line.unit]}{" "}
                          × {money(line.pricePerUnit)} =
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

            {estimate.wallCalculation ? (
              <section className="mt-7 rounded-2xl bg-[var(--background-warm)] p-5">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {copy.wallWorks.resultTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {copy.wallWorks.wallAreaLabel.replace(
                    "{area}",
                    String(
                      estimate.surfaceCalculation?.internalWallArea ??
                        estimate.wallCalculation.netWallArea
                    )
                  )}
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                  {copy.wallWorks.calculationDetails
                    .replace(
                      "{length}",
                      number(estimate.wallCalculation.partitionLength)
                    )
                    .replace(
                      "{grossArea}",
                      number(estimate.wallCalculation.grossWallArea)
                    )
                    .replace(
                      "{openingsArea}",
                      number(estimate.wallCalculation.openingsArea)
                    )}
                </p>
                {estimate.wallWorks.length ? (
                  <ul className="mt-4 space-y-3 border-t border-[var(--border)] pt-4">
                    {estimate.wallWorks.map((line) => (
                      <li key={line.key}>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {copy.wallWorks.works[line.key]}
                        </p>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                          {line.quantity} {copy.wallWorks.unit} ×{" "}
                          {money(line.pricePerUnit)} ={" "}
                          <span className="font-semibold text-[var(--text-primary)]">
                            {money(line.total)}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    {copy.wallWorks.noWorksSelected}
                  </p>
                )}
                <p className="mt-4 border-t border-[var(--border)] pt-4 text-sm font-semibold text-[var(--text-primary)]">
                  {copy.wallWorks.totalLabel}: {money(estimate.wallWorksTotal)}
                </p>
                <p className="mt-4 text-xs leading-5 text-[var(--text-muted)]">
                  {copy.wallWorks.notice}
                </p>
              </section>
            ) : null}
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
