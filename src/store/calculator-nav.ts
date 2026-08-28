import { create } from "zustand";

export type View =
  | { type: "home" }
  | { type: "calculator"; id: string };

interface CalculatorNavState {
  view: View;
  history: View[];
  query: string;
  setHome: () => void;
  go: (id: string) => void;
  back: () => void;
  setQuery: (q: string) => void;
}

export const useCalcNav = create<CalculatorNavState>((set, get) => ({
  view: { type: "home" },
  history: [],
  query: "",
  setHome: () => {
    set((s) => ({
      view: { type: "home" },
      history: [...s.history, s.view],
    }));
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  },
  go: (id: string) => {
    set((s) => ({
      view: { type: "calculator", id },
      history: [...s.history, s.view],
      query: "",
    }));
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  },
  back: () => {
    const h = get().history;
    if (h.length === 0) {
      set({ view: { type: "home" } });
    } else {
      const prev = h[h.length - 1];
      set({ view: prev, history: h.slice(0, -1) });
    }
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  },
  setQuery: (q: string) => set({ query: q }),
}));
