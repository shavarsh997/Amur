import type { SiteConfig } from "@/types";

/**
 * Replace every TODO_REPLACE value before launch.
 * Empty link targets are intentional: UI code can hide links with a falsy URL.
 */
export const siteConfig = {
  // TODO_REPLACE: set the production domain before launch.
  siteUrl: "https://example.com",
  brand: "AMUR Construction",
  contacts: {
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
  },
} as const satisfies SiteConfig;
