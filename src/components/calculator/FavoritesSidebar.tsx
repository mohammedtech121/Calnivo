"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";
import { CATEGORY_META } from "@/lib/calculators/registry";

/**
 * Sidebar "Your favorites" card. Client-only — renders only when the user has
 * favorited at least one calculator. Used on calculator pages alongside the
 * "More calculators" related list.
 */
export function FavoritesSidebar() {
  const { metas } = useFavorites();
  if (metas.length === 0) return null;
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 shadow-brand">
      <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
        Your favorites
      </h3>
      <ul className="space-y-1">
        {metas.map((c) => {
          const CIcon = c.icon;
          const cat = CATEGORY_META[c.category];
          return (
            <li key={c.id}>
              <Link
                href={`/calculators/${c.id}`}
                className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-white"
              >
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-md",
                    cat.tint,
                    cat.fg,
                  )}
                >
                  <CIcon className="h-3.5 w-3.5" />
                </span>
                <span className="font-medium text-brand-ink group-hover:text-brand-accent-deep">
                  {c.short}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
