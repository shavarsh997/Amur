import type { Locale } from "@/types";

export type LocalizedBlogArticle = {
  slug: string;
  author: { name: string };
  publishedAt: string;
  updatedAt?: string;
  relatedServiceSlugs: readonly string[];
  translations: Record<
    Locale,
    {
      title: string;
      metaTitle: string;
      metaDescription: string;
      excerpt: string;
      /** Reviewed paragraphs only; do not populate this with synthetic content. */
      body: readonly { heading?: string; paragraphs: readonly string[] }[];
    }
  >;
  isPublished: boolean;
};
