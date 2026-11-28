import { join } from "node:path";
import { loadConfig } from "../core/config.ts";
import { log } from "../core/log.ts";
import { dataDir, today } from "../core/paths.ts";
import { AI_PROMPTS, findPrompt } from "../analysis/ai-prompts.ts";
import {
  AI_API_ENGINES,
  AI_ENGINES,
  analyzeAnswer,
  summarizeAiVisibility,
  type AiApiEngine,
  type AiShare,
  type AiVisibilityRecord,
} from "../analysis/ai-visibility.ts";
import type { IntegrationState } from "../analysis/types.ts";
import { AI_KEY_NAMES, askEngine, isRejectedKey } from "../connectors/ai-engines.ts";
import { assertDate, classifyError, mdTable, secret, type JobDeps } from "./context.ts";
import { appendJsonl, readJsonl } from "./journal.ts";

/** Results live in the data directory only (the repository is public). */
export const aiVisibilityPath = (): string => join(dataDir(), "ai-visibility", "results.jsonl");

export const readAiVisibility = (): Promise<AiVisibilityRecord[]> => readJsonl<AiVisibilityRecord>(aiVisibilityPath());

const MAX_ANSWER_CHARS = 8000;

// ---------- run (API engines) ----------

export type AiRunOptions = { engine?: string; limit?: number; date?: string; force?: boolean };

export type AiEngineRun = { engine: AiApiEngine; status: IntegrationState; detail: string; done: number; mentioned: number; failed: number; skipped: number };

export async function runAiVisibility(opts: AiRunOptions, deps: JobDeps = {}): Promise<AiEngineRun[]> {
  if (opts.engine !== undefined && !(AI_API_ENGINES as readonly string[]).includes(opts.engine)) {
    const manual = (AI_ENGINES as readonly string[]).includes(opts.engine);
    throw new Error(
      manual
        ? `${opts.engine}: нет API — вводите вручную: ai-visibility record --engine ${opts.engine} ...`
        : `--engine must be one of ${AI_API_ENGINES.join(", ")}`,
    );
  }
  if (opts.limit !== undefined && (!Number.isInteger(opts.limit) || opts.limit < 1)) throw new Error("--limit must be a positive integer");
  const date = assertDate(opts.date ?? today());
  const engines = opts.engine ? [opts.engine as AiApiEngine] : [...AI_API_ENGINES];
  const cfg = await loadConfig();
  const existing = await readAiVisibility();
  const out: AiEngineRun[] = [];

  for (const engine of engines) {
    const keyName = AI_KEY_NAMES[engine];
    const apiKey = await secret(deps, keyName);
    if (!apiKey) {
      out.push({ engine, status: "NOT CONFIGURED", detail: `нет ключа в Keychain (сервис shinex-marketing, имя ${keyName})`, done: 0, mentioned: 0, failed: 0, skipped: 0 });
      continue;
    }
    const doneToday = new Set(existing.filter((r) => r.engine === engine && r.date === date && r.source === "api").map((r) => r.promptId));
    const pending = AI_PROMPTS.filter((p) => opts.force || !doneToday.has(p.id));
    const queue = pending.slice(0, opts.limit ?? pending.length);
    const run: AiEngineRun = { engine, status: "WORKING", detail: "", done: 0, mentioned: 0, failed: 0, skipped: AI_PROMPTS.length - pending.length };
    let lastError = "";
    for (const prompt of queue) {
      try {
        const answer = await askEngine(engine, prompt.text, { apiKey, model: cfg.aiModels?.[engine], fetch: deps.fetch, retry: deps.retry });
        const a = analyzeAnswer(answer.text, answer.citations);
        const record: AiVisibilityRecord = {
          date,
          ts: new Date().toISOString(),
          engine,
          promptId: prompt.id,
          lang: prompt.lang,
          service: prompt.service,
          source: "api",
          mentioned: a.mentioned,
          rank: a.rank,
          cited: a.cited,
          competitors: a.competitors,
          citedDomains: a.citedDomains,
          model: answer.model,
          answer: answer.text.slice(0, MAX_ANSWER_CHARS),
          citations: answer.citations.slice(0, 30),
        };
        await appendJsonl(aiVisibilityPath(), record);
        run.done++;
        if (a.mentioned) run.mentioned++;
      } catch (err) {
        run.failed++;
        const c = classifyError(err);
        lastError = c.detail;
        if (isRejectedKey(err)) {
          run.status = "AUTH REQUIRED";
          lastError = `ключ ${keyName} отклонён — ${c.detail}`;
          break;
        }
        if (c.status === "BLOCKED" || c.status === "AUTH REQUIRED") {
          run.status = c.status;
          break; // quota/permission problems repeat for every prompt
        }
        run.status = "FAILED";
      }
    }
    if (run.failed && run.done && run.status === "FAILED") run.status = "WORKING";
    const parts = [`проверено ${run.done}, упоминаний ${run.mentioned}`];
    if (run.skipped) parts.push(`уже проверено сегодня ${run.skipped} (повтор: --force)`);
    if (run.failed) parts.push(`ошибок ${run.failed}: ${lastError}`);
    run.detail = parts.join("; ");
    await log("info", "ai-visibility.run", { engine, date, status: run.status, done: run.done, failed: run.failed });
    out.push(run);
  }
  return out;
}

export function formatAiRun(rows: AiEngineRun[]): string {
  return mdTable(["Движок", "Статус", "Детали"], rows.map((r) => [r.engine, r.status, r.detail]));
}

// ---------- record (manual browser checks) ----------

const yesNo = (v: string | undefined, flag: string): boolean => {
  const s = String(v ?? "").trim().toLowerCase();
  if (s === "yes" || s === "y" || s === "да") return true;
  if (s === "no" || s === "n" || s === "нет") return false;
  throw new Error(`${flag} must be yes|no`);
};

const RECORD_FLAGS = ["engine", "prompt-id", "mentioned", "rank", "cited", "competitors", "date"];

/** Validates CLI flags and appends a manual check. */
export async function recordAiVisibility(flags: Record<string, string>): Promise<AiVisibilityRecord> {
  for (const k of Object.keys(flags)) if (!RECORD_FLAGS.includes(k)) throw new Error(`unknown option: --${k}`);
  const engine = flags.engine?.trim().toLowerCase() ?? "";
  if (!(AI_ENGINES as readonly string[]).includes(engine)) throw new Error(`--engine must be one of ${AI_ENGINES.join(", ")}`);
  const prompt = findPrompt(flags["prompt-id"]?.trim() ?? "");
  if (!prompt) throw new Error(`--prompt-id must be one of the prompt ids (see: ai-visibility prompts)`);
  if (flags.mentioned === undefined) throw new Error("--mentioned yes|no is required");
  const mentioned = yesNo(flags.mentioned, "--mentioned");
  let rank: number | null = null;
  if (flags.rank !== undefined) {
    if (!mentioned) throw new Error("--rank only with --mentioned yes");
    if (!/^\d{1,3}$/.test(flags.rank) || Number(flags.rank) < 1) throw new Error("--rank must be a positive integer");
    rank = Number(flags.rank);
  }
  const cited = flags.cited === undefined ? null : yesNo(flags.cited, "--cited");
  const competitors = (flags.competitors ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20);
  const record: AiVisibilityRecord = {
    date: assertDate(flags.date ?? today()),
    ts: new Date().toISOString(),
    engine,
    promptId: prompt.id,
    lang: prompt.lang,
    service: prompt.service,
    source: "manual",
    mentioned,
    rank,
    cited,
    competitors,
  };
  await appendJsonl(aiVisibilityPath(), record);
  return record;
}

// ---------- report ----------

const share = (n: number, d: number): string => (d === 0 ? "—" : `${Math.round((n / d) * 1000) / 10}% (${n}/${d})`);

const shareRow = (label: string, s: AiShare): unknown[] => [
  label,
  s.checks,
  share(s.mentioned, s.checks),
  share(s.top3, s.checks),
  share(s.cited, s.citedKnown),
];

const SHARE_HEADER = ["Проверок", "Упоминание SHINEX", "В топ-3", "Цитирование shinex.am"];

export function promptsMarkdown(): string {
  return mdTable(["ID", "Язык", "Услуга", "Промпт"], AI_PROMPTS.map((p) => [p.id, p.lang, p.service, p.text]));
}

/** Markdown report from stored results (no network). */
export async function aiVisibilityMarkdown(opts: { asOf?: string } = {}): Promise<string> {
  const asOf = assertDate(opts.asOf ?? today());
  const records = await readAiVisibility();
  const s = summarizeAiVisibility(records, { asOf });
  if (s.total.checks === 0 && s.dynamics.length === 0) {
    return `Данных AI-видимости нет (окно ${s.window.from} — ${s.window.to}). Запустите \`ai-visibility run\` (OpenAI/Perplexity/Gemini) или добавьте ручную проверку \`ai-visibility record --engine chatgpt --prompt-id ru-apartment-1 --mentioned no\`.`;
  }
  const out: string[] = [
    `Окно: ${s.window.from} — ${s.window.to}; последняя проверка на движок × промпт; промптов в наборе: ${AI_PROMPTS.length} (небрендовые, hy/ru/en).`,
    "",
  ];
  if (s.total.checks === 0) {
    out.push("За окно проверок нет.");
  } else {
    out.push(
      mdTable(["Движок", ...SHARE_HEADER], [...Object.entries(s.byEngine).sort().map(([k, v]) => shareRow(k, v)), shareRow("**Всего**", s.total)]),
      "",
      mdTable(["Язык", ...SHARE_HEADER], Object.entries(s.byLang).sort().map(([k, v]) => shareRow(k, v))),
    );
    if (s.competitors.length) {
      out.push("", "Конкуренты, которых называют чаще всего:", "", mdTable(["Компания", "Ответов"], s.competitors.map((c) => [c.name, c.count])));
    }
  }
  if (s.dynamics.length) {
    const engines = [...new Set(s.dynamics.flatMap((d) => Object.keys(d.byEngine)))].sort();
    out.push(
      "",
      "Динамика (доля ответов с упоминанием SHINEX по неделям):",
      "",
      mdTable(
        ["Неделя с", "Всего", ...engines],
        s.dynamics.map((d) => [d.week, share(d.total.mentioned, d.total.checks), ...engines.map((e) => (d.byEngine[e] ? share(d.byEngine[e]!.mentioned, d.byEngine[e]!.checks) : "—"))]),
      ),
    );
  }
  return out.join("\n");
}
