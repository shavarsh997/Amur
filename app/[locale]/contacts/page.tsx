import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { companyConfig } from "@/config/company.config";
import {
  getMailHref,
  getPhoneHref,
  getSocialLinks,
  getWhatsAppHref,
} from "@/lib/company";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { contacts } = await getDictionary(locale);

  return buildMetadata({
    locale,
    path: "contacts",
    title: contacts.title,
    description: contacts.description,
  });
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const copy = dictionary.contacts;
  const phoneHref = getPhoneHref();
  const whatsappHref = getWhatsAppHref();
  const mailHref = getMailHref();

  return (
    <>
      <PageHero
        breadcrumbsLabel={dictionary.common.breadcrumbs}
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: copy.title },
        ]}
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            Shinex
          </h2>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">
            {companyConfig.business.serviceArea.join(" · ")}
          </p>
          <dl className="mt-7 space-y-5 text-[var(--text-secondary)]">
            {phoneHref && companyConfig.contact.displayPhone ? (
              <div>
                <dt className="text-sm font-semibold text-[var(--text-primary)]">
                  {copy.phone}
                </dt>
                <dd className="mt-1">
                  <a
                    className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                    href={phoneHref}
                  >
                    {companyConfig.contact.displayPhone}
                  </a>
                </dd>
              </div>
            ) : null}
            {whatsappHref ? (
              <div>
                <dt className="text-sm font-semibold text-[var(--text-primary)]">
                  {copy.whatsapp}
                </dt>
                <dd className="mt-1">
                  <a
                    className="rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                    href={whatsappHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    WhatsApp
                  </a>
                </dd>
              </div>
            ) : null}
            {mailHref && companyConfig.contact.email ? (
              <div>
                <dt className="text-sm font-semibold text-[var(--text-primary)]">
                  {copy.email}
                </dt>
                <dd className="mt-1">
                  <a href={mailHref}>{companyConfig.contact.email}</a>
                </dd>
              </div>
            ) : null}
            {companyConfig.contact.address ? (
              <div>
                <dt className="text-sm font-semibold text-[var(--text-primary)]">
                  {copy.address}
                </dt>
                <dd className="mt-1">{companyConfig.contact.address}</dd>
              </div>
            ) : null}
            {companyConfig.contact.workingHours ? (
              <div>
                <dt className="text-sm font-semibold text-[var(--text-primary)]">
                  {copy.hours}
                </dt>
                <dd className="mt-1">{companyConfig.contact.workingHours}</dd>
              </div>
            ) : null}
            {getSocialLinks().map(({ name, url }) => (
              <div key={name}>
                <dt className="text-sm font-semibold capitalize text-[var(--text-primary)]">
                  {name}
                </dt>
                <dd className="mt-1">
                  <a href={url} rel="noreferrer" target="_blank">
                    {url}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-9">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            {copy.formTitle}
          </h2>
          <p className="mt-4 leading-7 text-[var(--text-secondary)]">
            {copy.formDescription}
          </p>
          <LeadForm className="mt-8" dictionary={dictionary} locale={locale} />
        </section>
      </Container>
    </>
  );
}
