"use client";

import { useCalcNav } from "@/store/calculator-nav";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/components/home/HomePage";
import { CalculatorPage } from "@/components/calculator/CalculatorPage";

export default function Home() {
  const view = useCalcNav((s) => s.view);

  return (
    <div className="flex min-h-screen flex-col bg-brand-canvas">
      <Header />
      <main id="main-content" className="flex-1">
        {view.type === "home" ? (
          <HomePage />
        ) : (
          <CalculatorPage id={view.id} />
        )}
      </main>
      <Footer />
    </div>
  );
}
