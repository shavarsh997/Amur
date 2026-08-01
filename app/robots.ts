import type { MetadataRoute } from "next";

import { getAbsoluteUrl, getSiteOrigin } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/preview/", "/_next/"],
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: getSiteOrigin(),
  };
}
