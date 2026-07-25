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
  inverted?: boolean;
};

export function MobileNav({
  locale,
  languageLabel,
  items,
  cta,
  phone,
  openLabel,
  closeLabel,
  inverted = false,
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
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? closeLabel : openLabel}
        className={`grid size-11 place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
          inverted
            ? "border-white/30 text-white hover:bg-white/10"
            : "border-zinc-300 text-zinc-950 hover:bg-zinc-100"
        }`}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {open ? (
        <div
          className="absolute inset-x-0 top-full border-y border-zinc-200 bg-white p-5 text-zinc-950 shadow-2xl"
          id={panelId}
        >
          <nav aria-label={openLabel}>
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    className="block rounded-xl px-4 py-3 font-medium hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-blue-600"
                    href={item.href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-5">
            <Link
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href={cta.href}
              onClick={closeMenu}
            >
              {cta.label}
            </Link>
            {phone ? (
              <a
                aria-label={phone.label}
                className="grid size-11 place-items-center rounded-full border border-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
