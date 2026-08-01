import { companyConfig } from "@/config/company.config";

const canonicalOrigin = "https://www.shinex.am";

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
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configured) return companyConfig.website.origin;
  try {
    const url = new URL(configured);
    return url.origin === canonicalOrigin
      ? url.origin
      : companyConfig.website.origin;
  } catch {
    return companyConfig.website.origin;
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

export function getMailHref(): string | null {
  return companyConfig.contact.email
    ? `mailto:${companyConfig.contact.email}`
    : null;
}

export function getSocialLinks() {
  return Object.entries(companyConfig.social as Record<string, string | null>)
    .filter((entry): entry is [string, string] => isValidExternalUrl(entry[1]))
    .map(([name, url]) => ({ name, url }));
}

export { isValidExternalUrl };
