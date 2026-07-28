import { NumberField } from "@/components/calculator/form/number-field";
import { SwitchRow } from "@/components/calculator/form/switch-row";
import {
  calculatorFieldDomId,
  type CalculatorFieldId,
} from "@/components/calculator/types";

export function OptionWithArea({
  checked,
  fieldLabel,
  label,
  onCheckedChange,
  onValueChange,
  value,
  areaField,
  areaError,
}: {
  checked: boolean;
  fieldLabel: string;
  label: string;
  value: string;
  onCheckedChange: (checked: boolean) => void;
  onValueChange: (value: string) => void;
  areaField: CalculatorFieldId;
  areaError?: string;
}) {
  return (
    <div className="space-y-2">
      <SwitchRow checked={checked} label={label} onChange={onCheckedChange} />
      {checked ? (
        <NumberField
          error={areaError}
          fieldId={calculatorFieldDomId(areaField)}
          label={fieldLabel}
          min={1}
          onChange={onValueChange}
          value={value}
        />
      ) : null}
    </div>
  );
}
