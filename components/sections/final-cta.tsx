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
        <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--background-warm)] p-6 shadow-[0_24px_52px_-42px_rgb(24_33_42/0.38)] sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-36 size-[26rem] rounded-full border-[3.5rem] border-white/45"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 right-[19%] size-56 rounded-full border border-white/70"
          />
          <div className="relative grid items-end gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)] lg:gap-12">
            <div>
              {/* <span className="grid size-11 place-items-center rounded-2xl border border-white/80 bg-white/75 text-[var(--text-primary)] shadow-[0_12px_24px_-20px_rgb(24_33_42/0.45)]">
                <MapPin
                  aria-hidden="true"
                  className="size-5 stroke-[1.45]"
                />
              </span> */}
              <h2 className="max-w-3xl text-pretty text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-[var(--text-primary)]">
                {dictionary.cta.title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[var(--text-secondary)] sm:text-base">
                {dictionary.cta.description}
              </p>
              {/* <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ContactTrigger
                  className="w-full sm:w-auto"
                  label={dictionary.cta.primaryAction}
                />
                <ContactTrigger
                  className="w-full sm:w-auto"
                  label={dictionary.cta.secondaryAction}
                  variant="secondary"
                />
              </div> */}
            </div>
            <aside className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[var(--text-primary)] p-6 text-white shadow-[0_20px_40px_-28px_rgb(24_33_42/0.7)] sm:p-7 lg:min-h-60">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 size-32 rounded-full border border-white/15"
              />
              <MapPin
                aria-hidden="true"
                className="relative size-5 stroke-[1.4] text-white/80"
              />
              <p className="relative mt-10 text-lg font-semibold tracking-[-0.03em]">
                {dictionary.whyUs.items[5].title}
              </p>
              <p className="relative mt-3 max-w-xs text-sm leading-6 text-white/70">
                {dictionary.whyUs.items[5].description}
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
