"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";

/**
 * Favorite toggle button for a calculator page. Client-only because it
 * reads/writes localStorage and needs interactive state.
 */
export function FavoriteButton({ id }: { id: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id);
  return (
    <button
      onClick={() => toggleFavorite(id)}
      aria-pressed={fav}
      className={cn(
        "no-print inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium shadow-sm transition-all hover:-translate-y-px",
        fav
          ? "border-amber-300 bg-amber-50 text-amber-700"
          : "border-brand bg-white text-brand-muted hover:bg-accent/50 hover:text-brand-ink",
      )}
    >
      <Star className={cn("h-4 w-4", fav && "fill-amber-400 text-amber-500")} />
      {fav ? "Favorited" : "Add to favorites"}
    </button>
  );
}
