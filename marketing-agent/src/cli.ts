import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { log } from "./core/log.ts";
import { today } from "./core/paths.ts";
import type { FunnelGroupKey } from "./analysis/funnel.ts";
import { assertDate, print, type JobDeps } from "./jobs/context.ts";
import { formatHealthTable, runHealth } from "./jobs/health.ts";
import { runDiscover } from "./jobs/discover.ts";
import { printOutcome, runDaily, runMonthly, runWeekly } from "./jobs/report-jobs.ts";
import { addExperiment, addFunnelRecord, experimentsMarkdown, funnelMarkdown, listExperiments } from "./jobs/journal.ts";

const USAGE = `SHINEX marketing agent (read-only)

Usage: node --experimental-strip-types src/cli.ts <command> [options]

  health [--json]                     read-only probe of every source
  discover [--force]                  find GA4 property / GSC site / Ads customer and save if unambiguous
  daily   [--force] [--date D]        GA4 + Google Ads (7d vs previous 7d) + site crawl (30 pages)
  weekly  [--force] [--date D]        Search Console 28d + opportunities + crawl (150) + PageSpeed (3 pages)
  monthly [--force] [--date D]        previous calendar month: everything + funnel + plan
  funnel add --stage <s> --channel <c> [--landing <path>] [--service <s>] [--region <r>] [--reason <text>] [--date D]
  funnel report [--from D] [--to D] [--by channel|landing|service|region]
  memory add --area <a> --hypothesis <text> --change <text> [--status proposed] [--result <text>] [--notes <text>] [--date D]
  memory list [--status <s>] [--area <a>]

Dates are YYYY-MM-DD (default: today in Asia/Yerevan). No personal data in funnel records.`;

const BOOLEAN_FLAGS = new Set(["force", "json", "help"]);

export type ParsedArgs = { positionals: string[]; flags: Record<string, string> };

/** --key value | --key=value; boolean flags (--force, --json, --help) take no value. */
export function parseArgs(argv: string[]): ParsedArgs {
  const positionals: string[] = [];
  const flags: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (!a.startsWith("--")) {
      positionals.push(a);
      continue;
    }
    const eq = a.indexOf("=");
    const key = (eq >= 0 ? a.slice(2, eq) : a.slice(2)).trim();
    if (!key) throw new Error(`bad option: ${a}`);
    if (eq >= 0) flags[key] = a.slice(eq + 1);
    else if (BOOLEAN_FLAGS.has(key)) flags[key] = "true";
    else {
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) throw new Error(`option --${key} requires a value`);
      flags[key] = next;
      i++;
    }
  }
  return { positionals, flags };
}

function only(flags: Record<string, string>, allowed: string[]): void {
  for (const k of Object.keys(flags)) if (!allowed.includes(k)) throw new Error(`unknown option: --${k}`);
}

const GROUPS: FunnelGroupKey[] = ["channel", "landing", "service", "region"];

/** Runs one CLI command; returns the process exit code. */
export async function main(argv: string[], deps: JobDeps = {}): Promise<number> {
  let args: ParsedArgs;
  try {
    args = parseArgs(argv);
  } catch (err) {
    print(deps, `${(err as Error).message}\n\n${USAGE}`);
    return 2;
  }
  const { positionals, flags } = args;
  const [command, sub] = positionals;
  if (!command || flags.help || command === "help") {
    print(deps, USAGE);
    return command || flags.help ? 0 : 2;
  }

  try {
    switch (command) {
      case "health": {
        only(flags, ["json"]);
        const rows = await runHealth(deps);
        await log("info", "health", { statuses: rows.map((r) => `${r.name}=${r.status}`) });
        print(deps, flags.json ? JSON.stringify(rows, null, 2) : formatHealthTable(rows));
        return 0; // statuses are data
      }
      case "discover":
        only(flags, ["force"]);
        return await runDiscover(deps, { force: Boolean(flags.force) });
      case "daily":
      case "weekly":
      case "monthly": {
        only(flags, ["force", "date"]);
        const opts = { date: assertDate(flags.date ?? today()), force: Boolean(flags.force) };
        const run = command === "daily" ? runDaily : command === "weekly" ? runWeekly : runMonthly;
        printOutcome(deps, await run(opts, deps));
        return 0;
      }
      case "funnel": {
        if (sub === "add") {
          const record = await addFunnelRecord(flags);
          print(deps, `Добавлено: ${JSON.stringify(record)}`);
          return 0;
        }
        if (sub === "report") {
          only(flags, ["from", "to", "by"]);
          const by = (flags.by ?? "channel") as FunnelGroupKey;
          if (!GROUPS.includes(by)) throw new Error(`--by must be one of ${GROUPS.join(", ")}`);
          if (flags.from) assertDate(flags.from, "--from");
          if (flags.to) assertDate(flags.to, "--to");
          print(deps, await funnelMarkdown({ from: flags.from, to: flags.to, groupBy: by }));
          return 0;
        }
        throw new Error("usage: funnel add|report");
      }
      case "memory": {
        if (sub === "add") {
          const exp = await addExperiment(flags);
          print(deps, `Добавлено: ${exp.id}`);
          return 0;
        }
        if (sub === "list") {
          only(flags, ["status", "area"]);
          print(deps, experimentsMarkdown(await listExperiments({ status: flags.status, area: flags.area })));
          return 0;
        }
        throw new Error("usage: memory add|list");
      }
      default:
        print(deps, `unknown command: ${command}\n\n${USAGE}`);
        return 2;
    }
  } catch (err) {
    print(deps, `Ошибка: ${(err as Error).message}`);
    await log("error", "cli.error", { command, message: (err as Error).message });
    return 1;
  }
}

function isEntryPoint(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return realpathSync(entry) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  main(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (err: unknown) => {
      process.stderr.write(`fatal: ${(err as Error)?.stack ?? String(err)}\n`);
      process.exitCode = 1;
    },
  );
}
