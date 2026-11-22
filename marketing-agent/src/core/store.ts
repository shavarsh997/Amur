import { readdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { dataDir, ensureDir } from "./paths.ts";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SOURCE_RE = /^[a-z0-9][a-z0-9_-]*$/i;

function snapshotDir(source: string): string {
  if (!SOURCE_RE.test(source)) throw new Error(`invalid snapshot source: ${source}`);
  return join(dataDir(), "snapshots", source);
}

function checkDate(date: string): string {
  if (!DATE_RE.test(date)) throw new Error(`invalid date (expected YYYY-MM-DD): ${date}`);
  return date;
}

/** Writes snapshots/<source>/<date>.json; returns the file path. */
export async function saveSnapshot(source: string, date: string, data: unknown): Promise<string> {
  const dir = await ensureDir(snapshotDir(source));
  const target = join(dir, `${checkDate(date)}.json`);
  const tmp = `${target}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  await rename(tmp, target);
  return target;
}

/** Returns parsed snapshot or null if missing. */
export async function loadSnapshot<T = unknown>(source: string, date: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(join(snapshotDir(source), `${checkDate(date)}.json`), "utf8")) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

/** Snapshot dates for a source, ascending. */
export async function listSnapshots(source: string): Promise<string[]> {
  let names: string[];
  try {
    names = await readdir(snapshotDir(source));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
  return names
    .filter((n) => n.endsWith(".json"))
    .map((n) => n.slice(0, -5))
    .filter((d) => DATE_RE.test(d))
    .sort();
}

/** Most recent snapshot strictly before date, or null. */
export async function latestBefore<T = unknown>(
  source: string,
  date: string,
): Promise<{ date: string; data: T } | null> {
  checkDate(date);
  const earlier = (await listSnapshots(source)).filter((d) => d < date);
  const last = earlier.at(-1);
  if (!last) return null;
  const data = await loadSnapshot<T>(source, last);
  return data === null ? null : { date: last, data };
}
