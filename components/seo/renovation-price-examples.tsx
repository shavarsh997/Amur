import { ContactTrigger } from "@/components/forms/contact-dialog";
import {
  getPublicServicePrice,
  renovationPriceTiers,
} from "@/config/pricing.config";
import { priceExampleCopy } from "@/messages/price-examples";
import type { Locale } from "@/types";

export function RenovationPriceExamples({ locale }: { locale: Locale }) {
  const price = getPublicServicePrice("renovation");
  if (
    !price?.from ||
    price.materialsIncluded !== false ||
    price.unit !== "sqm" ||
    price.currency !== "AMD"
  )
    return null;
  const copy = priceExampleCopy[locale];
  const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const startingRate = format.format(price.from);
  const withRate = (text: string) => text.replaceAll("{price}", startingRate);
  const conditions = (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[var(--text-primary)]">
      {copy.conditions.map((condition) => (
        <li key={condition} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-[var(--brand-copper)]"
          />
          {condition}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="space-y-section-gap">
      <section aria-labelledby="renovation-levels-title" className="space-y-6">
        <h2
          id="renovation-levels-title"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {copy.tiersTitle}
        </h2>
        <p className="max-w-3xl leading-7 text-[var(--text-secondary)]">
          {copy.tiersDescription}
        </p>
        <div className="grid gap-4 lg:grid-cols-3">
          {renovationPriceTiers.map((tier) => (
            <div
              key={tier.id}
              className={
                tier.id === "premium"
                  ? "space-y-4 bg-[var(--brand-navy)] p-6 text-[var(--text-on-dark)] sm:p-8"
                  : "space-y-4 bg-[var(--surface)] p-6 sm:p-8"
              }
            >
              <h3 className="text-xl font-semibold">
                {copy.tiers[tier.id].name}
              </h3>
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-sm">{copy.from}</span>
                <strong className="whitespace-nowrap text-4xl font-semibold tracking-tight">
                  {format.format(tier.from)}
                </strong>
                <span className="text-sm">
                  {copy.currency}/{copy.unit}
                </span>
              </p>
              <p className="text-sm">{copy.materialsNote}</p>
              <p
                className={
                  tier.id === "premium"
                    ? "leading-7 text-[var(--text-secondary-on-dark)]"
                    : "leading-7 text-[var(--text-secondary)]"
                }
              >
                {copy.tiers[tier.id].description}
              </p>
            </div>
          ))}
        </div>
        {conditions}
      </section>
      <section
        aria-labelledby="renovation-why-rate-title"
        className="space-y-4 rounded-2xl bg-[var(--background-soft)] p-6 sm:p-8"
      >
        <h2
          id="renovation-why-rate-title"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {withRate(copy.whyTitle)}
        </h2>
        <p className="max-w-3xl leading-7 text-[var(--text-secondary)]">
          {withRate(copy.whyText)}
        </p>
        <p className="font-semibold text-[var(--text-primary)]">
          {copy.timeline}
        </p>
      </section>
      <section id="price-examples" className="space-y-6 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {copy.title}
        </h2>
        <p className="max-w-3xl leading-7 text-[var(--text-secondary)]">
          {copy.description}
        </p>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
          <table className="w-full min-w-[40rem] text-left text-sm leading-6">
            <caption className="sr-only">{copy.title}</caption>
            <thead className="bg-[var(--background-soft)]">
              <tr>
                <th scope="col" className="p-3 sm:p-4">
                  {copy.area}
                </th>
                {renovationPriceTiers.map((tier) => (
                  <th key={tier.id} scope="col" className="p-3 sm:p-4">
                    {copy.tiers[tier.id].name}
                    <span className="mt-1 block text-xs font-normal text-[var(--text-secondary)]">
                      {copy.calculation}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[40, 60, 80].map((area) => (
                <tr key={area} className="border-t border-[var(--border)]">
                  <th scope="row" className="p-3 sm:p-4 font-medium">
                    {area} {copy.unit}
                  </th>
                  {renovationPriceTiers.map((tier) => (
                    <td key={tier.id} className="p-3 sm:p-4">
                      <strong className="whitespace-nowrap">
                        {copy.from} {format.format(area * tier.from)}{" "}
                        {copy.currency}
                      </strong>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold">{copy.scopeTitle}</h3>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              {copy.scope}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{copy.extrasTitle}</h3>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">
              {copy.extras}
            </p>
          </div>
        </div>
        <ContactTrigger label={copy.next} />
      </section>
    </div>
  );
}
