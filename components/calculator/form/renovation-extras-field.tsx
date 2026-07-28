import { Controller, useFormContext } from "react-hook-form";

import type { CalculatorControl } from "@/components/calculator/form/field-types";
import { NumberField } from "@/components/calculator/form/number-field";
import { SwitchRowInput } from "@/components/calculator/form/switch-row";
import type { CalculatorFormValues } from "@/components/calculator/types";
import { calculatorFieldDomId } from "@/components/calculator/types";
import type { RenovationExtra } from "@/config/construction-calculator.config";
import type { Dictionary } from "@/types";

function RenovationExtraItem({
  copy,
  control,
  extra,
  selected,
  onBlur,
  onToggle,
}: {
  copy: Dictionary["constructionCalculator"];
  control: CalculatorControl;
  extra: RenovationExtra;
  selected: boolean;
  onBlur: () => void;
  onToggle: () => void;
}) {
  const needsCount = extra === "doors";
  const needsBathrooms = extra === "plumbing";
  const needsArea = extra === "heatedFloor";

  return (
    <div className="space-y-2">
      <SwitchRowInput
        inputRef={null}
        label={copy.renovation.extras[extra]}
        name="renovationExtras"
        onBlur={onBlur}
        onChange={() => onToggle()}
        value={selected}
      />
      {selected && needsCount ? (
        <NumberField
          control={control}
          fieldId={calculatorFieldDomId("doorsCount")}
          label={copy.fields.doorsCount}
          min={1}
          name="doorsCount"
        />
      ) : null}
      {selected && needsBathrooms ? (
        <NumberField
          control={control}
          fieldId={calculatorFieldDomId("bathrooms")}
          label={copy.fields.bathrooms}
          min={1}
          name="bathrooms"
        />
      ) : null}
      {selected && needsArea ? (
        <NumberField
          control={control}
          fieldId={calculatorFieldDomId("heatedFloorArea")}
          label={copy.fields.heatedFloorArea}
          min={1}
          name="heatedFloorArea"
        />
      ) : null}
    </div>
  );
}

export function RenovationExtrasField({
  copy,
  extras,
}: {
  copy: Dictionary["constructionCalculator"];
  extras: RenovationExtra[];
}) {
  const { control } = useFormContext<CalculatorFormValues>();

  return (
    <Controller
      control={control}
      name="renovationExtras"
      render={({ field }) => {
        const selectedExtras = field.value ?? [];

        const toggleExtra = (extra: RenovationExtra) => {
          field.onChange(
            selectedExtras.includes(extra)
              ? selectedExtras.filter((item) => item !== extra)
              : [...selectedExtras, extra]
          );
        };

        return (
          <>
            {extras.map((extra) => (
              <RenovationExtraItem
                control={control}
                copy={copy}
                extra={extra}
                key={extra}
                onBlur={field.onBlur}
                onToggle={() => toggleExtra(extra)}
                selected={selectedExtras.includes(extra)}
              />
            ))}
          </>
        );
      }}
    />
  );
}
