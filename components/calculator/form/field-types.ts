import type { Ref } from "react";
import type { Control, FieldPath } from "react-hook-form";

import type { CalculatorFormValues } from "@/components/calculator/types";

export type CalculatorControl = Control<CalculatorFormValues>;

export type CalculatorFieldName = FieldPath<CalculatorFormValues>;

export type CalculatorFieldProps<TName extends CalculatorFieldName> = {
  control: CalculatorControl;
  name: TName;
};

export type ControlledInputProps<TValue> = {
  name: string;
  value: TValue;
  onChange: (value: TValue) => void;
  onBlur: () => void;
  inputRef?: Ref<HTMLInputElement>;
};

export function splitField<TValue>(field: {
  name: string;
  value: unknown;
  onChange: (...event: unknown[]) => void;
  onBlur: () => void;
  ref: Ref<HTMLInputElement>;
}): ControlledInputProps<TValue> {
  return {
    name: field.name,
    value: field.value as TValue,
    onChange: field.onChange as (value: TValue) => void,
    onBlur: field.onBlur,
    inputRef: field.ref,
  };
}
