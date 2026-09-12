/** Retired duplicate pages. Paths omit the locale; redirects always preserve it. */
export const seoRedirects = [
  {
    source: "services/house-construction-yerevan",
    destination: "services/house-construction",
  },
  {
    source: "services/complete-house-construction-yerevan",
    destination: "services/house-construction",
  },
  {
    source: "services/interior-design-yerevan",
    destination: "services/interior-design",
  },
  {
    source: "services/commercial-renovation-yerevan",
    destination: "services/commercial-construction",
  },
  {
    source: "renovation-price-per-square-meter-yerevan",
    destination: "prices",
  },
] as const;
