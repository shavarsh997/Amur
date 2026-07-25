"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/types";

export type NavigationItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  locale: Locale;
  languageLabel: string;
  items: readonly NavigationItem[];
  cta: NavigationItem;
  phone?: {
    href: string;
    label: string;
  };
  openLabel: string;
  closeLabel: string;
};

export function MobileNav({
  locale,
  languageLabel,
  items,
  cta,
  phone,
  openLabel,
  closeLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? closeLabel : openLabel}
        className={`grid size-11 place-items-center rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)] ${
          "border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
        }`}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {open ? (
        <div
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-y border-[var(--border)] bg-white p-4 text-[var(--text-primary)] shadow-[0_18px_38px_-30px_rgb(24_24_27/0.55)] sm:px-8"
          id={panelId}
        >
          <nav aria-label={openLabel}>
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    className="block rounded-xl px-4 py-3 font-medium hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-[var(--button-primary)]"
                    href={item.href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4">
            <Link
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[var(--button-primary)] px-5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
              href={cta.href}
              onClick={closeMenu}
            >
              {cta.label}
            </Link>
            {phone ? (
              <a
                aria-label={phone.label}
                className="grid size-11 place-items-center rounded-xl border border-[var(--border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                href={phone.href}
              >
                <Phone aria-hidden="true" className="size-4" />
              </a>
            ) : null}
            <LanguageSwitcher label={languageLabel} locale={locale} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
