import type { NextConfig } from "next";

// Security headers applied to every route.
//
// Updated to allow Google Analytics (GA4) scripts + connections:
// - script-src: adds googletagmanager.com (gtag.js loader)
// - connect-src: adds google-analytics.com (data sending)
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // HSTS is also enforced by Netlify's edge, but we set it here too so the
  // header is present in all environments (preview, branch deploys, etc.).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Plain output — Netlify uses @netlify/plugin-nextjs to build/deploy.
  // (Removed `output: "standalone"` which is for self-hosting / Docker and
  // breaks on Netlify.)
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Defense-in-depth: never expose browser source maps in production.
  // (Next.js default is false, but we set it explicitly so it can't drift.)
  productionBrowserSourceMaps: false,
  // Allow the sandbox preview domain to hot-reload without CORS errors.
  allowedDevOrigins: ["*.space-z.ai", "*.z.ai"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
