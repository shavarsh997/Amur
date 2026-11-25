import assert from "node:assert/strict";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";

const load = createTypeScriptLoader(process.cwd());
const { initialValues } = load("components/calculator/constants");
const { calculateConstructionEstimate } = load(
  "lib/calculator/calculate-construction-estimate"
);
const { locales } = load("lib/i18n");
const copies = locales.map(
  (locale) => load(`messages/${locale}`).default.constructionCalculator
);
const calculate = (values, copy = copies[0]) =>
  calculateConstructionEstimate(
    {
      ...initialValues,
      calculationType: "construction",
      area: "60",
      ...values,
    },
    copy
  );
const numbers = (estimate) => ({
  total: estimate.total,
  min: estimate.min,
  max: estimate.max,
  quantities: estimate.lines.map(
    ({ amount, quantity, pricePerUnit, unit }) => ({
      amount,
      quantity,
      pricePerUnit,
      unit,
    })
  ),
});

let scenarios = 0;
function checkLanguages(values) {
  const results = copies.map((copy) => calculate(values, copy));
  for (const result of results) {
    assert.deepEqual(
      numbers(result),
      numbers(results[0]),
      "Language changes the estimate"
    );
    assert(result.total > 0 && Number.isFinite(result.total));
    assert(result.min <= result.total && result.max >= result.total);
    for (const line of result.lines) {
      assert(
        line.label && !/[{}]/.test(line.note ?? ""),
        "Untranslated estimate line"
      );
    }
  }
  scenarios++;
}

// Construction/design engine never prices renovation; renovation has its own quote.
for (const copy of copies)
  assert.throws(
    () => calculate({ calculationType: "renovation", area: "60" }, copy),
    /calculateRenovationQuote/,
    "Renovation must not go through the construction/design engine"
  );

// Apartment renovation: instant labour-only quote, area × owner-confirmed rate.
const { renovationPriceTiers } = load("config/pricing.config");
const { calculateRenovationQuote, renovationQuoteText } = load(
  "lib/calculator/renovation-quote"
);
const digits = (text) => text.replace(/\D/g, "");
const standard = calculateRenovationQuote({
  area: "60",
  condition: "newBuilding",
  tier: "standard",
});
assert.equal(
  standard.pricePerSquareMeter,
  renovationPriceTiers.find(({ id }) => id === "standard").from,
  "Renovation rate must come from renovationPriceTiers"
);
assert.equal(standard.total, 3_600_000, "60 m² Standard must be 3 600 000");
assert.equal(standard.timeline, "reference");
for (const [index, locale] of locales.entries()) {
  const quoteCopy = copies[index].renovationQuote;
  const text = renovationQuoteText(standard, quoteCopy, locale);
  assert(
    digits(text.total).includes("3600000"),
    `${locale}: 60 m² Standard does not show 3 600 000 (${text.total})`
  );
  assert(
    digits(text.whatsappMessage).includes("3600000") &&
      text.whatsappMessage.includes(quoteCopy.conditions.newBuilding) &&
      text.whatsappMessage.includes(quoteCopy.tiers.standard) &&
      !/[{}]/.test(text.whatsappMessage + text.total),
    `${locale}: WhatsApp text misses quote parameters`
  );
  assert.equal(text.timeline, quoteCopy.timelineReference);
  const secondary = renovationQuoteText(
    calculateRenovationQuote({
      area: "60",
      condition: "secondary",
      tier: "standard",
    }),
    quoteCopy,
    locale
  );
  assert.equal(secondary.timeline, quoteCopy.timelineAfterSurvey);
}
for (const tier of renovationPriceTiers)
  assert.equal(
    calculateRenovationQuote({
      area: "100",
      condition: "secondary",
      tier: tier.id,
    }).total,
    100 * tier.from
  );
assert.equal(
  calculateRenovationQuote({
    area: "60,5",
    condition: "newBuilding",
    tier: "standard",
  }).total,
  60.5 * renovationPriceTiers[0].from
);
assert.equal(
  calculateRenovationQuote({
    area: "120",
    condition: "newBuilding",
    tier: "standard",
  }).timeline,
  "afterSurvey",
  "Only the confirmed ~60 m² new-build timeline may be shown"
);
for (const area of ["", "0", "5", "2001", "abc"])
  assert.equal(
    calculateRenovationQuote({
      area,
      condition: "newBuilding",
      tier: "standard",
    }),
    null,
    `Invalid renovation area accepted: ${area}`
  );

for (const constructionPackage of ["shell", "rough", "turnkey"])
  checkLanguages({
    calculationType: "construction",
    constructionPackage,
    basement: true,
    basementArea: "20",
    distanceKm: "10",
  });
for (const designPackage of ["basic", "full", "supervision"])
  checkLanguages({ calculationType: "design", designPackage });

assert.equal(
  calculate({ area: "60,5" }).total,
  calculate({ area: "60.5" }).total
);
assert.equal(calculate({ area: "" }).total, 0);
console.log(
  `Calculator checks passed: renovation 60 m² Standard = 3 600 000 in ${locales.length} locales; ${scenarios} construction/design scenarios with identical amounts across ${locales.length} locales (${locales.join(", ")}).`
);
