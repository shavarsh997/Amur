"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { locales } from "@/lib/i18n";
import type { Locale } from "@/types";

const languageNames = {
  hy: "Հայերեն",
  ru: "Русский",
  en: "English",
  de: "Deutsch",
  fr: "Français",
} satisfies Record<Locale, string>;

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
      ) : locale === "de" ? (
        <>
          <path d="M0 0h60v10H0z" fill="#000" />
          <path d="M0 10h60v10H0z" fill="#DD0000" />
          <path d="M0 20h60v10H0z" fill="#FFCE00" />
        </>
      ) : locale === "fr" ? (
        <>
          <path d="M0 0h20v30H0z" fill="#000091" />
          <path d="M20 0h20v30H20z" fill="#fff" />
          <path d="M40 0h20v30H40z" fill="#E1000F" />
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
  placement = "bottom",
}: {
  locale: Locale;
  label: string;
  inverted?: boolean;
  placement?: "top" | "bottom";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOutside(event: Event) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
    };
  }, [open]);

  function languagePath(nextLocale: Locale) {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) segments[1] = nextLocale;
    else segments.splice(1, 0, nextLocale);
    return segments.join("/") || `/${nextLocale}`;
  }

  return (
    <div
      className="relative shrink-0"
      ref={rootRef}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={`${label}: ${languageNames[locale]}`}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-copper)] ${inverted ? "border-white/30 text-white hover:bg-white/10" : "border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"}`}
        onClick={() => setOpen((value) => !value)}
        ref={buttonRef}
        title={label}
        type="button"
      >
        <LanguageFlag locale={locale} />
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <nav
        aria-label={label}
        className={`absolute right-0 z-10 w-44 rounded-xl border border-[var(--border)] bg-white p-1.5 text-[var(--text-primary)] shadow-lg ${placement === "top" ? "bottom-full mb-2" : "top-full mt-2"}`}
        hidden={!open}
        id={panelId}
      >
        <ul className="space-y-1">
          {locales.map((item) => (
            <li key={item}>
              <Link
                aria-current={item === locale ? "page" : undefined}
                aria-label={languageNames[item]}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-[var(--brand-copper)] ${item === locale ? "bg-[var(--background-warm)]" : ""}`}
                href={languagePath(item)}
                hrefLang={item}
                lang={item}
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                prefetch={false}
              >
                <LanguageFlag locale={item} />
                <span>{languageNames[item]}</span>
                {item === locale ? (
                  <Check
                    aria-hidden="true"
                    className="ml-auto size-4 text-[var(--brand-copper)]"
                  />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
