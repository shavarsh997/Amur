import type { Dictionary } from "@/types";
import type { CalculatorErrors, CalculatorValues } from "@/types/calculator";

const controlClass =
  "mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--text-primary)]";

export function ContactStep({
  copy,
  values,
  errors,
  onChange,
}: {
  copy: Dictionary["calculator"];
  values: CalculatorValues;
  errors: CalculatorErrors;
  onChange: (field: "name" | "phone" | "comment", value: string) => void;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
        {copy.contact.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
        {copy.contact.description}
      </p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label
          className="block text-sm font-semibold text-[var(--text-primary)]"
          htmlFor="calculator-name"
        >
          {copy.contact.nameLabel}
          <input
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            className={controlClass}
            id="calculator-name"
            onChange={(event) => onChange("name", event.target.value)}
            placeholder={copy.contact.namePlaceholder}
            type="text"
            value={values.name}
          />
        </label>
        <label
          className="block text-sm font-semibold text-[var(--text-primary)]"
          htmlFor="calculator-phone"
        >
          {copy.contact.phoneLabel}
          <input
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
            className={controlClass}
            id="calculator-phone"
            inputMode="tel"
            onChange={(event) => onChange("phone", event.target.value)}
            placeholder={copy.contact.phonePlaceholder}
            type="tel"
            value={values.phone}
          />
        </label>
      </div>
      {errors.name ? (
        <p className="mt-3 text-sm text-[var(--error)]">{errors.name}</p>
      ) : null}
      {errors.phone ? (
        <p className="mt-3 text-sm text-[var(--error)]">{errors.phone}</p>
      ) : null}
      <label
        className="mt-5 block text-sm font-semibold text-[var(--text-primary)]"
        htmlFor="calculator-comment"
      >
        {copy.contact.commentLabel}
        <textarea
          className={`${controlClass} min-h-28 resize-y`}
          id="calculator-comment"
          onChange={(event) => onChange("comment", event.target.value)}
          placeholder={copy.contact.commentPlaceholder}
          rows={4}
          value={values.comment}
        />
      </label>
    </section>
  );
}
