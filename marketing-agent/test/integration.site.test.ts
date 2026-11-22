import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { crawlSite } from "../src/connectors/site.ts";

const LIVE = process.env.SHINEX_MA_LIVE === "1";

describe("integration: live crawl of https://www.shinex.am", { skip: LIVE ? false : "set SHINEX_MA_LIVE=1 to run" }, () => {
  it("fetches robots, sitemap and a limited set of pages", { timeout: 180_000 }, async () => {
    const res = await crawlSite("https://www.shinex.am", { limit: 8, concurrency: 3 });
    assert.equal(res.robots.status, 200, "robots.txt should be reachable");
    assert.ok(res.sitemaps.length > 0, "at least one sitemap requested");
    assert.ok(res.pages.length > 0 && res.pages.length <= 8, `page count within limit: ${res.pages.length}`);
    const home = res.pages.find((p) => p.url === res.siteUrl);
    assert.ok(home, "home page crawled");
    assert.equal(home.finalStatus, 200, `home final status: ${home.finalStatus}`);
    assert.ok(home.title && home.title.length > 0, "home has a title");
    const ok = res.pages.filter((p) => p.finalStatus === 200);
    assert.ok(ok.length > 0);
    for (const p of ok) assert.equal(p.jsonLd.errors.length, 0, `JSON-LD parse errors on ${p.url}: ${p.jsonLd.errors.join("; ")}`);
    process.stderr.write(
      `live crawl: robots=${res.robots.status} sitemapUrls=${res.sitemapUrls.length} pages=${res.pages.length} ` +
        `home=${home.status}->${home.finalStatus} ${home.finalUrl} title="${home.title}" hreflang=${home.hreflang.length}\n`,
    );
  });
});
