import { after, afterEach, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { dataDir, today } from "../src/core/paths.ts";
import { loadConfig, saveConfig } from "../src/core/config.ts";
import { log } from "../src/core/log.ts";
import { HttpError, fetchJson, withRetry } from "../src/core/retry.ts";
import { runOnce } from "../src/core/ledger.ts";
import { latestBefore, listSnapshots, loadSnapshot, saveSnapshot } from "../src/core/store.ts";
import { AuthRequiredError, getAccessToken, quotaProject, resetTokenCache } from "../src/core/auth.ts";

const realFetch = globalThis.fetch;
const realStderrWrite = process.stderr.write;
let tmp = "";

type Call = { url: string; init?: RequestInit };

function mockFetch(responses: Array<Response | Error>): Call[] {
  const calls: Call[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(input instanceof Request ? input.url : input), init });
    const next = responses.shift();
    if (!next) throw new Error("unexpected fetch call");
    if (next instanceof Error) throw next;
    return next;
  }) as typeof fetch;
  return calls;
}

const json = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

describe("core", () => {
  before(async () => {
    tmp = await mkdtemp(join(tmpdir(), "shinex-ma-test-"));
    process.env.SHINEX_MA_DATA_DIR = join(tmp, "data");
    process.env.SHINEX_MA_ADC_PATH = join(tmp, "missing-adc.json");
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
    process.stderr.write = realStderrWrite;
    process.env.SHINEX_MA_ADC_PATH = join(tmp, "missing-adc.json");
    resetTokenCache();
  });

  after(async () => {
    await rm(tmp, { recursive: true, force: true });
  });

  describe("paths", () => {
    it("dataDir follows SHINEX_MA_DATA_DIR", () => {
      assert.equal(dataDir(), join(tmp, "data"));
    });

    it("today() uses Asia/Yerevan (UTC+4)", () => {
      assert.equal(today(new Date("2026-01-01T19:59:00Z")), "2026-01-01");
      assert.equal(today(new Date("2026-01-01T20:01:00Z")), "2026-01-02");
      assert.match(today(), /^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe("config", () => {
    it("missing file gives defaults, saveConfig merges and persists without defaults", async () => {
      const cfg = await loadConfig();
      assert.equal(cfg.siteUrl, "https://www.shinex.am");
      assert.equal(cfg.adsApiVersion, "v23");
      assert.deepEqual(cfg.ga4HostNames, ["www.shinex.am", "shinex.am"]);
      assert.equal(cfg.ga4PropertyId, undefined);

      await saveConfig({ ga4PropertyId: "123" });
      await saveConfig({ gcpProject: "proj-x" });
      const stored = JSON.parse(await readFile(join(dataDir(), "config.json"), "utf8"));
      assert.deepEqual(stored, { ga4PropertyId: "123", gcpProject: "proj-x" });
      const loaded = await loadConfig();
      assert.equal(loaded.ga4PropertyId, "123");
      assert.equal(loaded.siteUrl, "https://www.shinex.am");
    });
  });

  describe("log", () => {
    it("appends jsonl and redacts sensitive keys", async () => {
      process.stderr.write = (() => true) as typeof process.stderr.write;
      await log("info", "test.event", { count: 2, access_token: "ya29.secret", nested: { Authorization: "Bearer x" } });
      process.stderr.write = realStderrWrite;
      const text = await readFile(join(dataDir(), "logs", `${today()}.jsonl`), "utf8");
      const entry = JSON.parse(text.trim().split("\n").at(-1) ?? "{}");
      assert.equal(entry.level, "info");
      assert.equal(entry.event, "test.event");
      assert.equal(entry.count, 2);
      assert.equal(entry.access_token, "[redacted]");
      assert.equal(entry.nested.Authorization, "[redacted]");
      assert.ok(!text.includes("ya29.secret"));
      assert.ok(typeof entry.ts === "string");
    });
  });

  describe("retry", () => {
    it("fetchJson throws HttpError with status and body when !ok", async () => {
      mockFetch([new Response("nope", { status: 404 })]);
      await assert.rejects(fetchJson("https://example.test/x"), (err: unknown) => {
        assert.ok(err instanceof HttpError);
        assert.equal(err.status, 404);
        assert.equal(err.body, "nope");
        return true;
      });
    });

    it("retries on 429 and 5xx, then succeeds", async () => {
      const calls = mockFetch([
        new Response("slow down", { status: 429 }),
        new Response("boom", { status: 503 }),
        json(200, { ok: true }),
      ]);
      const res = await withRetry(() => fetchJson<{ ok: boolean }>("https://example.test/y"), { baseMs: 1 });
      assert.deepEqual(res, { ok: true });
      assert.equal(calls.length, 3);
    });

    it("retries on network errors", async () => {
      const calls = mockFetch([new TypeError("fetch failed"), json(200, { n: 1 })]);
      const res = await withRetry(() => fetchJson("https://example.test/z"), { baseMs: 1 });
      assert.deepEqual(res, { n: 1 });
      assert.equal(calls.length, 2);
    });

    it("does not retry other 4xx", async () => {
      const calls = mockFetch([new Response("bad", { status: 400 }), json(200, {})]);
      await assert.rejects(withRetry(() => fetchJson("https://example.test/a"), { baseMs: 1 }), HttpError);
      assert.equal(calls.length, 1);
    });

    it("gives up after retries+1 attempts", async () => {
      const calls = mockFetch([
        new Response("e", { status: 500 }),
        new Response("e", { status: 502 }),
        new Response("e", { status: 500 }),
      ]);
      await assert.rejects(
        withRetry(() => fetchJson("https://example.test/b"), { retries: 2, baseMs: 1 }),
        (err: unknown) => err instanceof HttpError && err.status === 500,
      );
      assert.equal(calls.length, 3);
    });
  });

  describe("ledger", () => {
    it("runOnce does not repeat a successful action", async () => {
      let n = 0;
      const first = await runOnce("job:ok", async () => ({ value: ++n }));
      const second = await runOnce("job:ok", async () => ({ value: ++n }));
      assert.deepEqual(first, { value: 1 });
      assert.deepEqual(second, { value: 1 });
      assert.equal(n, 1);
      const ledger = JSON.parse(await readFile(join(dataDir(), "ledger.json"), "utf8"));
      assert.equal(ledger["job:ok"].ok, true);
      assert.equal(ledger["job:ok"].key, "job:ok");
      assert.deepEqual(ledger["job:ok"].result, { value: 1 });
    });

    it("runOnce repeats a failed action and does not record failures", async () => {
      let n = 0;
      await assert.rejects(
        runOnce("job:flaky", async () => {
          n++;
          throw new Error("first attempt fails");
        }),
        /first attempt fails/,
      );
      const ledger = JSON.parse(await readFile(join(dataDir(), "ledger.json"), "utf8"));
      assert.equal(ledger["job:flaky"], undefined);
      const res = await runOnce("job:flaky", async () => {
        n++;
        return "done";
      });
      assert.equal(res, "done");
      assert.equal(n, 2);
    });

    it("concurrent runOnce calls with different keys are all recorded", async () => {
      await Promise.all(["c1", "c2", "c3", "c4"].map((k) => runOnce(k, async () => k)));
      const ledger = JSON.parse(await readFile(join(dataDir(), "ledger.json"), "utf8"));
      for (const k of ["c1", "c2", "c3", "c4"]) assert.equal(ledger[k].result, k);
    });
  });

  describe("store", () => {
    it("saves, loads, lists and finds latest snapshot before a date", async () => {
      assert.equal(await loadSnapshot("gsc", "2026-01-01"), null);
      assert.deepEqual(await listSnapshots("gsc"), []);
      assert.equal(await latestBefore("gsc", "2026-01-10"), null);

      await saveSnapshot("gsc", "2026-01-05", { clicks: 5 });
      await saveSnapshot("gsc", "2026-01-01", { clicks: 1 });
      await saveSnapshot("gsc", "2026-01-10", { clicks: 10 });

      assert.deepEqual(await loadSnapshot("gsc", "2026-01-05"), { clicks: 5 });
      assert.deepEqual(await listSnapshots("gsc"), ["2026-01-01", "2026-01-05", "2026-01-10"]);
      assert.deepEqual(await latestBefore("gsc", "2026-01-10"), { date: "2026-01-05", data: { clicks: 5 } });
      assert.equal(await latestBefore("gsc", "2026-01-01"), null);
    });

    it("rejects path-traversal sources and bad dates", async () => {
      await assert.rejects(saveSnapshot("../x", "2026-01-01", {}));
      await assert.rejects(saveSnapshot("gsc", "2026/01/01", {}));
    });
  });

  describe("auth", () => {
    it("throws AuthRequiredError without ADC and makes no network call", async () => {
      const calls = mockFetch([]);
      await assert.rejects(getAccessToken(), AuthRequiredError);
      assert.equal(calls.length, 0);
    });

    it("throws AuthRequiredError for non-authorized_user ADC", async () => {
      const p = join(tmp, "sa-adc.json");
      await writeFile(p, JSON.stringify({ type: "service_account", client_email: "x@y" }));
      process.env.SHINEX_MA_ADC_PATH = p;
      mockFetch([]);
      await assert.rejects(getAccessToken(), AuthRequiredError);
    });

    it("exchanges refresh token, caches until expiry, and reads quota project", async () => {
      const p = join(tmp, "adc.json");
      await writeFile(
        p,
        JSON.stringify({
          type: "authorized_user",
          client_id: "cid",
          client_secret: "csecret",
          refresh_token: "rtok",
          quota_project_id: "quota-proj",
        }),
      );
      process.env.SHINEX_MA_ADC_PATH = p;
      const calls = mockFetch([json(200, { access_token: "at-1", expires_in: 3600 })]);

      assert.equal(await getAccessToken(), "at-1");
      assert.equal(await getAccessToken(), "at-1");
      assert.equal(calls.length, 1);
      assert.equal(calls[0].url, "https://oauth2.googleapis.com/token");
      assert.equal(calls[0].init?.method, "POST");
      const body = new URLSearchParams(String(calls[0].init?.body));
      assert.equal(body.get("grant_type"), "refresh_token");
      assert.equal(body.get("refresh_token"), "rtok");
      assert.equal(await quotaProject(), "quota-proj");
    });

    it("maps a rejected refresh token (400) to AuthRequiredError", async () => {
      const p = join(tmp, "adc-bad.json");
      await writeFile(
        p,
        JSON.stringify({ type: "authorized_user", client_id: "c", client_secret: "s", refresh_token: "r" }),
      );
      process.env.SHINEX_MA_ADC_PATH = p;
      mockFetch([json(400, { error: "invalid_grant" })]);
      await assert.rejects(getAccessToken(), AuthRequiredError);
    });

    it("quotaProject falls back to config.gcpProject without ADC", async () => {
      await saveConfig({ gcpProject: "cfg-proj" });
      assert.equal(await quotaProject(), "cfg-proj");
    });
  });
});
