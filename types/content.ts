export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BeforeAfterPair = { before: ProjectImage; after: ProjectImage };

export type PortfolioProject = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  serviceSlug: string;
  location?: string;
  propertyType?: string;
  area?: number;
  duration?: string;
  budgetRange?: string;
  challenge?: string;
  solution?: string;
  completedWorks: readonly string[];
  images: readonly ProjectImage[];
  beforeAfterImages?: readonly BeforeAfterPair[];
  publishedAt?: string;
  updatedAt?: string;
  isPublished: boolean;
};

export type BlogArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  author?: { name: string };
  publishedAt: string;
  updatedAt?: string;
  relatedServiceSlugs: readonly string[];
  isPublished: boolean;
};
