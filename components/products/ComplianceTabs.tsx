"use client";

import { useEffect, useState } from "react";
import { regions } from "@/content/regions";
import type { FlagId, RegionId } from "@/content/types";
import { useRegionStore } from "@/stores/region";

/**
 * Region-aware compliance notes. All four regions ship in the HTML (SSR renders the
 * neutral first tab); the client pre-selects the visitor's detected/chosen market.
 */
export function ComplianceTabs({ flags, className = "" }: { flags: FlagId[]; className?: string }) {
  const { region, hydrate } = useRegionStore();
  const [active, setActive] = useState<RegionId | null>(null);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  const current: RegionId = active ?? region ?? "eu";

  return (
    <div className={className}>
      <div role="tablist" aria-label="Your market" className="flex flex-wrap gap-2">
        {regions.map((r) => {
          const on = r.id === current;
          return (
            <button
              key={r.id}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`compliance-${r.id}`}
              id={`tab-${r.id}`}
              onClick={() => setActive(r.id)}
              className={`rounded-full px-4 py-2 text-small font-semibold transition-colors ${on ? "bg-forest-900 text-cream-50" : "border border-current/30 hover:border-current"}`}
            >
              {r.name}
              {region === r.id && !active ? <span className="ml-2 text-[10px] uppercase tracking-wider opacity-70">detected</span> : null}
            </button>
          );
        })}
      </div>
      {regions.map((r) => {
        const notes = [...r.compliance.general, ...flags.map((f) => r.compliance.byFlag[f]).filter((x): x is string => !!x)];
        return (
          <div key={r.id} role="tabpanel" id={`compliance-${r.id}`} aria-labelledby={`tab-${r.id}`} hidden={r.id !== current} className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow opacity-60">What to expect · {r.short}</p>
              <ul className="mt-3 space-y-3">
                {notes.map((n) => (
                  <li key={n} className="flex gap-3 text-body">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow opacity-60">Documents usually asked</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {r.compliance.docsUsuallyAsked.map((d) => (
                  <li key={d} className="rounded-full border border-current/20 px-3 py-1 text-small">
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-small opacity-70">
                Incoterm we usually quote for {r.short}: <strong>{r.incotermDefault}</strong>. FOB and CIF both available.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
