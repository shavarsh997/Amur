import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary, Locale } from "@/types";

export function FinalCta({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="bg-blue-600 py-16 sm:py-20">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {dictionary.cta.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-800">
            {dictionary.cta.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <ButtonLink
            className="bg-zinc-950 text-white hover:bg-zinc-800 focus-visible:outline-zinc-950"
            href={`/${locale}/contacts#estimate`}
          >
            {dictionary.cta.primaryAction}
            <ArrowRight aria-hidden="true" className="ml-2 size-4" />
          </ButtonLink>
          <ButtonLink
            href={siteConfig.contacts.phoneHref || `/${locale}/contacts`}
            variant="secondary"
          >
            {dictionary.cta.secondaryAction}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
