import { budgetCopy } from "@/messages/budget";
import type { Locale } from "@/types";

export function RenovationBudget({ locale }: { locale: Locale }) {
  const copy = budgetCopy[locale];
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {copy.title}
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {copy.items.map(({ title, description }) => (
          <div
            className="rounded-2xl border border-[var(--border)] bg-white p-5"
            key={title}
          >
            <h3 className="font-semibold text-[var(--text-primary)]">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {description}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-[var(--background-soft)] p-6">
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
          {copy.areaTitle}
        </h3>
        <p className="mt-4 leading-7 text-[var(--text-secondary)]">
          {copy.areaDescription}
        </p>
        <p className="mt-4 font-semibold text-[var(--text-primary)]">
          {copy.formula}
        </p>
      </div>
    </section>
  );
}

export function EstimateExample({ locale }: { locale: Locale }) {
  const copy = budgetCopy[locale];
  const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const floorArea = 4 * 5;
  const wallArea = 2 * (4 + 5) * 2.7;
  const quantities = [wallArea, wallArea, floorArea, floorArea];
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {copy.exampleTitle}
      </h2>
      <p className="mt-4 leading-7 text-[var(--text-secondary)]">
        {copy.exampleDescription}
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full text-left text-sm leading-6">
          <caption className="sr-only">{copy.exampleTitle}</caption>
          <thead className="bg-[var(--background-soft)] text-[var(--text-primary)]">
            <tr>
              {[copy.work, copy.quantity, copy.amount].map((label) => (
                <th className="p-4 font-semibold" key={label} scope="col">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((label, index) => (
              <tr className="border-t border-[var(--border)]" key={label}>
                <th
                  className="p-4 font-medium text-[var(--text-primary)]"
                  scope="row"
                >
                  {label}
                </th>
                <td className="whitespace-nowrap p-4 text-[var(--text-secondary)]">
                  {format.format(quantities[index])} {copy.squareMetres}
                </td>
                <td className="p-4 text-[var(--text-secondary)]">
                  {format.format(quantities[index])} × {copy.rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
        {copy.exampleNote}
      </p>
      <p className="mt-4 leading-7 text-[var(--text-secondary)]">
        {copy.totalNote}
      </p>
    </section>
  );
}
