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
const { reportWebVital } = load("lib/web-vitals");
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

// Vitals stay attached to the original document after SPA navigation, and never
// transmit the performance entries (which may contain URLs or DOM text).
const vital = {
  name: "LCP",
  id: "v5-123-456",
  value: 1234.5,
  delta: 1234.5,
  rating: "good",
  entries: [{ name: "private@example.test" }],
};
window.performance = {
  getEntriesByType: () => [{ name: base + "?phone=PRIVATE#name" }],
};
window.gtag = (...args) => events.push(args);
const beforeVitals = events.length;
reportWebVital(vital);
assert.deepEqual(events.at(-1), [
  "event",
  "web_vital",
  {
    metric_name: "LCP",
    metric_id: vital.id,
    metric_value: 1234.5,
    metric_delta: 1234.5,
    metric_rating: "good",
    metric_unit: "ms",
    non_interaction: true,
    page_path: "/ru/prices",
    page_location: base,
    page_referrer: "",
  },
]);
for (const invalid of [
  { name: "TTFB" },
  { value: NaN },
  { value: Infinity },
  { value: -1 },
  { delta: NaN },
  { id: "private@example.test" },
  { rating: "unknown" },
])
  reportWebVital({ ...vital, ...invalid });
assert.equal(events.length, beforeVitals + 1);
reportWebVital({ ...vital, name: "CLS", value: 0.002, delta: 0.002 });
assert.equal(events.at(-1)[2].metric_value, 0.002);
assert.equal(events.at(-1)[2].metric_unit, "score");
reportWebVital({ ...vital, name: "INP", value: 180, delta: -20 });
assert.equal(events.at(-1)[2].metric_name, "INP");
const safeCount = events.length;
for (const name of [
  "https://private.test/ru/prices",
  "https://www.shinex.am/private-name",
]) {
  window.performance.getEntriesByType = () => [{ name }];
  reportWebVital(vital);
}
assert.equal(events.length, safeCount);
window.performance.getEntriesByType = () => [];
window.gtag = () => {
  throw new Error("blocked");
};
assert.doesNotThrow(() => reportWebVital(vital));
delete window.gtag;
assert.doesNotThrow(() => reportWebVital(vital));
window.gtag = (...args) => events.push(args);
const beforePreview = events.length;
for (const origin of [
  "http://127.0.0.1:3104",
  "https://shinex-preview.vercel.app",
]) {
  window.location.origin = origin;
  trackEvent("page_view");
  reportWebVital(vital);
}
assert.equal(
  events.length,
  beforePreview,
  "Local/preview traffic reached production analytics"
);
delete globalThis.window;
delete globalThis.document;
assert.doesNotThrow(() => reportWebVital(vital));
console.log(
  "Analytics checks passed: attribution, PII filtering, blocked storage/GA, Web Vitals validation and document-path attribution."
);
