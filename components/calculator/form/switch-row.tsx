import { Controller } from "react-hook-form";

import { selectionClass } from "@/components/calculator/constants";
import {
  splitField,
  type CalculatorControl,
  type CalculatorFieldName,
  type ControlledInputProps,
} from "@/components/calculator/form/field-types";

type SwitchRowInputProps = ControlledInputProps<boolean> & {
  label: string;
  description?: string;
};

type SwitchRowProps = Omit<
  SwitchRowInputProps,
  keyof ControlledInputProps<boolean>
> & {
  control: CalculatorControl;
  name: CalculatorFieldName;
};

export function SwitchRowInput({
  name,
  value,
  onChange,
  onBlur,
  inputRef,
  label,
  description,
}: SwitchRowInputProps) {
  return (
    <label
      className={`flex cursor-pointer select-none items-center justify-between gap-4 ${selectionClass(value)}`}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-[var(--text-primary)]">
          {label}
        </span>
        {description ? (
          <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">
            {description}
          </span>
        ) : null}
      </span>
      <span className="relative inline-flex shrink-0">
        <input
          checked={value}
          className="peer sr-only"
          name={name}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.checked)}
          ref={inputRef}
          type="checkbox"
        />
        <span
          aria-hidden="true"
          className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ease-out peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--button-primary)] ${
            value ? "bg-[var(--text-primary)]" : "bg-[var(--border-strong)]"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-[0_1px_3px_rgb(24_33_42/0.2)] transition-transform duration-200 ease-out ${
              value ? "translate-x-[22px]" : "translate-x-0"
            }`}
          />
        </span>
      </span>
    </label>
  );
}

export function SwitchRow({
  control,
  name,
  label,
  description,
}: SwitchRowProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <SwitchRowInput
          {...splitField<boolean>(field)}
          description={description}
          label={label}
        />
      )}
    />
  );
}
