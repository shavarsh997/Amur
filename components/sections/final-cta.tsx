import Image from "next/image";

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
          <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-12">
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
            <aside className="grid min-h-72 overflow-hidden rounded-xl bg-[var(--brand-navy)] p-5 text-white sm:grid-cols-[0.9fr_1fr] sm:p-7">
              <div className="relative min-h-52 sm:min-h-0">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_42%_45%,_rgb(201_111_69_/_0.2),_transparent_58%)]"
                />
                <Image
                  alt=""
                  aria-hidden="true"
                  className="object-contain p-1 opacity-90 drop-shadow-[0_16px_22px_rgb(0_0_0_/_0.22)]"
                  fill
                  sizes="(max-width: 639px) 100vw, 22rem"
                  src="/illustrations/armenia-map-cutout.png"
                />
              </div>
              <div className="flex flex-col justify-center sm:border-l sm:border-white/10 sm:pl-7">
                <p className="mt-6 text-lg font-semibold tracking-[-0.03em]">
                  {dictionary.whyUs.items[5].title}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {dictionary.whyUs.items[5].description}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
