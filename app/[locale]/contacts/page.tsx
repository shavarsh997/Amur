import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { isPlaceholder, siteConfig } from "@/config/site.config";

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
  const contactItems = [
    { label: copy.phone, value: siteConfig.contacts.phone },
    { label: copy.email, value: siteConfig.contacts.email },
    { label: copy.address, value: siteConfig.contacts.address },
    { label: copy.hours, value: siteConfig.contacts.hours },
  ].filter((item) => !isPlaceholder(item.value));
  const messengers = [
    { label: copy.whatsapp, url: siteConfig.contacts.whatsappUrl },
    { label: copy.telegram, url: siteConfig.contacts.telegramUrl },
  ].filter((item) => item.url);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: dictionary.common.home, href: `/${locale}` },
          { label: copy.title },
        ]}
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-soft)] p-7">
              {contactItems.length ? (
                <dl className="space-y-6">
                  {contactItems.map((item) => (
                    <div key={item.label}>
                      <dt className="text-sm font-semibold text-[var(--text-muted)]">{item.label}</dt>
                      <dd className="mt-1 text-lg text-[var(--text-primary)]">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="leading-7 text-[var(--text-secondary)]">{copy.mapPlaceholder}</p>
              )}
              {messengers.length ? (
                <div className="mt-8 border-t border-[var(--border)] pt-6">
                  <h2 className="font-semibold text-[var(--text-primary)]">{copy.messengers}</h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {messengers.map((messenger) => (
                      <a
                        className="rounded-lg bg-[var(--button-primary)] px-4 py-2 text-sm font-semibold text-white"
                        href={messenger.url}
                        key={messenger.label}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {messenger.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div
              aria-label={copy.mapPlaceholder}
              className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--background-warm)] p-8 text-center text-[var(--text-secondary)]"
              role="img"
            >
              {copy.mapPlaceholder}
            </div>
          </aside>
          <section className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-9" id="estimate">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">{copy.formTitle}</h2>
            <p className="mt-4 leading-7 text-[var(--text-secondary)]">{copy.formDescription}</p>
            <LeadForm className="mt-8" dictionary={dictionary} locale={locale} />
          </section>
        </div>
      </Container>
    </>
  );
}
