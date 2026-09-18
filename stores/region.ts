"use client";

import { create } from "zustand";
import type { RegionId } from "@/content/types";
import { guessRegion, readRegionCookie, writeRegionCookie, isRegionId } from "@/lib/region";
import { track } from "@/lib/analytics";

type RegionState = {
  /** null until hydrated on the client */
  region: RegionId | null;
  /** true when the user chose explicitly (cookie) rather than a guess */
  explicit: boolean;
  hydrated: boolean;
  hydrate: () => void;
  set: (id: RegionId | null) => void;
};

export const useRegionStore = create<RegionState>((set, get) => ({
  region: null,
  explicit: false,
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return;
    const fromQuery = new URLSearchParams(window.location.search).get("region");
    if (isRegionId(fromQuery)) {
      writeRegionCookie(fromQuery);
      set({ region: fromQuery, explicit: true, hydrated: true });
      return;
    }
    const fromCookie = readRegionCookie();
    if (fromCookie) {
      set({ region: fromCookie, explicit: true, hydrated: true });
      return;
    }
    set({ region: guessRegion(), explicit: false, hydrated: true });
  },
  set: (id) => {
    writeRegionCookie(id);
    set({ region: id, explicit: id !== null });
    track("region_set", { region: id ?? "none" });
  },
}));
