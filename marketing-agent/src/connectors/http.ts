import { getAccessToken, quotaProject } from "../core/auth.ts";
import { HttpError, fetchJson, withRetry, type RetryOptions } from "../core/retry.ts";

export type FetchFn = typeof fetch;

/** Injectable dependencies shared by all connectors (tests pass a fake fetch and a static token). */
export type ConnectorDeps = {
  fetch?: FetchFn;
  token?: string;
  retry?: RetryOptions;
};

export const USER_AGENT = "SHINEX-marketing-agent/0.1";
const DEFAULT_TIMEOUT_MS = 60_000;

/** fetchJson semantics (HttpError on !ok) over an injected fetch; falls back to core fetchJson. */
export async function jsonVia<T>(f: FetchFn | undefined, url: string, init: RequestInit): Promise<T> {
  if (!f) return fetchJson<T>(url, init);
  const res = await f(url, init);
  const text = await res.text();
  if (!res.ok) throw new HttpError(res.status, text);
  return (text === "" ? null : JSON.parse(text)) as T;
}

export type GoogleRequest = {
  method?: "GET" | "POST";
  body?: unknown;
  headers?: Record<string, string>;
  /** Skip OAuth (e.g. PSI with an API key). */
  anonymous?: boolean;
  timeoutMs?: number;
};

/** Authorized JSON call to a Google API with retry. Never logs headers. */
export async function googleJson<T>(url: string, req: GoogleRequest, deps: ConnectorDeps = {}): Promise<T> {
  const headers: Record<string, string> = { accept: "application/json", "user-agent": USER_AGENT };
  if (!req.anonymous) {
    const token = deps.token ?? (await getAccessToken());
    headers.authorization = `Bearer ${token}`;
    const qp = await quotaProject();
    if (qp) headers["x-goog-user-project"] = qp;
  }
  if (req.body !== undefined) headers["content-type"] = "application/json";
  Object.assign(headers, req.headers);
  const init: RequestInit = {
    method: req.method ?? (req.body !== undefined ? "POST" : "GET"),
    headers,
    body: req.body !== undefined ? JSON.stringify(req.body) : undefined,
  };
  return withRetry(
    () => jsonVia<T>(deps.fetch, url, { ...init, signal: AbortSignal.timeout(req.timeoutMs ?? DEFAULT_TIMEOUT_MS) }),
    deps.retry,
  );
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function checkDate(date: string, field = "date"): string {
  if (!DATE_RE.test(date)) throw new Error(`invalid ${field} (expected YYYY-MM-DD): ${date}`);
  return date;
}
