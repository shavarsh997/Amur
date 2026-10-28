import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";

// Use the bundled workspace Playwright via NODE_PATH, or an installed dev copy.
const { chromium } = createRequire(import.meta.url)("playwright");
const base = process.argv[2] ?? "http://127.0.0.1:3101";
assert(
  ["localhost", "127.0.0.1"].includes(new URL(base).hostname),
  "Only a local mock server is allowed"
);
assert.equal(
  await (await fetch(`${base}/__shinex_test_probe`)).text(),
  "shinex-telegram-is-mocked",
  "Refusing to send leads: Telegram mock is not active"
);
const load = createTypeScriptLoader(process.cwd());
const { getDictionary } = load("lib/i18n");
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH,
});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await context.route(/googletagmanager\.com|google-analytics\.com/, (route) =>
  route.abort()
);
await context.addInitScript(() => {
  window.testAnalytics = [];
  const capture = (...args) => window.testAnalytics.push(args);
  Object.defineProperty(window, "gtag", {
    configurable: false,
    get: () => capture,
    set: () => {},
  });
});
const page = await context.newPage();
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message));
const results = [];
const output = process.env.SEO_BROWSER_OUTPUT ?? "/tmp/shinex-seo-browser";
mkdirSync(output, { recursive: true });
try {
  for (const locale of ["hy", "ru", "en", "de", "fr"]) {
    await page.goto(`${base}/${locale}/prices`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator("#price-examples tbody tr").count(), 3);
    assert(await page.locator("[data-mobile-contact-bar]").isVisible());
    assert(
      await page
        .locator("[data-mobile-contact-bar] a[href^='tel:']")
        .isVisible()
    );
    assert(
      await page
        .locator("[data-mobile-contact-bar] a[href^='https://wa.me/']")
        .isVisible()
    );
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1
      ),
      `Overflow: ${locale}`
    );
    if (["ru", "hy"].includes(locale)) {
      await page.screenshot({ path: `${output}/${locale}-prices-mobile.png` });
      await page
        .locator("#price-examples")
        .screenshot({ path: `${output}/${locale}-price-examples.png` });
    }
    results.push({ check: `${locale} mobile prices`, passed: true });
    for (const width of [320, 768]) {
      await page.setViewportSize({ width, height: 844 });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1
        ),
        `Overflow: ${locale}/${width}`
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
  }

  // Follow the actual landing-page CTA: design must not silently become a
  // construction request. Query variants retain the single canonical URL.
  for (const locale of ["hy", "ru", "en", "de", "fr"]) {
    const dictionary = await getDictionary(locale);
    const href = `/${locale}/calculator?scenario=interior-design`;
    await page.goto(
      `${base}/${locale}/services/apartment-interior-design-yerevan`,
      {
        waitUntil: "networkidle",
      }
    );
    const calculatorLinks = await page
      .locator("main a[href*='/calculator']")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    assert(calculatorLinks.length >= 2);
    assert(calculatorLinks.every((link) => link === href));
    await page.locator(`main a[href='${href}']`).first().click();
    await page
      .locator("button[aria-pressed='true']")
      .filter({
        hasText:
          dictionary.constructionCalculator.quickScenarios.interiorDesign.title,
      })
      .waitFor();
    assert.equal(
      await page.locator("link[rel='canonical']").getAttribute("href"),
      `https://www.shinex.am/${locale}/calculator`
    );
    await page.locator("input[name=area]").fill("65");
    assert.equal(await page.locator("input[name=area]").inputValue(), "65");
    results.push({
      check: `${locale} design CTA selects design and retains canonical`,
      passed: true,
    });
  }

  const copy = await getDictionary("ru");
  for (const scenario of ["house-construction", "not-a-real-scenario"]) {
    await page.goto(`${base}/ru/calculator?scenario=${scenario}`, {
      waitUntil: "networkidle",
    });
    await page
      .locator("button[aria-pressed='true']")
      .filter({
        hasText:
          copy.constructionCalculator.quickScenarios.houseConstruction.title,
      })
      .waitFor();
  }
  await page.goto(`${base}/ru/services/interior-design`, {
    waitUntil: "networkidle",
  });
  assert.equal(
    await page
      .locator("main a[href='/ru/calculator?scenario=interior-design']")
      .count(),
    1
  );
  await page.goto(`${base}/ru/services/house-construction`, {
    waitUntil: "networkidle",
  });
  assert.equal(
    await page
      .locator("main a[href='/ru/calculator?scenario=house-construction']")
      .count(),
    1
  );
  results.push({
    check: "base service CTA destinations and invalid scenario fallback",
    passed: true,
  });
  await page.goto(
    `${base}/ru/prices?utm_source=google&utm_medium=organic&name=PRIVATE`,
    { waitUntil: "networkidle" }
  );
  // Test clicks without launching an external telephone/WhatsApp application.
  await page.evaluate(() =>
    document.addEventListener(
      "click",
      (event) => {
        if (event.target.closest?.("a[href^='tel:'],a[href^='https://wa.me/']"))
          event.preventDefault();
      },
      { capture: true }
    )
  );
  await page.locator("[data-mobile-contact-bar] a[href^='tel:']").click();
  await page
    .locator("[data-mobile-contact-bar] a[href^='https://wa.me/']")
    .click();
  await page.locator("[data-mobile-contact-bar] button").click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: copy.contacts.formTitle })
    .click();
  const form = page.locator("[role='dialog'] form");
  await form.locator("button[type='submit']").click();
  await form.getByRole("alert").waitFor();
  await form.locator("select[name=objectType]").selectOption("apartment");
  await form.locator("input[name=area]").fill("60");
  await form.locator("input[name=region]").fill("Test Yerevan");
  await form.locator("select[name=workType]").selectOption("renovation");
  await form.locator("input[name=name]").fill("PRIVATE_TEST_NAME");
  await form.locator("input[name=phone]").fill("+37400000000");
  await form
    .locator("textarea[name=comment]")
    .fill("SIMULATE_DELIVERY_FAILURE");
  await form.locator("button[type='submit']").click();
  await form
    .getByRole("alert")
    .filter({ hasText: copy.estimate.error })
    .waitFor();
  assert.equal(
    await form.locator("input[name=name]").inputValue(),
    "PRIVATE_TEST_NAME",
    "Failed delivery erased the name"
  );
  assert.equal(
    await form.locator("select[name=objectType]").inputValue(),
    "apartment",
    "Failed delivery reset object type"
  );
  assert.equal(
    await form.locator("select[name=workType]").inputValue(),
    "renovation",
    "Failed delivery reset work type"
  );
  await form
    .locator("textarea[name=comment]")
    .fill("Mock test, never delivered externally.");
  await form.locator("button[type='submit']").click();
  await page
    .getByRole("dialog")
    .getByText(copy.estimate.success, { exact: true })
    .waitFor();
  const events = await page.evaluate(() =>
    window.testAnalytics.filter((x) => x[0] === "event")
  );
  // Local previews deliberately emit no production analytics, even with a tag.
  // Production event payloads and PII filtering are covered by analytics-check.
  assert.deepEqual(events, [], "Local browser traffic emitted analytics");
  results.push({
    check:
      "form validation, failed delivery, preserved input, successful retry; local analytics suppressed",
    passed: true,
  });

  await page.goto(`${base}/ru/calculator`, { waitUntil: "networkidle" });
  const calc = copy.constructionCalculator;
  await page.locator("input[name=area]").fill("80");
  await page
    .getByRole("button", { name: calc.result.calculate, exact: true })
    .click();
  const calcForm = page.locator("[role='dialog'] form");
  await calcForm.locator("input[name=region]").fill("Test Yerevan");
  await calcForm.locator("input[name=name]").fill("PRIVATE_TEST_NAME");
  await calcForm.locator("input[name=phone]").fill("+37400000000");
  await calcForm.locator("button[type='submit']").click();
  await page
    .getByRole("dialog")
    .getByText(calc.request.success, { exact: true })
    .waitFor();
  const calcEvents = await page.evaluate(() =>
    window.testAnalytics.filter((x) => x[0] === "event")
  );
  assert.deepEqual(
    calcEvents,
    [],
    "Local calculator traffic emitted analytics"
  );
  results.push({
    check: "construction calculator to acknowledged lead",
    passed: true,
  });
  await page.goto(`${base}/ru/calculator`, { waitUntil: "networkidle" });
  await page
    .getByText(calc.quickScenarios.interiorDesign.title, { exact: true })
    .click();
  await page.locator("input[name=area]").fill("65");
  await page
    .getByRole("button", { name: calc.result.calculate, exact: true })
    .click();
  const designForm = page.locator("[role='dialog'] form");
  await designForm.locator("select[name=objectType]").selectOption("apartment");
  await designForm.locator("input[name=region]").fill("Test Yerevan");
  await designForm.locator("input[name=name]").fill("PRIVATE_TEST_NAME");
  await designForm.locator("input[name=phone]").fill("+37400000000");
  await designForm.locator("button[type='submit']").click();
  await page
    .getByRole("dialog")
    .getByText(calc.request.success, { exact: true })
    .waitFor();
  results.push({
    check: "design calculator to acknowledged lead",
    passed: true,
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/ru/prices`, { waitUntil: "networkidle" });
  assert(!(await page.locator("[data-mobile-contact-bar]").isVisible()));
  await page.screenshot({ path: `${output}/ru-prices-desktop.png` });
  assert.equal(pageErrors.length, 0, pageErrors.join("\n"));
  results.push({
    check: "desktop layout and no browser exceptions",
    passed: true,
  });
  writeFileSync(
    "docs/seo/BROWSER_CHECKS.json",
    JSON.stringify(
      {
        checkedAt: new Date().toISOString(),
        base,
        viewport: "320×844 / 390×844 / 768×844 / 1440×900",
        results,
        pageErrors,
        telegram: "mocked; no real messages",
        analytics: "suppressed outside production origin; GA network blocked",
      },
      null,
      2
    ) + "\n"
  );
  console.log(JSON.stringify(results));
} catch (error) {
  await page.screenshot({ path: `${output}/failure.png`, fullPage: true });
  console.error(
    await page
      .locator("[role=dialog]")
      .innerText()
      .catch(() => "No dialog")
  );
  console.error(await page.evaluate(() => window.testAnalytics));
  throw error;
} finally {
  await browser.close();
}
