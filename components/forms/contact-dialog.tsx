"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MessageCircle, X } from "lucide-react";

import {
  ContactMethods,
  contactMessageEvent,
} from "@/components/forms/contact-methods";
import { LeadForm } from "@/components/forms/lead-form";
import { trackEvent } from "@/lib/analytics";
import type { Dictionary, Locale } from "@/types";

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
        trackEvent("cta_click", { cta_label: label });
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
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [view, setView] = useState<"methods" | "form">("methods");
  const dialogRef = useRef<HTMLDivElement>(null);
  const copy = dictionary.contacts;

  const closeDialog = () => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const reducesMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile && !reducesMotion) {
      setIsClosing(true);
      return;
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const openContact = () => {
      setIsClosing(false);
      setView("methods");
      setIsOpen(true);
    };
    const openMessage = () => {
      setIsClosing(false);
      setView("form");
      setIsOpen(true);
    };
    window.addEventListener(contactOpenEvent, openContact);
    window.addEventListener(contactMessageEvent, openMessage);

    return () => {
      window.removeEventListener(contactOpenEvent, openContact);
      window.removeEventListener(contactMessageEvent, openMessage);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialog();
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
        onClick={closeDialog}
        type="button"
      />
      <div
        ref={dialogRef}
        className={`relative z-10 flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] bg-[var(--background-soft)] shadow-2xl outline-none sm:rounded-[28px] ${
          isClosing
            ? "motion-safe:animate-[contact-dialog-exit_240ms_ease-in_forwards] sm:motion-safe:animate-none"
            : "motion-safe:animate-[contact-dialog-enter_320ms_cubic-bezier(0.22,1,0.36,1)] sm:motion-safe:animate-none"
        }`}
        onAnimationEnd={(event) => {
          if (isClosing && event.animationName === "contact-dialog-exit") {
            setIsClosing(false);
            setIsOpen(false);
          }
        }}
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
              {view === "methods" ? copy.methodsTitle : copy.formTitle}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {view === "form" ? (
              <button
                className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
                onClick={() => setView("methods")}
                type="button"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                {dictionary.common.back}
              </button>
            ) : null}
            <button
              aria-label={dictionary.nav.closeMenu}
              className="grid size-10 place-items-center rounded-xl border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]"
              onClick={closeDialog}
              type="button"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto p-5 sm:p-7">
          {view === "methods" ? (
            <>
              <p className="mb-5 leading-7 text-[var(--text-secondary)]">
                {copy.methodsDescription}
              </p>
              <ContactMethods
                dictionary={dictionary}
                onMessageClick={() => setView("form")}
              />
            </>
          ) : (
            <LeadForm dictionary={dictionary} locale={locale} />
          )}
        </div>
      </div>
    </div>
  );
}
