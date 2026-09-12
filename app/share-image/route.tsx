import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/shinex-logo.png")
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        border: "20px solid #172b36",
      }}
    >
      {/* This image is embedded in a generated PNG, not a browser page. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="SHINEX"
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={875}
        height={266}
      />
      <div
        style={{
          marginTop: 36,
          width: 80,
          height: 5,
          background: "#b98259",
          display: "flex",
        }}
      />
      <div
        style={{
          marginTop: 28,
          fontSize: 32,
          color: "#172b36",
          letterSpacing: 3,
          display: "flex",
        }}
      >
        shinex.am
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
