import Image from "next/image";
import Link from "next/link";

import {
  getSeoLandingPage,
  getSeoLandingPath,
  type SeoLandingPage,
} from "@/config/seo-landing-pages.config";
import { ContactTrigger } from "@/components/forms/contact-dialog";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { PageHero } from "@/components/ui/page-hero";
import { getActiveServices } from "@/config/services.config";
import {
  getBreadcrumbJsonLd,
  getServiceJsonLd,
  serializeJsonLd,
} from "@/lib/json-ld";
import { getFaqsWithMinimum } from "@/lib/faq";
import type { Dictionary, Locale } from "@/types";

export function SeoLandingPage({
  page,
  locale,
  dictionary,
}: {
  page: SeoLandingPage & { content: SeoLandingPage["translations"][Locale] };
  locale: Locale;
  dictionary: Dictionary;
}) {
  const { content } = page;
  const faqs = getFaqsWithMinimum(content.faqs, locale);
  const href = `/${locale}/${getSeoLandingPath(page)}`;
  const relatedServices = getActiveServices(locale).filter((service) =>
    (page.relatedServiceSlugs as readonly string[]).includes(service.slug)
  );
  const relatedLandings = page.relatedLandingSlugs
    .map((slug) => getSeoLandingPage(locale, slug))
    .filter((landing): landing is NonNullable<typeof landing> =>
      Boolean(landing)
    );
  const breadcrumbs = [
    { label: dictionary.common.home, href: `/${locale}` },
    ...(page.kind === "service"
      ? [
          {
            label: dictionary.services.pageTitle,
            href: `/${locale}/services`,
          },
        ]
      : []),
    { label: content.title },
  ];
  const serviceCoverage =
    locale === "ru"
      ? {
          title: "Работаем по всей Армении",
          description:
            "Берём проекты в Ереване, Гюмри, Ванадзоре, Дилижане и других городах Армении. Возможность выезда и условия уточняем по объекту и объёму работ.",
        }
      : locale === "en"
        ? {
            title: "Working across Armenia",
            description:
              "We take projects in Yerevan, Gyumri, Vanadzor, Dilijan, and other Armenian cities. Visit availability and terms are confirmed for each property and scope.",
          }
        : {
            title: "Աշխատում ենք ամբողջ Հայաստանում",
            description:
              "Ընդունում ենք նախագծեր Երևանում, Գյումրիում, Վանաձորում, Դիլիջանում և Հայաստանի այլ քաղաքներում։ Մեկնելու հնարավորությունն ու պայմանները ճշտում ենք ըստ օբյեկտի և աշխատանքի ծավալի։",
          };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            getServiceJsonLd({
              locale,
              name: content.title,
              description: content.seoDescription,
              pathname: getSeoLandingPath(page),
            })
          ),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getBreadcrumbJsonLd(breadcrumbs)),
        }}
        type="application/ld+json"
      />
      <PageHero
        actions={
          <>
            <ContactTrigger label={content.contactLabel} />
            <ButtonLink href={`/${locale}/calculator`} variant="secondary">
              {content.calculatorLabel}
            </ButtonLink>
          </>
        }
        breadcrumbs={breadcrumbs}
        breadcrumbsLabel={dictionary.common.breadcrumbs}
        description={content.description}
        eyebrow={content.eyebrow}
        title={content.title}
      />
      <article>
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="relative aspect-[16/7] overflow-hidden rounded-[28px] bg-[var(--background-warm)]">
            <Image
              alt={content.title}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1279px) 100vw, 1200px"
              src={page.image}
            />
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-12">
            <section className="space-y-5 text-lg leading-8 text-[var(--text-secondary)]">
              {content.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            <section className="rounded-[24px] border border-[var(--border)] bg-[var(--background-soft)] p-7 sm:p-9">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                {serviceCoverage.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--text-secondary)]">
                {serviceCoverage.description}
              </p>
            </section>
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 leading-7 text-[var(--text-secondary)]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.items?.length ? (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <li
                        className="rounded-xl border border-[var(--border)] bg-[var(--background-soft)] px-4 py-3 leading-6 text-[var(--text-secondary)]"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <section className="rounded-[24px] bg-[var(--background-warm)] p-7 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                {content.calculatorLabel}
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--text-secondary)]">
                {locale === "ru"
                  ? "Калькулятор даёт предварительный ориентир. Точная смета формируется после осмотра объекта."
                  : locale === "en"
                    ? "The calculator provides an initial guide. A precise estimate follows a property survey."
                    : "Հաշվիչը տալիս է նախնական կողմնորոշիչ։ Ճշգրիտ նախահաշիվը կազմվում է օբյեկտի զննումից հետո։"}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`/${locale}/calculator`}>
                  {content.calculatorLabel}
                </ButtonLink>
                <ContactTrigger label={content.contactLabel} />
              </div>
            </section>
            {faqs.length ? (
              <section>
                <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">
                  FAQ
                </h2>
                <div className="mt-6">
                  <FAQAccordion items={faqs} />
                </div>
              </section>
            ) : null}
            {relatedLandings.length || relatedServices.length ? (
              <section>
                <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">
                  {content.relatedTitle}
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {relatedLandings.map((landing) => (
                    <Link
                      className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--brand-copper)]"
                      href={`/${locale}/${getSeoLandingPath(landing)}`}
                      key={landing.slug}
                    >
                      <h3 className="font-semibold text-[var(--text-primary)]">
                        {landing.content.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {landing.content.description}
                      </p>
                    </Link>
                  ))}
                  {relatedServices.map((service) => (
                    <Link
                      className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--brand-copper)]"
                      href={`/${locale}/services/${service.slug}`}
                      key={service.slug}
                    >
                      <h3 className="font-semibold text-[var(--text-primary)]">
                        {service.content.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {service.content.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
                <p className="sr-only">{href}</p>
              </section>
            ) : null}
          </div>
        </Container>
      </article>
    </>
  );
}
