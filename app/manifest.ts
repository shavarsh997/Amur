import type { MetadataRoute } from "next";

import { companyConfig } from "@/config/company.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: companyConfig.brand.name,
    short_name: companyConfig.brand.name,
    description:
      "Բնակարանների և առանձնատների վերանորոգում, տների կառուցում և ինտերիերի դիզայն Հայաստանում։",
    start_url: "/hy",
    display: "standalone",
    background_color: "#fcfaf8",
    theme_color: "#fcfaf8",
    icons: [
      {
        src: "/icon.png",
        sizes: "558x512",
        type: "image/png",
      },
    ],
  };
}
