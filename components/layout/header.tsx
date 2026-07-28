import { Phone } from "lucide-react";
import Link from "next/link";

import { navigationConfig } from "@/config/navigation.config";
import { siteConfig } from "@/config/site.config";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import {
  MobileNav,
  type NavigationItem,
} from "@/components/layout/mobile-nav";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import type { Dictionary, Locale } from "@/types";
import type { SiteConfiguration } from "@/types/config";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
  config?: SiteConfiguration;
};

export function Header({
  locale,
  dictionary,
  config = siteConfig,
}: HeaderProps) {
  const prefix = `/${locale}`;
  const navigation: NavigationItem[] = navigationConfig.map((item) => ({
    href: item.path ? `${prefix}/${item.path}` : prefix,
    label: dictionary.nav[item.key],
  }));
  const cta = {
    href: `${prefix}/contacts#estimate`,
    label: dictionary.nav.consultation,
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-white/90 px-5 text-[var(--text-primary)] backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:pt-3">
      <Container className="relative flex min-h-15 items-center justify-between gap-4 !px-0 sm:min-h-[68px] sm:rounded-[22px] sm:border sm:border-[var(--border)] sm:bg-white/75 sm:!px-8 sm:shadow-[0_16px_36px_-28px_rgb(24_24_27/0.48)] lg:!px-10">
        <Link
          className="inline-flex shrink-0 items-center gap-2.5 rounded-sm text-sm font-bold tracking-[0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)] sm:text-[15px]"
          href={prefix}
        >
          <BrandMark className="h-7 w-auto sm:h-8" preload />
          {config.shortCompanyName}
        </Link>

        <nav aria-label={dictionary.footer.navigation} className="hidden xl:block">
          <ul className="flex items-center gap-5 xl:gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className={`rounded-sm text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)] ${
                    "hover:text-[var(--text-secondary)]"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          {config.contacts.phoneHref ? (
            <a
              aria-label={config.contacts.phone}
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
              href={config.contacts.phoneHref}
            >
              <Phone aria-hidden="true" className="size-4" />
            </a>
          ) : null}
          <LanguageSwitcher
            inverted={false}
            label={dictionary.nav.language}
            locale={locale}
          />
          <Link
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[var(--button-primary)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--button-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
            href={cta.href}
          >
            {cta.label}
          </Link>
        </div>

        <MobileNav
          closeLabel={dictionary.nav.closeMenu}
          cta={cta}
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
