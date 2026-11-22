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
const { trackEvent, gaCampaignQuery, gaReferrerOrigin, gaConfigScript } =
  load("lib/analytics");
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
// AI assistants: referrer hosts and ChatGPT's utm_source tag.
assert.deepEqual(inferLeadAttribution(base, "https://chatgpt.com/"), {
  landing_page: "/ru/prices",
  source: "chatgpt",
  medium: "ai",
});
assert.deepEqual(inferLeadAttribution(base + "?utm_source=chatgpt.com", ""), {
  landing_page: "/ru/prices",
  source: "chatgpt",
  medium: "ai",
});
for (const [referrer, source] of [
  ["https://chat.openai.com/c/private", "chatgpt"],
  ["https://www.perplexity.ai/search?q=private", "perplexity"],
  ["https://gemini.google.com/app/private", "gemini"],
  ["https://copilot.microsoft.com/", "copilot"],
  ["https://claude.ai/chat/private", "claude"],
])
  assert.deepEqual(
    [
      inferLeadAttribution(base, referrer).source,
      inferLeadAttribution(base, referrer).medium,
    ],
    [source, "ai"],
    referrer
  );
assert.equal(
  inferLeadAttribution(base, "https://chatgpt.com.attacker.test/").source,
  "external"
);
assert.equal(
  inferLeadAttribution(base + "?utm_source=perplexity&utm_medium=referral", "")
    .medium,
  "ai"
);
assert.equal(
  inferLeadAttribution(base + "?gclid=X&utm_source=chatgpt.com", "").source,
  "google",
  "gclid must keep priority over AI tags"
);
assert.deepEqual(
  parseLeadAttribution({
    landing_page: "/ru/prices",
    source: "claude",
    medium: "ai",
  }),
  { landing_page: "/ru/prices", source: "claude", medium: "ai" }
);

// GA4 landing-hit sanitizers: allowlisted campaign params, referrer origin only.
assert.equal(
  gaCampaignQuery(
    base +
      "?gclid=Cj0_abc-1&email=x@y&phone=%2B374123456&utm_source=chatgpt.com&utm_medium=ai&utm_campaign=spring_2026&utm_term=private&gbraid=G1&wbraid=W1"
  ),
  "?gclid=Cj0_abc-1&gbraid=G1&wbraid=W1&utm_source=chatgpt.com&utm_medium=ai&utm_campaign=spring_2026"
);
assert.equal(
  gaCampaignQuery(
    base +
      "?utm_source=x@y.test&utm_medium=%2B374123456&utm_campaign=John%20Doe"
  ),
  ""
);
assert.equal(gaCampaignQuery(base + "?email=x@y"), "");
assert.equal(
  gaReferrerOrigin(
    "https://www.google.com/search?q=private",
    "https://www.shinex.am"
  ),
  "https://www.google.com"
);
assert.equal(
  gaReferrerOrigin(
    "https://www.shinex.am/ru/contacts?phone=1",
    "https://www.shinex.am"
  ),
  ""
);
assert.equal(
  gaReferrerOrigin("https://shinex.am/hy", "https://www.shinex.am"),
  ""
);
assert.equal(
  gaReferrerOrigin("android-app://x/private", "https://www.shinex.am"),
  ""
);
assert.equal(gaReferrerOrigin("", "https://www.shinex.am"), "");

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

// First page_view carries allowlisted campaign params and the referrer origin;
// later events stay clean.
window.location.origin = "https://www.shinex.am";
window.location.pathname = "/ru/prices";
window.location.href = base + "?gclid=Cj0abc&email=x@y&utm_source=chatgpt.com";
document.referrer = "https://chatgpt.com/c/private-chat?q=secret";
const beforeLanding = events.length;
trackEvent("page_view");
const landingHit = events.at(-1)[2];
assert.equal(events.length, beforeLanding + 1);
assert.equal(
  landingHit.page_location,
  "https://www.shinex.am/ru/prices?gclid=Cj0abc&utm_source=chatgpt.com"
);
assert.ok(landingHit.page_location.includes("gclid"));
assert.ok(!landingHit.page_location.includes("email"));
assert.ok(!landingHit.page_location.includes("x@y"));
assert.equal(landingHit.page_referrer, "https://chatgpt.com");
trackEvent("page_view");
assert.equal(events.at(-1)[2].page_location, "https://www.shinex.am/ru/prices");
assert.equal(events.at(-1)[2].page_referrer, "");
trackEvent("phone_click");
assert.equal(events.at(-1)[2].page_location, "https://www.shinex.am/ru/prices");
assert.equal(events.at(-1)[2].page_referrer, "");

// Inline gtag config in the layout applies the same allowlist.
function runConfig(origin, href, referrer) {
  const dataLayer = [];
  const sandboxWindow = {
    location: { origin, href },
    dispatchEvent: () => {},
    dataLayer,
  };
  new Function(
    "window",
    "document",
    "Event",
    gaConfigScript("G-TEST", "https://www.shinex.am")
  )(sandboxWindow, { referrer }, class {});
  return dataLayer
    .map((args) => [...args])
    .find((args) => args[0] === "config");
}
assert.deepEqual(
  runConfig(
    "https://www.shinex.am",
    base + "?gclid=Cj0abc&email=x@y&wbraid=W1",
    "https://www.bing.com/search?q=private"
  ),
  [
    "config",
    "G-TEST",
    {
      send_page_view: false,
      page_location: "https://www.shinex.am?gclid=Cj0abc&wbraid=W1",
      page_referrer: "https://www.bing.com",
    },
  ]
);
assert.deepEqual(
  runConfig(
    "https://www.shinex.am",
    base + "?name=Private",
    "https://www.shinex.am/hy"
  )[2],
  {
    send_page_view: false,
    page_location: "https://www.shinex.am",
    page_referrer: "",
  }
);
assert.equal(runConfig("http://127.0.0.1:3104", base, ""), undefined);

delete globalThis.window;
delete globalThis.document;
assert.doesNotThrow(() => reportWebVital(vital));
console.log(
  "Analytics checks passed: attribution (incl. AI assistants), PII filtering, GA4 landing campaign/referrer allowlist, blocked storage/GA, Web Vitals validation and document-path attribution."
);
