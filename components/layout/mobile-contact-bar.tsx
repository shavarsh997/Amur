import { MessageCircle, Phone } from "lucide-react";
import { PhoneLink } from "@/components/forms/phone-contact";
import { WhatsAppLink } from "@/components/forms/whatsapp-link";
import { getPhoneHref, hasWhatsApp } from "@/lib/company";
import type { Dictionary } from "@/types";

/** Reserved space in the layout keeps the fixed mobile controls off the footer. */
export function MobileContactBar({ dictionary }: { dictionary: Dictionary }) {
  const phone = getPhoneHref();
  const whatsapp = hasWhatsApp();
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-on-dark)] bg-[var(--dark-secondary)] px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-[var(--text-on-dark)] shadow-[0_-8px_24px_rgb(0_0_0/0.16)] sm:hidden"
      data-mobile-contact-bar
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        {phone ? (
          <PhoneLink
            className="cta-control action-button--secondary flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-sm font-semibold"
            href={phone}
          >
            <Phone className="size-4" aria-hidden="true" />
            {dictionary.contacts.phone}
          </PhoneLink>
        ) : null}
        {whatsapp ? (
          <WhatsAppLink
            className="cta-control action-button--primary flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-sm font-semibold"
            copy={{
              whatsappMessage: dictionary.contacts.whatsappMessage,
              whatsappMessageWithPage:
                dictionary.contacts.whatsappMessageWithPage,
            }}
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {dictionary.contacts.whatsapp}
          </WhatsAppLink>
        ) : null}
        {/* <ContactTrigger
          className="min-h-12 flex-1 !px-3 !text-xs"
          label={dictionary.estimate.submit}
          size="compact"
        /> */}
      </div>
    </div>
  );
}
