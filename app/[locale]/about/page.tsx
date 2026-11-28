import { PageSchema } from "@/components/seo/page-schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { companyConfig } from "@/config/company.config";
import { getServiceMedia } from "@/config/service-media.config";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getBreadcrumbJsonLd, serializeJsonLd } from "@/lib/json-ld";

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
  const crew = dictionary.whyUs.items[6];
  const hours = companyConfig.contact.workingHours.display[locale];
  const factValues: Record<string, string> = {
    phone: companyConfig.contact.displayPhone,
    email: companyConfig.contact.email,
    hours: hours.charAt(0).toUpperCase() + hours.slice(1),
  };
  const fillFact = (value: string) =>
    value.replace(
      /\{(phone|email|hours)\}/g,
      (_, key: string) => factValues[key]
    );

  return (
    <>
      <PageSchema
        locale={locale}
        pathname="about"
        name={about.title}
        description={about.intro}
        type="AboutPage"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            getBreadcrumbJsonLd([
              { label: dictionary.common.home, href: `/${locale}` },
              { label: about.title },
            ])
          ),
        }}
        type="application/ld+json"
      />
      <PageHero
        breadcrumbsLabel={dictionary.common.breadcrumbs}
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: about.title },
        ]}
        description={about.intro}
        eyebrow={about.eyebrow}
        title={about.title}
        image={getServiceMedia("design", locale).hero}
      />
      <Container className="space-y-section py-section">
        <section className="content-split grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            {about.storyTitle}
          </h2>
          <div className="space-y-5 text-lg leading-8 text-[var(--text-secondary)]">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section
          aria-labelledby="about-facts"
          className="content-split grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"
        >
          <h2
            className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]"
            id="about-facts"
          >
            {about.facts.title}
          </h2>
          <dl className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {about.facts.items.map((fact) => (
              <div
                className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                key={fact.label}
              >
                <dt className="text-sm uppercase tracking-[0.12em] text-[var(--text-muted)] sm:pt-1">
                  {fact.label}
                </dt>
                <dd className="leading-7 text-[var(--text-primary)]">
                  {fillFact(fact.value)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            {about.team.title}
          </h2>
          <div className="mt-8 grid gap-4 content-grid-three md:grid-cols-3">
            {about.team.members.map((member) => (
              <article
                className="rounded-card border border-[var(--border)] bg-[var(--background-soft)] p-6"
                key={member.name}
              >
                <p className="text-sm uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {member.role}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
                  {member.name}
                </h3>
                <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                  {member.description}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            {about.valuesTitle}
          </h2>
          <div className="mt-8 grid gap-4 content-grid-three md:grid-cols-3">
            {about.values.map((value) => (
              <article
                className="rounded-card border border-[var(--border)] bg-[var(--background-soft)] p-6"
                key={value.title}
              >
                <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
                  {value.title}
                </h3>
                <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="content-split content-panel grid gap-6 rounded-card bg-[var(--background-warm)] p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
              {about.approachTitle}
            </h2>
            <p className="mt-4 leading-7 text-[var(--text-secondary)]">
              {about.approach}
            </p>
          </div>
          <div className="content-aside border-t border-white/70 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
              {crew.title}
            </h2>
            <p className="mt-4 leading-7 text-[var(--text-secondary)]">
              {crew.description}
            </p>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              {dictionary.footer.description}
            </p>
          </div>
        </section>
      </Container>
      <FinalCta dictionary={dictionary} locale={locale} />
    </>
  );
}
