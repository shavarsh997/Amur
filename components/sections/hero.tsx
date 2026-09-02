import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

import { ContactTrigger } from "@/components/forms/contact-dialog";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { homeContent } from "@/config/home-content.config";
import type { Dictionary, Locale } from "@/types";

export function Hero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const content = homeContent[locale];
  return (
    <section className="overflow-hidden bg-[var(--brand-background)]">
      <Container className="py-4 sm:py-7 lg:py-8">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
          <div className="grid lg:min-h-[590px] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-10 flex flex-col justify-center px-5 py-9 sm:px-9 sm:py-14 lg:px-12 lg:py-16">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.13em] text-[var(--text-secondary)]">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[var(--brand-copper)]"
                />
                {dictionary.hero.eyebrow}
              </p>
              <h1 className="mt-5 w-full break-words text-pretty text-[2.25rem] font-semibold leading-[1.14] tracking-[-0.055em] text-[var(--text-primary)] sm:mt-6 sm:text-[2.25rem] lg:text-[3rem]">
                {dictionary.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-6 text-[var(--text-secondary)] sm:text-[17px] sm:leading-7">
                {dictionary.hero.description}
              </p>
              <div className="w-full mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:items-center">
                <ContactTrigger
                  className="w-full sm:w-auto"
                  label={dictionary.hero.primaryAction}
                />
                <ButtonLink
                  className="w-full gap-2 sm:w-auto"
                  href={`/${locale}/services`}
                  variant="secondary"
                >
                  {dictionary.hero.secondaryAction}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>
              </div>
              <ul className="mt-8 grid gap-2.5 border-t border-[var(--border)] pt-5 text-sm font-medium leading-5 text-[var(--text-secondary)] sm:grid-cols-3 sm:gap-3">
                {dictionary.whyUs.items.slice(0, 3).map((item) => (
                  <li className="flex items-start gap-2" key={item.title}>
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-[var(--brand-copper)]"
                    />
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative order-2 min-h-[280px] overflow-hidden bg-[var(--surface-muted)] lg:order-none lg:min-h-full">
              <Image
                alt={content.heroVisual.alt}
                className="object-cover object-center"
                fill
                preload
                quality={82}
                sizes="(max-width: 1023px) 100vw, 56vw"
                src={content.heroVisual.image}
              />
              <span className="absolute bottom-5 left-5 h-12 w-1 bg-[var(--brand-copper)] sm:bottom-7 sm:left-7" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
