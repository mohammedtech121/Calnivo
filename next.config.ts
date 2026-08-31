import type { NextConfig } from "next";

// Security headers applied to every route. These are evaluated by browsers
// on every response and materially raise the bar for XSS, clickjacking,
// MIME-sniffing and mixed-content attacks.
//
// Notes on the chosen policy:
//  - script-src 'self' 'unsafe-inline'  → Next.js injects inline hydration
//    scripts and runtime bootstrap chunks. A strict nonce-based policy would
//    require SSR + a per-request nonce, which is overkill for a fully static
//    client-side SPA. 'unsafe-inline' is safe here because the app renders
//    no user-controlled HTML (React escapes everything by default).
//  - style-src 'self' 'unsafe-inline'  → Tailwind + Next.js inject critical
//    CSS inline; blocking inline styles would break first paint.
//  - connect-src 'self'                 → the app makes NO outbound network
//    calls, so we lock this down hard. If you later add analytics or a real
//    backend, add that origin here.
//  - frame-ancestors 'none'             → hard block clickjacking (stronger
//    than X-Frame-Options: DENY).
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
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
