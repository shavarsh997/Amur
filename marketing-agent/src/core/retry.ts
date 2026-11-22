export class HttpError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string, message?: string) {
    super(message ?? `HTTP ${status}: ${body.slice(0, 300)}`);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

export type RetryOptions = {
  retries?: number;
  baseMs?: number;
};

const NETWORK_CODES = new Set([
  "ECONNRESET",
  "ECONNREFUSED",
  "ETIMEDOUT",
  "EAI_AGAIN",
  "ENOTFOUND",
  "EPIPE",
  "UND_ERR_SOCKET",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT",
]);

/** Network errors, HTTP 429 and 5xx are retryable; other HTTP errors are not. */
export function isRetryable(err: unknown): boolean {
  if (err instanceof HttpError) return err.status === 429 || err.status >= 500;
  if (!(err instanceof Error)) return false;
  // fetch() rejects with TypeError("fetch failed") on network problems; cause carries the code.
  if (err.name === "TypeError" && /fetch failed|network/i.test(err.message)) return true;
  const code = (err as { code?: unknown }).code ?? (err.cause as { code?: unknown } | undefined)?.code;
  if (typeof code === "string" && NETWORK_CODES.has(code)) return true;
  return err.name === "AbortError" || err.name === "TimeoutError";
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Calls fn up to retries+1 times with exponential backoff and full jitter. */
export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const retries = opts.retries ?? 3;
  const baseMs = opts.baseMs ?? 500;
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries || !isRetryable(err)) throw err;
      const cap = baseMs * 2 ** attempt;
      await sleep(cap / 2 + Math.random() * (cap / 2));
    }
  }
}

/** fetch + JSON parse; throws HttpError when !res.ok. Uses globalThis.fetch at call time. */
export async function fetchJson<T = unknown>(url: string | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const text = await res.text();
  if (!res.ok) throw new HttpError(res.status, text);
  return (text === "" ? null : JSON.parse(text)) as T;
}
