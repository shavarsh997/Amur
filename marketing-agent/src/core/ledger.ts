import { readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { dataDir, ensureDir } from "./paths.ts";

export type LedgerEntry = {
  key: string;
  ts: string;
  ok: boolean;
  result: unknown;
};

type Ledger = Record<string, LedgerEntry>;

export function ledgerPath(): string {
  return join(dataDir(), "ledger.json");
}

async function readLedger(): Promise<Ledger> {
  try {
    const parsed: unknown = JSON.parse(await readFile(ledgerPath(), "utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Ledger) : {};
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw err;
  }
}

async function writeLedger(ledger: Ledger): Promise<void> {
  await ensureDir(dataDir());
  const target = ledgerPath();
  const tmp = `${target}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(ledger, null, 2) + "\n", "utf8");
  await rename(tmp, target);
}

// Serializes ledger writes within the process so concurrent runOnce calls don't lose entries.
let writeChain: Promise<unknown> = Promise.resolve();

export async function getEntry(key: string): Promise<LedgerEntry | undefined> {
  return (await readLedger())[key];
}

/** Records { key, ts, ok: true, result } for key, overwriting any existing entry. */
export async function record(key: string, result: unknown): Promise<void> {
  const entry: LedgerEntry = { key, ts: new Date().toISOString(), ok: true, result: result ?? null };
  const next = writeChain.then(async () => {
    const ledger = await readLedger();
    ledger[key] = entry;
    await writeLedger(ledger);
  });
  writeChain = next.catch(() => undefined);
  await next;
}

/**
 * If key already succeeded, returns the stored result without calling fn.
 * Otherwise runs fn and records { key, ts, ok: true, result }. Failures are rethrown and not recorded.
 */
export async function runOnce<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const existing = await getEntry(key);
  if (existing?.ok) return existing.result as T;
  const result = await fn();
  await record(key, result);
  return result;
}
