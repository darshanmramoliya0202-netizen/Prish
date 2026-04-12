"use client";

import { useState } from "react";

const TABS = [
  { id: "all", label: "All products", href: "#product-categories" },
  { id: "botanical-powders", label: "Botanical Powders", href: "#cat-botanical-powders" },
  { id: "dehydrated-ingredients", label: "Dehydrated", href: "#cat-dehydrated-ingredients" },
  { id: "export-staples", label: "Export Staples", href: "#cat-export-staples" },
];

export default function ProductCategoryFilter({ slugs }: { slugs: string[] }) {
  const [active, setActive] = useState("all");

  const handleClick = (tab: typeof TABS[number]) => {
    setActive(tab.id);
    if (tab.href) {
      const el = document.querySelector(tab.href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-[64px] z-30 mb-12 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-leaf-dark/90 p-2 backdrop-blur-md">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => handleClick(tab)}
          className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition duration-200 ${
            active === tab.id
              ? "bg-gold-warm text-leaf-dark shadow-[0_4px_14px_rgba(212,145,10,0.35)]"
              : "text-wheat/60 hover:bg-white/5 hover:text-parchment"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
