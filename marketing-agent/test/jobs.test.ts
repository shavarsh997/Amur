import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { runHealth } from "../src/jobs/health.ts";
import { collectGa4, collectGa4Funnel } from "../src/jobs/collect.ts";
import { isAiTraffic, leadFunnelValues } from "../src/analysis/leads.ts";
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
    assert.equal(reports.length, 5);
    for (const r of reports) {
      const f = (r.body as { dimensionFilter?: { filter?: unknown; andGroup?: { expressions: unknown[] } } }).dimensionFilter;
      assert.ok(f, "dimensionFilter present");
      const hasHost = JSON.stringify(f) === JSON.stringify(HOST_FILTER) || (f.andGroup?.expressions ?? []).some((x) => JSON.stringify(x) === JSON.stringify(HOST_FILTER));
      assert.ok(hasHost, `hostName filter in ${JSON.stringify(f)}`);
    }
  });

  it("lead funnel: AI traffic rule and per-range values", () => {
    assert.equal(isAiTraffic("chatgpt.com", "referral"), true);
    assert.equal(isAiTraffic("Perplexity", "(none)"), true);
    assert.equal(isAiTraffic("newsletter", "AI-Assistant"), true);
    assert.equal(isAiTraffic("google", "organic"), false);
    assert.equal(isAiTraffic("mail", "aim"), false);
    const ev = (eventName: string, eventCount: number, dateRange = "current", sessionSource = "google", sessionMedium = "organic") => ({
      eventName, eventCount, dateRange, sessionSource, sessionMedium,
    });
    const v = leadFunnelValues(
      [ev("form_start", 8), ev("form_start", 2, "current", "chatgpt.com"), ev("generate_lead", 3), ev("generate_lead", 1, "current", "chatgpt.com"), ev("phone_click", 5), ev("form_start", 4, "previous")],
      [{ sessionSource: "chatgpt.com", sessionMedium: "referral", sessions: 7, dateRange: "current" }, { sessionSource: "google", sessionMedium: "organic", sessions: 99, dateRange: "current" }],
      "current",
    );
    assert.equal(v["GA4 form_start"], 10);
    assert.equal(v["GA4 generate_lead"], 4);
    assert.equal(v["GA4 form_submit"], 0);
    assert.equal(v["GA4 phone_click"], 5);
    assert.equal(v["GA4 form_start→generate_lead %"], 40);
    assert.equal(v["GA4 AI sessions"], 7);
    assert.equal(v["GA4 AI generate_lead"], 1);
  });

  it("collectGa4 / collectGa4Funnel: lead funnel current vs previous from mocked runReport, hostName-filtered", async () => {
    const calls: Call[] = [];
    const row = (dims: string[], mets: number[]) => ({ dimensionValues: dims.map((value) => ({ value })), metricValues: mets.map((m) => ({ value: String(m) })) });
    // Mocked GA4 Data API runReport: answers by requested dimensions.
    const fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input instanceof Request ? input.url : input);
      const body = typeof init?.body === "string" && init.body ? JSON.parse(init.body) : undefined;
      calls.push({ url, method: init?.method ?? "GET", headers: {}, body });
      if (new URL(url).host === "analyticsadmin.googleapis.com") return json(200, { keyEvents: [{ eventName: "generate_lead" }] });
      const dims = ((body?.dimensions ?? []) as Array<{ name: string }>).map((d) => d.name).join(",");
      const mets = ((body?.metrics ?? []) as Array<{ name: string }>).map((m) => m.name);
      const headers = (d: string[]) => ({ dimensionHeaders: d.map((name) => ({ name })), metricHeaders: mets.map((name) => ({ name })) });
      if (dims === "eventName,sessionSource,sessionMedium") {
        return json(200, {
          ...headers(["eventName", "sessionSource", "sessionMedium", "dateRange"]),
          rows: [
            row(["form_start", "google", "organic", "current"], [20]),
            row(["form_start", "chatgpt.com", "referral", "current"], [5]),
            row(["form_submit", "google", "organic", "current"], [6]),
            row(["generate_lead", "google", "organic", "current"], [4]),
            row(["generate_lead", "chatgpt.com", "referral", "current"], [1]),
            row(["whatsapp_click", "(direct)", "(none)", "current"], [9]),
            row(["phone_click", "(direct)", "(none)", "current"], [3]),
            row(["form_start", "google", "organic", "previous"], [10]),
            row(["generate_lead", "google", "organic", "previous"], [2]),
            row(["whatsapp_click", "(direct)", "(none)", "previous"], [12]),
          ],
        });
      }
      if (dims === "sessionSource,sessionMedium") {
        return json(200, {
          ...headers(["sessionSource", "sessionMedium", "dateRange"]),
          rows: [row(["chatgpt.com", "referral", "current"], [11]), row(["perplexity.ai", "referral", "previous"], [3])],
        });
      }
      return json(200, { ...headers(["dateRange"]), rows: [row(["current"], mets.map(() => 100)), row(["previous"], mets.map(() => 80))] });
    }) as FetchFn;
    const range = (s: string, e: string) => ({ startDate: s, endDate: e });
    const cfg = { ga4PropertyId: "123", ga4HostNames: ["www.shinex.am", "shinex.am"] };
    const deps = { fetch, token: "tok", retry: { retries: 0, baseMs: 1 } };
    const cur = range("2026-11-15", "2026-11-21");
    const prev = range("2026-11-08", "2026-11-14");

    const ga4 = await collectGa4(cfg, deps, async () => "tok", cur, prev, { snapshotSource: "ga4", snapshotDate: "2026-11-22" });
    assert.equal(ga4.status.status, "WORKING", ga4.status.detail);
    const m = Object.fromEntries(ga4.metrics.map((x) => [x.metric, x]));
    assert.deepEqual([m["GA4 form_start"]!.current, m["GA4 form_start"]!.previous], [25, 10]);
    assert.deepEqual([m["GA4 form_submit"]!.current, m["GA4 form_submit"]!.previous], [6, 0]);
    assert.deepEqual([m["GA4 generate_lead"]!.current, m["GA4 generate_lead"]!.previous], [5, 2]);
    assert.deepEqual([m["GA4 whatsapp_click"]!.current, m["GA4 whatsapp_click"]!.previous], [9, 12]);
    assert.deepEqual([m["GA4 phone_click"]!.current, m["GA4 phone_click"]!.previous], [3, 0]);
    assert.deepEqual([m["GA4 form_start→generate_lead %"]!.current, m["GA4 form_start→generate_lead %"]!.previous], [20, 20]);
    assert.deepEqual([m["GA4 AI sessions"]!.current, m["GA4 AI sessions"]!.previous], [11, 3]);
    assert.deepEqual([m["GA4 AI generate_lead"]!.current, m["GA4 AI generate_lead"]!.previous], [1, 0]);
    assert.equal(m["GA4 lead rate %"]!.current, 5);
    const section = ga4.sections.find((x) => x.includes("воронка обращений"));
    assert.ok(section, "funnel section present");
    assert.match(section, /\| form_start \| 25 \| 10 \| \+150% \|/);
    assert.match(section, /\| chatgpt\.com \| referral \| 11 \| 0 \| 1 \| 0 \|/);

    const funnelBody = calls.find((c) => (c.body as { dimensions?: Array<{ name: string }> } | undefined)?.dimensions?.[0]?.name === "eventName")?.body as {
      dimensionFilter: { andGroup: { expressions: unknown[] } };
    };
    assert.deepEqual(funnelBody.dimensionFilter.andGroup.expressions, [
      { filter: { fieldName: "eventName", inListFilter: { values: ["form_start", "form_submit", "generate_lead", "whatsapp_click", "phone_click"] } } },
      HOST_FILTER,
    ]);

    calls.length = 0;
    const weekly = await collectGa4Funnel(cfg, deps, async () => "tok", cur, prev, { snapshotSource: "ga4-funnel", snapshotDate: "2026-11-22" });
    assert.equal(weekly.status.status, "WORKING", weekly.status.detail);
    assert.equal(calls.length, 2);
    for (const c of calls) assert.ok(JSON.stringify((c.body as { dimensionFilter: unknown }).dimensionFilter).includes(JSON.stringify(HOST_FILTER)));
    const wm = Object.fromEntries(weekly.metrics.map((x) => [x.metric, x.current]));
    assert.equal(wm["GA4 generate_lead"], 5);
    assert.equal(wm["GA4 AI sessions"], 11);
  });

  it("classifyError: a 403 without ACTION_NOT_PERMITTED stays plain BLOCKED", () => {
    const r = classifyError(new HttpError(403, JSON.stringify({ error: { status: "PERMISSION_DENIED", message: "nope" } })));
    assert.equal(r.status, "BLOCKED");
    assert.doesNotMatch(r.detail, /Explorer access/);
  });
});
