import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain output — Netlify uses @netlify/plugin-nextjs to build/deploy.
  // (Removed `output: "standalone"` which is for self-hosting / Docker and
  // breaks on Netlify.)
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
