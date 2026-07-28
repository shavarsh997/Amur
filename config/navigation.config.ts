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
