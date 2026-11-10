"use client";

import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import type { ReactNode } from "react";

import { companyConfig } from "@/config/company.config";
import { PhoneLink } from "@/components/forms/phone-contact";
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
  "cta-control action-button--outline group flex min-h-20 items-center gap-3 rounded-2xl border p-4 text-left";

type ContactMethodsProps = {
  copy: Dictionary["contacts"];
  onMessageClick?: () => void;
};

function MethodIcon({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--background-warm)] text-[var(--text-primary)]">
      {children}
    </span>
  );
}

export function ContactMethods({ copy, onMessageClick }: ContactMethodsProps) {
  const phoneHref = getPhoneHref();
  const whatsappHref = getWhatsAppHref();
  const mailHref = getMailHref();
  const telegramHref = getTelegramHref();

  const openMessageForm = () => {
    trackEvent("cta_click", { cta_id: "message_form" });
    if (onMessageClick) {
      onMessageClick();
      return;
    }
    window.dispatchEvent(new Event(contactMessageEvent));
  };

  return (
    <div className="layout-region">
      <div className="local-grid grid gap-3">
        {phoneHref && companyConfig.contact.displayPhone ? (
          <PhoneLink className={cardClass} href={phoneHref}>
            <MethodIcon>
              <Phone aria-hidden="true" className="size-4" />
            </MethodIcon>
            <span className="min-w-0 break-words">
              <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {copy.phone}
              </span>
              <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                {companyConfig.contact.displayPhone}
              </span>
            </span>
          </PhoneLink>
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
            <span className="min-w-0 break-words">
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
          <span className="min-w-0 break-words">
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
