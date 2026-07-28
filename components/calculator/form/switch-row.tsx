import { Controller } from "react-hook-form";

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
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 ${value ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] bg-white"}`}
    >
      <span>
        <span className="block text-sm font-semibold text-[var(--text-primary)]">
          {label}
        </span>
        {description ? (
          <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">
            {description}
          </span>
        ) : null}
      </span>
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
        className="relative h-6 w-11 shrink-0 rounded-full bg-[var(--border-strong)] transition peer-checked:bg-[var(--text-primary)] after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"
      />
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
