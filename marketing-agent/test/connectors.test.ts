import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { inspectUrl, listSitemaps, listSites, searchAnalytics } from "../src/connectors/gsc.ts";
import { accountSummaries, keyEvents, listProperties, reportRows, runReport } from "../src/connectors/ga4.ts";
import { GAQL, adsReport, micros, searchStream } from "../src/connectors/ads.ts";
import { pageSpeed } from "../src/connectors/psi.ts";
import { crawlSite, isAllowed, parseHtml, parseRobots, parseSitemap } from "../src/connectors/site.ts";
import { HttpError } from "../src/core/retry.ts";
import type { FetchFn } from "../src/connectors/http.ts";

type Call = { url: string; method: string; headers: Record<string, string>; body: unknown };

const json = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

/** Fake fetch: responses consumed in order; records url/method/headers/body. Fails the test on real network use. */
function fakeFetch(responses: Array<Response | ((url: string) => Response)>): { fetch: FetchFn; calls: Call[] } {
  const calls: Call[] = [];
  const f = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    const headers = Object.fromEntries(new Headers(init?.headers).entries());
    const raw = init?.body;
    calls.push({
      url,
      method: init?.method ?? "GET",
      headers,
      body: typeof raw === "string" && raw !== "" ? JSON.parse(raw) : undefined,
    });
    const next = responses.shift();
    if (!next) throw new Error(`unexpected fetch: ${url}`);
    return typeof next === "function" ? next(url) : next;
  }) as FetchFn;
  return { fetch: f, calls };
}

/** Fake fetch that routes by URL (for the crawler, which runs requests concurrently). */
function routedFetch(routes: Record<string, () => Response>): { fetch: FetchFn; calls: Call[] } {
  const calls: Call[] = [];
  const f = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    calls.push({ url, method: init?.method ?? "GET", headers: Object.fromEntries(new Headers(init?.headers).entries()), body: undefined });
    const route = routes[url];
    return route ? route() : new Response("not found", { status: 404, headers: { "content-type": "text/html" } });
  }) as FetchFn;
  return { fetch: f, calls };
}

const realFetch = globalThis.fetch;
let tmp = "";

describe("connectors", () => {
  before(async () => {
    tmp = await mkdtemp(join(tmpdir(), "shinex-ma-conn-"));
    process.env.SHINEX_MA_DATA_DIR = join(tmp, "data");
    const adc = join(tmp, "adc.json");
    await writeFile(adc, JSON.stringify({ type: "authorized_user", quota_project_id: "qp-test" }));
    process.env.SHINEX_MA_ADC_PATH = adc;
    // Any accidental real network call fails loudly.
    globalThis.fetch = (async () => {
      throw new Error("real network is not allowed in unit tests");
    }) as typeof fetch;
  });

  after(async () => {
    globalThis.fetch = realFetch;
    await rm(tmp, { recursive: true, force: true });
  });

  const base = { token: "tok-123", retry: { retries: 2, baseMs: 1 } };

  describe("gsc", () => {
    it("listSites sends bearer + quota project and parses siteEntry", async () => {
      const { fetch, calls } = fakeFetch([json(200, { siteEntry: [{ siteUrl: "sc-domain:shinex.am", permissionLevel: "siteOwner" }] })]);
      const sites = await listSites({ ...base, fetch });
      assert.deepEqual(sites, [{ siteUrl: "sc-domain:shinex.am", permissionLevel: "siteOwner" }]);
      assert.equal(calls[0]!.url, "https://searchconsole.googleapis.com/webmasters/v3/sites");
      assert.equal(calls[0]!.method, "GET");
      assert.equal(calls[0]!.headers.authorization, "Bearer tok-123");
      assert.equal(calls[0]!.headers["x-goog-user-project"], "qp-test");
    });

    it("searchAnalytics encodes siteUrl, builds body, maps keys to dimensions", async () => {
      const { fetch, calls } = fakeFetch([
        json(200, { rows: [{ keys: ["ремонт квартир", "https://www.shinex.am/ru"], clicks: 3, impressions: 120, ctr: 0.025, position: 7.4 }] }),
      ]);
      const rows = await searchAnalytics(
        "sc-domain:shinex.am",
        { startDate: "2026-10-01", endDate: "2026-10-28", dimensions: ["query", "page"], rowLimit: 99999 },
        { ...base, fetch },
      );
      assert.equal(
        calls[0]!.url,
        "https://searchconsole.googleapis.com/webmasters/v3/sites/sc-domain%3Ashinex.am/searchAnalytics/query",
      );
      assert.equal(calls[0]!.method, "POST");
      assert.equal(calls[0]!.headers["content-type"], "application/json");
      assert.deepEqual(calls[0]!.body, {
        startDate: "2026-10-01",
        endDate: "2026-10-28",
        dimensions: ["query", "page"],
        rowLimit: 25000,
      });
      assert.equal(rows[0]!.query, "ремонт квартир");
      assert.equal(rows[0]!.page, "https://www.shinex.am/ru");
      assert.equal(rows[0]!.impressions, 120);
    });

    it("searchAnalytics rejects malformed dates before any request", async () => {
      const { fetch, calls } = fakeFetch([]);
      await assert.rejects(searchAnalytics("x", { startDate: "2026-1-1", endDate: "2026-01-02" }, { ...base, fetch }), /startDate/);
      assert.equal(calls.length, 0);
    });

    it("inspectUrl posts inspectionUrl/siteUrl; listSitemaps parses sitemap[]", async () => {
      const { fetch, calls } = fakeFetch([
        json(200, { inspectionResult: { indexStatusResult: { verdict: "PASS", coverageState: "Submitted and indexed" } } }),
        json(200, { sitemap: [{ path: "https://www.shinex.am/sitemap.xml", errors: "0" }] }),
      ]);
      const r = await inspectUrl("https://www.shinex.am/", "https://www.shinex.am/ru", { ...base, fetch });
      assert.equal(r.indexStatusResult?.verdict, "PASS");
      assert.equal(calls[0]!.url, "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect");
      assert.deepEqual(calls[0]!.body, { inspectionUrl: "https://www.shinex.am/ru", siteUrl: "https://www.shinex.am/" });
      const sm = await listSitemaps("https://www.shinex.am/", { ...base, fetch });
      assert.equal(sm[0]!.path, "https://www.shinex.am/sitemap.xml");
      assert.equal(calls[1]!.url, "https://searchconsole.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fwww.shinex.am%2F/sitemaps");
    });

    it("retries 5xx then succeeds; 403 is thrown as HttpError without retry", async () => {
      const ok = fakeFetch([json(503, { error: "busy" }), json(200, {})]);
      assert.deepEqual(await listSites({ ...base, fetch: ok.fetch }), []);
      assert.equal(ok.calls.length, 2);
      const denied = fakeFetch([json(403, { error: { message: "denied" } })]);
      await assert.rejects(listSites({ ...base, fetch: denied.fetch }), (e: unknown) => e instanceof HttpError && e.status === 403);
      assert.equal(denied.calls.length, 1);
    });
  });

  describe("ga4", () => {
    it("accountSummaries follows nextPageToken; listProperties flattens", async () => {
      const { fetch, calls } = fakeFetch([
        json(200, {
          accountSummaries: [{ name: "accountSummaries/1", account: "accounts/1", displayName: "A", propertySummaries: [{ property: "properties/111", displayName: "shinex.am" }] }],
          nextPageToken: "p2",
        }),
        json(200, { accountSummaries: [{ name: "accountSummaries/2", account: "accounts/2" }] }),
      ]);
      const s = await accountSummaries({ ...base, fetch });
      assert.equal(s.length, 2);
      assert.equal(calls[0]!.url, "https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=200");
      assert.equal(calls[1]!.url, "https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=200&pageToken=p2");
      assert.equal(calls[0]!.headers["x-goog-user-project"], "qp-test");
      assert.deepEqual(listProperties(s), [{ propertyId: "111", displayName: "shinex.am", account: "accounts/1", accountName: "A" }]);
    });

    it("runReport posts body to Data API and reportRows converts metrics to numbers", async () => {
      const response = {
        dimensionHeaders: [{ name: "sessionDefaultChannelGroup" }],
        metricHeaders: [{ name: "sessions", type: "TYPE_INTEGER" }, { name: "engagementRate", type: "TYPE_FLOAT" }],
        rows: [{ dimensionValues: [{ value: "Organic Search" }], metricValues: [{ value: "42" }, { value: "0.61" }] }],
        rowCount: 1,
      };
      const { fetch, calls } = fakeFetch([json(200, response)]);
      const body = { dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }], dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }, { name: "engagementRate" }] };
      const res = await runReport("properties/111", body, { ...base, fetch });
      assert.equal(calls[0]!.url, "https://analyticsdata.googleapis.com/v1beta/properties/111:runReport");
      assert.equal(calls[0]!.method, "POST");
      assert.deepEqual(calls[0]!.body, body);
      assert.deepEqual(reportRows(res), [{ sessionDefaultChannelGroup: "Organic Search", sessions: 42, engagementRate: 0.61 }]);
    });

    it("keyEvents lists key events; invalid property id rejected", async () => {
      const { fetch, calls } = fakeFetch([json(200, { keyEvents: [{ name: "properties/111/keyEvents/1", eventName: "generate_lead" }] })]);
      const ev = await keyEvents("111", { ...base, fetch });
      assert.equal(ev[0]!.eventName, "generate_lead");
      assert.equal(calls[0]!.url, "https://analyticsadmin.googleapis.com/v1beta/properties/111/keyEvents?pageSize=200");
      await assert.rejects(keyEvents("abc", { ...base, fetch }), /invalid GA4 property id/);
    });
  });

  describe("ads", () => {
    const range = { startDate: "2026-10-01", endDate: "2026-10-31" };

    it("searchStream without developer token does not send the header; flattens chunks", async () => {
      const { fetch, calls } = fakeFetch([
        json(200, [{ results: [{ campaign: { name: "A" } }] }, { results: [{ campaign: { name: "B" } }] }]),
      ]);
      const rows = await searchStream("123-456-7890", GAQL.campaigns(range), {
        ...base,
        fetch,
        developerToken: null,
        config: { adsApiVersion: "v22" },
      });
      assert.deepEqual(rows, [{ campaign: { name: "A" } }, { campaign: { name: "B" } }]);
      assert.equal(calls[0]!.url, "https://googleads.googleapis.com/v22/customers/1234567890/googleAds:searchStream");
      assert.equal(calls[0]!.method, "POST");
      assert.equal("developer-token" in calls[0]!.headers, false);
      assert.equal("login-customer-id" in calls[0]!.headers, false);
      assert.equal(calls[0]!.headers["x-goog-user-project"], "qp-test");
      assert.match(String((calls[0]!.body as { query: string }).query), /^SELECT campaign\.id.*FROM campaign WHERE segments\.date BETWEEN '2026-10-01' AND '2026-10-31'$/);
    });

    it("sends developer-token and login-customer-id when available", async () => {
      const { fetch, calls } = fakeFetch([json(200, [])]);
      const rows = await adsReport("searchTerms", "1234567890", range, {
        ...base,
        fetch,
        developerToken: "dev-tok",
        config: { adsApiVersion: "v21", adsLoginCustomerId: "999-888-7777" },
      });
      assert.deepEqual(rows, []);
      assert.equal(calls[0]!.url, "https://googleads.googleapis.com/v21/customers/1234567890/googleAds:searchStream");
      assert.equal(calls[0]!.headers["developer-token"], "dev-tok");
      assert.equal(calls[0]!.headers["login-customer-id"], "9998887777");
      assert.match(String((calls[0]!.body as { query: string }).query), /FROM search_term_view .*LIMIT 1000$/);
    });

    it("refuses non-SELECT GAQL and bad customer ids without a request", async () => {
      const { fetch, calls } = fakeFetch([]);
      const deps = { ...base, fetch, developerToken: null, config: {} };
      await assert.rejects(searchStream("1234567890", "UPDATE campaign SET x", deps), /only SELECT/);
      await assert.rejects(searchStream("12345", "SELECT campaign.id FROM campaign", deps), /customer id/);
      assert.throws(() => GAQL.geo({ startDate: "2026-10-01' OR 1=1", endDate: "2026-10-31" }), /startDate/);
      assert.equal(calls.length, 0);
    });

    it("micros converts to currency units", () => {
      assert.equal(micros("2500000"), 2.5);
      assert.equal(micros(undefined), 0);
    });
  });

  describe("psi", () => {
    it("builds URL with key, no OAuth headers, parses lab and field data", async () => {
      const { fetch, calls } = fakeFetch([
        json(200, {
          loadingExperience: {
            overall_category: "AVERAGE",
            metrics: {
              LARGEST_CONTENTFUL_PAINT_MS: { percentile: 2600, category: "AVERAGE" },
              CUMULATIVE_LAYOUT_SHIFT_SCORE: { percentile: 5, category: "FAST" },
              INTERACTION_TO_NEXT_PAINT: { percentile: 180, category: "FAST" },
            },
          },
          lighthouseResult: {
            finalDisplayedUrl: "https://www.shinex.am/hy",
            fetchTime: "2026-11-01T00:00:00Z",
            categories: { performance: { score: 0.87 } },
            audits: {
              "largest-contentful-paint": { numericValue: 2400.5 },
              "cumulative-layout-shift": { numericValue: 0.02 },
              "total-blocking-time": { numericValue: 120 },
            },
          },
        }),
      ]);
      const r = await pageSpeed("https://www.shinex.am/", "mobile", { fetch, apiKey: "k-1", retry: base.retry });
      const u = new URL(calls[0]!.url);
      assert.equal(u.origin + u.pathname, "https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
      assert.equal(u.searchParams.get("url"), "https://www.shinex.am/");
      assert.equal(u.searchParams.get("strategy"), "mobile");
      assert.equal(u.searchParams.get("key"), "k-1");
      assert.equal("authorization" in calls[0]!.headers, false);
      assert.equal(r.lab.performanceScore, 87);
      assert.equal(r.lab.lcpMs, 2400.5);
      assert.equal(r.lab.fcpMs, null);
      assert.equal(r.finalUrl, "https://www.shinex.am/hy");
      assert.equal(r.field?.scope, "url");
      assert.equal(r.field?.cls?.percentile, 0.05);
      assert.equal(r.field?.lcpMs?.category, "AVERAGE");
    });

    it("without key omits key param; falls back to origin field data", async () => {
      const { fetch, calls } = fakeFetch([
        json(200, {
          loadingExperience: { origin_fallback: true, metrics: { LARGEST_CONTENTFUL_PAINT_MS: { percentile: 1 } } },
          originLoadingExperience: { metrics: { LARGEST_CONTENTFUL_PAINT_MS: { percentile: 3000, category: "SLOW" } } },
          lighthouseResult: { categories: { performance: { score: null } } },
        }),
      ]);
      const r = await pageSpeed("https://www.shinex.am/ru", "desktop", { fetch, apiKey: null, retry: base.retry });
      assert.equal(new URL(calls[0]!.url).searchParams.has("key"), false);
      assert.equal(new URL(calls[0]!.url).searchParams.get("strategy"), "desktop");
      assert.equal(r.lab.performanceScore, null);
      assert.deepEqual(r.field?.lcpMs, { percentile: 3000, category: "SLOW" });
      assert.equal(r.field?.scope, "origin");
    });
  });

  describe("site", () => {
    it("parseHtml extracts title/description/h1/canonical/hreflang/robots/JSON-LD and ignores script contents", () => {
      const html = `<!doctype html><html><head>
        <title>Ремонт &amp; отделка | SHINEX</title>
        <meta name="description" content="Ремонт квартир в Ереване">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="/ru">
        <link rel="alternate" hreflang="hy" href="https://www.shinex.am/hy">
        <link rel="alternate" hreflang="ru" href="/ru">
        <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"LocalBusiness"},{"@type":["WebPage","FAQPage"]}]}</script>
        <script type='application/ld+json'>{bad json}</script>
        <script>document.write("<h1>fake</h1>")</script>
        </head><body><!-- <h1>comment</h1> --><h1 class="x">Ремонт</h1><a href="/ru/services">s</a><a href="mailto:a@b">m</a></body></html>`;
      const p = parseHtml(html, "https://www.shinex.am/ru");
      assert.equal(p.title, "Ремонт & отделка | SHINEX");
      assert.equal(p.description, "Ремонт квартир в Ереване");
      assert.equal(p.metaRobots, "index, follow");
      assert.equal(p.canonical, "https://www.shinex.am/ru");
      assert.deepEqual(p.hreflang, [
        { lang: "hy", href: "https://www.shinex.am/hy" },
        { lang: "ru", href: "https://www.shinex.am/ru" },
      ]);
      assert.equal(p.h1Count, 1);
      assert.equal(p.jsonLd.blocks, 2);
      assert.equal(p.jsonLd.valid, 1);
      assert.equal(p.jsonLd.errors.length, 1);
      assert.deepEqual(p.jsonLd.types, ["FAQPage", "LocalBusiness", "WebPage"]);
      assert.deepEqual(p.links, ["/ru/services", "mailto:a@b"]);
    });

    it("parseRobots / isAllowed handle groups, wildcards and Allow precedence", () => {
      const r = parseRobots("User-agent: Googlebot\nDisallow: /\n\nUser-agent: *\nDisallow: /api/\nDisallow: /*?draft=\nAllow: /api/public$\nSitemap: https://www.shinex.am/sitemap.xml\n");
      assert.deepEqual(r.sitemaps, ["https://www.shinex.am/sitemap.xml"]);
      assert.equal(isAllowed(r, "https://www.shinex.am/ru"), true);
      assert.equal(isAllowed(r, "https://www.shinex.am/api/x"), false);
      assert.equal(isAllowed(r, "https://www.shinex.am/api/public"), true);
      assert.equal(isAllowed(r, "https://www.shinex.am/ru?draft=1"), false);
    });

    it("parseSitemap reads urlset and sitemapindex", () => {
      assert.deepEqual(parseSitemap("<urlset><url><loc> https://a/x?a=1&amp;b=2 </loc></url></urlset>"), { isIndex: false, locs: ["https://a/x?a=1&b=2"] });
      assert.equal(parseSitemap("<sitemapindex><sitemap><loc>https://a/s1.xml</loc></sitemap></sitemapindex>").isIndex, true);
    });

    it("crawlSite: robots + sitemap + pages, redirects, UA header, limit, robots skip", async () => {
      const html = (title: string, extra = ""): (() => Response) => () =>
        new Response(`<html><head><title>${title}</title><link rel="canonical" href="https://www.shinex.am/${title}"></head><body><h1>${title}</h1>${extra}</body></html>`, {
          status: 200,
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      const { fetch, calls } = routedFetch({
        "https://www.shinex.am/robots.txt": () => new Response("User-agent: *\nDisallow: /private\nSitemap: https://www.shinex.am/sitemap.xml\n", { status: 200 }),
        "https://www.shinex.am/sitemap.xml": () =>
          new Response(
            `<?xml version="1.0"?><urlset><url><loc>https://www.shinex.am/hy</loc></url><url><loc>https://www.shinex.am/ru</loc></url><url><loc>https://www.shinex.am/old</loc></url><url><loc>https://www.shinex.am/private/x</loc></url></urlset>`,
            { status: 200, headers: { "content-type": "application/xml" } },
          ),
        "https://www.shinex.am/": () => new Response(null, { status: 308, headers: { location: "/hy" } }),
        "https://www.shinex.am/hy": html("hy", `<a href="/en">en</a><a href="https://other.example/x">ext</a><a href="/img.png">i</a>`),
        "https://www.shinex.am/ru": html("ru"),
        "https://www.shinex.am/old": () => new Response("gone", { status: 404, headers: { "content-type": "text/html" } }),
        "https://www.shinex.am/en": html("en"),
      });
      const res = await crawlSite("https://www.shinex.am", { limit: 4, concurrency: 1 }, { fetch, retry: { retries: 0 } });
      for (const c of calls) assert.equal(c.headers["user-agent"], "SHINEX-marketing-agent/0.1");
      assert.ok(calls.every((c) => new URL(c.url).host === "www.shinex.am"), "no off-host requests");
      assert.equal(res.robots.status, 200);
      assert.deepEqual(res.robots.disallow, ["/private"]);
      assert.equal(res.sitemaps[0]!.urlCount, 4);
      assert.deepEqual(res.skippedByRobots, ["https://www.shinex.am/private/x"]);
      assert.equal(res.pages.length, 4);
      const home = res.pages.find((p) => p.url === "https://www.shinex.am/")!;
      assert.equal(home.status, 308);
      assert.equal(home.finalStatus, 200);
      assert.equal(home.finalUrl, "https://www.shinex.am/hy");
      assert.equal(home.title, "hy");
      assert.equal(home.inSitemap, false);
      const ru = res.pages.find((p) => p.url === "https://www.shinex.am/ru")!;
      assert.equal(ru.inSitemap, true);
      assert.equal(ru.h1Count, 1);
      assert.equal(ru.canonical, "https://www.shinex.am/ru");
      assert.equal(res.pages.find((p) => p.url === "https://www.shinex.am/old")!.status, 404);
      // /en was discovered via link but the limit (4) stopped the crawl.
      assert.equal(res.truncated, true);
      assert.equal(calls.some((c) => c.url.endsWith("/img.png")), false);
    });

    it("crawlSite tolerates missing robots/sitemap and network errors per page", async () => {
      const f = (async (input: string | URL | Request) => {
        const url = String(input);
        if (url.endsWith("/robots.txt") || url.endsWith("/sitemap.xml")) return new Response("nf", { status: 404 });
        throw new TypeError("fetch failed");
      }) as FetchFn;
      const res = await crawlSite("https://www.shinex.am/", { limit: 5 }, { fetch: f, retry: { retries: 0 } });
      assert.equal(res.robots.status, 404);
      assert.equal(res.sitemaps[0]!.status, 404);
      assert.equal(res.pages.length, 1);
      assert.equal(res.pages[0]!.status, 0);
      assert.match(res.pages[0]!.error ?? "", /fetch failed/);
      assert.equal(res.truncated, false);
    });
  });
});
