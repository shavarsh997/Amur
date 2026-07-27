import { Check, Compass } from "lucide-react";
import Image from "next/image";

import { CalculatorTrigger } from "@/components/calculator/calculator-dialog";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Dictionary, Locale } from "@/types";

const heroImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90";

export function Hero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="overflow-hidden bg-[var(--background-soft)]">
      <Container className="py-5 sm:py-7 lg:py-8">
        <div className="relative overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_22px_60px_-44px_rgb(24_24_27/0.38)]">
          <div className="grid min-h-[560px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--background-warm)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
                <Compass aria-hidden="true" className="size-3.5" />
                {dictionary.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-xl text-pretty text-4xl font-semibold tracking-[-0.055em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                {dictionary.hero.title}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                {dictionary.hero.description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CalculatorTrigger label={dictionary.hero.primaryAction} />
                <ButtonLink href={`/${locale}/services`} variant="secondary">
                  {dictionary.hero.secondaryAction}
                </ButtonLink>
              </div>
              <ul className="mt-8 grid max-w-xl gap-x-6 gap-y-3 border-t border-[var(--border)] pt-5 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                {dictionary.hero.trustPoints.map((point) => (
                  <li className="flex items-start gap-2.5" key={point}>
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--text-primary)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[340px] overflow-hidden bg-[var(--warm-accent)] lg:min-h-full">
              <Image
                alt={dictionary.hero.title}
                className="object-cover object-center"
                fill
                preload
                sizes="(max-width: 1023px) 100vw, 56vw"
                src={heroImage}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/10" />
              <div aria-hidden="true" className="absolute -bottom-16 -left-24 size-64 rounded-full bg-white/50 blur-3xl" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
