"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/content";

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
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#e2d6bf]/70 bg-white/80 shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="group min-w-fit">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#173124] transition group-hover:text-[#8a6433]">
            Prish Overseas
          </p>
          <p className="mt-1 text-xs tracking-wide text-[#6b7f72]">
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
                <span className={active ? "font-semibold text-[#173124]" : "text-[#4d6254] hover:text-[#173124]"}>
                  {item.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-[#c99c63]"
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
            className="hidden items-center gap-2 rounded-full bg-[#173124] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f4433] hover:shadow-[0_8px_24px_rgba(23,49,36,0.2)] lg:inline-flex"
          >
            Start an Inquiry
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#173124] transition hover:bg-[#f0e8d6] lg:hidden"
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
            className="overflow-hidden border-t border-[#e2d6bf]/60 bg-white/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-xl px-4 py-3 text-sm transition ${
                      active
                        ? "bg-[#f5eedf] font-semibold text-[#173124]"
                        : "text-[#4d6254] hover:bg-[#faf5eb]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/inquiry"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#173124] px-5 py-3 text-sm font-semibold text-white"
              >
                Start an Inquiry
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
