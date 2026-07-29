import { MapPin } from "lucide-react";

import { ContactTrigger } from "@/components/forms/contact-dialog";
import { Container } from "@/components/ui/container";
import type { Dictionary, Locale } from "@/types";

export function FinalCta({
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] bg-[var(--background-warm)] p-6 sm:p-8">
          <MapPin
            aria-hidden="true"
            className="size-6 stroke-[1.35] text-[var(--text-primary)]"
          />
          <h2 className="mt-9 text-pretty text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
            {dictionary.cta.title}
          </h2>
          <p className="mt-4 max-w-lg leading-7 text-[var(--text-secondary)]">
            {dictionary.cta.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ContactTrigger label={dictionary.cta.primaryAction} />
            <ContactTrigger
              label={dictionary.cta.secondaryAction}
              variant="secondary"
            />
          </div>
        </div>
        <div className="relative min-h-64 overflow-hidden rounded-[24px] bg-[var(--surface-muted)] p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="absolute right-[-20%] top-[-30%] size-[420px] rounded-full border-[48px] border-white"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-10 h-28 w-36 rotate-[-12deg] rounded-[32px] border border-[var(--border-strong)] bg-white"
          />
          <div className="relative max-w-xs">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {dictionary.whyUs.items[5].title}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              {dictionary.whyUs.items[5].description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
