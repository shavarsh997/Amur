"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales } from "@/lib/i18n";
import type { Locale } from "@/types";

const languageNames = { hy: "Հայերեն", ru: "Русский", en: "English" };

function LanguageFlag({ locale }: { locale: Locale }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-6 overflow-hidden rounded-[2px] ring-1 ring-black/10"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 60 30"
    >
      {locale === "en" ? (
        <>
          <path d="M0 0h60v30H0z" fill="#012169" />
          <path d="m0 0 60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0 0v2.2L25.6 15H30ZM60 0h-4.4L30 12.8V15ZM60 30v-2.2L34.4 15H30ZM0 30h4.4L30 17.2V15Z"
            fill="#C8102E"
          />
          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </>
      ) : (
        <>
          <path d="M0 0h60v10H0z" fill={locale === "hy" ? "#D90012" : "#fff"} />
          <path
            d="M0 10h60v10H0z"
            fill={locale === "hy" ? "#0033A0" : "#0039A6"}
          />
          <path
            d="M0 20h60v10H0z"
            fill={locale === "hy" ? "#F2A800" : "#D52B1E"}
          />
        </>
      )}
    </svg>
  );
}

export function LanguageSwitcher({
  locale,
  label,
  inverted = false,
}: {
  locale: Locale;
  label: string;
  inverted?: boolean;
}) {
  const pathname = usePathname();
  function languagePath(nextLocale: Locale) {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) segments[1] = nextLocale;
    else segments.splice(1, 0, nextLocale);
    return segments.join("/") || `/${nextLocale}`;
  }

  return (
    <nav
      aria-label={label}
      className={`inline-flex shrink-0 items-center gap-1 rounded-lg border p-1 ${inverted ? "border-white/30 text-white" : "border-[var(--border)] text-[var(--text-primary)]"}`}
    >
      {locales.map((item) => (
        <Link
          aria-current={item === locale ? "page" : undefined}
          aria-label={languageNames[item]}
          className={`inline-flex size-10 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${item === locale ? (inverted ? "bg-white/20 ring-1 ring-white/50" : "bg-[var(--background-warm)] ring-1 ring-[var(--brand-copper)]") : inverted ? "hover:bg-white/10" : "hover:bg-[var(--surface-muted)]"}`}
          href={languagePath(item)}
          hrefLang={item}
          key={item}
          lang={item}
          prefetch={false}
          title={languageNames[item]}
        >
          <LanguageFlag locale={item} />
        </Link>
      ))}
    </nav>
  );
}
