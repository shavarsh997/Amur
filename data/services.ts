export const serviceCatalog = [
  {
    slug: "house-construction",
    icon: "house",
    category: "construction",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "commercial-construction",
    icon: "building-2",
    category: "construction",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "design",
    icon: "ruler",
    category: "design",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "renovation",
    icon: "paint-roller",
    category: "renovation",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "monolithic-work",
    icon: "blocks",
    category: "construction",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "facade-and-roofing",
    icon: "panels-top-left",
    category: "exterior",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
  },
] as const;

export type ServiceSlug = (typeof serviceCatalog)[number]["slug"];
