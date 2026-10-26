/** Only published route identifiers and bounded channel enums may leave the browser.
 * Never retain query strings, referrer URLs, campaign names or click identifiers.
 */
export const publicPagePaths = [
  "",
  "services",
  "about",
  "contacts",
  "calculator",
  "privacy",
  "prices",
  "renovation-estimate-yerevan",
  "services/renovation",
  "services/house-construction",
  "services/interior-design",
  "services/commercial-construction",
  "services/design",
  "services/monolithic-work",
  "services/facade-and-roofing",
  "services/apartment-renovation-yerevan",
  "services/new-build-renovation",
  "services/turnkey-renovation",
  "services/apartment-interior-design-yerevan",
  "services/office-renovation-yerevan",
  "services/capital-renovation-yerevan",
  "services/cosmetic-renovation-yerevan",
  "services/plumbing-work-yerevan",
  "services/electrical-work-yerevan",
] as const;
const languages = new Set(["hy", "ru", "en", "de", "fr"]);
const paths = new Set<string>(publicPagePaths);
const sources = [
  "google",
  "bing",
  "yandex",
  "facebook",
  "instagram",
  "newsletter",
  "direct",
  "external",
  "campaign",
] as const;
const mediums = [
  "organic",
  "cpc",
  "social",
  "email",
  "referral",
  "none",
  "campaign",
] as const;

export function publicPagePath(path: unknown): string | undefined {
  if (typeof path !== "string") return;
  const [, locale, ...rest] = path.split("/");
  if (
    path.startsWith("/") &&
    languages.has(locale) &&
    paths.has(rest.join("/"))
  )
    return path;
}

export type LeadAttribution = {
  landing_page: string;
  source: (typeof sources)[number];
  medium: (typeof mediums)[number];
};

export function parseLeadAttribution(
  value: unknown
): LeadAttribution | undefined {
  if (!value || typeof value !== "object") return;
  const item = value as Partial<LeadAttribution>;
  if (
    !publicPagePath(item.landing_page) ||
    !sources.includes(item.source!) ||
    !mediums.includes(item.medium!)
  )
    return;
  return {
    landing_page: item.landing_page!,
    source: item.source!,
    medium: item.medium!,
  };
}

export function inferLeadAttribution(
  href: string,
  referrer: string
): LeadAttribution | undefined {
  const url = new URL(href);
  const landing = publicPagePath(url.pathname);
  if (!landing) return;
  let source: LeadAttribution["source"] = "direct";
  let medium: LeadAttribution["medium"] = "none";
  const campaignSource = url.searchParams.get("utm_source")?.toLowerCase();
  const campaignMedium = url.searchParams.get("utm_medium")?.toLowerCase();
  if (url.searchParams.has("gclid")) {
    source = "google";
    medium = "cpc";
  } else if (campaignSource || campaignMedium) {
    source = sources.find((value) => value === campaignSource) ?? "campaign";
    medium = mediums.find((value) => value === campaignMedium) ?? "campaign";
  } else if (referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      if (![url.hostname, "shinex.am", "www.shinex.am"].includes(host)) {
        source = /(^|\.)google\.(com|am|ru|fr|de|co\.uk)$/.test(host)
          ? "google"
          : /(^|\.)bing\.com$/.test(host)
            ? "bing"
            : /(^|\.)yandex\.(ru|com|am)$/.test(host)
              ? "yandex"
              : /(^|\.)(facebook\.com|fb\.com)$/.test(host)
                ? "facebook"
                : /(^|\.)instagram\.com$/.test(host)
                  ? "instagram"
                  : "external";
        medium = ["google", "bing", "yandex"].includes(source)
          ? "organic"
          : ["facebook", "instagram"].includes(source)
            ? "social"
            : "referral";
      }
    } catch {
      /* Invalid referrers are ignored. */
    }
  }
  return { landing_page: landing, source, medium };
}

const storageKey = "shinex-attribution-v1";
const sessionDuration = 30 * 60 * 1000;

/** First touch in a 30-minute session. Storage failure must never block a lead. */
export function getLeadAttribution(): LeadAttribution | undefined {
  if (typeof window === "undefined") return;
  const now = Date.now();
  let attribution: LeadAttribution | undefined;
  try {
    const saved = JSON.parse(
      window.sessionStorage.getItem(storageKey) ?? "null"
    );
    if (
      saved &&
      Number.isFinite(saved.lastSeen) &&
      now >= saved.lastSeen &&
      now - saved.lastSeen < sessionDuration
    )
      attribution = parseLeadAttribution(saved.attribution);
  } catch {
    /* Storage can be blocked or contain obsolete values. */
  }
  attribution ??= inferLeadAttribution(window.location.href, document.referrer);
  if (attribution) {
    try {
      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify({ attribution, lastSeen: now })
      );
    } catch {
      /* Attribution remains available for this submission. */
    }
  }
  return attribution;
}
