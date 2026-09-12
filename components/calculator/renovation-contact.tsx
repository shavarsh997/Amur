import { ContactTrigger } from "@/components/forms/contact-dialog";
import type { Dictionary } from "@/types";

export function RenovationContact({
  copy,
}: {
  copy: Dictionary["constructionCalculator"]["renovationContact"];
}) {
  return (
    <section className="rounded-[24px] border border-[var(--border)] bg-[var(--background-warm)] p-7 sm:p-10">
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {copy.title}
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-[var(--text-secondary)]">
        {copy.description}
      </p>
      <ContactTrigger className="mt-6" label={copy.action} />
    </section>
  );
}
