"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating "back to top" button. Appears after the user scrolls past 600px,
 * fades in smoothly, and scrolls back to the top on click. Respects reduced
 * motion preferences. Hidden on touch-print and when the consent banner is
 * likely visible (bottom-right corner avoids overlap with the bottom-fixed
 * banner).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={cn(
        "no-print fixed bottom-24 right-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-brand bg-white text-brand-ink shadow-brand-lg transition-all duration-200 hover:border-brand-accent hover:bg-accent/40 hover:text-brand-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 sm:bottom-6 sm:right-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
