// Browser tests only. Start a separate local server with SHINEX_BROWSER_TEST=1
// and --import ./scripts/lib/mock-telegram.mjs. No Telegram request is forwarded.
if (process.env.SHINEX_BROWSER_TEST !== "1")
  throw new Error(
    "Telegram mock is restricted to the explicit browser test server."
  );
// The runner refuses to submit a form unless this test-only probe exists.
const { Server } = await import("node:http");
const emit = Server.prototype.emit;
Server.prototype.emit = function (event, request, response, ...rest) {
  if (event === "request" && request.url === "/__shinex_test_probe") {
    response.writeHead(200, { "content-type": "text/plain" });
    response.end("shinex-telegram-is-mocked");
    return true;
  }
  return emit.call(this, event, request, response, ...rest);
};
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input, options) => {
  const url = new URL(
    typeof input === "string" || input instanceof URL ? input : input.url
  );
  if (url.hostname === "api.telegram.org") {
    const payload = JSON.parse(options.body);
    const failure = payload.text.includes("SIMULATE_DELIVERY_FAILURE");
    return new Response(JSON.stringify({ ok: !failure }), {
      status: failure ? 503 : 200,
    });
  }
  return originalFetch(input, options);
};
