import type { FunnelRecord, FunnelStage } from "./types.ts";

export const STAGES = ["visit", "lead", "qualified", "inspection", "contract"] as const satisfies readonly FunnelStage[];

/** Field names that would carry personal data; such records are rejected. */
const FORBIDDEN_FIELDS = new Set([
  "name", "fullname", "firstname", "lastname", "surname",
  "phone", "phonenumber", "tel", "telephone", "mobile",
  "email", "mail",
]);
const ALLOWED_FIELDS = new Set(["date", "stage", "channel", "landing", "service", "region", "reason"]);
const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_RE = /(?:\+?\d[\s\-().]*){9,}/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export class FunnelValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FunnelValidationError";
  }
}

const normKey = (k: string): string => k.toLowerCase().replace(/[^a-z]/g, "");

/** Validates an untrusted record; throws on personal-data fields, emails/phones in values, or bad stage/date. */
export function validateFunnelRecord(input: unknown): FunnelRecord {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    throw new FunnelValidationError("funnel record must be an object");
  }
  const obj = input as Record<string, unknown>;
  for (const key of Object.keys(obj)) {
    if (FORBIDDEN_FIELDS.has(normKey(key))) {
      throw new FunnelValidationError(`personal data field is not allowed: ${key}`);
    }
    if (!ALLOWED_FIELDS.has(key)) throw new FunnelValidationError(`unknown field: ${key}`);
  }
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    if (typeof value !== "string") throw new FunnelValidationError(`field ${key} must be a string`);
    if (EMAIL_RE.test(value)) throw new FunnelValidationError(`field ${key} looks like an email`);
    if (key !== "date" && PHONE_RE.test(value)) throw new FunnelValidationError(`field ${key} looks like a phone number`);
  }
  const { date, stage, channel } = obj;
  if (typeof date !== "string" || !DATE_RE.test(date)) throw new FunnelValidationError("date must be YYYY-MM-DD");
  if (typeof stage !== "string" || !(STAGES as readonly string[]).includes(stage)) {
    throw new FunnelValidationError(`stage must be one of ${STAGES.join(", ")}`);
  }
  if (typeof channel !== "string" || channel.trim() === "") throw new FunnelValidationError("channel is required");
  const record: FunnelRecord = { date, stage: stage as FunnelStage, channel };
  for (const k of ["landing", "service", "region", "reason"] as const) {
    const v = obj[k];
    if (typeof v === "string" && v !== "") record[k] = v;
  }
  return record;
}

export type StageConversion = { from: FunnelStage; to: FunnelStage; rate: number | null };

export type FunnelSummary = {
  total: number;
  counts: Record<FunnelStage, number>;
  /** Share of records at `from` that have a record at `to` (count(to)/count(from)); null when from is 0. */
  conversions: StageConversion[];
};

function summarize(records: FunnelRecord[]): FunnelSummary {
  const counts = Object.fromEntries(STAGES.map((s) => [s, 0])) as Record<FunnelStage, number>;
  for (const r of records) counts[r.stage] += 1;
  const conversions: StageConversion[] = [];
  for (let i = 0; i + 1 < STAGES.length; i++) {
    const from = STAGES[i];
    const to = STAGES[i + 1];
    conversions.push({ from, to, rate: counts[from] > 0 ? Math.round((counts[to] / counts[from]) * 10000) / 10000 : null });
  }
  return { total: records.length, counts, conversions };
}

export type FunnelGroupKey = "channel" | "landing" | "service" | "region";

/** Stage counts and stage-to-stage conversion, optionally per group and within [from, to] dates. */
export function aggregateFunnel(
  records: FunnelRecord[],
  opts: { groupBy?: FunnelGroupKey; from?: string; to?: string } = {},
): FunnelSummary & { groups?: Record<string, FunnelSummary> } {
  const inRange = records.filter((r) => (!opts.from || r.date >= opts.from) && (!opts.to || r.date <= opts.to));
  const summary = summarize(inRange);
  if (!opts.groupBy) return summary;
  const key = opts.groupBy;
  const buckets = new Map<string, FunnelRecord[]>();
  for (const r of inRange) {
    const g = r[key] ?? "(none)";
    const list = buckets.get(g) ?? [];
    list.push(r);
    buckets.set(g, list);
  }
  const groups: Record<string, FunnelSummary> = {};
  for (const [g, list] of buckets) groups[g] = summarize(list);
  return { ...summary, groups };
}
