import { getLeadAttribution, publicPagePath } from "@/lib/lead-attribution";

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
      event: AnalyticsEventName,
      params: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}

/** Does nothing when GA4 is absent or blocked; never pass personal data here. */
export function trackEvent(
  event: AnalyticsEventName,
  params: AnalyticsParams = {}
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
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
      page_location: `${window.location.origin}${pagePath}`,
      page_referrer: "",
    });
  } catch {
    /* Analytics failure must not interrupt contact or form actions. */
  }
}
