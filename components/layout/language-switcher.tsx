"use client";

import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ChangeEvent } from "react";

import { locales } from "@/lib/i18n";
import type { Locale } from "@/types";

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
  const router = useRouter();

  function changeLocale(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    const segments = pathname.split("/");

    if (locales.includes(segments[1] as Locale)) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    router.push(segments.join("/") || `/${nextLocale}`);
  }

  return (
    <label
      className={`inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--button-primary)] ${
        inverted
          ? "border-white/30 text-white"
          : "border-[var(--border)] text-[var(--text-primary)]"
      }`}
    >
      <Languages aria-hidden="true" className="size-4" />
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="cursor-pointer appearance-none bg-transparent pr-1 uppercase outline-none"
        onChange={changeLocale}
        value={locale}
      >
        {locales.map((item) => (
          <option
            className="text-[var(--text-primary)]"
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
