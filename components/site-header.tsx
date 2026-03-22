"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/content";
import GeoBanner from "@/components/geo-banner";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
    <GeoBanner />
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#0f172a]/95 shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
          : "border-b border-transparent bg-[#0f172a]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="group min-w-fit">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-white transition group-hover:text-saffron">
            Prish Overseas
          </p>
          <p className="mt-1 text-[11px] tracking-wide text-slate-400">
            Indian-origin ingredients for global formulations
          </p>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm transition"
              >
                <span className={active ? "font-semibold text-saffron" : "text-slate-300 hover:text-white"}>
                  {item.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-saffron"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/inquiry"
            className="hidden items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition hover:bg-[#fbbf24] hover:shadow-[0_8px_24px_rgba(245,158,11,0.25)] lg:inline-flex"
          >
            Request Sample
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#0f172a]/98 backdrop-blur-2xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-xl px-4 py-3 text-sm transition ${
                      active
                        ? "bg-white/10 font-semibold text-saffron"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/inquiry"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-[#0f172a]"
              >
                Request Sample
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
