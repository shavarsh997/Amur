import { Check } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Dictionary, Locale } from "@/types";

const heroImage =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90";

export function Hero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-zinc-950 text-white">
      <Image
        alt={dictionary.hero.title}
        className="object-cover opacity-55"
        fill
        preload
        sizes="100vw"
        src={heroImage}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/20"
      />
      <Container className="relative flex min-h-[760px] items-center pb-20 pt-36">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400">
            {dictionary.hero.eyebrow}
          </p>
          <h1 className="mt-5 text-pretty text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {dictionary.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">
            {dictionary.hero.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/${locale}/contacts#estimate`}>
              {dictionary.hero.primaryAction}
            </ButtonLink>
            <ButtonLink href={`/${locale}/projects`} variant="light">
              {dictionary.hero.secondaryAction}
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-4 border-t border-white/20 pt-7 text-sm text-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {dictionary.hero.trustPoints.map((point) => (
              <li className="flex items-start gap-2.5" key={point}>
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-blue-400"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
