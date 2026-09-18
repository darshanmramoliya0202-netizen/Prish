"use client";

import { useEffect } from "react";
import { regions } from "@/content/regions";
import { useRegionStore } from "@/stores/region";
import { IconGlobe } from "@/components/ui/icons";

/** Manual market choice. Only a manual choice writes the cookie (see /privacy). */
export function RegionSwitcher({ className = "" }: { className?: string }) {
  const { region, hydrate, set } = useRegionStore();
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return (
    <label className={`inline-flex items-center gap-2 rounded-full border border-current/25 px-3 py-1.5 text-small ${className}`}>
      <IconGlobe width={16} height={16} />
      <span className="sr-only">Your market</span>
      <select
        value={region ?? ""}
        onChange={(e) => set(e.target.value ? (e.target.value as (typeof regions)[number]["id"]) : null)}
        className="bg-transparent font-semibold outline-none"
        aria-label="Choose your market"
      >
        <option value="" className="text-ink-900">
          Choose your market
        </option>
        {regions.map((r) => (
          <option key={r.id} value={r.id} className="text-ink-900">
            {r.name}
          </option>
        ))}
      </select>
    </label>
  );
}
