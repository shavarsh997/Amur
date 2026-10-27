"use client";

import { Check, Copy, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { companyConfig } from "@/config/company.config";
import { contactPhoneEvent, isMobileContactDevice } from "@/lib/phone-contact";
import type { Dictionary } from "@/types";

/** Preserve native tel: navigation on phones and without JavaScript. */
export function PhoneLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        if (isMobileContactDevice(navigator)) return;
        event.preventDefault();
        window.dispatchEvent(new Event(contactPhoneEvent));
      }}
    >
      {children}
    </a>
  );
}

export function PhoneDetails({ copy }: { copy: Dictionary["contacts"] }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const phone = companyConfig.contact.displayPhone;
  if (!phone) return null;

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-[var(--background-warm)] text-[var(--text-primary)]">
        <Phone aria-hidden="true" className="size-6" />
      </span>
      <input
        aria-label={copy.phone}
        className="w-full min-w-0 rounded-lg bg-transparent px-2 py-2 text-center text-2xl font-semibold tabular-nums text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary)] sm:text-3xl"
        dir="ltr"
        onFocus={(event) => event.currentTarget.select()}
        readOnly
        type="text"
        value={phone}
      />
      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--button-primary)] px-5 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--button-primary)]"
        onClick={copyNumber}
        type="button"
      >
        {copyState === "copied" ? (
          <Check aria-hidden="true" className="size-4 shrink-0" />
        ) : (
          <Copy aria-hidden="true" className="size-4 shrink-0" />
        )}
        {copy.phoneCopy}
      </button>
      <p
        className="min-h-6 text-sm leading-6 text-[var(--text-secondary)]"
        role="status"
      >
        {copyState === "copied"
          ? copy.phoneCopied
          : copyState === "error"
            ? copy.phoneCopyError
            : ""}
      </p>
    </div>
  );
}
