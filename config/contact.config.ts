import type { ContactConfigData } from "@/types/config";

/** Empty URLs intentionally hide unavailable contact channels in the interface. */
export const contactConfig = {
  phone: "+37455156615",
  phoneHref: "tel:+37455156615",
  email: "info@shinex.am",
  address: "TODO_REPLACE_ADDRESS",
  hours: "TODO_REPLACE_HOURS",
  telegramUrl: "https://t.me/Shavarsh_work",
  whatsappUrl: "",
  socials: [
    {
      label: "Instagram · @shinex_dev",
      url: "https://www.instagram.com/shinex_dev?igsh=MXZzcTR0ZXB4Z2t0cQ==",
    },
    { label: "Facebook", url: "" },
    { label: "LinkedIn", url: "" },
  ],
} as const satisfies ContactConfigData;
