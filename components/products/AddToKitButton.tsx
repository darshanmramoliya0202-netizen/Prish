"use client";

import { useKitStore } from "@/stores/sample-kit";
import { useHydrated } from "@/lib/browser-store";
import { IconCheck, IconPlus } from "@/components/ui/icons";
import { cta } from "@/content/copy";

export function AddToKitButton({ productId, size = "md", className = "" }: { productId: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const hydrated = useHydrated();
  const inKit = useKitStore((s) => s.items.some((i) => i.productId === productId));
  const toggle = useKitStore((s) => s.toggle);
  const on = hydrated && inKit;
  const sz = { sm: "h-9 px-4 text-small", md: "h-11 px-5 text-body", lg: "h-13 px-7 text-lead" }[size];
  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={on}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors ${sz} ${on ? "bg-ok text-cream-50" : "border border-current/40 hover:border-current"} ${className}`}
    >
      {on ? <IconCheck width={18} height={18} /> : <IconPlus width={18} height={18} />}
      {on ? cta.inKit : cta.addToKit}
    </button>
  );
}
