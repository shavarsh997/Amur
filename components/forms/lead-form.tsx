"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import {
  submitLeadAction,
  type LeadActionState,
} from "@/app/actions";
import type { Dictionary, Locale } from "@/types";

const initialState: LeadActionState = {
  status: "idle",
  message: "",
  errors: {},
};

const fieldClass =
  "min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60";

export function LeadForm({
  locale,
  dictionary,
  className = "",
}: {
  locale: Locale;
  dictionary: Dictionary;
  className?: string;
}) {
  const action = submitLeadAction.bind(null, locale);
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const copy = dictionary.estimate;

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

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
      className={`grid gap-5 md:grid-cols-2 ${className}`}
      noValidate
    >
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor={fieldId("objectType")}>
          {copy.fields.objectType}
          <span className="ml-1 text-blue-700" aria-hidden="true">*</span>
        </label>
        <select
          aria-describedby={state.errors.objectType ? errorId("objectType") : undefined}
          aria-invalid={Boolean(state.errors.objectType)}
          className={fieldClass}
          defaultValue=""
          disabled={pending}
          id={fieldId("objectType")}
          name="objectType"
          required
        >
          <option disabled value="">
            {copy.placeholders.objectType}
          </option>
          <option value="private-house">{copy.choices.objectType.privateHouse}</option>
          <option value="commercial">{copy.choices.objectType.commercial}</option>
          <option value="apartment">{copy.choices.objectType.apartment}</option>
          <option value="other">{copy.choices.objectType.other}</option>
        </select>
        {state.errors.objectType ? (
          <p className="mt-2 text-sm text-red-700" id={errorId("objectType")}>
            {state.errors.objectType}
          </p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor={fieldId("area")}>
          {copy.fields.area}
          <span className="ml-1 text-blue-700" aria-hidden="true">*</span>
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

      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor={fieldId("region")}>
          {copy.fields.region}
          <span className="ml-1 text-blue-700" aria-hidden="true">*</span>
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

      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor={fieldId("workType")}>
          {copy.fields.workType}
          <span className="ml-1 text-blue-700" aria-hidden="true">*</span>
        </label>
        <select
          aria-describedby={state.errors.workType ? errorId("workType") : undefined}
          aria-invalid={Boolean(state.errors.workType)}
          className={fieldClass}
          defaultValue=""
          disabled={pending}
          id={fieldId("workType")}
          name="workType"
          required
        >
          <option disabled value="">
            {copy.placeholders.workType}
          </option>
          <option value="turnkey">{copy.choices.workType.turnkey}</option>
          <option value="design">{copy.choices.workType.design}</option>
          <option value="renovation">{copy.choices.workType.renovation}</option>
          <option value="separate-works">{copy.choices.workType.separateWorks}</option>
        </select>
        {state.errors.workType ? (
          <p className="mt-2 text-sm text-red-700" id={errorId("workType")}>
            {state.errors.workType}
          </p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor={fieldId("name")}>
          {copy.fields.name}
          <span className="ml-1 text-blue-700" aria-hidden="true">*</span>
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
        <label className="mb-2 block text-sm font-semibold" htmlFor={fieldId("phone")}>
          {copy.fields.phone}
          <span className="ml-1 text-blue-700" aria-hidden="true">*</span>
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

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold" htmlFor={fieldId("comment")}>
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
          placeholder={copy.placeholders.comment}
          rows={5}
        />
      </div>

      <div className="flex flex-col items-start gap-3 md:col-span-2">
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-wait disabled:opacity-65"
          disabled={pending}
          type="submit"
        >
          {pending ? copy.submitting : copy.submit}
        </button>
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
