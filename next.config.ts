import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  transpilePackages: ['react-phone-input-2'],
  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;