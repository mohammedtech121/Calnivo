import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://calnivocalc.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Calnivo — Free Online Calculators",
    template: "%s | Calnivo",
  },
  description:
    "Fast, comprehensive, free online calculators across finance, fitness, health, math and everyday utilities. 40+ tools, all client-side, no registration required.",
  applicationName: "Calnivo",
  keywords: [
    "calculator",
    "free calculator",
    "online calculator",
    "mortgage calculator",
    "BMI calculator",
    "loan calculator",
    "scientific calculator",
    "compound interest calculator",
    "auto loan calculator",
    "retirement calculator",
    "percentage calculator",
    "Calnivo",
  ],
  authors: [{ name: "Calnivo" }],
  creator: "Calnivo",
  publisher: "Calnivo",
  alternates: {
    canonical: "/",
  },
  // Brand favicon + app icons (transparent PNG)
  // Includes legacy favicon.ico (root) + 48x48 (Google minimum) + 16x16
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Calnivo — Free Online Calculators",
    description:
      "Fast, comprehensive, free online calculators across finance, fitness, health, math and everyday utilities. 40+ tools, all client-side, no registration required.",
    url: SITE_URL,
    siteName: "Calnivo",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Calnivo — Free Online Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calnivo — Free Online Calculators",
    description:
      "40+ free online calculators for finance, fitness, health, math and everyday utilities.",
    images: ["/og-image.png"],
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF6A00",
};

const LOGO_URL = `${SITE_URL}/calnivo-logo.png`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calnivo",
  url: SITE_URL,
  description:
    "Free online calculators for finance, fitness, health, math and everyday utilities. 40+ tools, all client-side, no registration required.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser with JavaScript enabled.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Mortgage Calculator",
    "Loan Calculator",
    "Auto Loan Calculator",
    "Compound Interest Calculator",
    "Retirement Calculator",
    "Income Tax Calculator",
    "BMI Calculator",
    "Calorie Calculator",
    "Body Fat Calculator",
    "Scientific Calculator",
    "Percentage Calculator",
    "Triangle Calculator",
    "Age Calculator",
    "Date Calculator",
    "Subnet Calculator",
    "Password Generator",
    "Unit Conversion Calculator",
  ],
  publisher: {
    "@type": "Organization",
    name: "Calnivo",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
  },
};

// WebSite structured data — enables Google Sitelinks + brand entity recognition
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Calnivo",
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: "Calnivo",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-accent-gradient focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-accent"
        >
          Skip to content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
