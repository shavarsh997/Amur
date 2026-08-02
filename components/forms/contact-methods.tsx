"use client";

import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import type { ReactNode } from "react";

import { companyConfig } from "@/config/company.config";
import {
  getMailHref,
  getPhoneHref,
  getTelegramHref,
  getWhatsAppHref,
} from "@/lib/company";
import { trackEvent } from "@/lib/analytics";
import type { Dictionary } from "@/types";

export const contactMessageEvent = "open-project-message";

const cardClass =
  "group flex min-h-24 items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-[0_14px_30px_-26px_rgb(24_24_27/0.55)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_18px_36px_-26px_rgb(24_24_27/0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)]";

type ContactMethodsProps = {
  dictionary: Dictionary;
  onMessageClick?: () => void;
};

function MethodIcon({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--background-warm)] text-[var(--text-primary)]">
      {children}
    </span>
  );
}

export function ContactMethods({
  dictionary,
  onMessageClick,
}: ContactMethodsProps) {
  const copy = dictionary.contacts;
  const phoneHref = getPhoneHref();
  const whatsappHref = getWhatsAppHref();
  const mailHref = getMailHref();
  const telegramHref = getTelegramHref();

  const openMessageForm = () => {
    trackEvent("cta_click", { cta_label: copy.formTitle });
    if (onMessageClick) {
      onMessageClick();
      return;
    }
    window.dispatchEvent(new Event(contactMessageEvent));
  };

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {phoneHref && companyConfig.contact.displayPhone ? (
          <a className={cardClass} href={phoneHref}>
            <MethodIcon>
              <Phone aria-hidden="true" className="size-4" />
            </MethodIcon>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {copy.phone}
              </span>
              <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                {companyConfig.contact.displayPhone}
              </span>
            </span>
          </a>
        ) : null}
        {whatsappHref ? (
          <a
            className={cardClass}
            href={whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            <MethodIcon>
              <MessageCircle aria-hidden="true" className="size-4" />
            </MethodIcon>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {copy.whatsapp}
            </span>
          </a>
        ) : null}
        {mailHref && companyConfig.contact.email ? (
          <a className={cardClass} href={mailHref}>
            <MethodIcon>
              <Mail aria-hidden="true" className="size-4" />
            </MethodIcon>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {copy.email}
              </span>
              <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                {companyConfig.contact.email}
              </span>
            </span>
          </a>
        ) : null}
        <button className={cardClass} onClick={openMessageForm} type="button">
          <MethodIcon>
            <Send aria-hidden="true" className="size-4" />
          </MethodIcon>
          <span>
            <span className="block text-sm font-semibold text-[var(--text-primary)]">
              {copy.formTitle}
            </span>
            <span className="mt-1 block text-xs text-[var(--text-secondary)]">
              {copy.formDescription}
            </span>
          </span>
        </button>
      </div>
      {telegramHref ? (
        <a
          className={`${cardClass} mt-3 w-full`}
          href={telegramHref}
          rel="noreferrer"
          target="_blank"
        >
          <MethodIcon>
            <MessageCircle aria-hidden="true" className="size-4" />
          </MethodIcon>
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {copy.telegram}
          </span>
        </a>
      ) : null}
    </div>
  );
}
