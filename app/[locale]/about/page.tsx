import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { about } = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "about",
    title: about.title,
    description: about.intro,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const { about } = dictionary;
  const geography = dictionary.whyUs.items[5];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: about.title },
        ]}
        description={about.intro}
        eyebrow={about.eyebrow}
        title={about.title}
      />
      <Container className="space-y-12 py-12 sm:space-y-16 sm:py-16 lg:space-y-20 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{about.storyTitle}</h2>
          <div className="space-y-5 text-lg leading-8 text-[var(--text-secondary)]">
            {about.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{about.valuesTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {about.values.map((value) => (
              <article className="rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-6" key={value.title}>
                <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{value.title}</h3>
                <p className="mt-3 leading-7 text-[var(--text-secondary)]">{value.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="grid gap-6 rounded-[28px] bg-[var(--background-warm)] p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{about.approachTitle}</h2>
            <p className="mt-4 leading-7 text-[var(--text-secondary)]">{about.approach}</p>
          </div>
          <div className="border-t border-white/70 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{geography.title}</h2>
            <p className="mt-4 leading-7 text-[var(--text-secondary)]">{geography.description}</p>
            <p className="mt-3 text-sm text-[var(--text-muted)]">{dictionary.footer.description}</p>
          </div>
        </section>
      </Container>
      <FinalCta dictionary={dictionary} locale={locale} />
    </>
  );
}
