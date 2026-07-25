import { Phone } from "lucide-react";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import {
  MobileNav,
  type NavigationItem,
} from "@/components/layout/mobile-nav";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary, Locale, SiteConfig } from "@/types";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
  config?: SiteConfig;
  transparent?: boolean;
};

export function Header({
  locale,
  dictionary,
  config = siteConfig,
  transparent = true,
}: HeaderProps) {
  const prefix = `/${locale}`;
  const navigation: NavigationItem[] = [
    { href: prefix, label: dictionary.nav.home },
    { href: `${prefix}/services`, label: dictionary.nav.services },
    { href: `${prefix}/projects`, label: dictionary.nav.projects },
    { href: `${prefix}/about`, label: dictionary.nav.about },
    { href: `${prefix}/contacts`, label: dictionary.nav.contacts },
  ];
  const cta = {
    href: `${prefix}/contacts#estimate`,
    label: dictionary.nav.consultation,
  };
  const inverted = transparent;

  return (
    <header
      className={`relative z-50 w-full ${
        transparent
          ? "absolute inset-x-0 top-0 border-b border-white/15 bg-zinc-950/10 text-white backdrop-blur-sm"
          : "border-b border-zinc-200 bg-white/95 text-zinc-950 backdrop-blur"
      }`}
    >
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Link
          className="rounded-sm text-lg font-bold uppercase tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          href={prefix}
        >
          {config.brand}
        </Link>

        <nav aria-label={dictionary.footer.navigation} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className={`rounded-sm text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
                    inverted ? "hover:text-blue-300" : "hover:text-blue-700"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {config.contacts.phoneHref ? (
            <a
              aria-label={config.contacts.phone}
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href={config.contacts.phoneHref}
            >
              <Phone aria-hidden="true" className="size-4" />
            </a>
          ) : null}
          <LanguageSwitcher
            inverted={inverted}
            label={dictionary.nav.language}
            locale={locale}
          />
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href={cta.href}
          >
            {cta.label}
          </Link>
        </div>

        <MobileNav
          closeLabel={dictionary.nav.closeMenu}
          cta={cta}
          inverted={inverted}
          items={navigation}
          languageLabel={dictionary.nav.language}
          locale={locale}
          openLabel={dictionary.nav.openMenu}
          phone={
            config.contacts.phoneHref
              ? {
                  href: config.contacts.phoneHref,
                  label: config.contacts.phone,
                }
              : undefined
          }
        />
      </Container>
    </header>
  );
}
