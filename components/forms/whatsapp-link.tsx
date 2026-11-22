"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { getWhatsAppHref, getWhatsAppMessage } from "@/lib/company";
import type { Dictionary } from "@/types";

export type WhatsAppMessageCopy = Pick<
  Dictionary["contacts"],
  "whatsappMessage" | "whatsappMessageWithPage"
>;

/** wa.me link with a prefilled message naming the current page (pathname only). */
export function WhatsAppLink({
  copy,
  className,
  children,
}: {
  copy: WhatsAppMessageCopy;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const href = getWhatsAppHref(getWhatsAppMessage(copy, pathname));
  if (!href) return null;

  return (
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}
