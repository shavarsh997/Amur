"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, PhoneCall } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import { ChoiceGroupInput } from "@/components/calculator/form/choice-group";
import { NumberFieldInput } from "@/components/calculator/form/number-field";
import { StepTitle } from "@/components/calculator/form/step-title";
import type { CalculatorFormValues } from "@/components/calculator/types";
import { calculatorFieldDomId } from "@/components/calculator/types";
import { contactMessageEvent } from "@/components/forms/contact-methods";
import { Button } from "@/components/ui/button";
import { buttonStyles } from "@/components/ui/button-styles";
import {
  renovationPriceTiers,
  type RenovationPriceTier,
} from "@/config/pricing.config";
import { trackEvent } from "@/lib/analytics";
import {
  calculateRenovationQuote,
  renovationQuoteAreaLimits,
  renovationQuoteText,
  type RenovationQuoteCondition,
} from "@/lib/calculator/renovation-quote";
import { getWhatsAppHref } from "@/lib/company";
import type { Dictionary, Locale } from "@/types";

/** Instant labour-only apartment renovation quote; no contact details needed. */
export function RenovationQuickEstimate({
  copy,
  locale,
}: {
  copy: Dictionary["constructionCalculator"];
  locale: Locale;
}) {
  const quoteCopy = copy.renovationQuote;
  const { control, setValue } = useFormContext<CalculatorFormValues>();
  const area = useWatch({ control, name: "area" }) ?? "";
  const [condition, setCondition] =
    useState<RenovationQuoteCondition>("newBuilding");
  const [tier, setTier] = useState<RenovationPriceTier>("standard");
  const [areaTouched, setAreaTouched] = useState(false);

  const quote = calculateRenovationQuote({ area, condition, tier });
  const text = quote ? renovationQuoteText(quote, quoteCopy, locale) : null;
  const whatsappHref = text ? getWhatsAppHref(text.whatsappMessage) : null;
  const areaError =
    area.trim() && !quote && areaTouched
      ? copy.validation.renovationAreaOutOfRange
      : undefined;

  const completed = useRef(false);
  const hasQuote = quote !== null;
  useEffect(() => {
    if (!hasQuote || completed.current) return;
    completed.current = true;
    trackEvent("calculator_complete", { calculation_type: "renovation" });
  }, [hasQuote]);

  const rateFormat = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  });
  const tierOptions = Object.fromEntries(
    renovationPriceTiers.map((option) => [
      option.id,
      `${quoteCopy.tiers[option.id]} · ${quoteCopy.rate
        .replace("{rate}", rateFormat.format(option.from))
        .replace("{currency}", quoteCopy.currency)}`,
    ])
  );

  const openCallbackForm = () => {
    trackEvent("cta_click", { cta_id: "message_form" });
    window.dispatchEvent(new Event(contactMessageEvent));
  };

  return (
    <section className="layout-region rounded-card border border-[var(--border)] bg-white p-panel shadow-[var(--shadow-card)]">
      <StepTitle
        description={quoteCopy.description}
        number="02"
        title={quoteCopy.title}
      />
      <div className="mt-6 max-w-xs">
        <NumberFieldInput
          error={areaError}
          fieldId={calculatorFieldDomId("area")}
          label={copy.fields.area}
          max={renovationQuoteAreaLimits.max}
          min={renovationQuoteAreaLimits.min}
          name="area"
          onBlur={() => setAreaTouched(true)}
          onChange={(value) => setValue("area", value)}
          value={area}
        />
      </div>
      <div className="mt-6 grid gap-5 local-grid">
        <ChoiceGroupInput
          label={quoteCopy.conditionLabel}
          name="renovationQuoteCondition"
          onBlur={() => undefined}
          onChange={(value) => setCondition(value as RenovationQuoteCondition)}
          options={quoteCopy.conditions}
          value={condition}
        />
        <ChoiceGroupInput
          label={quoteCopy.tierLabel}
          name="renovationQuoteTier"
          onBlur={() => undefined}
          onChange={(value) => setTier(value as RenovationPriceTier)}
          options={tierOptions}
          value={tier}
        />
      </div>

      <div
        aria-live="polite"
        className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background-warm)] p-5 sm:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
          {quoteCopy.resultTitle}
        </p>
        {text ? (
          <>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-3xl">
              {text.total}
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {text.timeline}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {quoteCopy.empty}
          </p>
        )}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {whatsappHref ? (
            <a
              className={buttonStyles("primary", "default", "")}
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              <span aria-hidden="true" className="action-button__icon">
                <MessageCircle />
              </span>
              <span className="action-button__label">
                {quoteCopy.whatsappAction}
              </span>
            </a>
          ) : null}
          <Button
            aria-haspopup="dialog"
            icon={<PhoneCall />}
            onClick={openCallbackForm}
            variant={whatsappHref ? "outline" : "primary"}
          >
            {quoteCopy.callbackAction}
          </Button>
        </div>
      </div>
    </section>
  );
}
