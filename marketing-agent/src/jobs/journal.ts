import { randomBytes } from "node:crypto";
import { appendFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { dataDir, ensureDir, today } from "../core/paths.ts";
import { aggregateFunnel, STAGES, validateFunnelRecord, type FunnelGroupKey, type FunnelSummary } from "../analysis/funnel.ts";
import type { FunnelRecord } from "../analysis/types.ts";
import { assertDate, mdTable } from "./context.ts";

/** Append-only JSONL journals: funnel/leads.jsonl and memory/experiments.jsonl. */

export const funnelPath = (): string => join(dataDir(), "funnel", "leads.jsonl");
export const memoryPath = (): string => join(dataDir(), "memory", "experiments.jsonl");

async function readJsonl<T>(path: string): Promise<T[]> {
  let text: string;
  try {
    text = await readFile(path, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
  return text
    .split("\n")
    .filter((l) => l.trim() !== "")
    .map((l) => JSON.parse(l) as T);
}

async function appendJsonl(path: string, value: unknown): Promise<void> {
  await ensureDir(dirname(path));
  await appendFile(path, JSON.stringify(value) + "\n", "utf8");
}

// ---------- funnel ----------

/** Validates (no personal data) and appends a funnel record. `fields` are raw CLI flags. */
export async function addFunnelRecord(fields: Record<string, string>): Promise<FunnelRecord> {
  const record = validateFunnelRecord({ date: today(), ...fields });
  await appendJsonl(funnelPath(), record);
  return record;
}

export async function readFunnel(): Promise<FunnelRecord[]> {
  return readJsonl<FunnelRecord>(funnelPath());
}

const rate = (r: number | null): string => (r === null ? "—" : `${Math.round(r * 1000) / 10}%`);

function summaryRows(s: FunnelSummary): unknown[][] {
  return STAGES.map((stage, i) => {
    const conv = i > 0 ? s.conversions[i - 1] : undefined;
    return [stage, s.counts[stage], conv ? rate(conv.rate) : "—"];
  });
}

/** Markdown funnel summary (overall + per group) for the given date window. */
export async function funnelMarkdown(opts: { from?: string; to?: string; groupBy?: FunnelGroupKey } = {}): Promise<string> {
  const records = await readFunnel();
  const groupBy = opts.groupBy ?? "channel";
  const agg = aggregateFunnel(records, { from: opts.from, to: opts.to, groupBy });
  const window = opts.from || opts.to ? `${opts.from ?? "…"} — ${opts.to ?? "…"}` : "всё время";
  if (agg.total === 0) return `Записей воронки нет (${window}). Добавляйте: \`funnel add --stage lead --channel google-ads\`.`;
  const out = [`Период: ${window}; записей: ${agg.total}`, "", mdTable(["Стадия", "Записей", "Конверсия из предыдущей"], summaryRows(agg))];
  if (agg.groups) {
    const groups = Object.entries(agg.groups).sort((a, b) => b[1].total - a[1].total);
    out.push(
      "",
      `По ${groupBy}:`,
      "",
      mdTable(
        [groupBy, ...STAGES, "lead→contract"],
        groups.map(([g, s]) => [g, ...STAGES.map((st) => s.counts[st]), s.counts.lead > 0 ? rate(s.counts.contract / s.counts.lead) : "—"]),
      ),
    );
  }
  return out.join("\n");
}

// ---------- experiments memory ----------

export const EXPERIMENT_STATUSES = ["proposed", "approved", "applied", "rejected", "won", "lost", "inconclusive"] as const;
export type ExperimentStatus = (typeof EXPERIMENT_STATUSES)[number];

export type Experiment = {
  id: string;
  date: string;
  area: string;
  hypothesis: string;
  change: string;
  status: ExperimentStatus;
  result?: string;
  notes?: string;
};

export async function addExperiment(fields: Record<string, string>): Promise<Experiment> {
  const allowed = new Set(["date", "area", "hypothesis", "change", "status", "result", "notes"]);
  for (const k of Object.keys(fields)) if (!allowed.has(k)) throw new Error(`unknown field: --${k}`);
  for (const k of ["area", "hypothesis", "change"] as const) {
    if (!fields[k]?.trim()) throw new Error(`--${k} is required`);
  }
  const status = (fields.status ?? "proposed") as ExperimentStatus;
  if (!EXPERIMENT_STATUSES.includes(status)) throw new Error(`--status must be one of ${EXPERIMENT_STATUSES.join(", ")}`);
  const date = assertDate(fields.date ?? today());
  const exp: Experiment = {
    id: `exp-${date.replace(/-/g, "")}-${randomBytes(3).toString("hex")}`,
    date,
    area: fields.area!.trim(),
    hypothesis: fields.hypothesis!.trim(),
    change: fields.change!.trim(),
    status,
  };
  if (fields.result) exp.result = fields.result;
  if (fields.notes) exp.notes = fields.notes;
  await appendJsonl(memoryPath(), exp);
  return exp;
}

export async function listExperiments(filter: { status?: string; area?: string } = {}): Promise<Experiment[]> {
  return (await readJsonl<Experiment>(memoryPath())).filter(
    (e) => (!filter.status || e.status === filter.status) && (!filter.area || e.area === filter.area),
  );
}

export function experimentsMarkdown(list: Experiment[]): string {
  if (list.length === 0) return "Экспериментов нет.";
  return mdTable(
    ["ID", "Дата", "Область", "Гипотеза", "Изменение", "Статус", "Результат"],
    list.map((e) => [e.id, e.date, e.area, e.hypothesis, e.change, e.status, e.result ?? ""]),
  );
}
