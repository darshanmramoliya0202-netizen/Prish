"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type AccentColor = "terracotta" | "saffron" | "gold";

type FlipCardProps = {
  id: string;
  name: string;
  category: string;
  image: string;
  origin: string;
  moq: string;
  grade: string;
  certifications: string;
  accentColor?: AccentColor;
  specs?: { key: string; value: string }[];
};

const accentBorder: Record<AccentColor, string> = {
  terracotta: "border-t-terracotta",
  saffron: "border-t-saffron",
  gold: "border-t-gold",
};

const accentText: Record<AccentColor, string> = {
  terracotta: "text-terracotta",
  saffron: "text-saffron",
  gold: "text-gold",
};

export default function FlipCard({
  id,
  name,
  category,
  image,
  origin,
  moq,
  grade,
  certifications,
  accentColor = "gold",
  specs,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  const backSpecs = specs ?? [
    { key: "Origin", value: origin },
    { key: "MOQ", value: moq },
    { key: "Grade", value: grade },
    { key: "Certifications", value: certifications },
  ];

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`${name} — press Enter to flip for product details`}
      className="group relative h-[420px] cursor-pointer [perspective:1200px] focus:outline-none"
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(180deg)]"
        }`}
      >
        {/* ── FRONT ── */}
        <div
          className={`absolute inset-0 overflow-hidden rounded-2xl border-t-4 ${accentBorder[accentColor]} border border-wheat/20 shadow-card-light [backface-visibility:hidden]`}
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-leaf-dark/90 via-leaf-dark/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${accentText[accentColor]}`}>
              {category}
            </p>
            <h3 className="mt-1 font-serif text-2xl text-parchment">{name}</h3>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className={`absolute inset-0 overflow-hidden rounded-2xl border-t-4 ${accentBorder[accentColor]} border border-wheat/25 bg-cream p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]`}
        >
          <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${accentText[accentColor]}`}>
            {category}
          </p>
          <h3 className="mt-2 font-serif text-xl text-ink">{name}</h3>

          <div className="mt-5 space-y-3">
            {backSpecs.map((spec) => (
              <div key={spec.key} className="flex items-start justify-between gap-3 border-b border-wheat/30 pb-3 last:border-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">{spec.key}</p>
                <p className="text-right text-xs font-medium text-ink">{spec.value}</p>
              </div>
            ))}
          </div>

          <Link
            href={`/inquiry?product=${id}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-leaf-dark px-5 py-2.5 text-sm font-semibold text-parchment transition-all duration-300 hover:-translate-y-0.5 hover:bg-spice-dark"
          >
            Request sample
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
