import { appendFile } from "node:fs/promises";
import { join } from "node:path";
import { dataDir, ensureDir, today } from "./paths.ts";

export type LogLevel = "debug" | "info" | "warn" | "error";

const SENSITIVE_KEY = /token|authorization|secret|password|api[-_]?key|cookie/i;

function redact(value: unknown, depth = 0): unknown {
  if (depth > 6 || value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((v) => redact(v, depth + 1));
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    out[k] = SENSITIVE_KEY.test(k) ? "[redacted]" : redact(v, depth + 1);
  }
  return out;
}

/** Appends { ts, level, event, ...data } to logs/<YYYY-MM-DD>.jsonl and prints it to stderr. Sensitive keys are redacted. */
export async function log(level: LogLevel, event: string, data?: Record<string, unknown>): Promise<void> {
  const safe = data ? (redact(data) as Record<string, unknown>) : {};
  const entry = { ts: new Date().toISOString(), level, event, ...safe };
  const line = JSON.stringify(entry);
  process.stderr.write(line + "\n");
  try {
    const dir = await ensureDir(join(dataDir(), "logs"));
    await appendFile(join(dir, `${today()}.jsonl`), line + "\n", "utf8");
  } catch (err) {
    process.stderr.write(`log write failed: ${(err as Error).message}\n`);
  }
}
