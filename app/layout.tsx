import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Sans_Armenian } from "next/font/google";

import { seoConfig } from "@/config/seo.config";
import { siteConfig } from "@/config/site.config";
import { defaultLocale } from "@/lib/i18n";

import "./globals.css";

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
    template: `%s — ${siteConfig.companyName}`,
  },
  applicationName: siteConfig.companyName,
  category: seoConfig.category,
  robots: seoConfig.robots,
};

export const viewport: Viewport = {
  themeColor: "#fcfaf8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} className={`${manrope.variable} ${notoArmenian.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
