"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  Check,
  Home,
  Paintbrush,
  PenTool,
  SlidersHorizontal,
} from "lucide-react";

import {
  constructionCalculatorConfig as config,
  type CalculatorScenarioId,
  type CalculationType,
  type ConstructionMaterial,
  type ConstructionPackage,
  type DesignPackage,
  type HouseShape,
  type RenovationCondition,
  type RenovationExtra,
  type RenovationLevel,
  type RenovationObjectType,
} from "@/config/construction-calculator.config";
import {
  calculateConstructionEstimate,
  type ConstructionCalculatorValues,
} from "@/lib/calculator/calculate-construction-estimate";
import { formatPrice } from "@/lib/calculator/format-price";
import {
  submitCalculatorLeadAction,
  type CalculatorLeadActionState,
} from "@/app/actions";
import type { Dictionary, Locale } from "@/types";

type CalculatorFormValues = ConstructionCalculatorValues & {
  renovationObjectType: RenovationObjectType;
};

const initialValues: CalculatorFormValues = {
  calculationType: "renovation",
  area: "",
  bathrooms: "1",
  constructionPackage: "rough",
  material: "aeratedConcrete",
  houseShape: "rectangle",
  basement: false,
  basementArea: "",
  garage: false,
  garageArea: "",
  terrace: false,
  terraceArea: "",
  highCeilings: false,
  difficultSite: false,
  distanceKm: "",
  renovationObjectType: "apartment",
  renovationCondition: "newWithoutFinish",
  renovationLevel: "standard",
  renovationExtras: [],
  doorsCount: "0",
  airConditionersCount: "0",
  designPackage: "full",
};

const initialLeadState: CalculatorLeadActionState = {
  status: "idle",
  message: "",
  errors: {},
};

const selectionClass = (selected: boolean) =>
  `rounded-2xl border p-4 text-left transition ${selected ? "border-[var(--text-primary)] bg-[var(--background-warm)] shadow-[0_10px_24px_-22px_rgb(24_33_42/0.55)]" : "border-[var(--border)] bg-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]"}`;

function NumberField({
  label,
  value,
  onChange,
  hint,
  min = 0,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  min?: number;
}) {
  return (
    <label className="block text-sm font-semibold text-[var(--text-primary)]">
      {label}
      <input
        className="mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-base font-medium outline-none transition focus:border-[var(--text-primary)]"
        inputMode="decimal"
        min={min}
        onChange={(event) => onChange(event.target.value)}
        step="any"
        type="number"
        value={value}
      />
      {hint ? (
        <span className="mt-1.5 block text-xs font-normal leading-5 text-[var(--text-muted)]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

function SwitchRow({
  checked,
  description,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  description?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 ${checked ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] bg-white"}`}
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
        checked={checked}
        className="peer sr-only"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span
        aria-hidden="true"
        className="relative h-6 w-11 shrink-0 rounded-full bg-[var(--border-strong)] transition peer-checked:bg-[var(--text-primary)] after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"
      />
    </label>
  );
}

function StepTitle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-accent)]">
        {number}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );
}

function valuesForScenario(
  calculationType: CalculationType,
  scenarioId?: CalculatorScenarioId,
  area = ""
): CalculatorFormValues {
  const scenario = config.quickScenarios.find((item) => item.id === scenarioId);

  return {
    ...initialValues,
    area,
    calculationType,
    renovationObjectType:
      scenario?.renovationObjectType ?? initialValues.renovationObjectType,
  };
}

export function CostCalculator({
  copy,
  locale,
  defaultCalculationType = "renovation",
  defaultScenarioId,
  className = "",
}: {
  copy: Dictionary["constructionCalculator"];
  locale: Locale;
  defaultCalculationType?: CalculationType;
  defaultScenarioId?: CalculatorScenarioId;
  className?: string;
}) {
  const [values, setValues] = useState(() =>
    valuesForScenario(defaultCalculationType, defaultScenarioId)
  );
  const estimate = useMemo(
    () => calculateConstructionEstimate(values, copy),
    [values, copy]
  );
  const isConstruction = values.calculationType === "construction";
  const isRenovation = values.calculationType === "renovation";
  const isDesign = values.calculationType === "design";
  const canShowEstimate =
    config.publicRates && Boolean(values.area) && Boolean(estimate.total);
  const update = (patch: Partial<CalculatorFormValues>) =>
    setValues((current) => ({ ...current, ...patch }));
  const toggleRenovationExtra = (extra: RenovationExtra) =>
    update({
      renovationExtras: values.renovationExtras.includes(extra)
        ? values.renovationExtras.filter((item) => item !== extra)
        : [...values.renovationExtras, extra],
    });
  const money = (value: number) => formatPrice(value, locale, config.currency);
  const selectedQuickScenario = config.quickScenarios.find(
    (scenario) =>
      scenario.calculationType === values.calculationType &&
      (scenario.renovationObjectType === undefined ||
        scenario.renovationObjectType === values.renovationObjectType)
  )?.id;

  return (
    <div
      className={`grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] ${className}`}
    >
      <div className="space-y-5">
        <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
          <StepTitle number="01" {...copy.steps.scenario} />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {config.quickScenarios.map((scenario) => {
              const Icon =
                scenario.id === "house-construction"
                  ? Home
                  : scenario.id === "commercial"
                    ? Building2
                    : scenario.id === "interior-design"
                      ? PenTool
                      : Paintbrush;
              const option = copy.quickScenarios[scenario.labelKey];
              const selected = selectedQuickScenario === scenario.id;

              return (
                <button
                  aria-pressed={selected}
                  className={`${selectionClass(selected)} min-h-28`}
                  key={scenario.id}
                  onClick={() =>
                    setValues((current) =>
                      valuesForScenario(
                        scenario.calculationType,
                        scenario.id,
                        current.area
                      )
                    )
                  }
                  type="button"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-6 stroke-[1.45] text-[var(--brand-accent)]"
                  />
                  <span className="mt-4 block font-semibold text-[var(--text-primary)]">
                    {option.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
          <StepTitle number="02" {...copy.steps.parameters} />
          <div className="mt-6 max-w-xs">
            <NumberField
              label={copy.fields.area}
              min={1}
              onChange={(area) => update({ area })}
              value={values.area}
            />
          </div>

          {isConstruction ? (
            <div className="mt-8 space-y-7 border-t border-[var(--border)] pt-7">
              <ChoiceCards
                options={copy.construction.packages}
                selected={values.constructionPackage}
                onChange={(constructionPackage) =>
                  update({
                    constructionPackage:
                      constructionPackage as ConstructionPackage,
                  })
                }
              />
              <div className="grid gap-5 lg:grid-cols-2">
                <ChoiceGroup
                  label={copy.fields.houseShape}
                  options={copy.construction.houseShapes}
                  selected={values.houseShape}
                  onChange={(houseShape) =>
                    update({ houseShape: houseShape as HouseShape })
                  }
                />
                <ChoiceGroup
                  label={copy.fields.constructionType}
                  options={copy.construction.materials}
                  selected={values.material}
                  onChange={(material) =>
                    update({ material: material as ConstructionMaterial })
                  }
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <OptionWithArea
                  checked={values.basement}
                  fieldLabel={copy.fields.basementArea}
                  label={copy.construction.extras.basement}
                  value={values.basementArea}
                  onCheckedChange={(basement) => update({ basement })}
                  onValueChange={(basementArea) => update({ basementArea })}
                />
                <OptionWithArea
                  checked={values.garage}
                  fieldLabel={copy.fields.garageArea}
                  label={copy.construction.extras.garage}
                  value={values.garageArea}
                  onCheckedChange={(garage) => update({ garage })}
                  onValueChange={(garageArea) => update({ garageArea })}
                />
                <OptionWithArea
                  checked={values.terrace}
                  fieldLabel={copy.fields.terraceArea}
                  label={copy.construction.extras.terrace}
                  value={values.terraceArea}
                  onCheckedChange={(terrace) => update({ terrace })}
                  onValueChange={(terraceArea) => update({ terraceArea })}
                />
              </div>
            </div>
          ) : null}

          {isRenovation ? (
            <div className="mt-8 grid gap-5 border-t border-[var(--border)] pt-7 lg:grid-cols-2">
              <ChoiceGroup
                label={copy.fields.currentCondition}
                options={copy.renovation.conditions}
                selected={values.renovationCondition}
                onChange={(renovationCondition) =>
                  update({
                    renovationCondition:
                      renovationCondition as RenovationCondition,
                  })
                }
              />
              <ChoiceGroup
                label={copy.fields.renovationLevel}
                options={copy.renovation.levels}
                selected={values.renovationLevel}
                onChange={(renovationLevel) =>
                  update({
                    renovationLevel: renovationLevel as RenovationLevel,
                  })
                }
              />
            </div>
          ) : null}

          {isDesign ? (
            <div className="mt-8 border-t border-[var(--border)] pt-7">
              <ChoiceCards
                options={{
                  basic: copy.design.basic,
                  full: copy.design.full,
                  supervision: copy.design.supervision,
                }}
                selected={values.designPackage}
                onChange={(designPackage) =>
                  update({ designPackage: designPackage as DesignPackage })
                }
              />
            </div>
          ) : null}
        </section>

        {isConstruction ? (
          <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
            <StepTitle number="03" {...copy.steps.constructionExtras} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <SwitchRow
                checked={values.highCeilings}
                label={copy.construction.extras.highCeilings}
                onChange={(highCeilings) => update({ highCeilings })}
              />
              <SwitchRow
                checked={values.difficultSite}
                label={copy.construction.extras.difficultSite}
                onChange={(difficultSite) => update({ difficultSite })}
              />
            </div>
            <div className="mt-4 max-w-xs">
              <NumberField
                hint={copy.fields.distanceHint}
                label={copy.fields.distance}
                onChange={(distanceKm) => update({ distanceKm })}
                value={values.distanceKm}
              />
            </div>
          </section>
        ) : null}

        {isRenovation ? (
          <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
            <StepTitle number="03" {...copy.steps.renovationExtras} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(Object.keys(config.renovation.extras) as RenovationExtra[]).map(
                (extra) => {
                  const selected = values.renovationExtras.includes(extra);
                  const needsCount =
                    extra === "doors" || extra === "airConditioners";
                  const needsBathrooms = extra === "plumbing";

                  return (
                    <div className="space-y-2" key={extra}>
                      <SwitchRow
                        checked={selected}
                        label={copy.renovation.extras[extra]}
                        onChange={() => toggleRenovationExtra(extra)}
                      />
                      {selected && needsCount ? (
                        <NumberField
                          label={
                            extra === "doors"
                              ? copy.fields.doorsCount
                              : copy.fields.airConditionersCount
                          }
                          min={0}
                          onChange={(value) =>
                            update(
                              extra === "doors"
                                ? { doorsCount: value }
                                : { airConditionersCount: value }
                            )
                          }
                          value={
                            extra === "doors"
                              ? values.doorsCount
                              : values.airConditionersCount
                          }
                        />
                      ) : null}
                      {selected && needsBathrooms ? (
                        <NumberField
                          label={copy.fields.bathrooms}
                          min={1}
                          onChange={(bathrooms) => update({ bathrooms })}
                          value={values.bathrooms}
                        />
                      ) : null}
                    </div>
                  );
                }
              )}
            </div>
          </section>
        ) : null}

        <CalculatorLeadForm copy={copy} locale={locale} values={values} />
      </div>

      <aside className="rounded-[28px] border border-[var(--border)] bg-[var(--text-primary)] p-5 text-white shadow-[var(--shadow-card)] lg:sticky lg:top-6 sm:p-6">
        <div className="flex items-center gap-2 text-[var(--warm-accent)]">
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          <p className="text-xs font-bold uppercase tracking-[0.16em]">
            {copy.result.title}
          </p>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/65">
          {copy.result.range}
        </p>
        {canShowEstimate ? (
          <>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
              {money(estimate.min)}
              <br />— {money(estimate.max)}
            </p>
            <EstimateLines copy={copy} estimate={estimate} money={money} />
          </>
        ) : (
          <p className="mt-4 text-sm leading-6 text-white/75">
            {values.area ? copy.result.pricingUnavailable : copy.result.empty}
          </p>
        )}
        <p className="mt-6 text-xs leading-5 text-white/50">
          {copy.result.notice}
        </p>
      </aside>
    </div>
  );
}

function CalculatorLeadForm({
  copy,
  locale,
  values,
}: {
  copy: Dictionary["constructionCalculator"];
  locale: Locale;
  values: CalculatorFormValues;
}) {
  const action = submitCalculatorLeadAction.bind(null, locale);
  const [state, formAction, pending] = useActionState(action, initialLeadState);
  const formRef = useRef<HTMLFormElement>(null);
  const details = useMemo(() => JSON.stringify(values), [values]);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
      <StepTitle number="04" {...copy.contact} />
      <form
        action={formAction}
        className="mt-6 grid gap-4 sm:grid-cols-2"
        noValidate
        ref={formRef}
      >
        <input
          name="calculationType"
          type="hidden"
          value={values.calculationType}
        />
        <input name="area" type="hidden" value={values.area} />
        <input name="details" type="hidden" value={details} />
        <label className="block text-sm font-semibold text-[var(--text-primary)]">
          {copy.contact.nameLabel}
          <input
            className="mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-base font-medium outline-none transition focus:border-[var(--text-primary)]"
            disabled={pending}
            maxLength={120}
            name="name"
            placeholder={copy.contact.namePlaceholder}
            required
            type="text"
          />
          {state.errors.name ? (
            <span className="mt-2 block text-xs font-normal text-red-700">
              {state.errors.name}
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-semibold text-[var(--text-primary)]">
          {copy.contact.phoneLabel}
          <input
            className="mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-base font-medium outline-none transition focus:border-[var(--text-primary)]"
            disabled={pending}
            inputMode="tel"
            maxLength={40}
            name="phone"
            placeholder={copy.contact.phonePlaceholder}
            required
            type="tel"
          />
          {state.errors.phone ? (
            <span className="mt-2 block text-xs font-normal text-red-700">
              {state.errors.phone}
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-semibold text-[var(--text-primary)] sm:col-span-2">
          {copy.contact.commentLabel}
          <textarea
            className="mt-2 min-h-28 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-base font-medium outline-none transition focus:border-[var(--text-primary)]"
            disabled={pending}
            maxLength={2000}
            name="comment"
            placeholder={copy.contact.commentPlaceholder}
            rows={4}
          />
        </label>
        {state.errors.area ? (
          <p className="text-sm text-red-700 sm:col-span-2">
            {state.errors.area}
          </p>
        ) : null}
        <div className="sm:col-span-2">
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--button-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--button-primary-hover)] disabled:cursor-wait disabled:opacity-65"
            disabled={pending}
            type="submit"
          >
            {pending ? copy.contact.submitting : copy.contact.submit}
          </button>
          {state.message ? (
            <p
              aria-live="polite"
              className={`mt-3 text-sm ${state.status === "success" ? "text-emerald-700" : "text-red-700"}`}
              role={state.status === "error" ? "alert" : "status"}
            >
              {state.message}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}

function ChoiceCards({
  options,
  selected,
  onChange,
}: {
  options: Record<string, { title: string; description: string }>;
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {Object.entries(options).map(([value, option]) => (
        <button
          aria-pressed={selected === value}
          className={`${selectionClass(selected === value)} min-h-28`}
          key={value}
          onClick={() => onChange(value)}
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
    </div>
  );
}

function ChoiceGroup({
  label,
  onChange,
  options,
  selected,
}: {
  label: string;
  selected: string;
  options: Record<string, string>;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </legend>
      <div className="mt-3 space-y-2">
        {Object.entries(options).map(([value, option]) => (
          <button
            aria-pressed={selected === value}
            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${selected === value ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] hover:bg-[var(--surface-muted)]"}`}
            key={value}
            onClick={() => onChange(value)}
            type="button"
          >
            <span>{option}</span>
            {selected === value ? (
              <Check aria-hidden="true" className="size-4 shrink-0" />
            ) : null}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function OptionWithArea({
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

function EstimateLines({
  copy,
  estimate,
  money,
}: {
  copy: Dictionary["constructionCalculator"];
  estimate: ReturnType<typeof calculateConstructionEstimate>;
  money: (value: number) => string;
}) {
  return (
    <>
      <div className="mt-6 border-t border-white/15 pt-5">
        <ul className="space-y-3">
          {estimate.lines.map((line, index) => (
            <li
              className="flex justify-between gap-4 text-xs leading-5"
              key={`${line.label}-${index}`}
            >
              <span className="text-white/65">
                {line.label}
                {line.note ? (
                  <span className="block text-white/40">{line.note}</span>
                ) : null}
              </span>
              <span className="shrink-0 text-right font-semibold">
                {line.amount ? money(line.amount) : copy.result.included}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 border-t border-white/15 pt-4">
        <span className="text-xs text-white/55">{copy.result.total}</span>
        <span className="mt-1 block text-lg font-semibold">
          {money(estimate.total)}
        </span>
      </div>
    </>
  );
}
