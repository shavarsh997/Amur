import { Check } from "lucide-react";
import { Controller } from "react-hook-form";

import {
  splitField,
  type CalculatorControl,
  type CalculatorFieldName,
  type ControlledInputProps,
} from "@/components/calculator/form/field-types";

type ChoiceGroupInputProps = ControlledInputProps<string> & {
  label: string;
  options: Record<string, string>;
};

type ChoiceGroupProps = Omit<
  ChoiceGroupInputProps,
  keyof ControlledInputProps<string>
> & {
  control: CalculatorControl;
  name: CalculatorFieldName;
};

export function ChoiceGroupInput({
  name,
  value,
  onChange,
  onBlur,
  inputRef,
  label,
  options,
}: ChoiceGroupInputProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </legend>
      <div className="mt-3 space-y-2" role="group">
        {Object.entries(options).map(([optionValue, option]) => (
          <button
            aria-pressed={value === optionValue}
            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${value === optionValue ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] hover:bg-[var(--surface-muted)]"}`}
            key={optionValue}
            onBlur={onBlur}
            onClick={() => onChange(optionValue)}
            type="button"
          >
            <span>{option}</span>
            {value === optionValue ? (
              <Check aria-hidden="true" className="size-4 shrink-0" />
            ) : null}
          </button>
        ))}
      </div>
      <input
        className="sr-only"
        name={name}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        ref={inputRef}
        tabIndex={-1}
        type="hidden"
        value={value}
      />
    </fieldset>
  );
}

export function ChoiceGroup({
  control,
  name,
  label,
  options,
}: ChoiceGroupProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ChoiceGroupInput
          {...splitField<string>(field)}
          label={label}
          options={options}
        />
      )}
    />
  );
}
