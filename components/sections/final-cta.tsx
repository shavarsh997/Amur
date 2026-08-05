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
      <Container>
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--brand-surface-warm)] p-6 sm:p-10 lg:p-12">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)] lg:gap-12">
            <div>
              <span className="block h-px w-10 bg-[var(--brand-copper)]" />
              <h2 className="max-w-3xl text-pretty text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.14] tracking-[-0.055em] text-[var(--text-primary)]">
                {dictionary.cta.title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[var(--text-secondary)] sm:text-base">
                {dictionary.cta.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ContactTrigger
                  className="w-full sm:w-auto"
                  label={dictionary.cta.primaryAction}
                />
              </div>
            </div>
            <aside className="overflow-hidden rounded-xl bg-[var(--brand-navy)] p-6 text-white sm:p-7 lg:min-h-60">
              <MapPin
                aria-hidden="true"
                className="size-5 stroke-[1.4] text-[var(--brand-copper)]"
              />
              <p className="mt-10 text-lg font-semibold tracking-[-0.03em]">
                {dictionary.whyUs.items[5].title}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
                {dictionary.whyUs.items[5].description}
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
