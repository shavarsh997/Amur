import type { LeadActionState } from "@/app/actions";
import { formatPrice } from "@/lib/calculator/format-price";
import type { Dictionary, Locale } from "@/types";
import type { EstimateResult } from "@/types/calculator";

export function ResultStep({
  copy,
  estimate,
  locale,
  pending,
  state,
}: {
  copy: Dictionary["calculator"];
  estimate: EstimateResult;
  locale: Locale;
  pending: boolean;
  state: LeadActionState;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
        {copy.result.title}
      </h2>
      <div className="mt-6 rounded-2xl bg-[var(--background-warm)] p-6">
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          {copy.result.rangeLabel}
        </p>
        {estimate.status === "available" ? (
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            {formatPrice(estimate.min, locale, estimate.currency)} —{" "}
            {formatPrice(estimate.max, locale, estimate.currency)}
          </p>
        ) : (
          <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
            {copy.result.pricingUnavailable}
          </p>
        )}
      </div>
      <p className="mt-5 rounded-xl border border-[var(--border)] bg-white p-4 text-sm leading-6 text-[var(--text-secondary)]">
        {copy.result.preliminaryNotice}
      </p>
      <button
        className="mt-6 min-h-12 rounded-xl bg-[var(--button-primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--button-primary-hover)] disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? copy.result.sending : copy.result.sendRequest}
      </button>
      {state.status !== "idle" ? (
        <p
          aria-live="polite"
          className={`mt-3 text-sm font-medium ${state.status === "success" ? "text-[var(--success)]" : "text-[var(--error)]"}`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.status === "success" ? copy.result.success : copy.result.error}
        </p>
      ) : null}
    </section>
  );
}
