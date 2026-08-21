import type { LocalizedBlogArticle } from "@/types/blog";

/** Articles remain unpublished until they are reviewed and supplied with factual content. */
export const blogArticles: readonly LocalizedBlogArticle[] = [];

export function getPublishedArticles() {
  return blogArticles.filter((article) => article.isPublished);
}

export function getPublishedArticle(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug);
}
