import { mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

/** Data directory: $SHINEX_MA_DATA_DIR or ~/Library/Application Support/shinex-marketing/. Read on every call. */
export function dataDir(): string {
  const fromEnv = process.env.SHINEX_MA_DATA_DIR;
  if (fromEnv && fromEnv.trim() !== "") return fromEnv;
  return join(homedir(), "Library", "Application Support", "shinex-marketing");
}

/** mkdir -p; returns the path. */
export async function ensureDir(p: string): Promise<string> {
  await mkdir(p, { recursive: true });
  return p;
}

const yerevanDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Yerevan",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Date as YYYY-MM-DD in Asia/Yerevan. */
export function today(now: Date = new Date()): string {
  const parts = yerevanDate.formatToParts(now);
  const get = (type: string): string => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
