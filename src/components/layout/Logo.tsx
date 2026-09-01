"use client";

import Image from "next/image";
import { useCalcNav } from "@/store/calculator-nav";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2.5 select-none"
      aria-label="Calnivo home"
    >
      <Image
        src="/calnivo-logo.jpeg"
        alt="Calnivo"
        width={36}
        height={36}
        className="h-9 w-auto rounded-lg transition-transform group-hover:scale-105"
        priority
      />
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
