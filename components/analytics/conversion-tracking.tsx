"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { getLeadAttribution } from "@/lib/lead-attribution";

/** One delegated listener also covers server-rendered header/footer links. */
export function ConversionTracking() {
  const pathname = usePathname();
  const lastViewedPath = useRef<string | null>(null);
  useEffect(() => {
    getLeadAttribution();
  }, [pathname]);
  useEffect(() => {
    const pageView = () => {
      if (!window.gtag || lastViewedPath.current === pathname) return;
      trackEvent("page_view");
      lastViewedPath.current = pathname;
    };
    pageView();
    window.addEventListener("shinex-analytics-ready", pageView);
    return () => window.removeEventListener("shinex-analytics-ready", pageView);
  }, [pathname]);
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;
      const url = new URL(link.getAttribute("href")!, window.location.origin);
      if (url.protocol === "tel:") trackEvent("phone_click");
      else if (url.protocol === "https:" && url.hostname === "wa.me")
        trackEvent("whatsapp_click");
      else if (url.protocol === "mailto:") trackEvent("email_click");
      else if (
        url.origin === window.location.origin &&
        /^\/(hy|ru|en|de|fr)\/contacts$/.test(url.pathname)
      )
        trackEvent("cta_click", { cta_id: "contact_page" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
