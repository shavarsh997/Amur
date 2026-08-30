import type { MetadataRoute } from "next";

import { getAbsoluteUrl, getSiteOrigin } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep crawlers able to fetch Next.js assets needed to render the site.
      disallow: ["/api/", "/admin/", "/preview/"],
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: getSiteOrigin(),
  };
}
