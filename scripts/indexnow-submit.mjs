import { readFileSync } from "node:fs";
import { join } from "node:path";

// IndexNow key: public by protocol design, verified via public/<key>.txt.
// This constant is the single source; the public file must contain exactly it.
const INDEXNOW_KEY = "4d1939002cf12939918dfc3e0b4d45a4";
const HOST = "www.shinex.am";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10000;
const DEFAULT_SITEMAP = `https://${HOST}/sitemap.xml`;
const keyLocation = `https://${HOST}/${INDEXNOW_KEY}.txt`;

function parseArgs(argv) {
  const options = { dryRun: false, sitemap: DEFAULT_SITEMAP };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--sitemap") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error("--sitemap requires a URL");
      }
      options.sitemap = value;
      index += 1;
    } else if (arg.startsWith("--sitemap=")) {
      options.sitemap = arg.slice("--sitemap=".length);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function assertKeyFile() {
  if (!/^[0-9a-f]{32}$/.test(INDEXNOW_KEY)) {
    throw new Error("INDEXNOW_KEY must be 32 lowercase hex characters");
  }
  const keyFile = join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`);
  const contents = readFileSync(keyFile, "utf8");
  if (contents !== INDEXNOW_KEY) {
    throw new Error(`${keyFile} must contain exactly the IndexNow key`);
  }
}

function decodeXml(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

async function fetchSitemapUrls(sitemapUrl) {
  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    throw new Error(`Sitemap ${sitemapUrl} returned HTTP ${response.status}`);
  }
  const xml = await response.text();
  const urls = new Set();
  for (const match of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)) {
    const loc = decodeXml(match[1]);
    let parsed;
    try {
      parsed = new URL(loc);
    } catch {
      continue;
    }
    if (parsed.protocol === "https:" && parsed.hostname === HOST) {
      urls.add(parsed.href);
    }
  }
  return [...urls];
}

function chunk(items, size) {
  const batches = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  assertKeyFile();
  const urls = await fetchSitemapUrls(options.sitemap);
  if (urls.length === 0) {
    throw new Error(`No ${HOST} URLs found in ${options.sitemap}`);
  }
  const batches = chunk(urls, BATCH_SIZE);
  console.log(`Sitemap: ${options.sitemap}`);
  console.log(`URLs: ${urls.length} (batches: ${batches.length})`);
  console.log(`keyLocation: ${keyLocation}`);

  for (const [index, urlList] of batches.entries()) {
    const body = { host: HOST, key: INDEXNOW_KEY, keyLocation, urlList };
    if (options.dryRun) {
      console.log(`Dry run, batch ${index + 1}/${batches.length} body:`);
      console.log(JSON.stringify(body, null, 2));
      continue;
    }
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    console.log(
      `Batch ${index + 1}/${batches.length}: HTTP ${response.status}${text ? ` ${text.slice(0, 500)}` : ""}`
    );
    if (response.status !== 200 && response.status !== 202) {
      process.exitCode = 1;
    }
  }
  if (options.dryRun) {
    console.log("Dry run: nothing was sent.");
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
