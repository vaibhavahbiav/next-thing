import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators:false,
  output: "export", // ✅ enable static export
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/next-thing/" : "",
  basePath: process.env.NODE_ENV === "production" ? "/next-thing" : "",
};

export default nextConfig;
