import type {} from "@/lib/analytics";
import { publicPagePath } from "@/lib/lead-attribution";
import { CANONICAL_SITE_URL } from "@/lib/site-url";

type Vital = {
  name: string;
  id: string;
  value: number;
  delta: number;
  rating: string;
};

/** Report document-lifetime metrics without entries, selectors or query strings. */
export function reportWebVital(metric: Vital): void {
  if (
    typeof window === "undefined" ||
    window.location.origin !== CANONICAL_SITE_URL ||
    typeof window.gtag !== "function"
  )
    return;
  if (
    !["LCP", "INP", "CLS"].includes(metric.name) ||
    !["good", "needs-improvement", "poor"].includes(metric.rating) ||
    !/^[a-zA-Z0-9-]{1,80}$/.test(metric.id) ||
    !Number.isFinite(metric.value) ||
    metric.value < 0 ||
    !Number.isFinite(metric.delta)
  )
    return;
  try {
    // A client-side navigation does not start a new Web Vitals measurement.
    // Associate it with the original document, even if the visible route changed.
    const navigation = window.performance.getEntriesByType("navigation")[0];
    const documentUrl = new URL(navigation?.name ?? window.location.href);
    if (documentUrl.origin !== window.location.origin) return;
    const pagePath = publicPagePath(documentUrl.pathname);
    if (!pagePath) return;
    window.gtag("event", "web_vital", {
      metric_name: metric.name,
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      metric_unit: metric.name === "CLS" ? "score" : "ms",
      non_interaction: true,
      page_path: pagePath,
      page_location: `${documentUrl.origin}${pagePath}`,
      page_referrer: "",
    });
  } catch {
    // Reporting must never interrupt page rendering or an enquiry.
  }
}
