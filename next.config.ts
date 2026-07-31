import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project — a lockfile in a parent directory
  // otherwise makes Next infer the wrong root.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
