import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { EstimateSection } from "@/components/sections/estimate-section";
import { FinalCta } from "@/components/sections/final-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { serviceCatalog } from "@/data/services";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return serviceCatalog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const service = dictionary.services.items.find((item) => item.slug === slug);
  if (!service) notFound();

  return buildMetadata({
    locale,
    path: `services/${service.slug}`,
    title: service.title,
    description: service.description,
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const service = dictionary.services.items.find((item) => item.slug === slug);
  if (!service) notFound();
  const copy = dictionary.services.detail;

  return (
    <>
      <PageHero
        actions={
          <ButtonLink href={`/${locale}/contacts#estimate`}>
            {service.cta}
          </ButtonLink>
        }
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: dictionary.services.pageTitle, href: `/${locale}/services` },
          { label: service.title },
        ]}
        description={service.shortDescription}
        eyebrow={dictionary.services.eyebrow}
        title={service.title}
      />
      <article>
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-zinc-100">
            <Image
              alt={service.title}
              className="object-cover"
              fill
              sizes="(max-width: 1279px) 100vw, 1200px"
              src={service.image}
            />
          </div>
          <div className="mx-auto mt-14 max-w-5xl space-y-14">
            <section>
              <h2 className="text-3xl font-semibold text-zinc-950">{copy.overview}</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600">{service.description}</p>
            </section>
            <div className="grid gap-10 md:grid-cols-3">
              <section>
                <h2 className="text-xl font-semibold text-zinc-950">{copy.included}</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-zinc-600">
                  {service.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-zinc-950">{copy.stages}</h2>
                <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-zinc-600">
                  {service.stages.map((stage) => <li key={stage}>{stage}</li>)}
                </ol>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-zinc-950">{copy.audience}</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-zinc-600">
                  {service.audience.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </div>
            <div className="rounded-3xl bg-zinc-950 p-7 text-white sm:p-10">
              <h2 className="text-2xl font-semibold">{copy.requestEstimate}</h2>
              <ButtonLink className="mt-6" href={`/${locale}/contacts#estimate`}>
                {service.cta}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </article>
      <EstimateSection dictionary={dictionary} locale={locale} />
      <FinalCta dictionary={dictionary} locale={locale} />
    </>
  );
}
