/** Production stays indexable unless explicitly disabled for a staging build. */
export function shouldPreventIndexing(): boolean {
  return (
    process.env.SITE_NOINDEX === "true" ||
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development" ||
    process.env.NODE_ENV === "development"
  );
}
