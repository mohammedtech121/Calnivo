"use client";

import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { HomePage } from "@/components/home/HomePage";
import { CalculatorPage } from "@/components/calculator/CalculatorPage";
import { useCalcNav } from "@/store/calculator-nav";

interface Props {
  /**
   * If provided, navigate to this calculator immediately on mount. Used by
   * the dynamic /calculators/[id] route so the SPA shows the right tool
   * without the user having to click.
   */
  calculatorId?: string;
}

/**
 * Top-level layout shared by the home route and every
 * /calculators/[id] route. Renders the sticky Header, main content, and
 * sticky Footer. Syncs the SPA navigation store with the URL on mount.
 */
export function Layout({ calculatorId }: Props) {
  const { view, go, setHome } = useCalcNav();

  // If we landed on /calculators/[id], switch the SPA view to that calculator
  // (without pushing to history — the URL is already correct).
  useEffect(() => {
    if (calculatorId) {
      go(calculatorId);
    } else {
      // If we're on "/" but the SPA still shows a calculator, reset to home.
      setHome();
    }
  }, [calculatorId, go, setHome]);

  return (
    <div className="flex min-h-screen flex-col bg-brand-canvas">
      <Header />
      <main id="main-content" className="flex-1">
        {view.type === "calculator" ? (
          <CalculatorPage id={view.id} />
        ) : (
          <HomePage />
        )}
      </main>
      <Footer />
    </div>
  );
}
