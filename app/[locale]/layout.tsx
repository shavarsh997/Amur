import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { isPlaceholder, siteConfig } from "@/config/site.config";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import type { SiteConfiguration } from "@/types/config";

const publicSiteConfig = {
  ...siteConfig,
  contacts: {
    ...siteConfig.contacts,
    phone: isPlaceholder(siteConfig.contacts.phone) ? "" : siteConfig.contacts.phone,
    email: isPlaceholder(siteConfig.contacts.email) ? "" : siteConfig.contacts.email,
    address: isPlaceholder(siteConfig.contacts.address) ? "" : siteConfig.contacts.address,
    hours: isPlaceholder(siteConfig.contacts.hours) ? "" : siteConfig.contacts.hours,
  },
} satisfies SiteConfiguration;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    url: `${siteConfig.domain}/${locale}`,
    areaServed: {
      "@type": "Country",
      name: siteConfig.country,
    },
    telephone: publicSiteConfig.contacts.phone || undefined,
    email: publicSiteConfig.contacts.email || undefined,
    address: publicSiteConfig.contacts.address
      ? {
          "@type": "PostalAddress",
          addressLocality: publicSiteConfig.contacts.address,
          addressCountry: "AM",
        }
      : undefined,
    sameAs: siteConfig.contacts.socials
      .map((social) => social.url)
      .filter(Boolean),
  };

  return (
    <div className="flex min-h-screen flex-col" lang={locale}>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <Header
        config={publicSiteConfig}
        dictionary={dictionary}
        locale={locale}
      />
      <main className="flex-1">{children}</main>
      <Footer config={publicSiteConfig} dictionary={dictionary} locale={locale} />
    </div>
  );
}
