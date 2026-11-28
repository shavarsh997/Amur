import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { main } from "../src/cli.ts";
import { AI_PROMPTS, AI_PROMPT_LANGS, AI_PROMPT_SERVICES } from "../src/analysis/ai-prompts.ts";
import { analyzeAnswer, extractCompanies, isShinex, summarizeAiVisibility, weekOf, type AiVisibilityRecord } from "../src/analysis/ai-visibility.ts";
import { askGemini, askOpenAI, askPerplexity, isRejectedKey, probeEngine } from "../src/connectors/ai-engines.ts";
import { runHealth } from "../src/jobs/health.ts";
import { runAiVisibility } from "../src/jobs/ai-visibility.ts";
import { HttpError } from "../src/core/retry.ts";
import type { FetchFn } from "../src/connectors/http.ts";
import type { JobDeps } from "../src/jobs/context.ts";

type Call = { url: string; method: string; headers: Record<string, string>; body: unknown };

const json = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

/** Fake AI APIs routed by host; everything else fails (no real network). */
function fakeAi(answer: (prompt: string) => string = () => "1. **BuildCo** — builder\n2. **SHINEX** — construction company"): { fetch: FetchFn; calls: Call[] } {
  const calls: Call[] = [];
  const f = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    const raw = init?.body;
    const body = typeof raw === "string" && raw !== "" ? (JSON.parse(raw) as Record<string, unknown>) : undefined;
    calls.push({ url, method: init?.method ?? "GET", headers: Object.fromEntries(new Headers(init?.headers).entries()), body });
    const u = new URL(url);
    if (u.host === "api.openai.com" && u.pathname === "/v1/responses") {
      const text = answer(String(body?.input));
      return json(200, {
        model: "gpt-5-mini-test",
        output: [
          { type: "web_search_call", status: "completed" },
          { type: "message", content: [{ type: "output_text", text, annotations: [{ type: "url_citation", url: "https://www.shinex.am/ru", title: "SHINEX" }] }] },
        ],
      });
    }
    if (u.host === "api.openai.com" && u.pathname.startsWith("/v1/models/")) return json(200, { id: u.pathname.split("/").pop() });
    if (u.host === "api.perplexity.ai") {
      return json(200, { model: "sonar", choices: [{ message: { content: "- **Arka** — builder" } }], citations: ["https://arka.am/"], search_results: [{ url: "https://arka.am/", title: "Arka" }] });
    }
    if (u.host === "generativelanguage.googleapis.com") {
      if (init?.method === "GET") return json(200, { name: "models/gemini-2.5-flash" });
      return json(200, {
        modelVersion: "gemini-2.5-flash",
        candidates: [
          {
            content: { parts: [{ text: "Consider **Шайнекс** and " }, { text: "**Arka**." }] },
            groundingMetadata: { groundingChunks: [{ web: { uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/x", title: "shinex.am" } }] },
          },
        ],
      });
    }
    throw new Error(`network disabled in test: ${url}`);
  }) as FetchFn;
  return { fetch: f, calls };
}

const realFetch = globalThis.fetch;
const realStderrWrite = process.stderr.write;
let tmp = "";

const keys = (names: string[]) => async (name: string) => (names.includes(name) ? `test-${name}` : null);

function cli(argv: string[], extra: Partial<JobDeps> = {}): Promise<{ code: number; out: string }> {
  const lines: string[] = [];
  return main(argv, { secret: async () => null, retry: { retries: 0, baseMs: 1 }, out: (t) => lines.push(t), ...extra }).then((code) => ({
    code,
    out: lines.join("\n"),
  }));
}

describe("ai-visibility: prompts", () => {
  it("24 unique non-branded prompts, 8 per language, every service covered", () => {
    assert.equal(AI_PROMPTS.length, 24);
    assert.equal(new Set(AI_PROMPTS.map((p) => p.id)).size, 24);
    for (const lang of AI_PROMPT_LANGS) assert.equal(AI_PROMPTS.filter((p) => p.lang === lang).length, 8, lang);
    for (const s of AI_PROMPT_SERVICES) {
      for (const lang of AI_PROMPT_LANGS) assert.ok(AI_PROMPTS.some((p) => p.service === s && p.lang === lang), `${s}/${lang}`);
    }
    for (const p of AI_PROMPTS) assert.equal(isShinex(p.text), false, `${p.id} is non-branded`);
  });
});

describe("ai-visibility: answer parser", () => {
  it("ru: Cyrillic spelling, rank among numbered companies, labels and sub-items are not companies", () => {
    const text = [
      "Вот компании для ремонта квартиры в Ереване:",
      "",
      "1. **СтройМастер** — ремонт под ключ.",
      "   - Цена: от 60 000 драм/м²",
      "   - Сайт: stroymaster.am",
      "2. **Шайнекс** — строительная компания, фиксированная смета.",
      "3. Компания «АрмРемонт»: дизайн и ремонт.",
      "",
      "**Совет:** проверяйте договор.",
    ].join("\n");
    const a = analyzeAnswer(text, [{ url: "https://stroymaster.am/" }]);
    assert.equal(a.mentioned, true);
    assert.equal(a.rank, 2);
    assert.equal(a.cited, false);
    assert.deepEqual(a.competitors, ["СтройМастер", "АрмРемонт"]);
    assert.deepEqual(a.citedDomains, ["stroymaster.am"]);
  });

  it("hy: Armenian spelling at rank 1, cited through a shinex.am source", () => {
    const text = "Ահա մի քանի տարբերակ.\n- **Շայնեքս** — շինարարական ընկերություն Երևանում\n- **Arm Build LLC** — տների կառուցում\nԳինը՝ կախված նախագծից։";
    const a = analyzeAnswer(text, [{ url: "https://www.shinex.am/hy" }, { url: "https://armbuild.am/" }]);
    assert.equal(a.mentioned, true);
    assert.equal(a.rank, 1);
    assert.equal(a.cited, true);
    assert.deepEqual(a.competitors, ["Arm Build LLC"]);
    assert.deepEqual(a.citedDomains, ["armbuild.am"]);
  });

  it("en: unrelated 'ShinX' is not SHINEX; headings and markdown links are companies", () => {
    const text = "Top options:\n### 1. ShinX Group\nKnown for interiors.\n### 2. Yerevan Builders\n* **Pros:** fast\nAlso consider [Arka Construction](https://arka.am).";
    const a = analyzeAnswer(text, [{ url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/abc", title: "arka.am" }]);
    assert.equal(a.mentioned, false);
    assert.equal(a.rank, null);
    assert.equal(a.cited, false);
    assert.deepEqual(a.competitors, ["ShinX Group", "Yerevan Builders", "Arka Construction"]);
    assert.deepEqual(a.citedDomains, ["arka.am"]);
  });

  it("Latin SHINEX with a Cyrillic Х, in running text after a listed company; Gemini redirect titled shinex.am counts as cited", () => {
    const a = analyzeAnswer("- **BuildCo** — builder\n\nYou could also ask SHINEХ, a construction company, for a quote.", [
      { url: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/x", title: "shinex.am" },
    ]);
    assert.equal(a.mentioned, true);
    assert.equal(a.rank, 2);
    assert.equal(a.cited, true);
    assert.deepEqual(extractCompanies("1. **SHINEX** — строительная компания\n2. **Shinex LLC** — renovation"), ["SHINEX"]);
  });
});

describe("ai-visibility: other companies called Shinex", () => {
  it("cleaning Shinex with shinex.io is not SHINEX; it is listed as another company", () => {
    const a = analyzeAnswer("1. **Shinex** — клининговая компания в Ереване, shinex.io\n2. **BuildCo** — строительная компания");
    assert.equal(a.mentioned, false);
    assert.equal(a.rank, null);
    assert.deepEqual(a.competitors, ["Shinex (не SHINEX)", "BuildCo"]);
  });

  it("SHINEX — строительная компания is SHINEX; a name without context, cleaning words or shinex.co is not", () => {
    assert.equal(analyzeAnswer("SHINEX — строительная компания").mentioned, true);
    assert.equal(analyzeAnswer("Shinex").mentioned, false, "no construction/renovation context");
    assert.equal(analyzeAnswer("- **Shinex** — cleaning and renovation services").mentioned, false, "cleaning wins");
    assert.equal(analyzeAnswer("- **Shinex** (shinex.co) — renovation").mentioned, false, "foreign domain");
    assert.equal(analyzeAnswer("Շայնեքս — մաքրում և վերանորոգում").mentioned, false, "Armenian cleaning");
    assert.equal(analyzeAnswer("Ask Shinex: see shinex.am").mentioned, true, "shinex.am is enough");
  });

  it("context is per list item / paragraph: the cleaning Shinex does not count, ours in another item does", () => {
    const text = [
      "1. **Shinex** — клининг квартир после ремонта, shinex.io",
      "2. **СтройГрад** — строительство домов",
      "3. **SHINEX** — ремонт квартир под ключ",
      "",
      "### 4. Shinex Group",
      "",
      "Interior renovation in Yerevan.",
    ].join("\n");
    const a = analyzeAnswer(text);
    assert.equal(a.mentioned, true);
    assert.equal(a.rank, 3);
    assert.deepEqual(a.companies, ["Shinex (не SHINEX)", "СтройГрад", "SHINEX"]);
  });
});

describe("ai-visibility: connectors (mocked fetch)", () => {
  it("OpenAI Responses with web_search, Perplexity Sonar, Gemini with google_search: requests and parsing", async () => {
    const { fetch, calls } = fakeAi();
    const o = await askOpenAI("q1", { apiKey: "k-openai", fetch });
    assert.equal(o.model, "gpt-5-mini-test");
    assert.match(o.text, /SHINEX/);
    assert.deepEqual(o.citations, [{ url: "https://www.shinex.am/ru", title: "SHINEX" }]);
    const p = await askPerplexity("q2", { apiKey: "k-pplx", fetch });
    assert.deepEqual(p.citations, [{ url: "https://arka.am/", title: "Arka" }]);
    const g = await askGemini("q3", { apiKey: "k-gem", fetch });
    assert.equal(g.text, "Consider **Шайнекс** and **Arka**.");

    const [c1, c2, c3] = calls;
    assert.equal(c1!.url, "https://api.openai.com/v1/responses");
    assert.equal(c1!.headers.authorization, "Bearer k-openai");
    assert.equal((c1!.body as { tools: Array<{ type: string }> }).tools[0]!.type, "web_search");
    assert.equal(c2!.url, "https://api.perplexity.ai/chat/completions");
    assert.equal(c2!.headers.authorization, "Bearer k-pplx");
    assert.equal((c2!.body as { model: string }).model, "sonar");
    assert.equal(c3!.url, "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent");
    assert.equal(c3!.headers["x-goog-api-key"], "k-gem");
    assert.ok(!c3!.url.includes("k-gem"), "key not in URL");
    assert.deepEqual((c3!.body as { tools: unknown }).tools, [{ google_search: {} }]);
  });

  it("paid POSTs are not retried on 5xx or network errors; free GET probes are", async () => {
    const counts = { post: 0, get: 0 };
    const failing = (async (_input: string | URL | Request, init?: RequestInit) => {
      if (init?.method === "POST") {
        counts.post++;
        if (counts.post === 1) return json(503, { error: { message: "overloaded" } });
        throw new TypeError("fetch failed");
      }
      counts.get++;
      return counts.get === 1 ? json(500, { error: { message: "boom" } }) : json(200, { id: "gpt-5-mini" });
    }) as FetchFn;
    const deps = { apiKey: "k", fetch: failing, retry: { retries: 3, baseMs: 1 } };
    await assert.rejects(askOpenAI("q", deps), (e: unknown) => e instanceof HttpError && e.status === 503);
    assert.equal(counts.post, 1);
    await assert.rejects(askPerplexity("q", deps), /fetch failed/);
    assert.equal(counts.post, 2);
    assert.match(await probeEngine("openai", deps), /ключ принят/);
    assert.equal(counts.get, 2, "GET retried once after 500");
  });

  it("rejected keys are recognised (OpenAI 401, Gemini 400 API key not valid)", () => {
    assert.equal(isRejectedKey(new HttpError(401, JSON.stringify({ error: { message: "Incorrect API key provided", code: "invalid_api_key" } }))), true);
    assert.equal(isRejectedKey(new HttpError(400, JSON.stringify({ error: { message: "API key not valid. Please pass a valid API key.", status: "INVALID_ARGUMENT" } }))), true);
    assert.equal(isRejectedKey(new HttpError(500, "boom")), false);
  });
});

describe("ai-visibility: jobs and CLI (temp data dir)", () => {
  before(async () => {
    tmp = await mkdtemp(join(tmpdir(), "shinex-ma-ai-"));
    process.env.SHINEX_MA_DATA_DIR = join(tmp, "data");
    process.env.SHINEX_MA_ADC_PATH = join(tmp, "no-adc.json");
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

  it("report on an empty data dir prints an empty report, exit 0", async () => {
    const r = await cli(["ai-visibility", "report"]);
    assert.equal(r.code, 0, r.out);
    assert.match(r.out, /Данных AI-видимости нет/);
  });

  it("health: AI engines NOT CONFIGURED without keys and make no request; WORKING with a key", async () => {
    const none = fakeAi();
    const rows = await runHealth({ fetch: none.fetch, token: "tok", secret: async () => null, retry: { retries: 0, baseMs: 1 } });
    const by = Object.fromEntries(rows.map((r) => [r.name, r]));
    for (const n of ["ai-openai", "ai-perplexity", "ai-gemini"]) assert.equal(by[n]!.status, "NOT CONFIGURED", n);
    assert.equal(none.calls.filter((c) => /openai|perplexity|generativelanguage/.test(c.url)).length, 0);

    const net = fakeAi();
    const rows2 = await runHealth({
      fetch: net.fetch,
      token: "tok",
      secret: keys(["openai-api-key", "gemini-api-key", "perplexity-api-key"]),
      retry: { retries: 0, baseMs: 1 },
    });
    const by2 = Object.fromEntries(rows2.map((r) => [r.name, r]));
    assert.equal(by2["ai-openai"]!.status, "WORKING", by2["ai-openai"]!.detail);
    assert.equal(by2["ai-gemini"]!.status, "WORKING", by2["ai-gemini"]!.detail);
    assert.equal(by2["ai-perplexity"]!.status, "WORKING");
    assert.match(by2["ai-perplexity"]!.detail ?? "", /ключ есть, не проверялся запросом/);
    assert.equal(net.calls.filter((c) => c.url.includes("perplexity")).length, 0, "Perplexity health makes no (paid) request");
    assert.equal(net.calls.filter((c) => /openai|generativelanguage/.test(c.url) && c.method !== "GET").length, 0, "health uses only free GETs");
    assert.ok(net.calls.some((c) => c.url === "https://api.openai.com/v1/models/gpt-5-mini" && c.method === "GET"));
  });

  it("run: only engines with a key; results go to the data dir; same-day repeat is skipped; --force re-asks", async () => {
    const net = fakeAi();
    const deps: JobDeps = { fetch: net.fetch, secret: keys(["openai-api-key"]), retry: { retries: 0, baseMs: 1 } };
    const rows = await runAiVisibility({ limit: 3, date: "2026-11-20" }, deps);
    const by = Object.fromEntries(rows.map((r) => [r.engine, r]));
    assert.equal(by.openai!.status, "WORKING");
    assert.equal(by.openai!.done, 3);
    assert.equal(by.openai!.mentioned, 3);
    assert.equal(by.perplexity!.status, "NOT CONFIGURED");
    assert.equal(by.gemini!.status, "NOT CONFIGURED");
    assert.equal(net.calls.length, 3);
    assert.deepEqual(net.calls.map((c) => (c.body as { input: string }).input), AI_PROMPTS.slice(0, 3).map((p) => p.text));

    const lines = (await readFile(join(tmp, "data", "ai-visibility", "results.jsonl"), "utf8")).trim().split("\n");
    const recs = lines.map((l) => JSON.parse(l) as AiVisibilityRecord);
    assert.equal(recs.length, 3);
    assert.deepEqual(
      { engine: recs[0]!.engine, promptId: recs[0]!.promptId, mentioned: recs[0]!.mentioned, rank: recs[0]!.rank, cited: recs[0]!.cited, competitors: recs[0]!.competitors },
      { engine: "openai", promptId: "hy-house-1", mentioned: true, rank: 2, cited: true, competitors: ["BuildCo"] },
    );

    const again = await runAiVisibility({ engine: "openai", limit: 2, date: "2026-11-20" }, deps);
    assert.equal(again[0]!.skipped, 3);
    assert.deepEqual(net.calls.slice(3).map((c) => (c.body as { input: string }).input), AI_PROMPTS.slice(3, 5).map((p) => p.text), "continues with unchecked prompts");
    const forced = await runAiVisibility({ engine: "openai", limit: 1, date: "2026-11-20", force: true }, deps);
    assert.equal(forced[0]!.done, 1);

    await assert.rejects(runAiVisibility({ engine: "chatgpt" }, deps), /ai-visibility record/);
    const cliRun = await cli(["ai-visibility", "run", "--engine", "gemini", "--limit", "1"]);
    assert.equal(cliRun.code, 0, cliRun.out);
    assert.match(cliRun.out, /\| gemini \| NOT CONFIGURED \| нет ключа в Keychain .*gemini-api-key/);
  });

  it("record validates input; report shows share by engine and language, top-3, citations and competitors", async () => {
    const bad = [
      ["--engine", "bing", "--prompt-id", "ru-apartment-1", "--mentioned", "yes"],
      ["--engine", "chatgpt", "--prompt-id", "nope", "--mentioned", "yes"],
      ["--engine", "chatgpt", "--prompt-id", "ru-apartment-1", "--mentioned", "no", "--rank", "1"],
      ["--engine", "chatgpt", "--prompt-id", "ru-apartment-1", "--mentioned", "maybe"],
      ["--engine", "chatgpt", "--prompt-id", "ru-apartment-1"],
    ];
    for (const args of bad) assert.equal((await cli(["ai-visibility", "record", ...args])).code, 1, args.join(" "));

    const ok = await cli(["ai-visibility", "record", "--engine", "chatgpt", "--prompt-id", "ru-apartment-1", "--mentioned", "yes", "--rank", "4", "--cited", "no", "--competitors", "BuildCo, Arka", "--date", "2026-11-21"]);
    assert.equal(ok.code, 0, ok.out);
    assert.match(ok.out, /chatgpt ru-apartment-1 mentioned=yes rank=4 cited=no/);
    assert.equal((await cli(["ai-visibility", "record", "--engine", "ai-mode", "--prompt-id", "en-choice-1", "--mentioned", "no", "--date", "2026-11-21"])).code, 0);

    const rep = await cli(["ai-visibility", "report", "--date", "2026-11-22"]);
    assert.equal(rep.code, 0, rep.out);
    // openai: 5 distinct prompts (latest per prompt), all mentioned at rank 2 and cited.
    assert.match(rep.out, /\| openai \| 5 \| 100% \(5\/5\) \| 100% \(5\/5\) \| 100% \(5\/5\) \|/);
    assert.match(rep.out, /\| chatgpt \| 1 \| 100% \(1\/1\) \| 0% \(0\/1\) \| 0% \(0\/1\) \|/);
    assert.match(rep.out, /\| ai-mode \| 1 \| 0% \(0\/1\) \| 0% \(0\/1\) \| — \|/);
    assert.match(rep.out, /\| \*\*Всего\*\* \| 7 \| 85\.7% \(6\/7\) \| 71\.4% \(5\/7\) \| 83\.3% \(5\/6\) \|/);
    assert.match(rep.out, /\| en \| 1 \| 0% \(0\/1\)/);
    assert.match(rep.out, /\| BuildCo \| 6 \|/);
    assert.match(rep.out, /Динамика/);
    assert.match(rep.out, /\| 2026-11-16 \| 85\.7% \(6\/7\) \|/);

    assert.equal((await cli(["ai-visibility", "prompts"])).out.split("\n").filter((l) => /^\| (hy|ru|en)-/.test(l)).length, 24);
  });
});

describe("ai-visibility: aggregation", () => {
  const rec = (date: string, engine: string, promptId: string, mentioned: boolean, rank: number | null = null, ts = `${date}T10:00:00Z`): AiVisibilityRecord => ({
    date,
    ts,
    engine,
    promptId,
    lang: promptId.slice(0, 2),
    service: "x",
    source: "api",
    mentioned,
    rank,
    cited: false,
    competitors: [],
  });

  it("latest check per engine × prompt in the window; weekly dynamics", () => {
    const s = summarizeAiVisibility(
      [
        rec("2026-11-03", "openai", "ru-house-1", false),
        rec("2026-11-04", "openai", "ru-house-2", false),
        rec("2026-11-10", "openai", "ru-house-1", true, 1),
        rec("2026-11-10", "openai", "ru-house-1", false, null, "2026-11-10T09:00:00Z"),
        rec("2026-12-30", "openai", "ru-house-2", true, 1),
      ],
      { asOf: "2026-11-12" },
    );
    assert.equal(s.total.checks, 2);
    assert.equal(s.total.mentioned, 1);
    assert.equal(s.total.top3, 1);
    assert.deepEqual(s.dynamics.map((d) => [d.week, d.total.mentioned, d.total.checks]), [["2026-11-02", 0, 2], ["2026-11-09", 1, 1]]);
    assert.equal(weekOf("2026-11-29"), "2026-11-23");
  });
});
