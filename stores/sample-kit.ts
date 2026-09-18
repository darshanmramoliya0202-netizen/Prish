"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BuyerTypeId, RegionId } from "@/content/types";
import { track } from "@/lib/analytics";

export type KitInterest = "sample" | "trial" | "commercial";
export type KitDoc = "coa" | "eto_free" | "mrl_report" | "spec_sheet";

export interface KitItem {
  productId: string;
  variant?: string;
  grade?: string;
  interest: KitInterest;
  specNotes?: string;
  docs: KitDoc[];
}

export interface KitBuyer {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  buyerType?: BuyerTypeId;
  /** honeypot — must stay empty */
  website?: string;
}

export interface KitDelivery {
  region?: RegionId;
  incoterm: "FOB" | "CIF";
  destination?: string;
  timeline?: string;
}

interface KitState {
  items: KitItem[];
  buyer: KitBuyer;
  delivery: KitDelivery;
  message: string;
  startedAt: number;
  submissionId: string;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  update: (productId: string, patch: Partial<KitItem>) => void;
  setBuyer: (patch: Partial<KitBuyer>) => void;
  setDelivery: (patch: Partial<KitDelivery>) => void;
  setMessage: (m: string) => void;
  /** after a successful send: clear items, keep buyer details, new submission id */
  reset: (keepBuyer?: boolean) => void;
}

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

const emptyBuyer: KitBuyer = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
};

export const useKitStore = create<KitState>()(
  persist(
    (set, get) => ({
      items: [],
      buyer: emptyBuyer,
      delivery: { incoterm: "FOB" },
      message: "",
      startedAt: 0,
      submissionId: "",
      add: (productId) => {
        if (get().items.some((i) => i.productId === productId)) return;
        set((s) => ({
          items: [
            ...s.items,
            { productId, interest: "sample", docs: ["spec_sheet"] },
          ],
          startedAt: s.startedAt || Date.now(),
          submissionId: s.submissionId || newId(),
        }));
        track("kit_add", { product: productId });
      },
      remove: (productId) =>
        set((s) => ({
          items: s.items.filter((i) => i.productId !== productId),
        })),
      toggle: (productId) =>
        get().has(productId) ? get().remove(productId) : get().add(productId),
      has: (productId) => get().items.some((i) => i.productId === productId),
      update: (productId, patch) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId ? { ...i, ...patch } : i,
          ),
        })),
      setBuyer: (patch) => set((s) => ({ buyer: { ...s.buyer, ...patch } })),
      setDelivery: (patch) =>
        set((s) => ({ delivery: { ...s.delivery, ...patch } })),
      setMessage: (message) => set({ message }),
      reset: (keepBuyer = true) =>
        set((s) => ({
          items: [],
          buyer: keepBuyer ? s.buyer : emptyBuyer,
          message: "",
          startedAt: 0,
          submissionId: newId(),
        })),
    }),
    {
      name: "prish.kit.v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        items: s.items,
        buyer: s.buyer,
        delivery: s.delivery,
        message: s.message,
        startedAt: s.startedAt,
        submissionId: s.submissionId,
      }),
    },
  ),
);

/** Hydration-safe item count (0 on the server and before rehydration). */
export function useKitCount(): number {
  return useKitStore((s) => s.items.length);
}
