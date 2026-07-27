"use client";

import { Calculator, X } from "lucide-react";

import { CostCalculator } from "@/components/calculator/cost-calculator";
import type { Locale } from "@/types";

const calculatorControlId = "project-calculator-dialog";

export function CalculatorTrigger({ label, className = "" }: { label: string; className?: string }) {
  return <label className={`inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-[var(--button-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--button-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)] ${className}`} htmlFor={calculatorControlId}><Calculator aria-hidden="true" className="mr-2 size-4" />{label}</label>;
}

/** Rendered once at the locale-layout level so it always sits above the header. */
export function CalculatorDialog({ locale }: { locale: Locale }) {
  return <div><input className="peer sr-only" id={calculatorControlId} type="checkbox" /><div aria-modal="true" className="fixed inset-0 z-[100] hidden items-end justify-center p-0 peer-checked:flex sm:items-center sm:p-5" role="dialog"><label aria-label="Закрыть калькулятор" className="absolute inset-0 cursor-default bg-[rgb(24_33_42/0.52)] backdrop-blur-[2px]" htmlFor={calculatorControlId} /><div className="relative z-10 flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[28px] bg-[var(--background-soft)] shadow-2xl sm:rounded-[28px]"><div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] bg-white px-5 py-4 sm:px-7"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">Онлайн-калькулятор</p><h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]">Предварительная стоимость проекта</h2></div><label aria-label="Закрыть калькулятор" className="grid size-10 cursor-pointer place-items-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]" htmlFor={calculatorControlId}><X aria-hidden="true" className="size-5" /></label></div><div className="overflow-y-auto p-4 sm:p-6"><CostCalculator locale={locale} /></div></div></div></div>;
}
