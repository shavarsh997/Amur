"use client";

import { useActionState, useMemo, useState } from "react";

import { submitLeadAction, type LeadActionState } from "@/app/actions";
import { CalculatorNavigation } from "@/components/calculator/calculator-navigation";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { AreaStep } from "@/components/calculator/steps/area-step";
import { ContactStep } from "@/components/calculator/steps/contact-step";
import { LocationStep } from "@/components/calculator/steps/location-step";
import { ObjectTypeStep } from "@/components/calculator/steps/object-type-step";
import { OptionsStep } from "@/components/calculator/steps/options-step";
import { ResultStep } from "@/components/calculator/steps/result-step";
import { WorkTypeStep } from "@/components/calculator/steps/work-type-step";
import { calculatorConfig } from "@/config/calculator.config";
import { calculateEstimate } from "@/lib/calculator/calculate-estimate";
import { validateCalculatorStep } from "@/lib/calculator/validate-calculator";
import type { Dictionary, Locale } from "@/types";
import type { CalculatorErrors, CalculatorStep, CalculatorValues } from "@/types/calculator";

const initialValues: CalculatorValues = { objectType: "", workType: "", area: "", region: "", options: [], name: "", phone: "", comment: "" };
const initialActionState: LeadActionState = { status: "idle", message: "", errors: {} };
const steps = calculatorConfig.steps as readonly CalculatorStep[];

export function CostCalculator({ dictionary, locale, className = "" }: { dictionary: Dictionary; locale: Locale; className?: string }) {
  const [values, setValues] = useState<CalculatorValues>(initialValues);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<CalculatorErrors>({});
  const action = submitLeadAction.bind(null, locale);
  const [state, formAction, pending] = useActionState(action, initialActionState);
  const currentStep = steps[stepIndex] ?? "objectType";
  const estimate = useMemo(() => calculateEstimate(values), [values]);
  const copy = dictionary.calculator;

  function updateValues(patch: Partial<CalculatorValues>) { setValues((current) => ({ ...current, ...patch })); }
  function goBack() { setErrors({}); setStepIndex((index) => Math.max(0, index - 1)); }
  function goNext() {
    const nextErrors = validateCalculatorStep(currentStep, values, copy.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setStepIndex((index) => Math.min(steps.length - 1, index + 1));
  }

  return <form action={formAction} className={className} noValidate><input name="objectType" type="hidden" value={values.objectType} /><input name="area" type="hidden" value={values.area} /><input name="region" type="hidden" value={values.region} /><input name="workType" type="hidden" value={values.workType} />{values.options.map((option) => <input key={option} name="options" type="hidden" value={option} />)}<input name="name" type="hidden" value={values.name} /><input name="phone" type="hidden" value={values.phone} /><input name="comment" type="hidden" value={values.comment} /><CalculatorShell copy={copy} currentStep={currentStep} steps={steps}>{currentStep === "objectType" ? <ObjectTypeStep copy={copy} errors={errors} onChange={(objectType) => updateValues({ objectType })} values={values} /> : null}{currentStep === "workType" ? <WorkTypeStep copy={copy} errors={errors} onChange={(workType) => updateValues({ workType })} values={values} /> : null}{currentStep === "area" ? <AreaStep copy={copy} errors={errors} onChange={(area) => updateValues({ area })} values={values} /> : null}{currentStep === "location" ? <LocationStep copy={copy} errors={errors} onChange={(region) => updateValues({ region })} values={values} /> : null}{currentStep === "options" ? <OptionsStep copy={copy} onChange={(options) => updateValues({ options })} values={values} /> : null}{currentStep === "contact" ? <ContactStep copy={copy} errors={errors} onChange={(field, value) => updateValues({ [field]: value })} values={values} /> : null}{currentStep === "result" ? <ResultStep copy={copy} estimate={estimate} locale={locale} pending={pending} state={state} /> : null}{currentStep !== "result" ? <CalculatorNavigation backLabel={copy.navigation.back} nextLabel={currentStep === "contact" ? copy.navigation.calculate : copy.navigation.next} onBack={goBack} onNext={goNext} showBack={stepIndex > 0} /> : <CalculatorNavigation backLabel={copy.navigation.back} nextLabel="" onBack={goBack} onNext={() => undefined} showBack showNext={false} />}</CalculatorShell></form>;
}
