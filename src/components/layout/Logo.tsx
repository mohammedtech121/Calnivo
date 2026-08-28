"use client";

import { Calculator } from "lucide-react";
import { useCalcNav } from "@/store/calculator-nav";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2.5 select-none"
      aria-label="Calnivo home"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand-accent-gradient shadow-accent transition-transform group-hover:scale-105">
        <Calculator className="h-5 w-5 text-white" strokeWidth={2.2} />
      </span>
      <span className="text-[22px] font-bold tracking-tight text-brand-ink">
        Calnivo
      </span>
    </button>
  );
}

export function LogoInFooter() {
  const setHome = useCalcNav((s) => s.setHome);
  return <Logo onClick={setHome} />;
}
