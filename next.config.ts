import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, ".."),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "www.transparenttextures.com"
      },
      {
        protocol: "https",
        hostname: "wbibokdzpjspqkrkntts.supabase.co"
      }
    ]
  }
};

export default nextConfig;
