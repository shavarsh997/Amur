import {
  getSeoLandingPage,
  getSeoLandingPath,
} from "@/config/seo-landing-pages.config";
import { getActiveServices } from "@/config/services.config";
import type { Locale } from "@/types";
import type { NavigationKey } from "@/types/config";

export const navigationConfig = [
  { key: "home", path: "" },
  { key: "services", path: "services" },
  { key: "about", path: "about" },
  { key: "contacts", path: "contacts" },
] as const satisfies readonly {
  key: Exclude<NavigationKey, "privacy">;
  path: string;
}[];

export const staticRouteConfig = [
  "",
  "services",
  "about",
  "contacts",
  "calculator",
  "privacy",
] as const;

/** Keep the apartment landing visible alongside the separate house service. */
export function getServiceNavigation(locale: Locale) {
  const apartment = getSeoLandingPage(locale, "apartment-renovation-yerevan");
  return [
    ...(apartment
      ? [{ path: getSeoLandingPath(apartment), label: apartment.content.title }]
      : []),
    ...getActiveServices(locale).map(({ content, slug }) => ({
      path: `services/${slug}`,
      label: content.title,
    })),
  ];
}
