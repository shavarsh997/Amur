import { companyConfig } from "@/config/company.config";
import { CANONICAL_SITE_URL, SITE_URL } from "@/lib/site-url";

function isValidExternalUrl(value: string | null): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function getSiteOrigin(): string {
  try {
    const url = new URL(SITE_URL);
    return url.origin === CANONICAL_SITE_URL ? url.origin : CANONICAL_SITE_URL;
  } catch {
    return CANONICAL_SITE_URL;
  }
}

export function getAbsoluteUrl(pathname = "/"): string {
  return new URL(pathname, `${getSiteOrigin()}/`).toString();
}

export function getPhoneHref(): string | null {
  return companyConfig.contact.phone
    ? `tel:${companyConfig.contact.phone.replace(/[^+\d]/g, "")}`
    : null;
}

export function getWhatsAppHref(): string | null {
  const phone = companyConfig.contact.whatsapp?.replace(/\D/g, "");
  return phone ? `https://wa.me/${phone}` : null;
}

export function getTelegramHref(): string | null {
  return isValidExternalUrl(companyConfig.contact.telegram)
    ? companyConfig.contact.telegram
    : null;
}

export function getMailHref(): string | null {
  return companyConfig.contact.email
    ? `mailto:${companyConfig.contact.email}`
    : null;
}

export function getGoogleMapsHref(): string | null {
  const geo = companyConfig.contact.geo;
  if (!geo) return null;

  const query = encodeURIComponent(`${geo.latitude},${geo.longitude}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getSocialLinks() {
  return Object.entries(companyConfig.social as Record<string, string | null>)
    .filter((entry): entry is [string, string] => isValidExternalUrl(entry[1]))
    .map(([name, url]) => ({ name, url }));
}

export { isValidExternalUrl };
