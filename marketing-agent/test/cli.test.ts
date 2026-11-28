import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { main, parseArgs } from "../src/cli.ts";
import { resetTokenCache } from "../src/core/auth.ts";
import { today } from "../src/core/paths.ts";
import { classifyError, previousMonths } from "../src/jobs/context.ts";
import { HttpError } from "../src/core/retry.ts";
import { PSI_URL } from "../src/connectors/psi.ts";
import type { FetchFn } from "../src/connectors/http.ts";
import type { JobDeps } from "../src/jobs/context.ts";
import type { IntegrationStatus } from "../src/analysis/types.ts";

const SITE = "https://www.shinex.am";

const html = (title: string, path: string): string =>
  `<!doctype html><html><head><title>${title}</title><meta name="description" content="${title} desc">` +
  `<link rel="canonical" href="${SITE}${path}"></head><body><h1>${title}</h1><a href="/hy/renovation">r</a></body></html>`;

/** Routed fake fetch: the test site and PSI only; any other host fails (no network). */
function fakeNetwork(): { fetch: FetchFn; calls: string[] } {
  const calls: string[] = [];
  const f = (async (input: string | URL | Request) => {
    const url = String(input instanceof Request ? input.url : input);
    calls.push(url);
    const u = new URL(url);
    if (url.startsWith(PSI_URL)) {
      return new Response(JSON.stringify({ lighthouseResult: { categories: { performance: { score: 0.91 } }, audits: {} } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (u.origin !== SITE) throw new Error(`network disabled in test: ${url}`);
    if (u.pathname === "/robots.txt") return new Response(`User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`, { status: 200 });
    if (u.pathname === "/sitemap.xml") {
      return new Response(
        `<?xml version="1.0"?><urlset><url><loc>${SITE}/</loc></url><url><loc>${SITE}/hy/renovation</loc></url></urlset>`,
        { status: 200, headers: { "content-type": "application/xml" } },
      );
    }
    if (u.pathname === "/") return new Response(html("SHINEX", "/"), { status: 200, headers: { "content-type": "text/html" } });
    if (u.pathname === "/hy/renovation") {
      return new Response(html("Renovation", "/hy/renovation"), { status: 200, headers: { "content-type": "text/html" } });
    }
    return new Response("not found", { status: 404, headers: { "content-type": "text/html" } });
  }) as FetchFn;
  return { fetch: f, calls };
}

const realFetch = globalThis.fetch;
const realStderrWrite = process.stderr.write;
let tmp = "";

function run(argv: string[], extra: Partial<JobDeps> = {}): Promise<{ code: number; out: string; calls: string[] }> {
  const net = fakeNetwork();
  const lines: string[] = [];
  return main(argv, {
    fetch: net.fetch,
    secret: async () => null,
    retry: { retries: 0, baseMs: 1 },
    out: (t) => lines.push(t),
    ...extra,
  }).then((code) => ({ code, out: lines.join("\n"), calls: net.calls }));
}

describe("cli", () => {
  before(async () => {
    tmp = await mkdtemp(join(tmpdir(), "shinex-ma-cli-"));
    process.env.SHINEX_MA_DATA_DIR = join(tmp, "data");
    process.env.SHINEX_MA_ADC_PATH = join(tmp, "no-adc.json");
    resetTokenCache();
    // Job logs go to stderr; keep test output readable.
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

  it("health --json: Google sources AUTH REQUIRED without ADC, site and pagespeed WORKING, AI engines NOT CONFIGURED, exit 0", async () => {
    const { code, out } = await run(["health", "--json"]);
    assert.equal(code, 0);
    const rows = JSON.parse(out) as IntegrationStatus[];
    const by = Object.fromEntries(rows.map((r) => [r.name, r.status]));
    assert.deepEqual(by, {
      "gcp-auth": "AUTH REQUIRED",
      ga4: "AUTH REQUIRED",
      gsc: "AUTH REQUIRED",
      "google-ads": "AUTH REQUIRED",
      pagespeed: "WORKING",
      site: "WORKING",
      "ai-openai": "NOT CONFIGURED",
      "ai-perplexity": "NOT CONFIGURED",
      "ai-gemini": "NOT CONFIGURED",
    });
    for (const r of rows) assert.ok(r.detail, `${r.name} has a reason`);
    assert.match(rows.find((r) => r.name === "ai-openai")!.detail ?? "", /openai-api-key/);
  });

  it("health prints a table", async () => {
    const { code, out } = await run(["health"]);
    assert.equal(code, 0);
    assert.match(out, /^SOURCE\s+STATUS\s+DETAIL/);
    assert.match(out, /google-ads\s+AUTH REQUIRED/);
    assert.match(out, /site\s+WORKING/);
  });

  it("daily writes a report with integration statuses; ledger prevents a second run; --force re-runs", async () => {
    const first = await run(["daily"]);
    assert.equal(first.code, 0, first.out);
    const reportPath = join(tmp, "data", "reports", `daily-${today()}.md`);
    assert.ok(first.out.includes(`Отчёт: ${reportPath}`), first.out);
    assert.match(first.out, /ga4=AUTH REQUIRED/);
    const md = await readFile(reportPath, "utf8");
    assert.match(md, /## Интеграции/);
    assert.match(md, /\| ga4 \| AUTH REQUIRED \|/);
    assert.match(md, /\| google-ads \| AUTH REQUIRED \|/);
    assert.match(md, /\| site \| WORKING \|/);
    assert.match(md, /## Детализация/);
    assert.deepEqual(await readdir(join(tmp, "data", "snapshots", "site")), [`${today()}.json`]);
    assert.ok(first.calls.every((u) => u.startsWith(SITE)), "daily only touched the fake site");

    const second = await run(["daily"]);
    assert.equal(second.code, 0);
    assert.match(second.out, /Уже выполнено/);
    assert.equal(second.calls.length, 0, "no collection on a repeated run");

    const forced = await run(["daily", "--force"]);
    assert.equal(forced.code, 0);
    assert.doesNotMatch(forced.out, /Уже выполнено/);
    assert.ok(forced.calls.length > 0);
  });

  it("daily --force overwrites the main ledger key; the next plain run prints the forced result", async () => {
    const date = "2026-10-01";
    const first = await run(["daily", "--date", date]);
    assert.equal(first.code, 0, first.out);
    assert.match(first.out, /site=WORKING/);

    const offline = (async () => {
      throw new Error("site offline in test");
    }) as FetchFn;
    const forced = await run(["daily", "--force", "--date", date], { fetch: offline });
    assert.equal(forced.code, 0, forced.out);
    assert.doesNotMatch(forced.out, /Уже выполнено/);
    assert.doesNotMatch(forced.out, /site=WORKING/);
    const forcedSources = forced.out.split("\n").find((l) => l.startsWith("Источники:"));
    assert.ok(forcedSources, forced.out);

    const again = await run(["daily", "--date", date]);
    assert.equal(again.code, 0, again.out);
    assert.match(again.out, /Уже выполнено \(ledger: daily:2026-10-01\)/);
    assert.equal(again.calls.length, 0, "no collection on a repeated run");
    assert.ok(again.out.includes(forcedSources), again.out);
    assert.doesNotMatch(again.out, /site=WORKING/);

    const ledger = JSON.parse(await readFile(join(tmp, "data", "ledger.json"), "utf8")) as Record<string, unknown>;
    assert.deepEqual(Object.keys(ledger).filter((k) => k.startsWith(`daily:${date}`)), [`daily:${date}`]);
  });

  it("weekly report contains the AI visibility block from stored data (no AI API calls)", async () => {
    const date = "2026-10-05";
    const rec = await run(["ai-visibility", "record", "--engine", "chatgpt", "--prompt-id", "ru-apartment-1", "--mentioned", "yes", "--rank", "2", "--date", date]);
    assert.equal(rec.code, 0, rec.out);
    const weekly = await run(["weekly", "--date", date]);
    assert.equal(weekly.code, 0, weekly.out);
    const md = await readFile(join(tmp, "data", "reports", `weekly-${date}.md`), "utf8");
    assert.match(md, /### AI-видимость/);
    assert.match(md, /\| chatgpt \| 1 \| 100% \(1\/1\) \| 100% \(1\/1\) \| — \|/);
    assert.ok(weekly.calls.every((u) => u.startsWith(SITE) || u.startsWith(PSI_URL)), "no AI API calls from weekly");
  });

  it("funnel add rejects personal data and report aggregates", async () => {
    const bad = await run(["funnel", "add", "--stage", "lead", "--channel", "ads", "--phone", "+37491000000"]);
    assert.equal(bad.code, 1);
    assert.match(bad.out, /personal data/);
    assert.equal((await run(["funnel", "add", "--stage", "lead", "--channel", "google-ads", "--date", "2026-11-01"])).code, 0);
    assert.equal((await run(["funnel", "add", "--stage", "contract", "--channel", "google-ads", "--date", "2026-11-02"])).code, 0);
    const rep = await run(["funnel", "report"]);
    assert.equal(rep.code, 0);
    assert.match(rep.out, /\| lead \| 1 \|/);
    assert.match(rep.out, /google-ads/);
  });

  it("memory add|list", async () => {
    const add = await run(["memory", "add", "--area", "ads", "--hypothesis", "minus jobs", "--change", "negative 'работа'"]);
    assert.equal(add.code, 0, add.out);
    const list = await run(["memory", "list", "--status", "proposed"]);
    assert.match(list.out, /minus jobs/);
    assert.equal((await run(["memory", "add", "--area", "ads"])).code, 1);
  });

  it("helpers: arg parsing, error classification, month ranges", () => {
    assert.deepEqual(parseArgs(["daily", "--force", "--date=2026-11-01"]), { positionals: ["daily"], flags: { force: "true", date: "2026-11-01" } });
    const disabled = new HttpError(403, JSON.stringify({ error: { status: "PERMISSION_DENIED", message: "Google Analytics Data API has not been used in project 1" } }));
    assert.equal(classifyError(disabled).status, "BLOCKED");
    assert.equal(classifyError(new HttpError(401, JSON.stringify({ error: { status: "UNAUTHENTICATED", message: "Invalid Credentials" } }))).status, "AUTH REQUIRED");
    assert.equal(classifyError(new HttpError(500, "boom")).status, "FAILED");
    assert.deepEqual(previousMonths("2026-01-15"), {
      month: "2025-12",
      current: { startDate: "2025-12-01", endDate: "2025-12-31" },
      previous: { startDate: "2025-11-01", endDate: "2025-11-30" },
    });
  });
});
