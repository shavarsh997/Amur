import { NumberField } from "@/components/calculator/form/number-field";
import { SwitchRow } from "@/components/calculator/form/switch-row";

export function OptionWithArea({
  checked,
  fieldLabel,
  label,
  onCheckedChange,
  onValueChange,
  value,
}: {
  checked: boolean;
  fieldLabel: string;
  label: string;
  value: string;
  onCheckedChange: (checked: boolean) => void;
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <SwitchRow checked={checked} label={label} onChange={onCheckedChange} />
      {checked ? (
        <NumberField
          label={fieldLabel}
          min={1}
          onChange={onValueChange}
          value={value}
        />
      ) : null}
    </div>
  );
}
