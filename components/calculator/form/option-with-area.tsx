import { Controller } from "react-hook-form";

import {
  splitField,
  type CalculatorControl,
} from "@/components/calculator/form/field-types";
import { NumberFieldInput } from "@/components/calculator/form/number-field";
import { SwitchRowInput } from "@/components/calculator/form/switch-row";
import {
  calculatorFieldDomId,
  type CalculatorFieldId,
  type CalculatorFormValues,
} from "@/components/calculator/types";

type OptionWithAreaNames = {
  toggleName: keyof Pick<
    CalculatorFormValues,
    "basement" | "garage" | "terrace"
  >;
  areaName: keyof Pick<
    CalculatorFormValues,
    "basementArea" | "garageArea" | "terraceArea"
  >;
};

export function OptionWithArea({
  control,
  toggleName,
  areaName,
  areaField,
  fieldLabel,
  label,
}: OptionWithAreaNames & {
  control: CalculatorControl;
  areaField: CalculatorFieldId;
  fieldLabel: string;
  label: string;
}) {
  return (
    <Controller
      control={control}
      name={toggleName}
      render={({ field: toggleField }) => (
        <Controller
          control={control}
          name={areaName}
          render={({ field: areaFieldProps, fieldState }) => (
            <div className="space-y-2">
              <SwitchRowInput {...splitField<boolean>(toggleField)} label={label} />
              {toggleField.value ? (
                <NumberFieldInput
                  {...splitField<string>(areaFieldProps)}
                  error={fieldState.error?.message}
                  fieldId={calculatorFieldDomId(areaField)}
                  label={fieldLabel}
                  min={1}
                />
              ) : null}
            </div>
          )}
        />
      )}
    />
  );
}
