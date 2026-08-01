import type { BlogArticle } from "@/types/content";

/** Articles remain unpublished until they are reviewed and supplied with factual content. */
export const blogArticles = [] as const satisfies readonly BlogArticle[];
