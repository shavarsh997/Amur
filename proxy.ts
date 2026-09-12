import { NextResponse, type NextRequest } from "next/server";

import { seoRedirects } from "@/config/seo-redirects.config";

const canonicalHost = "www.shinex.am";
const knownHosts = new Set(["shinex.am", canonicalHost]);

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

  const localizedPath = request.nextUrl.pathname.match(/^\/(hy|ru|en)\/(.+)$/);
  const retiredPage = localizedPath
    ? seoRedirects.find(({ source }) => source === localizedPath[2])
    : undefined;
  const isRoot = request.nextUrl.pathname === "/";

  if (needsCanonicalHost || isRoot || retiredPage) {
    const destination = request.nextUrl.clone();
    if (needsCanonicalHost) {
      destination.protocol = "https:";
      destination.hostname = canonicalHost;
      destination.port = "";
    }
    if (isRoot) destination.pathname = "/hy";
    if (retiredPage && localizedPath) {
      destination.pathname = `/${localizedPath[1]}/${retiredPage.destination}`;
    }
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = { matcher: "/:path*" };
