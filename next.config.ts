import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  basePath: "/wazuka-track-line-editor",
  assetPrefix: "/wazuka-track-line-editor/",
  distDir: "out/wazuka-track-line-editor",
  output: "export",
  reactCompiler: true,
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              titleProp: true,
              titleId: "filePath",
            },
          },
        ],
        as: "*.js",
      },
    },
  },
  typescript: {
    tsconfigPath: process.env.NODE_ENV === "production"
      ? "tsconfig.build.json"
      : "tsconfig.json",
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
