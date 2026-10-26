"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import { submitLeadAction, type LeadActionState } from "@/app/actions";
import { leadFormConfig } from "@/config/lead-form.config";
import { Button } from "@/components/ui/button";
import type { CalculatorRequestContext } from "@/lib/calculator/calculator-request";
import { trackEvent } from "@/lib/analytics";
import { getLeadAttribution, publicPagePath } from "@/lib/lead-attribution";
import type { Locale } from "@/types";
import type { LeadFormDictionary } from "@/types/contact";

type FormState = LeadActionState & { values?: Record<string, string> };

const initialState: FormState = {
  status: "idle",
  message: "",
  errors: {},
};

const fieldClass =
  "min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)] focus:ring-2 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-60";

export function LeadForm({
  locale,
  dictionary,
  className = "",
  onSuccess,
  calculatorContext,
}: {
  locale: Locale;
  dictionary: LeadFormDictionary;
  className?: string;
  onSuccess?: () => void;
  calculatorContext?: CalculatorRequestContext;
}) {
  const started = useRef(false);
  const handledSuccess = useRef<FormState | null>(null);
  const formKind = calculatorContext ? "calculator" : "lead";
  const action = submitLeadAction.bind(null, locale);
  const [state, formAction, pending] = useActionState(
    async (previous: FormState, data: FormData): Promise<FormState> => {
      const attribution = getLeadAttribution();
      if (attribution) data.set("attribution", JSON.stringify(attribution));
      const submittedFrom = publicPagePath(window.location.pathname);
      if (submittedFrom) data.set("submittedFrom", submittedFrom);
      trackEvent("form_submit", { form: formKind });
      let result: LeadActionState;
      try {
        result = await action(previous, data);
      } catch {
        result = {
          status: "error",
          errorType: "delivery",
          message: dictionary.estimate.error,
          errors: {},
        };
      }
      if (result.status === "success" && result.delivered) {
        trackEvent("generate_lead", { form: formKind });
      } else if (result.status === "error") {
        trackEvent("form_error", {
          form: formKind,
          error_type: result.errorType ?? "delivery",
        });
      }
      if (result.status !== "error") return result;
      const values: Record<string, string> = {};
      for (const field of [
        "objectType",
        "area",
        "region",
        "workType",
        "name",
        "phone",
        "comment",
      ]) {
        const value = data.get(field);
        if (typeof value === "string") values[field] = value;
      }
      return { ...result, values };
    },
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const copy = dictionary.estimate;

  useEffect(() => {
    if (state.status === "error" && state.values) {
      // React resets uncontrolled form controls after an action resolves,
      // including failed submissions. Restore the submitted values explicitly;
      // changing select.defaultValue alone does not restore its selection.
      for (const [name, value] of Object.entries(state.values)) {
        const field = formRef.current?.elements.namedItem(name);
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLSelectElement ||
          field instanceof HTMLTextAreaElement
        )
          field.value = value;
      }
      return;
    }
    if (state.status !== "success" || handledSuccess.current === state) return;
    handledSuccess.current = state;
    formRef.current?.reset();
    onSuccess?.();
  }, [onSuccess, state]);

  function fieldId(name: string) {
    return `${id}-${name}`;
  }

  function errorId(name: string) {
    return `${fieldId(name)}-error`;
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className={`grid gap-5 content-grid md:grid-cols-2 ${className}`}
      noValidate
      onChange={() => {
        if (started.current) return;
        started.current = true;
        trackEvent("form_start", { form: formKind });
      }}
    >
      {calculatorContext ? (
        <div className="col-span-full">
          <p className="mb-4 leading-6 text-[var(--text-secondary)]">
            {dictionary.calculatorRequest?.description}
          </p>
          <details className="rounded-xl border border-[var(--border)] bg-white p-4">
            <summary className="cursor-pointer font-semibold">
              {dictionary.calculatorRequest?.summaryTitle}
            </summary>
            <dl className="mt-3 space-y-2 text-sm">
              {calculatorContext.summary.map(({ label, value }) => (
                <div
                  className="flex flex-wrap justify-between gap-x-4 gap-y-1"
                  key={label}
                >
                  <dt className="text-[var(--text-secondary)]">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </details>
          <input
            name="calculatorRequest"
            type="hidden"
            value={JSON.stringify(calculatorContext.request)}
          />
        </div>
      ) : null}
      {calculatorContext?.request.calculationType !== "construction" ? (
        <div>
          <label
            className="mb-2 block text-sm font-semibold"
            htmlFor={fieldId("objectType")}
          >
            {copy.fields.objectType}
            <span
              className="ml-1 text-[var(--text-secondary)]"
              aria-hidden="true"
            >
              *
            </span>
          </label>
          <select
            aria-describedby={
              state.errors.objectType ? errorId("objectType") : undefined
            }
            aria-invalid={Boolean(state.errors.objectType)}
            className={fieldClass}
            defaultValue={state.values?.objectType ?? ""}
            disabled={pending}
            id={fieldId("objectType")}
            name="objectType"
            required
          >
            <option disabled value="">
              {copy.placeholders.objectType}
            </option>
            {leadFormConfig.objectTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {copy.choices.objectType[option.labelKey]}
              </option>
            ))}
          </select>
          {state.errors.objectType ? (
            <p className="mt-2 text-sm text-red-700" id={errorId("objectType")}>
              {state.errors.objectType}
            </p>
          ) : null}
        </div>
      ) : null}

      {!calculatorContext ? (
        <div>
          <label
            className="mb-2 block text-sm font-semibold"
            htmlFor={fieldId("area")}
          >
            {copy.fields.area}
            <span
              className="ml-1 text-[var(--text-secondary)]"
              aria-hidden="true"
            >
              *
            </span>
          </label>
          <input
            aria-describedby={state.errors.area ? errorId("area") : undefined}
            aria-invalid={Boolean(state.errors.area)}
            className={fieldClass}
            disabled={pending}
            id={fieldId("area")}
            inputMode="decimal"
            min="0.01"
            name="area"
            defaultValue={state.values?.area ?? ""}
            placeholder={copy.placeholders.area}
            required
            step="any"
            type="number"
          />
          {state.errors.area ? (
            <p className="mt-2 text-sm text-red-700" id={errorId("area")}>
              {state.errors.area}
            </p>
          ) : null}
        </div>
      ) : null}

      <div>
        <label
          className="mb-2 block text-sm font-semibold"
          htmlFor={fieldId("region")}
        >
          {copy.fields.region}
          <span
            className="ml-1 text-[var(--text-secondary)]"
            aria-hidden="true"
          >
            *
          </span>
        </label>
        <input
          aria-describedby={state.errors.region ? errorId("region") : undefined}
          aria-invalid={Boolean(state.errors.region)}
          autoComplete="address-level1"
          className={fieldClass}
          disabled={pending}
          id={fieldId("region")}
          maxLength={120}
          name="region"
          defaultValue={state.values?.region ?? ""}
          placeholder={copy.placeholders.region}
          required
          type="text"
        />
        {state.errors.region ? (
          <p className="mt-2 text-sm text-red-700" id={errorId("region")}>
            {state.errors.region}
          </p>
        ) : null}
      </div>

      {!calculatorContext ? (
        <div>
          <label
            className="mb-2 block text-sm font-semibold"
            htmlFor={fieldId("workType")}
          >
            {copy.fields.workType}
            <span
              className="ml-1 text-[var(--text-secondary)]"
              aria-hidden="true"
            >
              *
            </span>
          </label>
          <select
            aria-describedby={
              state.errors.workType ? errorId("workType") : undefined
            }
            aria-invalid={Boolean(state.errors.workType)}
            className={fieldClass}
            defaultValue={state.values?.workType ?? ""}
            disabled={pending}
            id={fieldId("workType")}
            name="workType"
            required
          >
            <option disabled value="">
              {copy.placeholders.workType}
            </option>
            {leadFormConfig.workTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {copy.choices.workType[option.labelKey]}
              </option>
            ))}
          </select>
          {state.errors.workType ? (
            <p className="mt-2 text-sm text-red-700" id={errorId("workType")}>
              {state.errors.workType}
            </p>
          ) : null}
        </div>
      ) : null}

      <div>
        <label
          className="mb-2 block text-sm font-semibold"
          htmlFor={fieldId("name")}
        >
          {copy.fields.name}
          <span
            className="ml-1 text-[var(--text-secondary)]"
            aria-hidden="true"
          >
            *
          </span>
        </label>
        <input
          aria-describedby={state.errors.name ? errorId("name") : undefined}
          aria-invalid={Boolean(state.errors.name)}
          autoComplete="name"
          className={fieldClass}
          disabled={pending}
          id={fieldId("name")}
          maxLength={120}
          name="name"
          defaultValue={state.values?.name ?? ""}
          placeholder={copy.placeholders.name}
          required
          type="text"
        />
        {state.errors.name ? (
          <p className="mt-2 text-sm text-red-700" id={errorId("name")}>
            {state.errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold"
          htmlFor={fieldId("phone")}
        >
          {copy.fields.phone}
          <span
            className="ml-1 text-[var(--text-secondary)]"
            aria-hidden="true"
          >
            *
          </span>
        </label>
        <input
          aria-describedby={state.errors.phone ? errorId("phone") : undefined}
          aria-invalid={Boolean(state.errors.phone)}
          autoComplete="tel"
          className={fieldClass}
          disabled={pending}
          id={fieldId("phone")}
          inputMode="tel"
          maxLength={40}
          name="phone"
          defaultValue={state.values?.phone ?? ""}
          placeholder={copy.placeholders.phone}
          required
          type="tel"
        />
        {state.errors.phone ? (
          <p className="mt-2 text-sm text-red-700" id={errorId("phone")}>
            {state.errors.phone}
          </p>
        ) : null}
      </div>

      <div className="col-span-full">
        <label
          className="mb-2 block text-sm font-semibold"
          htmlFor={fieldId("comment")}
        >
          {copy.fields.comment}
          <span className="ml-2 text-xs font-normal text-zinc-500">
            {dictionary.common.optional}
          </span>
        </label>
        <textarea
          className={`${fieldClass} min-h-32 resize-y`}
          disabled={pending}
          id={fieldId("comment")}
          maxLength={2000}
          name="comment"
          defaultValue={state.values?.comment ?? ""}
          placeholder={
            calculatorContext
              ? dictionary.calculatorRequest?.commentPlaceholder
              : copy.placeholders.comment
          }
          rows={5}
        />
      </div>

      <div className="col-span-full flex flex-col items-start gap-3">
        <div aria-hidden="true" className="hidden">
          <label htmlFor={fieldId("website")}>
            {dictionary.common.website}
          </label>
          <input
            autoComplete="off"
            id={fieldId("website")}
            name="website"
            tabIndex={-1}
            type="text"
          />
        </div>
        <Button
          aria-busy={pending}
          className="w-full"
          disabled={pending}
          type="submit"
        >
          {pending
            ? copy.submitting
            : calculatorContext
              ? dictionary.calculatorRequest?.submit
              : copy.submit}
        </Button>
        <p
          aria-live="polite"
          className={
            state.status === "success"
              ? "text-sm font-medium text-emerald-700"
              : "text-sm font-medium text-red-700"
          }
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
