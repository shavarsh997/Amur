import assert from "node:assert/strict";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";

const load = createTypeScriptLoader(process.cwd());
const {
  inferLeadAttribution,
  parseLeadAttribution,
  publicPagePath,
  publicPagePaths,
  getLeadAttribution,
} = load("lib/lead-attribution");
const { trackEvent } = load("lib/analytics");
const { default: sitemap } = load("app/sitemap");
assert.deepEqual(
  [
    ...new Set(
      sitemap().map((x) =>
        new URL(x.url).pathname.split("/").slice(2).join("/")
      )
    ),
  ].sort(),
  [...publicPagePaths].sort(),
  "Attribution path allowlist differs from public routes"
);
const base = "https://www.shinex.am/ru/prices";
assert.deepEqual(
  inferLeadAttribution(base, "https://www.google.com/search?q=private"),
  { landing_page: "/ru/prices", source: "google", medium: "organic" }
);
assert.equal(
  inferLeadAttribution(base, "https://www.shinex.am/hy").source,
  "direct"
);
assert.equal(
  inferLeadAttribution(base, "https://google.com.attacker.test").source,
  "external"
);
assert.equal(inferLeadAttribution(base + "?gclid=PRIVATE", "").medium, "cpc");
const unsafe = inferLeadAttribution(
  base +
    "?utm_source=person@email.test&utm_medium=+374123456&utm_campaign=Name",
  ""
);
assert.deepEqual(unsafe, {
  landing_page: "/ru/prices",
  source: "campaign",
  medium: "campaign",
});
for (const path of [
  "/ru/private-name",
  "/ru/prices?phone=123456",
  "/ru/prices#name",
  "//ru/prices",
  "/es/prices",
  "/ru/services/../../private",
])
  assert.equal(publicPagePath(path), undefined);
assert.equal(
  parseLeadAttribution({
    landing_page: "/ru/prices",
    source: "person@email.test",
    medium: "organic",
  }),
  undefined
);
assert.equal(
  parseLeadAttribution({
    landing_page: "/ru/John",
    source: "google",
    medium: "organic",
  }),
  undefined
);

// No analytics object, blocked analytics, malicious extra parameters, and storage failures.
trackEvent("generate_lead");
const events = [];
const storage = new Map();
globalThis.window = {
  location: {
    pathname: "/ru/prices",
    origin: "https://www.shinex.am",
    href: base,
  },
  gtag: (...args) => events.push(args),
  sessionStorage: {
    getItem: (key) => storage.get(key),
    setItem: (key, value) => storage.set(key, value),
  },
};
globalThis.document = { referrer: "https://google.com/search?q=private" };
const first = getLeadAttribution();
window.location.pathname = "/ru/contacts";
window.location.href = "https://www.shinex.am/ru/contacts?phone=+374123456";
assert.deepEqual(
  getLeadAttribution(),
  first,
  "Internal navigation replaced the landing page"
);
trackEvent("generate_lead", {
  form: "lead",
  phone: "+374123456",
  name: "Private",
  cta_id: "private@example.test",
});
assert.deepEqual(events[0], [
  "event",
  "generate_lead",
  {
    form: "lead",
    entry_source: "google",
    entry_medium: "organic",
    landing_page: "/ru/prices",
    page_path: "/ru/contacts",
    page_location: "https://www.shinex.am/ru/contacts",
    page_referrer: "",
  },
]);
window.gtag = () => {
  throw new Error("blocked");
};
assert.doesNotThrow(() => trackEvent("phone_click"));
window.sessionStorage.getItem = () => {
  throw new Error("denied");
};
window.sessionStorage.setItem = () => {
  throw new Error("denied");
};
assert.equal(getLeadAttribution().landing_page, "/ru/contacts");
delete globalThis.window;
delete globalThis.document;
console.log(
  "Analytics checks passed: route allowlist, first-touch attribution, channel classification, PII filtering, blocked storage and blocked GA."
);
