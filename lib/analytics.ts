export type AnalyticsEventName =
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "instagram_click"
  | "facebook_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "calculator_start"
  | "calculator_complete"
  | "service_view"
  | "project_view"
  | "gallery_open"
  | "cta_click";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      event: AnalyticsEventName,
      params: AnalyticsParams
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
  window.gtag("event", event, {
    ...params,
    page_path: window.location.pathname,
  });
}
