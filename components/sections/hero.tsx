import { ArrowRight, Check, Compass } from "lucide-react";
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
    <section className="overflow-hidden bg-[var(--background-soft)]">
      <Container className="py-3 sm:py-7 lg:py-8">
        <div className="relative overflow-hidden rounded-[22px] border border-[var(--border)] bg-white shadow-[0_22px_60px_-44px_rgb(24_24_27/0.38)] sm:rounded-[28px]">
          <div className="grid lg:min-h-[560px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative z-10 flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--background-warm)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
                <Compass aria-hidden="true" className="size-3.5" />
                {dictionary.hero.eyebrow}
              </p>
              <h1 className="mt-4 max-w-xl text-pretty text-[2rem] font-semibold leading-[1.06] tracking-[-0.055em] text-[var(--text-primary)] sm:mt-5 sm:text-5xl lg:text-6xl">
                {dictionary.hero.title}
              </h1>
              <p className="mt-4 max-w-lg text-[15px] leading-6 text-[var(--text-secondary)] sm:mt-5 sm:text-lg sm:leading-7">
                {dictionary.hero.description}
              </p>
              <ul className="mt-5 grid max-w-xl grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium leading-5 text-[var(--text-secondary)] sm:mt-6 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2 sm:text-sm">
                {content.heroDirections.map((direction) => (
                  <li className="flex items-center gap-1.5" key={direction}>
                    <Check
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-[var(--text-primary)]"
                    />
                    {direction}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:gap-3">
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
            </div>
            <div className="relative order-2 min-h-[250px] overflow-hidden bg-[var(--warm-accent)] lg:order-none lg:min-h-full">
              <Image
                alt={content.heroVisual.alt}
                className="object-cover object-center"
                fill
                preload
                sizes="(max-width: 1023px) 100vw, 56vw"
                src={content.heroVisual.image}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -left-24 size-64 rounded-full bg-white/50 blur-3xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
