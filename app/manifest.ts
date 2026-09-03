import type { MetadataRoute } from "next";

import { companyConfig } from "@/config/company.config";
import dictionary from "@/messages/hy";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: companyConfig.brand.name,
    short_name: companyConfig.brand.name,
    description: dictionary.metadata.manifestDescription,
    start_url: "/hy",
    display: "standalone",
    background_color: "#fcfaf8",
    theme_color: "#fcfaf8",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
