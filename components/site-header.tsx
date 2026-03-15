"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/content";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="min-w-fit">
            <p className="text-xs uppercase tracking-[0.45em] text-copper/75">Prish Overseas</p>
            <p className="mt-2 text-sm text-mist/58">Indian-origin ingredients for global formulations</p>
          </Link>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-2 rounded-full border border-copper/25 bg-copper/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-copper transition hover:border-copper/45 hover:bg-copper/15 lg:hidden"
          >
            Inquire
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-mist"
                    : "text-mist/62 hover:bg-white/[0.06] hover:text-mist"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/inquiry"
          className="hidden items-center gap-2 rounded-full border border-copper/25 bg-copper/10 px-4 py-2 text-sm font-semibold text-copper transition hover:border-copper/45 hover:bg-copper/15 lg:inline-flex"
        >
          Start an Inquiry
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
