import { Controller } from "react-hook-form";

import { selectionClass } from "@/components/calculator/constants";
import {
  splitField,
  type CalculatorControl,
  type CalculatorFieldName,
  type ControlledInputProps,
} from "@/components/calculator/form/field-types";

type ChoiceCardsInputProps = ControlledInputProps<string> & {
  options: Record<string, { title: string; description: string }>;
};

type ChoiceCardsProps = Omit<
  ChoiceCardsInputProps,
  keyof ControlledInputProps<string>
> & {
  control: CalculatorControl;
  name: CalculatorFieldName;
};

export function ChoiceCardsInput({
  name,
  value,
  onChange,
  onBlur,
  inputRef,
  options,
}: ChoiceCardsInputProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3" role="group">
      {Object.entries(options).map(([optionValue, option]) => (
        <button
          aria-pressed={value === optionValue}
          className={`${selectionClass(value === optionValue)} min-h-28`}
          key={optionValue}
          onBlur={onBlur}
          onClick={() => onChange(optionValue)}
          type="button"
        >
          <span className="font-semibold text-[var(--text-primary)]">
            {option.title}
          </span>
          <span className="mt-2 block text-xs leading-5 text-[var(--text-secondary)]">
            {option.description}
          </span>
        </button>
      ))}
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
    </div>
  );
}

export function ChoiceCards({ control, name, options }: ChoiceCardsProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ChoiceCardsInput {...splitField<string>(field)} options={options} />
      )}
    />
  );
}
