import type { ContactConfigData } from "@/types/config";

/** Empty URLs intentionally hide unavailable contact channels in the interface. */
export const contactConfig = {
  phone: "TODO_REPLACE_PHONE",
  phoneHref: "",
  email: "TODO_REPLACE_EMAIL",
  address: "TODO_REPLACE_ADDRESS",
  hours: "TODO_REPLACE_HOURS",
  telegramUrl: "",
  whatsappUrl: "",
  socials: [
    { label: "Instagram", url: "" },
    { label: "Facebook", url: "" },
    { label: "LinkedIn", url: "" },
  ],
} as const satisfies ContactConfigData;
