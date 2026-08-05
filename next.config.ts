import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  allowedDevOrigins: ["sugarlab-shavarsh.ngrok.app", "127.0.0.1"],
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82],
  },
};

export default nextConfig;
