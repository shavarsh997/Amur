import assert from "node:assert/strict";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";

const load = createTypeScriptLoader(process.cwd());
const { initialValues } = load("components/calculator/constants");
const { calculateConstructionEstimate } = load(
  "lib/calculator/calculate-construction-estimate"
);
const copies = ["hy", "ru", "en"].map(
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

for (const copy of copies)
  for (const renovationObjectType of [
    "apartment",
    "privateHouse",
    "commercial",
  ])
    for (const area of ["", "60", "100"])
      assert.throws(
        () =>
          calculate(
            { calculationType: "renovation", renovationObjectType, area },
            copy
          ),
        /Renovation estimates require contacting SHINEX/,
        "Renovation must not produce an automatic price"
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
  `Calculator checks passed: renovation requires contact; ${scenarios} construction/design scenarios with identical amounts in Armenian, Russian and English.`
);
