import type { NextConfig } from "next";
const debug = process.env.NODE_ENV !== "production";
const repository = "wedding-invitation";
const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: `/${repository}`,
  assetPrefix: !debug ? `/${repository}/` : "", // production 일때 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
  images: {
    unoptimized: true, // 이미지 정상적으로 불러올 수 있도록함
  },
  compiler: {
    styledComponents: true, // styled-components 사용 시 컴파일러에 추가
  },
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
