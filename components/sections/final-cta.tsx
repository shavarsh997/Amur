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
    <section className="bg-white py-section">
      <Container>
        <div className="content-panel overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--brand-surface-warm)] p-6 sm:p-10 lg:p-12">
          <div className="content-split grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="mb-4 block h-px w-10 bg-[var(--brand-copper)]" />
              <h2 className="content-heading max-w-3xl text-pretty text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.14] tracking-[-0.055em] text-[var(--text-primary)]">
                {dictionary.cta.title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[var(--text-secondary)] sm:text-base">
                {dictionary.cta.description}
              </p>
              <div className="action-group mt-8">
                <ContactTrigger label={dictionary.cta.primaryAction} />
              </div>
            </div>
            <aside className="layout-region overflow-hidden rounded-xl bg-[var(--brand-navy)] p-5 text-white sm:p-6">
              <div className="cta-map-layout grid gap-6">
                <div className="cta-map-image relative min-h-40">
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
                <div className="cta-map-copy flex flex-col justify-center">
                  <p className="text-lg font-semibold tracking-[-0.03em]">
                    {dictionary.whyUs.items[5].title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {dictionary.whyUs.items[5].description}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
