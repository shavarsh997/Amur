import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { runHealth } from "../src/jobs/health.ts";
import { collectGa4 } from "../src/jobs/collect.ts";
import { classifyError } from "../src/jobs/context.ts";
import { withHostFilter } from "../src/connectors/ga4.ts";
import { HttpError } from "../src/core/retry.ts";
import type { FetchFn } from "../src/connectors/http.ts";

type Call = { url: string; method: string; headers: Record<string, string>; body: unknown };

const json = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const HOST_FILTER = { filter: { fieldName: "hostName", inListFilter: { values: ["www.shinex.am", "shinex.am"] } } };

const ADS_ACTION_NOT_PERMITTED = {
  error: {
    code: 403,
    message: "The caller does not have permission",
    status: "PERMISSION_DENIED",
    details: [
      {
        "@type": "type.googleapis.com/google.ads.googleads.v23.errors.GoogleAdsFailure",
        errors: [{ errorCode: { authorizationError: "ACTION_NOT_PERMITTED" }, message: "The user does not have permission to perform this action." }],
      },
    ],
  },
};

/** Routes by host; records every call. Unknown hosts get 404 (no real network). */
function fakeGoogle(): { fetch: FetchFn; calls: Call[] } {
  const calls: Call[] = [];
  const f = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    const raw = init?.body;
    calls.push({
      url,
      method: init?.method ?? "GET",
      headers: Object.fromEntries(new Headers(init?.headers).entries()),
      body: typeof raw === "string" && raw !== "" ? JSON.parse(raw) : undefined,
    });
    const host = new URL(url).host;
    if (host === "analyticsdata.googleapis.com") {
      return json(200, { metricHeaders: [{ name: "sessions" }], rows: [{ metricValues: [{ value: "321" }] }] });
    }
    if (host === "analyticsadmin.googleapis.com") return json(200, { keyEvents: [] });
    if (host === "searchconsole.googleapis.com") return json(200, { siteEntry: [] });
    if (url.endsWith("/customers:listAccessibleCustomers")) return json(200, { resourceNames: ["customers/1234567890"] });
    if (host === "googleads.googleapis.com") return json(403, ADS_ACTION_NOT_PERMITTED);
    return new Response("not found", { status: 404 });
  }) as FetchFn;
  return { fetch: f, calls };
}

const realFetch = globalThis.fetch;
const realStderrWrite = process.stderr.write;
let tmp = "";

describe("jobs: GA4 hostName filter and Ads Explorer access", () => {
  before(async () => {
    tmp = await mkdtemp(join(tmpdir(), "shinex-ma-jobs-"));
    const data = join(tmp, "data");
    process.env.SHINEX_MA_DATA_DIR = data;
    process.env.SHINEX_MA_ADC_PATH = join(tmp, "no-adc.json");
    await mkdir(data, { recursive: true });
    await writeFile(join(data, "config.json"), JSON.stringify({ ga4PropertyId: "123" }));
    process.stderr.write = (() => true) as typeof process.stderr.write;
    globalThis.fetch = (async () => {
      throw new Error("real network is not allowed in unit tests");
    }) as typeof fetch;
  });

  after(async () => {
    process.stderr.write = realStderrWrite;
    globalThis.fetch = realFetch;
    await rm(tmp, { recursive: true, force: true });
  });

  it("withHostFilter adds inListFilter, combines with an existing filter, skips an empty list", () => {
    const body = { metrics: [{ name: "sessions" }] };
    assert.deepEqual(withHostFilter(body, ["www.shinex.am", "shinex.am"]), { ...body, dimensionFilter: HOST_FILTER });
    const ev = { filter: { fieldName: "eventName", stringFilter: { value: "generate_lead" } } };
    assert.deepEqual(withHostFilter({ dimensionFilter: ev }, ["www.shinex.am", "shinex.am"]).dimensionFilter, {
      andGroup: { expressions: [ev, HOST_FILTER] },
    });
    assert.equal(withHostFilter(body, []), body);
  });

  it("health: ga4 runReport carries the hostName filter; google-ads without developer token → BLOCKED (Explorer access)", async () => {
    const { fetch, calls } = fakeGoogle();
    const rows = await runHealth({ fetch, token: "tok", secret: async () => null, retry: { retries: 0, baseMs: 1 } });
    const by = Object.fromEntries(rows.map((r) => [r.name, r]));

    const report = calls.find((c) => c.url.endsWith("properties/123:runReport"));
    assert.ok(report, "runReport was called");
    assert.deepEqual((report.body as { dimensionFilter?: unknown }).dimensionFilter, HOST_FILTER);
    assert.equal(by.ga4!.status, "WORKING");
    assert.match(by.ga4!.detail ?? "", /321 сессий за 7 дней \(hostName-фильтр\)/);

    const ads = calls.filter((c) => c.url.startsWith("https://googleads.googleapis.com/"));
    assert.deepEqual(
      ads.map((c) => c.url),
      [
        "https://googleads.googleapis.com/v23/customers:listAccessibleCustomers",
        "https://googleads.googleapis.com/v23/customers/1234567890/googleAds:searchStream",
      ],
    );
    for (const c of ads) assert.equal("developer-token" in c.headers, false, "no developer-token header");
    assert.equal(by["google-ads"]!.status, "BLOCKED");
    assert.match(by["google-ads"]!.detail ?? "", /GCP-проекту нужен Google Ads API Explorer access/);
    assert.match(by["google-ads"]!.detail ?? "", /ACTION_NOT_PERMITTED/);
  });

  it("collectGa4: every runReport body carries the hostName filter", async () => {
    const { fetch, calls } = fakeGoogle();
    const range = (s: string, e: string) => ({ startDate: s, endDate: e });
    const res = await collectGa4(
      { ga4PropertyId: "123", ga4HostNames: ["www.shinex.am", "shinex.am"] },
      { fetch, token: "tok", retry: { retries: 0, baseMs: 1 } },
      async () => "tok",
      range("2026-11-15", "2026-11-21"),
      range("2026-11-08", "2026-11-14"),
      { snapshotSource: "ga4", snapshotDate: "2026-11-22" },
    );
    assert.equal(res.status.status, "WORKING", res.status.detail);
    const reports = calls.filter((c) => c.url.endsWith(":runReport"));
    assert.equal(reports.length, 4);
    for (const r of reports) {
      const f = (r.body as { dimensionFilter?: { filter?: unknown; andGroup?: { expressions: unknown[] } } }).dimensionFilter;
      assert.ok(f, "dimensionFilter present");
      const hasHost = JSON.stringify(f) === JSON.stringify(HOST_FILTER) || (f.andGroup?.expressions ?? []).some((x) => JSON.stringify(x) === JSON.stringify(HOST_FILTER));
      assert.ok(hasHost, `hostName filter in ${JSON.stringify(f)}`);
    }
  });

  it("classifyError: a 403 without ACTION_NOT_PERMITTED stays plain BLOCKED", () => {
    const r = classifyError(new HttpError(403, JSON.stringify({ error: { status: "PERMISSION_DENIED", message: "nope" } })));
    assert.equal(r.status, "BLOCKED");
    assert.doesNotMatch(r.detail, /Explorer access/);
  });
});
