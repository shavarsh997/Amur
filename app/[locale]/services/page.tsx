import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { services } = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "services",
    title: services.pageTitle,
    description: services.pageDescription,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const { services, common } = dictionary;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: common.home, href: `/${locale}` },
          { label: services.pageTitle },
        ]}
        description={services.pageDescription}
        eyebrow={services.eyebrow}
        title={services.pageTitle}
      />
      <Container className="space-y-10 py-16 sm:py-20 lg:py-24">
        {services.items.map((service, index) => (
          <article
            className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm lg:grid-cols-2"
            key={service.slug}
          >
            <div className={`relative min-h-72 bg-zinc-100 ${index % 2 ? "lg:order-2" : ""}`}>
              <Image
                alt={service.title}
                className="object-cover"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                src={service.image}
              />
            </div>
            <div className="p-6 sm:p-9 lg:p-12">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                {service.title}
              </h2>
              <p className="mt-4 leading-7 text-zinc-600">{service.description}</p>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-zinc-950">{services.detail.included}</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                    {service.included.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-950">{services.detail.stages}</h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                    {service.stages.map((stage) => <li key={stage}>{stage}</li>)}
                  </ol>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-zinc-950">{services.detail.audience}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                  {service.audience.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <ButtonLink className="mt-8" href={`/${locale}/services/${service.slug}`}>
                {service.cta}
              </ButtonLink>
            </div>
          </article>
        ))}
      </Container>
    </>
  );
}
