import assert from "node:assert/strict";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";

// Exercise the real server action and message formatter, with Telegram replaced
// at the network boundary. No credentials or messages leave this process.
const load = createTypeScriptLoader(process.cwd(), { "server-only": {} });
const { submitLeadAction } = load("app/actions");
const { getDictionary, locales } = load("lib/i18n");
const { initialValues } = load("components/calculator/constants");
const {
  calculatorRequestFromValues,
  parseCalculatorRequest,
  calculatorRequestSummary,
} = load("lib/calculator/calculator-request");
const initialState = { status: "idle", message: "", errors: {} };
const construction = calculatorRequestFromValues({
  ...initialValues,
  calculationType: "construction",
  area: "120,5",
  constructionPackage: "rough",
  material: "monolith",
  houseShape: "lShape",
  basement: true,
  basementArea: "30",
  garage: true,
  garageArea: "25",
  terrace: true,
  terraceArea: "15",
  highCeilings: true,
  difficultSite: true,
  distanceKm: "40",
});
assert(construction);
const design = calculatorRequestFromValues({
  ...initialValues,
  calculationType: "design",
  area: "65",
  designPackage: "full",
});
assert(design);

function form(request = construction) {
  const data = new FormData();
  if (request !== undefined)
    data.set("calculatorRequest", JSON.stringify(request));
  data.set("name", "Test client");
  data.set("phone", "+374 00 000000");
  data.set("region", "Yerevan");
  data.set("comment", "Please discuss the project first.");
  return data;
}

const fetchBefore = globalThis.fetch;
const envBefore = {
  token: process.env.TELEGRAM_BOT_TOKEN,
  chat: process.env.TELEGRAM_CHAT_ID,
};
const sent = [];
process.env.TELEGRAM_BOT_TOKEN = "test-token-no-network";
process.env.TELEGRAM_CHAT_ID = "test-chat";
const capture = async (url, options) => {
  assert.equal(
    url,
    "https://api.telegram.org/bottest-token-no-network/sendMessage"
  );
  assert.equal(options.method, "POST");
  assert.equal(options.cache, "no-store");
  assert(options.signal instanceof AbortSignal);
  const body = JSON.parse(options.body);
  assert.equal(body.chat_id, "test-chat");
  assert(
    body.text.length <= 4096,
    `Telegram text exceeds the limit: ${body.text.length}`
  );
  sent.push(body.text);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

try {
  globalThis.fetch = capture;
  for (const locale of locales) {
    const copy = await getDictionary(locale);
    for (const request of [construction, design]) {
      const data = form(request);
      if (request.calculationType === "design")
        data.set("objectType", "commercial");
      // Exercise the maximum allowed free-text lengths as well as all extras.
      data.set("name", "N".repeat(120));
      data.set("region", "R".repeat(120));
      data.set("comment", "C".repeat(2000));
      const result = await submitLeadAction(locale, initialState, data);
      assert.equal(result.status, "success");
      assert.equal(result.delivered, true);
      assert.equal(result.message, copy.constructionCalculator.request.success);
      const text = sent.at(-1);
      assert(text.includes(`/${locale}/calculator`));
      assert(text.includes("+374 00 000000"));
      assert(text.includes("C".repeat(2000)));
      for (const { label, value } of calculatorRequestSummary(
        request,
        copy.constructionCalculator,
        locale
      )) {
        assert(
          text.includes(`${label}: ${value}`),
          `Lost calculator parameter: ${label}`
        );
      }
      assert(!text.includes("undefined"));
      assert(!text.includes("[object Object]"));
    }
  }

  const beforeInvalid = sent.length;
  const attributed = form();
  attributed.set("submittedFrom", "/ru/services/house-construction");
  attributed.set(
    "attribution",
    JSON.stringify({
      landing_page: "/ru/prices",
      source: "google",
      medium: "organic",
      phone: "DO-NOT-FORWARD",
    })
  );
  assert.equal(
    (await submitLeadAction("ru", initialState, attributed)).delivered,
    true
  );
  assert(sent.at(-1).includes("/ru/services/house-construction"));
  assert(sent.at(-1).includes("google / organic; landing: /ru/prices"));
  assert(!sent.at(-1).includes("DO-NOT-FORWARD"));
  sent.pop();
  for (const request of [
    null,
    [],
    {},
    { ...construction, area: 0 },
    { ...construction, area: 100001 },
    { ...construction, area: "100" },
    { ...construction, calculationType: "renovation" },
    { ...construction, constructionPackage: "invalid" },
    { ...construction, material: "__proto__" },
    { ...construction, houseShape: "constructor" },
    { ...construction, highCeilings: "false" },
    { ...construction, basementArea: -1 },
    { ...construction, garageArea: "25" },
    { ...construction, terraceArea: 0 },
    { ...construction, distanceKm: -1 },
    { ...design, designPackage: "unsupported" },
  ]) {
    assert.equal(parseCalculatorRequest(request), null);
    assert.equal(
      (await submitLeadAction("ru", initialState, form(request))).status,
      "error"
    );
  }
  for (const raw of ["", "{bad json", "x".repeat(2001)]) {
    const data = form();
    data.set("calculatorRequest", raw);
    assert.equal(
      (await submitLeadAction("ru", initialState, data)).status,
      "error"
    );
  }
  for (const [field, value] of [
    ["name", ""],
    ["phone", "abc"],
    ["phone", "123"],
    ["region", ""],
  ]) {
    const data = form();
    data.set(field, value);
    const result = await submitLeadAction("ru", initialState, data);
    assert.equal(result.status, "error");
    assert(result.errors[field]);
  }
  const missingObject = await submitLeadAction(
    "ru",
    initialState,
    form(design)
  );
  assert.equal(missingObject.status, "error");
  assert(missingObject.errors.objectType);
  const bot = form();
  bot.set("website", "spam.example");
  const botResult = await submitLeadAction("ru", initialState, bot);
  assert.equal(botResult.status, "success");
  assert.notEqual(
    botResult.delivered,
    true,
    "Honeypot must not count as a delivered lead"
  );
  assert.equal(
    sent.length,
    beforeInvalid,
    "Invalid or honeypot submissions reached Telegram"
  );

  // Disabled extras must not leak stale areas into the enquiry.
  const simple = calculatorRequestFromValues({
    ...initialValues,
    calculationType: "construction",
    area: "60",
    basement: false,
    basementArea: "999",
    distanceKm: "",
  });
  assert.equal(simple.basementArea, null);
  assert.equal(simple.distanceKm, null);
  assert.equal(
    parseCalculatorRequest({ ...construction, area: Infinity }),
    null
  );
  assert.equal(
    parseCalculatorRequest({ ...construction, distanceKm: NaN }),
    null
  );
  assert.equal(
    calculatorRequestFromValues({
      ...initialValues,
      calculationType: "renovation",
      area: "60",
    }),
    null
  );

  // Existing general contact form still works without calculator data.
  const generic = form();
  generic.delete("calculatorRequest");
  generic.set("objectType", "apartment");
  generic.set("area", "60");
  generic.set("workType", "renovation");
  assert.equal(
    (await submitLeadAction("ru", initialState, generic)).status,
    "success"
  );
  assert(!sent.at(-1).includes("/calculator"));

  for (const fakeFetch of [
    async () => new Response(JSON.stringify({ ok: false }), { status: 200 }),
    async () => new Response(JSON.stringify({ ok: false }), { status: 500 }),
    async () => new Response("invalid JSON", { status: 200 }),
    async () => {
      throw new Error("Network failure");
    },
    async () => {
      throw new DOMException("Timed out", "TimeoutError");
    },
  ]) {
    globalThis.fetch = fakeFetch;
    assert.equal(
      (await submitLeadAction("ru", initialState, form())).status,
      "error",
      "Failed delivery must not show success"
    );
  }
  globalThis.fetch = capture;
  delete process.env.TELEGRAM_BOT_TOKEN;
  assert.equal(
    (await submitLeadAction("ru", initialState, form())).status,
    "error"
  );
  console.log(
    `Lead checks passed: construction/design in ${locales.length} locales, all selected parameters, contacts, payload validation, honeypot, generic form and Telegram failures. No live Telegram messages sent.`
  );
} finally {
  globalThis.fetch = fetchBefore;
  for (const [key, value] of [
    ["TELEGRAM_BOT_TOKEN", envBefore.token],
    ["TELEGRAM_CHAT_ID", envBefore.chat],
  ]) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
