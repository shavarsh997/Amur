"use client";

import { useMemo, useState } from "react";
import { Check, Home, Layers3, Paintbrush, Palette, SlidersHorizontal } from "lucide-react";

import {
  constructionCalculatorConfig as config,
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
import { calculateConstructionEstimate, type ConstructionCalculatorValues } from "@/lib/calculator/calculate-construction-estimate";
import { formatPrice } from "@/lib/calculator/format-price";
import type { Dictionary, Locale } from "@/types";

const initialValues: ConstructionCalculatorValues & { renovationObjectType: RenovationObjectType } = {
  calculationType: "construction", area: "", floors: "1", rooms: "3", bathrooms: "1",
  constructionPackage: "rough", material: "aeratedConcrete", houseShape: "rectangle",
  basement: false, basementArea: "", garage: false, garageArea: "", terrace: false, terraceArea: "",
  highCeilings: false, difficultSite: false, distanceKm: "", renovationObjectType: "privateHouse",
  renovationCondition: "newWithoutFinish", renovationLevel: "standard", renovationExtras: [],
  doorsCount: "0", airConditionersCount: "0", designEnabled: false, designPackage: "full",
};

const includesConstruction = (type: CalculationType) => type !== "renovation";
const includesRenovation = (type: CalculationType) => type !== "construction";
const selectionClass = (selected: boolean) => `rounded-2xl border p-4 text-left transition ${selected ? "border-[var(--text-primary)] bg-[var(--background-warm)] shadow-[0_10px_24px_-22px_rgb(24_33_42/0.55)]" : "border-[var(--border)] bg-white hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]"}`;

function NumberField({ label, value, onChange, hint, min = 0 }: { label: string; value: string; onChange: (value: string) => void; hint?: string; min?: number }) {
  return <label className="block text-sm font-semibold text-[var(--text-primary)]">{label}<input className="mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-base font-medium outline-none transition focus:border-[var(--text-primary)]" inputMode="decimal" min={min} onChange={(event) => onChange(event.target.value)} type="number" value={value} />{hint ? <span className="mt-1.5 block text-xs font-normal leading-5 text-[var(--text-muted)]">{hint}</span> : null}</label>;
}

function SwitchRow({ checked, description, label, onChange }: { checked: boolean; label: string; description?: string; onChange: (checked: boolean) => void }) {
  return <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 ${checked ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] bg-white"}`}><span><span className="block text-sm font-semibold text-[var(--text-primary)]">{label}</span>{description ? <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">{description}</span> : null}</span><input checked={checked} className="peer sr-only" onChange={(event) => onChange(event.target.checked)} type="checkbox" /><span aria-hidden="true" className="relative h-6 w-11 shrink-0 rounded-full bg-[var(--border-strong)] transition peer-checked:bg-[var(--text-primary)] after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5" /></label>;
}

function StepTitle({ number, title, description }: { number: string; title: string; description: string }) {
  return <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-accent)]">Шаг {number}</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-2xl">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">{description}</p></div>;
}

export function CostCalculator({ locale, className = "" }: { dictionary?: Dictionary; locale: Locale; className?: string }) {
  const [values, setValues] = useState(initialValues);
  const estimate = useMemo(() => calculateConstructionEstimate(values), [values]);
  const hasConstruction = includesConstruction(values.calculationType);
  const hasRenovation = includesRenovation(values.calculationType);
  const update = (patch: Partial<typeof values>) => setValues((current) => ({ ...current, ...patch }));
  const toggleRenovationExtra = (extra: RenovationExtra) => update({ renovationExtras: values.renovationExtras.includes(extra) ? values.renovationExtras.filter((item) => item !== extra) : [...values.renovationExtras, extra] });
  const money = (value: number) => formatPrice(value, locale, config.currency);

  return <div className={`grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] ${className}`}>
    <div className="space-y-5">
      <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
        <StepTitle number="01" title="Что нужно рассчитать?" description="Выберите сценарий — покажем только подходящие параметры." />
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {Object.entries(config.calculationTypes).map(([key, option]) => {
            const type = key as CalculationType;
            const Icon = type === "construction" ? Home : type === "renovation" ? Paintbrush : Layers3;
            return <button aria-pressed={values.calculationType === type} className={`${selectionClass(values.calculationType === type)} min-h-36`} key={type} onClick={() => update({ calculationType: type })} type="button"><Icon aria-hidden="true" className="size-6 stroke-[1.45] text-[var(--brand-accent)]" /><span className="mt-5 block font-semibold text-[var(--text-primary)]">{option.label}</span><span className="mt-1.5 block text-xs leading-5 text-[var(--text-secondary)]">{option.description}</span></button>;
          })}
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
        <StepTitle number="02" title="Основные параметры" description="Достаточно приблизительных данных — вы сможете уточнить их позднее." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NumberField label="Площадь, м²" min={1} onChange={(area) => update({ area })} value={values.area} />
          <NumberField label="Этажей" min={1} onChange={(floors) => update({ floors })} value={values.floors} />
          <NumberField label="Комнат" min={0} onChange={(rooms) => update({ rooms })} value={values.rooms} />
          <NumberField label="Санузлов" min={0} onChange={(bathrooms) => update({ bathrooms })} value={values.bathrooms} />
        </div>

        {hasConstruction ? <div className="mt-8 border-t border-[var(--border)] pt-7"><h3 className="text-base font-semibold text-[var(--text-primary)]">Параметры дома</h3><div className="mt-5 grid gap-5 lg:grid-cols-3"><ChoiceGroup label="Форма дома" options={config.construction.houseShapes} selected={values.houseShape} onChange={(houseShape) => update({ houseShape: houseShape as HouseShape })} /><ChoiceGroup label="Тип конструкции" options={config.construction.materials} selected={values.material} onChange={(material) => update({ material: material as ConstructionMaterial })} /><div className="space-y-3"><SwitchRow checked={values.basement} label="Подвал" onChange={(basement) => update({ basement })} />{values.basement ? <NumberField label="Площадь подвала, м²" onChange={(basementArea) => update({ basementArea })} value={values.basementArea} /> : null}</div></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><OptionWithArea checked={values.garage} label="Гараж" value={values.garageArea} onCheckedChange={(garage) => update({ garage })} onValueChange={(garageArea) => update({ garageArea })} /><OptionWithArea checked={values.terrace} label="Терраса" value={values.terraceArea} onCheckedChange={(terrace) => update({ terrace })} onValueChange={(terraceArea) => update({ terraceArea })} /></div></div> : null}

        {hasRenovation ? <div className="mt-8 border-t border-[var(--border)] pt-7"><h3 className="text-base font-semibold text-[var(--text-primary)]">Состояние объекта</h3><div className="mt-5 grid gap-5 lg:grid-cols-3"><ChoiceGroup label="Тип объекта" options={config.renovation.objectTypes} selected={values.renovationObjectType} onChange={(renovationObjectType) => update({ renovationObjectType: renovationObjectType as RenovationObjectType })} /><ChoiceGroup label="Текущее состояние" options={config.renovation.conditions} selected={values.renovationCondition} onChange={(renovationCondition) => update({ renovationCondition: renovationCondition as RenovationCondition })} /><ChoiceGroup label="Уровень ремонта" options={config.renovation.levels} selected={values.renovationLevel} onChange={(renovationLevel) => update({ renovationLevel: renovationLevel as RenovationLevel })} /></div></div> : null}
      </section>

      {hasConstruction ? <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7"><StepTitle number="03" title="Уровень строительства" description="Выберите степень готовности будущего дома." /><div className="mt-6 grid gap-3 md:grid-cols-3">{Object.entries(config.construction.packages).map(([key, option]) => { const packageKey = key as ConstructionPackage; return <button aria-pressed={values.constructionPackage === packageKey} className={`${selectionClass(values.constructionPackage === packageKey)} min-h-32`} key={packageKey} onClick={() => update({ constructionPackage: packageKey })} type="button"><span className="font-semibold text-[var(--text-primary)]">{option.label}</span><span className="mt-2 block text-xs leading-5 text-[var(--text-secondary)]">{option.description}</span></button>; })}</div></section> : null}

      {hasConstruction ? <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7"><StepTitle number="04" title="Дополнительные условия строительства" description="Отметьте только то, что уже известно о проекте." /><div className="mt-6 grid gap-3 sm:grid-cols-2"><SwitchRow checked={values.highCeilings} label={config.construction.extras.highCeilings.label} onChange={(highCeilings) => update({ highCeilings })} /><SwitchRow checked={values.difficultSite} label={config.construction.extras.difficultSite.label} onChange={(difficultSite) => update({ difficultSite })} /></div><div className="mt-4 max-w-xs"><NumberField hint="Если объект находится за пределами города." label="Удалённость от города, км" onChange={(distanceKm) => update({ distanceKm })} value={values.distanceKm} /></div></section> : null}

      {hasRenovation ? <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7"><StepTitle number={hasConstruction ? "05" : "03"} title="Дополнительные работы" description="Стоимость выбранных работ сразу учитывается в ориентире." /><div className="mt-6 grid gap-3 sm:grid-cols-2">{Object.entries(config.renovation.extras).map(([key, option]) => { const extra = key as RenovationExtra; const selected = values.renovationExtras.includes(extra); const needsCount = extra === "doors" || extra === "airConditioners"; return <div className="space-y-2" key={extra}><SwitchRow checked={selected} label={option.label} onChange={() => toggleRenovationExtra(extra)} />{selected && needsCount ? <NumberField label={extra === "doors" ? "Количество дверей" : "Количество кондиционеров"} onChange={(value) => update(extra === "doors" ? { doorsCount: value } : { airConditionersCount: value })} value={extra === "doors" ? values.doorsCount : values.airConditionersCount} /> : null}</div>; })}</div></section> : null}

      <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7"><StepTitle number={hasConstruction && hasRenovation ? "06" : hasConstruction ? "05" : "04"} title="Дизайн-проект" description="Можно добавить к любому сценарию — стоимость считается по площади." /><div className="mt-6"><SwitchRow checked={values.designEnabled} description="Планировки, чертежи и сопровождение — в зависимости от выбранного пакета." label="Нужен дизайн-проект" onChange={(designEnabled) => update({ designEnabled })} /></div>{values.designEnabled ? <div className="mt-4 grid gap-3 md:grid-cols-3">{Object.entries(config.design).map(([key, option]) => { const designPackage = key as DesignPackage; return <button aria-pressed={values.designPackage === designPackage} className={selectionClass(values.designPackage === designPackage)} key={designPackage} onClick={() => update({ designPackage })} type="button"><Palette aria-hidden="true" className="size-5 stroke-[1.4] text-[var(--brand-accent)]" /><span className="mt-4 block text-sm font-semibold text-[var(--text-primary)]">{option.label}</span><span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">{option.description}</span></button>; })}</div> : null}</section>
    </div>

    <aside className="rounded-[28px] border border-[var(--border)] bg-[var(--text-primary)] p-5 text-white shadow-[var(--shadow-card)] lg:sticky lg:top-6 sm:p-6"><div className="flex items-center gap-2 text-[var(--warm-accent)]"><SlidersHorizontal aria-hidden="true" className="size-4" /><p className="text-xs font-bold uppercase tracking-[0.16em]">Предварительный расчёт</p></div><p className="mt-4 text-sm leading-6 text-white/65">Ориентировочный диапазон</p><p className="mt-1 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">{values.area && estimate.total ? <>{money(estimate.min)}<br />— {money(estimate.max)}</> : "Укажите площадь"}</p><div className="mt-6 border-t border-white/15 pt-5">{estimate.lines.length ? <ul className="space-y-3">{estimate.lines.map((line, index) => <li className="flex justify-between gap-4 text-xs leading-5" key={`${line.label}-${index}`}><span className="text-white/65">{line.label}{line.note ? <span className="block text-white/40">{line.note}</span> : null}</span><span className="shrink-0 text-right font-semibold">{line.amount ? money(line.amount) : "Учтено"}</span></li>)}</ul> : <p className="text-sm leading-6 text-white/65">Введите площадь, чтобы увидеть диапазон стоимости.</p>}</div>{estimate.total ? <div className="mt-5 border-t border-white/15 pt-4"><span className="text-xs text-white/55">Расчётная сумма</span><span className="mt-1 block text-lg font-semibold">{money(estimate.total)}</span></div> : null}<p className="mt-6 text-xs leading-5 text-white/50">Сумма предварительная. Точная стоимость зависит от проекта, материалов, условий участка и осмотра объекта.</p></aside>
  </div>;
}

function ChoiceGroup({ label, onChange, options, selected }: { label: string; selected: string; options: Record<string, { label: string }>; onChange: (value: string) => void }) {
  return <fieldset><legend className="text-sm font-semibold text-[var(--text-primary)]">{label}</legend><div className="mt-3 space-y-2">{Object.entries(options).map(([value, option]) => <button aria-pressed={selected === value} className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${selected === value ? "border-[var(--text-primary)] bg-[var(--background-warm)]" : "border-[var(--border)] hover:bg-[var(--surface-muted)]"}`} key={value} onClick={() => onChange(value)} type="button"><span>{option.label}</span>{selected === value ? <Check aria-hidden="true" className="size-4 shrink-0" /> : null}</button>)}</div></fieldset>;
}

function OptionWithArea({ checked, label, onCheckedChange, onValueChange, value }: { checked: boolean; label: string; value: string; onCheckedChange: (checked: boolean) => void; onValueChange: (value: string) => void }) {
  return <div className="space-y-2"><SwitchRow checked={checked} label={label} onChange={onCheckedChange} />{checked ? <NumberField label={`Площадь ${label.toLowerCase()}, м²`} onChange={onValueChange} value={value} /> : null}</div>;
}
