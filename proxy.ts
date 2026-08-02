import { NextResponse, type NextRequest } from "next/server";

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

  if (needsCanonicalHost) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    destination.hostname = canonicalHost;
    destination.port = "";
    if (destination.pathname === "/") destination.pathname = "/hy";
    return NextResponse.redirect(destination, 308);
  }

  // Preview URLs (for example, ngrok) are not canonical domains, but still need
  // a locale because all pages live under the `[locale]` route segment.
  if (request.nextUrl.pathname === "/") {
    const destination = request.nextUrl.clone();
    destination.pathname = "/hy";
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = { matcher: "/:path*" };
