import { getLeadAttribution, publicPagePath } from "@/lib/lead-attribution";
import { CANONICAL_SITE_URL } from "@/lib/site-url";

export type AnalyticsEventName =
  | "page_view"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "instagram_click"
  | "facebook_click"
  | "form_start"
  | "form_submit"
  | "generate_lead"
  | "form_error"
  | "calculator_start"
  | "calculator_complete"
  | "service_view"
  | "project_view"
  | "gallery_open"
  | "cta_click";

type AnalyticsParams = {
  form?: "lead" | "calculator";
  calculation_type?: "renovation" | "construction" | "design";
  cta_id?: "contact_methods" | "message_form" | "contact_page";
  error_type?: "validation" | "delivery";
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      event: AnalyticsEventName | "web_vital",
      params: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}

/** The only URL parameters GA4/Google Ads may receive, and only on the landing hit. */
export const gaCampaignParams = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;
/* Click IDs are opaque tokens; utm values may not contain "@", "+", spaces or
 * other characters typical for e-mails, phone numbers or names. */
const clickIdValue = /^[A-Za-z0-9_-]{1,512}$/;
const utmValue = /^[A-Za-z0-9._-]{1,100}$/;

/** Allowlisted campaign query ("?gclid=...") or "" — every other parameter is dropped. */
export function gaCampaignQuery(href: string): string {
  try {
    const params = new URL(href).searchParams;
    const safe = new URLSearchParams();
    for (const key of gaCampaignParams) {
      const value = params.get(key);
      if (
        value &&
        (key.startsWith("utm_") ? utmValue : clickIdValue).test(value)
      )
        safe.set(key, value);
    }
    const query = safe.toString();
    return query ? `?${query}` : "";
  } catch {
    return "";
  }
}

/** Origin of an external referrer (no path/query), or "" for internal/invalid ones. */
export function gaReferrerOrigin(referrer: string, siteOrigin: string): string {
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    if (
      !/^https?:$/.test(url.protocol) ||
      url.origin === siteOrigin ||
      host === "shinex.am" ||
      host.endsWith(".shinex.am")
    )
      return "";
    return url.origin;
  } catch {
    return "";
  }
}

/** Inline gtag bootstrap for the root layout: same allowlist and referrer rule as above. */
export function gaConfigScript(
  measurementId: string,
  siteOrigin: string
): string {
  return `(function () {
  if (window.location.origin !== ${JSON.stringify(siteOrigin)}) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){window.dataLayer.push(arguments);};
  window.gtag('js', new Date());
  var query = '';
  var referrer = '';
  try {
    var params = new URL(window.location.href).searchParams;
    var safe = new URLSearchParams();
    ${JSON.stringify(gaCampaignParams)}.forEach(function (key) {
      var value = params.get(key);
      if (value && (key.indexOf('utm_') === 0 ? ${utmValue} : ${clickIdValue}).test(value)) safe.set(key, value);
    });
    query = safe.toString() ? '?' + safe.toString() : '';
  } catch (e) {}
  try {
    var ref = new URL(document.referrer);
    var host = ref.hostname.toLowerCase();
    if (/^https?:$/.test(ref.protocol) && ref.origin !== window.location.origin && host !== 'shinex.am' && !/\\.shinex\\.am$/.test(host)) referrer = ref.origin;
  } catch (e) {}
  window.gtag('config', ${JSON.stringify(measurementId)}, {
    send_page_view: false,
    page_location: window.location.origin + query,
    page_referrer: referrer
  });
  window.dispatchEvent(new Event('shinex-analytics-ready'));
})();`;
}

let landingPageViewSent = false;

/** Does nothing when GA4 is absent or blocked; never pass personal data here. */
export function trackEvent(
  event: AnalyticsEventName,
  params: AnalyticsParams = {}
): void {
  if (
    typeof window === "undefined" ||
    window.location.origin !== CANONICAL_SITE_URL ||
    typeof window.gtag !== "function"
  )
    return;
  const pagePath = publicPagePath(window.location.pathname);
  if (!pagePath) return;
  const safe: Record<string, string> = {};
  const allowed = {
    form: ["lead", "calculator"],
    calculation_type: ["renovation", "construction", "design"],
    cta_id: ["contact_methods", "message_form", "contact_page"],
    error_type: ["validation", "delivery"],
  };
  for (const key of Object.keys(allowed) as (keyof AnalyticsParams)[]) {
    const value = params[key];
    if (value && allowed[key].includes(value)) safe[key] = value;
  }
  try {
    const attribution = getLeadAttribution();
    // Only the first page_view of the document carries campaign parameters and
    // the external referrer origin, so GA4/Google Ads can attribute the session.
    const landing = event === "page_view" && !landingPageViewSent;
    if (landing) landingPageViewSent = true;
    window.gtag("event", event, {
      ...safe,
      ...(attribution
        ? {
            entry_source: attribution.source,
            entry_medium: attribution.medium,
            landing_page: attribution.landing_page,
          }
        : {}),
      page_path: pagePath,
      // Do not let automatic location/referrer parameters include query PII.
      page_location: `${window.location.origin}${pagePath}${
        landing ? gaCampaignQuery(window.location.href) : ""
      }`,
      page_referrer: landing
        ? gaReferrerOrigin(document.referrer, window.location.origin)
        : "",
    });
  } catch {
    /* Analytics failure must not interrupt contact or form actions. */
  }
}
