import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Calnivo — Free Online Calculators",
  description:
    "Fast, comprehensive, free online calculators across finance, fitness, health, math and everyday utilities. No registration required.",
  keywords: [
    "calculator",
    "mortgage calculator",
    "BMI calculator",
    "loan calculator",
    "scientific calculator",
    "compound interest",
    "Calnivo",
  ],
  authors: [{ name: "Calnivo" }],
  openGraph: {
    title: "Calnivo — Free Online Calculators",
    description:
      "Fast, comprehensive, free online calculators across finance, fitness, health, math and everyday utilities.",
    siteName: "Calnivo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
