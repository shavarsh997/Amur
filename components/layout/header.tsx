import Link from "next/link";

import { navigationConfig } from "@/config/navigation.config";
import { getActiveServices } from "@/config/services.config";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNav, type NavigationItem } from "@/components/layout/mobile-nav";
import { ContactTrigger } from "@/components/forms/contact-dialog";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import type { Dictionary, Locale } from "@/types";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Header({ locale, dictionary }: HeaderProps) {
  const prefix = `/${locale}`;
  const navigation: NavigationItem[] = navigationConfig.map((item) => ({
    href: item.path ? `${prefix}/${item.path}` : prefix,
    label: dictionary.nav[item.key],
  }));
  const services: NavigationItem[] = getActiveServices(locale).map(
    ({ content, slug }) => ({
      href: `${prefix}/services/${slug}`,
      label: content.title,
    })
  );
  const cta = {
    label: dictionary.nav.consultation,
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--brand-background)] px-4 text-[var(--text-primary)] sm:px-8">
      <Container className="relative flex min-h-16 items-center justify-between gap-3 !px-0 sm:min-h-[72px] lg:!px-2">
        <Link
          aria-label="SHINEX"
          className="inline-flex shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-copper)]"
          href={prefix}
        >
          <BrandMark className=" h-9 w-auto" preload />
        </Link>

        <nav
          aria-label={dictionary.footer.navigation}
          className="hidden xl:block"
        >
          <ul className="flex items-center gap-4 xl:gap-5">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className={`rounded-sm text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-copper)] ${"hover:text-[var(--brand-copper)]"}`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher
            inverted={false}
            label={dictionary.nav.language}
            locale={locale}
          />
          <ContactTrigger
            className="min-h-10 rounded-lg px-4"
            label={cta.label}
          />
        </div>

        <MobileNav
          closeLabel={dictionary.nav.closeMenu}
          cta={cta}
          items={navigation}
          languageLabel={dictionary.nav.language}
          locale={locale}
          openLabel={dictionary.nav.openMenu}
          services={services}
          servicesLabel={dictionary.footer.services}
        />
      </Container>
    </header>
  );
}
