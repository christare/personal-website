import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LAST_SHUTTLE_MEMORY_BRIDGE: existsSync(resolve(process.cwd(), "public/last-shuttle/j_memory_bridge.mp4"))
      ? "/last-shuttle/j_memory_bridge.mp4" : "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unavatar.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
