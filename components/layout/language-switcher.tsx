"use client";

import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales } from "@/lib/i18n";
import type { Locale } from "@/types";

const languageNames = { hy: "Հայերեն", ru: "Русский", en: "English" };

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
      className={`inline-flex min-h-10 shrink-0 items-center gap-1 rounded-lg border px-2 text-xs font-semibold ${inverted ? "border-white/30 text-white" : "border-[var(--border)] text-[var(--text-primary)]"}`}
    >
      <Languages aria-hidden="true" className="size-4" />
      {locales.map((item) => (
        <Link
          aria-current={item === locale ? "page" : undefined}
          aria-label={languageNames[item]}
          className={`inline-flex min-h-10 min-w-9 items-center justify-center rounded px-1 uppercase focus-visible:outline-2 focus-visible:outline-offset-2 ${item === locale ? "underline decoration-2 underline-offset-4" : "opacity-70 hover:opacity-100"}`}
          href={languagePath(item)}
          hrefLang={item}
          key={item}
          lang={item}
          prefetch={false}
        >
          {item}
        </Link>
      ))}
    </nav>
  );
}
