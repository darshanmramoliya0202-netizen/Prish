import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // qualities must be listed or Next 16 serves everything at 75 (the low ones are for
  // decorative backdrops such as the hero photo)
  images: { formats: ["image/avif", "image/webp"], qualities: [45, 60, 75, 82, 86] },
  async redirects() {
    return [{ source: "/about", destination: "/story", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/downloads/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
