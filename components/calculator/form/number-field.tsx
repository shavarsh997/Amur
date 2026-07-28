import { Controller } from "react-hook-form";

import {
  splitField,
  type CalculatorControl,
  type CalculatorFieldName,
  type ControlledInputProps,
} from "@/components/calculator/form/field-types";

type NumberFieldInputProps = ControlledInputProps<string> & {
  label: string;
  hint?: string;
  min?: number;
  fieldId?: string;
  error?: string;
};

type NumberFieldProps = Omit<
  NumberFieldInputProps,
  keyof ControlledInputProps<string> | "error"
> & {
  control: CalculatorControl;
  name: CalculatorFieldName;
};

export function NumberFieldInput({
  name,
  value,
  onChange,
  onBlur,
  inputRef,
  label,
  hint,
  min = 0,
  fieldId,
  error,
}: NumberFieldInputProps) {
  const errorId = fieldId ? `${fieldId}-error` : undefined;
  const inputClassName = error
    ? "mt-2 min-h-12 w-full rounded-xl border-2 border-[var(--error)] bg-white px-3 text-base font-medium text-[var(--text-primary)] outline-none transition focus:border-[var(--error)] focus:ring-2 focus:ring-[var(--error)]/15"
    : "mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-base font-medium text-[var(--text-primary)] outline-none transition focus:border-[var(--text-primary)] focus:ring-2 focus:ring-black/5";

  return (
    <label
      className="block text-sm font-semibold text-[var(--text-primary)]"
      htmlFor={fieldId ?? name}
      id={fieldId}
    >
      {label}
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={inputClassName}
        id={fieldId ?? name}
        inputMode="decimal"
        min={min}
        name={name}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        pattern="[0-9]*[.,]?[0-9]*"
        ref={inputRef}
        type="text"
        value={value ?? ""}
      />
      {error ? (
        <span
          className="mt-1.5 block text-xs font-normal leading-5 text-[var(--error)]"
          id={errorId}
          role="alert"
        >
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs font-normal leading-5 text-[var(--text-muted)]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function NumberField({
  control,
  name,
  label,
  hint,
  min,
  fieldId,
}: NumberFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <NumberFieldInput
          {...splitField<string>(field)}
          error={fieldState.error?.message}
          fieldId={fieldId}
          hint={hint}
          label={label}
          min={min}
        />
      )}
    />
  );
}
