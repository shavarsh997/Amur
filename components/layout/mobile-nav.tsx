"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ContactTrigger } from "@/components/forms/contact-dialog";
import type { Locale } from "@/types";

export type NavigationItem = {
  href: string;
  label: string;
  isContact?: boolean;
};

type MobileNavProps = {
  locale: Locale;
  languageLabel: string;
  items: readonly NavigationItem[];
  services: readonly NavigationItem[];
  servicesLabel: string;
  cta: Pick<NavigationItem, "label">;
  openLabel: string;
  closeLabel: string;
};

export function MobileNav({
  locale,
  languageLabel,
  items,
  services,
  servicesLabel,
  cta,
  openLabel,
  closeLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1280px)");
    function closeOnDesktop() {
      if (desktop.matches) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const controls = Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex="0"]'
          ) ?? []
        ).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
    };
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
        className={`navigation-toggle cta-control action-button--outline grid size-11 place-items-center rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)] ${"border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"}`}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {open ? (
        <div
          className="mobile-navigation"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={openLabel}
          id={panelId}
        >
          <div className="mobile-navigation__top">
            <span aria-hidden="true">SHINEX</span>
            <button
              className="navigation-toggle cta-control action-button--outline"
              type="button"
              aria-label={closeLabel}
              onClick={() => {
                closeMenu();
                toggleRef.current?.focus();
              }}
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="mobile-navigation__body">
            <nav className="mobile-navigation__primary" aria-label={openLabel}>
              <ul className="space-y-1">
                {items.map((item, index) => (
                  <li key={item.href}>
                    {item.isContact ? (
                      <ContactTrigger
                        className="block w-full rounded-xl px-4 py-3 text-left font-medium hover:bg-[var(--surface-muted)]"
                        label={item.label}
                        onClick={closeMenu}
                        variant="link"
                      />
                    ) : (
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        className="block rounded-xl px-4 py-3 font-medium hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-[var(--button-primary)]"
                        href={item.href}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 border-t border-[var(--border)] pt-4">
              <p className="px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {servicesLabel}
              </p>
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-[var(--button-primary)]"
                      href={service.href}
                      onClick={closeMenu}
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4">
              <ContactTrigger
                className="w-full"
                label={cta.label}
                onClick={closeMenu}
              />
              <LanguageSwitcher
                label={languageLabel}
                locale={locale}
                placement="top"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
