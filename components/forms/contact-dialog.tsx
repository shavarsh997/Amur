"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Mail, MessageCircle, Phone, Send, X } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import type { Dictionary, Locale } from "@/types";
import type { ContactConfigData } from "@/types/config";

const contactOpenEvent = "open-project-contact";

export function ContactTrigger({
  label,
  className = "",
  onClick,
  variant = "primary",
}: {
  label: string;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "link" | "secondary";
}) {
  const variants = {
    primary:
      "inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--button-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--button-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)]",
    link: "inline-flex items-center rounded-sm text-sm font-medium transition-colors hover:text-[var(--text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)]",
    secondary:
      "inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)]",
  };

  return (
    <button
      aria-haspopup="dialog"
      className={`${variants[variant]} ${className}`}
      onClick={() => {
        onClick?.();
        window.dispatchEvent(new Event(contactOpenEvent));
      }}
      type="button"
    >
      {variant === "primary" ? (
        <MessageCircle aria-hidden="true" className="mr-2 size-4" />
      ) : null}
      {label}
    </button>
  );
}

/** Rendered once at the locale-layout level so it always sits above the header. */
export function ContactDialog({
  dictionary,
  locale,
  contacts,
}: {
  dictionary: Dictionary;
  locale: Locale;
  contacts: ContactConfigData;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const copy = dictionary.contacts;

  useEffect(() => {
    const openContact = () => setIsOpen(true);
    window.addEventListener(contactOpenEvent, openContact);

    return () => window.removeEventListener(contactOpenEvent, openContact);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      aria-labelledby="contact-dialog-title"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-5"
      role="dialog"
    >
      <button
        aria-label={dictionary.nav.closeMenu}
        className="absolute inset-0 cursor-default bg-[rgb(24_33_42/0.52)] backdrop-blur-[2px]"
        onClick={() => setIsOpen(false)}
        type="button"
      />
      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] bg-[var(--background-soft)] shadow-2xl outline-none sm:rounded-[28px]"
        tabIndex={-1}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
              {copy.eyebrow}
            </p>
            <h2
              className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]"
              id="contact-dialog-title"
            >
              {copy.formTitle}
            </h2>
          </div>
          <button
            aria-label={dictionary.nav.closeMenu}
            className="grid size-10 place-items-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-7">
          {contacts.phoneHref ||
          contacts.email ||
          contacts.whatsappUrl ||
          contacts.telegramUrl ||
          contacts.socials.some((social) => social.url) ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {contacts.phoneHref ? (
                <a
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-[0_14px_30px_-26px_rgb(24_24_27/0.55)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_18px_36px_-26px_rgb(24_24_27/0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                  href={contacts.phoneHref}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--background-warm)] text-[var(--text-primary)]">
                    <Phone aria-hidden="true" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      {copy.phone}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                      {contacts.phone}
                    </span>
                  </span>
                </a>
              ) : null}
              {contacts.email ? (
                <a
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-[0_14px_30px_-26px_rgb(24_24_27/0.55)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_18px_36px_-26px_rgb(24_24_27/0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                  href={`mailto:${contacts.email}`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--background-warm)] text-[var(--text-primary)]">
                    <Mail aria-hidden="true" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      {copy.email}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                      {contacts.email}
                    </span>
                  </span>
                </a>
              ) : null}
              {contacts.whatsappUrl ? (
                <a
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-[0_14px_30px_-26px_rgb(24_24_27/0.55)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_18px_36px_-26px_rgb(24_24_27/0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                  href={contacts.whatsappUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--background-warm)] text-[var(--text-primary)]">
                    <MessageCircle aria-hidden="true" className="size-4" />
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {copy.whatsapp}
                  </span>
                </a>
              ) : null}
              {contacts.telegramUrl ? (
                <a
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-[0_14px_30px_-26px_rgb(24_24_27/0.55)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_18px_36px_-26px_rgb(24_24_27/0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                  href={contacts.telegramUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--background-warm)] text-[var(--text-primary)]">
                    <Send aria-hidden="true" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      {copy.telegram}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                      {contacts.telegramUrl.replace("https://t.me/", "@")}
                    </span>
                  </span>
                </a>
              ) : null}
              {contacts.socials
                .filter((social) => social.url)
                .map((social) => (
                  <a
                    className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-[0_14px_30px_-26px_rgb(24_24_27/0.55)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_18px_36px_-26px_rgb(24_24_27/0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                    href={social.url}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--background-warm)] text-[var(--text-primary)]">
                      <Camera aria-hidden="true" className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                        Instagram
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                        {social.label.replace("Instagram · ", "")}
                      </span>
                    </span>
                  </a>
                ))}
            </div>
          ) : null}
          {/* <LeadForm className="mt-6" dictionary={dictionary} locale={locale} /> */}
        </div>
      </div>
    </div>
  );
}
