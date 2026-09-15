import { NextResponse, type NextRequest } from "next/server";

import { seoRedirects } from "@/config/seo-redirects.config";
import { shouldPreventIndexing } from "@/lib/seo-environment";
import { CANONICAL_SITE_URL } from "@/lib/site-url";

const canonicalHost = new URL(CANONICAL_SITE_URL).hostname;
const knownHosts = new Set([
  canonicalHost.replace(/^www\./, ""),
  canonicalHost,
]);

/** Enforces the canonical HTTPS host and redirects every host's root to Armenian. */
export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = (forwardedHost ?? request.headers.get("host") ?? "")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "");
  const forwardedProtocol = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();
  const isKnownHost = knownHosts.has(host);
  const protocol =
    forwardedProtocol ?? request.nextUrl.protocol.replace(":", "");
  const needsCanonicalHost =
    isKnownHost && (host !== canonicalHost || protocol !== "https");

  // Resolve host, slash and retired-page aliases together to avoid extra hops.
  const pathname = request.nextUrl.pathname;
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const localizedPath = normalizedPath.match(/^\/(hy|ru|en)\/(.+)$/);
  const retiredPage = localizedPath
    ? seoRedirects.find(({ source }) => source === localizedPath[2])
    : undefined;
  const isRoot = pathname === "/";
  const hasTrailingSlash = pathname !== normalizedPath;
  let response: NextResponse;

  if (needsCanonicalHost || isRoot || retiredPage || hasTrailingSlash) {
    // A plain URL avoids NextURL restoring the incoming trailing slash.
    const destination = new URL(request.nextUrl.href);
    if (needsCanonicalHost) {
      destination.protocol = "https:";
      destination.hostname = canonicalHost;
      destination.port = "";
    }
    destination.pathname = isRoot ? "/hy" : normalizedPath;
    if (retiredPage && localizedPath) {
      destination.pathname = `/${localizedPath[1]}/${retiredPage.destination}`;
    }
    response = NextResponse.redirect(destination, 308);
  } else {
    response = NextResponse.next();
  }

  if (shouldPreventIndexing()) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }
  return response;
}

export const config = { matcher: "/:path*" };
