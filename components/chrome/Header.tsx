"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Lockup } from "@/components/brand/Lockup";
import { IconClose, IconKit, IconMenu, IconWhatsApp } from "@/components/ui/icons";
import { useHydrated } from "@/lib/browser-store";
import { useKitCount } from "@/stores/sample-kit";
import { waLink } from "@/lib/whatsapp";
import { cta } from "@/content/copy";

export const NAV = [
  { href: "/products", label: "Products" },
  { href: "/story", label: "Story" },
  { href: "/quality", label: "Quality & documents" },
  { href: "/crop-calendar", label: "Crop calendar" },
  { href: "/inquiry", label: "Inquiry" },
] as const;

/**
 * Sticky header. Reads the theme of the section under it (data-theme) via a sentinel
 * so it renders light-on-dark over the immersive halves and dark-on-cream elsewhere.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const hydrated = useHydrated();
  const count = useKitCount();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // which themed section is under the header line? (skip the header itself)
      const stack = document.elementsFromPoint(24, 40);
      const el = stack.find((n) => !n.closest("header") && !n.closest("#mobile-menu"));
      const sec = el?.closest<HTMLElement>("[data-theme]");
      const t = sec?.dataset.theme;
      setTheme(t === "light" ? "light" : "dark");
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const dark = theme === "dark";
  const shell = scrolled
    ? dark
      ? "bg-forest-950/70 border-cream-50/10"
      : "bg-cream-50/75 border-ink-900/10"
    : "border-transparent";

  return (
    <>
      <header
        data-theme={dark ? "dark" : "light"}
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-3 ${shell} ${dark ? "text-cream-50" : "text-ink-900"}`}
        style={{ backgroundColor: scrolled ? undefined : "transparent" }}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
          <Lockup sealClassName="size-10 md:size-11" />

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => {
              const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`text-small font-semibold tracking-wide transition-opacity hover:opacity-100 ${active ? "opacity-100 underline underline-offset-8 decoration-gold-500 decoration-2" : "opacity-75"}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-10 items-center gap-2 rounded-full border border-current/25 px-4 text-small font-semibold hover:border-current"
              data-umami-event="whatsapp_click"
              data-umami-event-placement="header"
            >
              <IconWhatsApp width={18} height={18} />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <Link
              href="/inquiry"
              className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-small font-semibold ${dark ? "bg-cream-50 text-forest-950" : "bg-forest-900 text-cream-50"}`}
              aria-label={cta.kit}
            >
              <IconKit width={18} height={18} />
              <span className="hidden md:inline">Sample kit</span>
              {hydrated && count > 0 ? (
                <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1.5 text-[11px] font-bold text-ink-900 tabular">{count}</span>
              ) : null}
            </Link>
            <button
              type="button"
              className="lg:hidden inline-flex size-10 items-center justify-center rounded-full border border-current/25"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        data-theme="dark"
        className={`fixed inset-0 z-40 bg-forest-950 text-cream-50 transition-opacity duration-3 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="container-x flex h-full flex-col justify-center gap-2 pt-20">
          {NAV.map((n, i) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-display-md py-2 font-display" style={{ transitionDelay: `${i * 40}ms` }}>
              {n.label}
            </Link>
          ))}
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 text-lead" data-umami-event="whatsapp_click" data-umami-event-placement="mobile_menu">
            <IconWhatsApp /> {cta.priceWhatsApp}
          </a>
        </div>
      </div>
    </>
  );
}
