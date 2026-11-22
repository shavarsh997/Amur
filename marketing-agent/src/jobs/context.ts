import { AuthRequiredError, getAccessToken, keychainSecret } from "../core/auth.ts";
import { HttpError, type RetryOptions } from "../core/retry.ts";
import type { ConnectorDeps, FetchFn } from "../connectors/http.ts";
import type { IntegrationState, IntegrationStatus } from "../analysis/types.ts";

/** Injectable dependencies for CLI jobs (tests pass a fake fetch, no-op secrets and an output sink). */
export type JobDeps = {
  fetch?: FetchFn;
  /** Static OAuth token (skips ADC). */
  token?: string;
  /** Keychain lookup override. */
  secret?: (name: string) => Promise<string | null>;
  retry?: RetryOptions;
  /** stdout sink; defaults to process.stdout. */
  out?: (text: string) => void;
};

/** Thrown when a local identifier (property id, site, customer id, developer token) is missing. */
export class NotConfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotConfiguredError";
  }
}

export const print = (deps: JobDeps, text: string): void => {
  if (deps.out) deps.out(text);
  else process.stdout.write(text + "\n");
};

export const secret = (deps: JobDeps, name: string): Promise<string | null> => (deps.secret ?? keychainSecret)(name);

/** One OAuth token per run, shared by all sources (rejection is observed lazily, never unhandled). */
export function tokenOnce(deps: JobDeps): () => Promise<string> {
  let p: Promise<string> | null = null;
  return () => {
    if (!p) {
      p = deps.token !== undefined ? Promise.resolve(deps.token) : getAccessToken();
      p.catch(() => undefined);
    }
    return p;
  };
}

export const connectorDeps = (deps: JobDeps, token?: string): ConnectorDeps => ({
  fetch: deps.fetch,
  token: token ?? deps.token,
  retry: deps.retry,
});

type GoogleErr = { message?: string; status?: string; codes: string[] };

/** Extracts message/status/error codes from a Google API error body (JSON object or Ads stream array). */
function googleError(body: string): GoogleErr {
  const out: GoogleErr = { codes: [] };
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return out;
  }
  const first = Array.isArray(parsed) ? parsed[0] : parsed;
  const err = (first as { error?: { message?: unknown; status?: unknown; details?: unknown } } | null)?.error;
  if (!err) return out;
  if (typeof err.message === "string") out.message = err.message;
  if (typeof err.status === "string") out.status = err.status;
  const walk = (v: unknown, depth: number): void => {
    if (depth > 6 || v === null || typeof v !== "object") return;
    if (Array.isArray(v)) return v.forEach((x) => walk(x, depth + 1));
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
      if ((k === "reason" || k.endsWith("Error")) && typeof x === "string") out.codes.push(x);
      else walk(x, depth + 1);
    }
  };
  walk(err.details, 0);
  return out;
}

const SCOPE_RE = /insufficient authentication scopes|ACCESS_TOKEN_SCOPE_INSUFFICIENT/i;
const BLOCKED_RE =
  /SERVICE_DISABLED|has not been used|is disabled|not been enabled|API_DISABLED|PERMISSION_DENIED|permission|DEVELOPER_TOKEN|USER_PERMISSION_DENIED|CUSTOMER_NOT_ENABLED|not authorized|forbidden/i;

/** Maps any error to an integration state with a short, token-free reason. */
export function classifyError(err: unknown): { status: IntegrationState; detail: string } {
  if (err instanceof AuthRequiredError) return { status: "AUTH REQUIRED", detail: err.message };
  if (err instanceof NotConfiguredError) return { status: "NOT CONFIGURED", detail: err.message };
  if (err instanceof HttpError) {
    const g = googleError(err.body);
    const text = [g.status, g.message, ...g.codes].filter(Boolean).join(" ") || err.body.slice(0, 500);
    const reason = (g.message ?? err.body).replace(/\s+/g, " ").trim().slice(0, 300);
    const head = `HTTP ${err.status}${g.status ? ` ${g.status}` : ""}${g.codes.length ? ` [${[...new Set(g.codes)].join(", ")}]` : ""}`;
    const detail = reason ? `${head}: ${reason}` : head;
    if ((err.status === 401 || err.status === 403) && SCOPE_RE.test(text)) {
      return { status: "AUTH REQUIRED", detail: `${detail} (повторите вход с нужными scopes: scripts/auth-setup.sh)` };
    }
    if (err.status === 403 && g.codes.includes("ACTION_NOT_PERMITTED")) {
      return { status: "BLOCKED", detail: `GCP-проекту нужен Google Ads API Explorer access — ${detail}` };
    }
    if (err.status === 403) return { status: "BLOCKED", detail };
    if (err.status === 401) return BLOCKED_RE.test(text) ? { status: "BLOCKED", detail } : { status: "AUTH REQUIRED", detail };
    if (err.status === 429) return { status: "BLOCKED", detail: `квота исчерпана — ${detail}` };
    return { status: "FAILED", detail };
  }
  const e = err as Error;
  const cause = (e?.cause as { code?: string; message?: string } | undefined) ?? undefined;
  const msg = `${e?.name ?? "Error"}: ${e?.message ?? String(err)}${cause?.code ? ` (${cause.code})` : ""}`;
  return { status: "FAILED", detail: msg.slice(0, 300) };
}

export const statusOf = (name: string, err: unknown): IntegrationStatus => ({ name, ...classifyError(err) });

// ---------- dates (YYYY-MM-DD, calendar arithmetic in UTC) ----------

export type Range = { startDate: string; endDate: string };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function assertDate(d: string, field = "date"): string {
  if (!DATE_RE.test(d) || Number.isNaN(Date.parse(`${d}T00:00:00Z`))) throw new Error(`${field} must be YYYY-MM-DD: ${d}`);
  return d;
}

export function addDays(date: string, days: number): string {
  const t = Date.parse(`${date}T00:00:00Z`) + days * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
}

/** Previous complete calendar month relative to `date`, and the month before it. */
export function previousMonths(date: string): { month: string; current: Range; previous: Range } {
  const [y, m] = date.split("-").map(Number) as [number, number];
  const curStart = new Date(Date.UTC(y, m - 2, 1));
  const curEnd = new Date(Date.UTC(y, m - 1, 0));
  const prevStart = new Date(Date.UTC(y, m - 3, 1));
  const prevEnd = new Date(Date.UTC(y, m - 2, 0));
  const iso = (d: Date): string => d.toISOString().slice(0, 10);
  return {
    month: iso(curStart).slice(0, 7),
    current: { startDate: iso(curStart), endDate: iso(curEnd) },
    previous: { startDate: iso(prevStart), endDate: iso(prevEnd) },
  };
}

export const fmtRange = (r: Range): string => `${r.startDate} — ${r.endDate}`;

// ---------- markdown ----------

const cell = (v: unknown): string => String(v ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");

export function mdTable(header: string[], rows: unknown[][]): string {
  return [
    `| ${header.map(cell).join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`),
  ].join("\n");
}

export const round = (n: number, digits = 2): number => {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
};

export const pct = (cur: number, prev: number | null | undefined): string => {
  if (prev === null || prev === undefined || prev === 0) return "—";
  const v = round(((cur - prev) / Math.abs(prev)) * 100, 1);
  return `${v > 0 ? "+" : ""}${v}%`;
};

/** Path part of a URL for compact tables. */
export function shortUrl(u: string): string {
  try {
    const url = new URL(u);
    return url.pathname + url.search || "/";
  } catch {
    return u;
  }
}
