export const projectCatalog = [
  {
    slug: "family-house-dilijan",
    objectType: "private-house",
    status: "completed",
    isDemo: true,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
    ],
  },
  {
    slug: "apartment-renovation-yerevan",
    objectType: "renovation",
    status: "completed",
    isDemo: true,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
    ],
  },
  {
    slug: "guesthouse-tsaghkadzor",
    objectType: "commercial",
    status: "in-progress",
    isDemo: true,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85",
    ],
  },
  {
    slug: "courtyard-ashtarak",
    objectType: "renovation",
    status: "completed",
    isDemo: true,
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1800&q=85",
    ],
  },
  {
    slug: "villa-sevan",
    objectType: "private-house",
    status: "in-progress",
    isDemo: true,
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85",
    ],
  },
] as const;

export type ProjectSlug = (typeof projectCatalog)[number]["slug"];
