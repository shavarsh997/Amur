import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, Noto_Sans_Armenian } from "next/font/google";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { ContactDialog } from "@/components/forms/contact-dialog";
import { seoConfig } from "@/config/seo.config";
import { isPlaceholder, siteConfig } from "@/config/site.config";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import type { SiteConfiguration } from "@/types/config";

import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

const notoArmenian = Noto_Sans_Armenian({
  variable: "--font-armenian",
  subsets: ["armenian"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.companyName,
    template: `%s${seoConfig.titleSeparator}${siteConfig.companyName}`,
  },
  applicationName: siteConfig.companyName,
  category: seoConfig.category,
  robots: seoConfig.robots,
};

export const viewport: Viewport = {
  themeColor: "#fcfaf8",
  colorScheme: "light",
};

const publicSiteConfig = {
  ...siteConfig,
  contacts: {
    ...siteConfig.contacts,
    phone: isPlaceholder(siteConfig.contacts.phone)
      ? ""
      : siteConfig.contacts.phone,
    email: isPlaceholder(siteConfig.contacts.email)
      ? ""
      : siteConfig.contacts.email,
    address: isPlaceholder(siteConfig.contacts.address)
      ? ""
      : siteConfig.contacts.address,
    hours: isPlaceholder(siteConfig.contacts.hours)
      ? ""
      : siteConfig.contacts.hours,
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
    url: siteConfig.domain,
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
    <html
      className={`${manrope.variable} ${notoArmenian.variable} h-full antialiased`}
      lang={locale}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <div className="flex min-h-screen flex-col">
          <script
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd).replace(
                /</g,
                "\\u003c"
              ),
            }}
            type="application/ld+json"
          />
          <Header
            config={publicSiteConfig}
            dictionary={dictionary}
            locale={locale}
          />
          <main className="flex-1 pb-20 sm:pb-0">{children}</main>
          <Footer
            config={publicSiteConfig}
            dictionary={dictionary}
            locale={locale}
          />
          <ContactDialog
            contacts={publicSiteConfig.contacts}
            dictionary={dictionary}
            locale={locale}
          />
          <MobileCtaBar contactLabel={dictionary.nav.contacts} />
        </div>
      </body>
    </html>
  );
}
