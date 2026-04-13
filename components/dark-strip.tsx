import type { ReactNode } from "react";

type DarkStripVariant = "stats" | "cta" | "quote";

type StatItem = {
  value: string;
  label: string;
  sublabel?: string;
};

type DarkStripProps = {
  variant?: DarkStripVariant;
  children?: ReactNode;
  stats?: StatItem[];
  className?: string;
};

export default function DarkStrip({
  variant = "cta",
  children,
  stats,
  className = "",
}: DarkStripProps) {
  return (
    <section
      className={`relative overflow-hidden bg-leaf-dark py-16 sm:py-20 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.07),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {variant === "stats" && stats && (
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-4xl text-parchment sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm font-medium text-parchment/80">{s.label}</p>
                {s.sublabel && (
                  <p className="mt-1 text-xs text-parchment/40">{s.sublabel}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {variant === "cta" && (
          <div className="flex flex-col items-center text-center">
            {children}
          </div>
        )}

        {variant === "quote" && (
          <blockquote className="mx-auto max-w-2xl text-center">
            {children}
          </blockquote>
        )}
      </div>
    </section>
  );
}
