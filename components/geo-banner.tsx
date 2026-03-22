"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, ArrowRight } from "lucide-react";
import Link from "next/link";

type RegionConfig = {
  region: string;
  headline: string;
  highlight: string;
  cta: string;
  ctaHref: string;
};

const regionConfigs: Record<string, RegionConfig> = {
  EU: {
    region: "Europe",
    headline: "EU-compliant, pesticide-free, and organic ingredient ranges",
    highlight: "Stringent EU regulation alignment and documentation support for European buyers.",
    cta: "View EU-ready catalog",
    ctaHref: "/products"
  },
  ME: {
    region: "Middle East",
    headline: "Bulk spice offerings with robust Gulf logistics capability",
    highlight: "Cardamom, turmeric, and chili powder in FCL volumes with GCC shipping lanes.",
    cta: "Explore bulk options",
    ctaHref: "/products"
  },
  NA: {
    region: "North America",
    headline: "Supplement-grade botanicals and formulation ingredients",
    highlight: "FDA-aware documentation, premium botanical powders, and batch traceability.",
    cta: "View botanical range",
    ctaHref: "/products"
  },
  AS: {
    region: "Asia-Pacific",
    headline: "Flexible regional supply with competitive pricing",
    highlight: "Adaptable packaging formats, LCL-ready shipments, and multi-origin sourcing.",
    cta: "View product catalog",
    ctaHref: "/products"
  },
  DEFAULT: {
    region: "Global",
    headline: "Premium Indian-origin ingredients for global B2B buyers",
    highlight: "Traceable supply from Indian farms with destination-aware compliance and packaging.",
    cta: "Explore our catalog",
    ctaHref: "/products"
  }
};

function getRegionFromTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith("Europe/")) return "EU";
    if (tz.startsWith("America/")) return "NA";
    if (tz.startsWith("Asia/Dubai") || tz.startsWith("Asia/Riyadh") || tz.startsWith("Asia/Qatar") || tz.startsWith("Asia/Bahrain") || tz.startsWith("Asia/Kuwait") || tz.startsWith("Asia/Muscat")) return "ME";
    if (tz.startsWith("Asia/") || tz.startsWith("Australia/") || tz.startsWith("Pacific/")) return "AS";
  } catch {
    // fallback
  }
  return "DEFAULT";
}

export default function GeoBanner() {
  const [config, setConfig] = useState<RegionConfig | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const region = getRegionFromTimezone();
    setConfig(regionConfigs[region] || regionConfigs.DEFAULT);
  }, []);

  if (!config || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative border-b border-saffron/20 bg-gradient-to-r from-[#0f172a] to-[#1e293b]"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 overflow-hidden">
            <Globe className="hidden h-4 w-4 shrink-0 text-saffron sm:block" />
            <p className="truncate text-xs text-slate-300 sm:text-sm">
              <span className="font-semibold text-saffron">{config.region}:</span>{" "}
              {config.headline}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={config.ctaHref}
              className="hidden items-center gap-1.5 rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron transition hover:bg-saffron/20 sm:inline-flex"
            >
              {config.cta}
              <ArrowRight className="h-3 w-3" />
            </Link>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="flex h-6 w-6 items-center justify-center rounded text-slate-400 transition hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
