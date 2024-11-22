import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  basePath: "/wedding-invitation",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://joonhameetshyelin.github.io/wedding-invitation"
      : "",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
