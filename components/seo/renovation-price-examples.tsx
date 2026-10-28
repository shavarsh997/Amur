import { ContactTrigger } from "@/components/forms/contact-dialog";
import { getPublicServicePrice } from "@/config/pricing.config";
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
  const rate = price.from;
  const copy = priceExampleCopy[locale];
  const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  return (
    <section id="price-examples" className="space-y-6 scroll-mt-24">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {copy.title}
      </h2>
      <p className="max-w-3xl leading-7 text-[var(--text-secondary)]">
        {copy.description}
      </p>
      <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
        <table className="w-full text-left text-sm leading-6">
          <caption className="sr-only">{copy.title}</caption>
          <thead className="bg-[var(--background-soft)]">
            <tr>
              <th scope="col" className="p-3 sm:p-4">
                {copy.area}
              </th>
              <th scope="col" className="p-3 sm:p-4">
                {copy.calculation}
              </th>
            </tr>
          </thead>
          <tbody>
            {[40, 60, 80].map((area) => (
              <tr key={area} className="border-t border-[var(--border)]">
                <th scope="row" className="p-3 sm:p-4 font-medium">
                  {area} {copy.unit}
                </th>
                <td className="p-3 sm:p-4">
                  {area} × {format.format(rate)} ={" "}
                  <strong className="whitespace-nowrap">
                    {format.format(area * rate)} {copy.currency}
                  </strong>
                </td>
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
  );
}
