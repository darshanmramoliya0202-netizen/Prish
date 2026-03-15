"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/content";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#d8caac]/60 bg-[#f5eedc]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="min-w-fit">
            <p className="text-xs uppercase tracking-[0.45em] text-[#8a6433]">Prish Overseas</p>
            <p className="mt-2 text-sm text-[#395041]">Indian-origin ingredients for global formulations</p>
          </Link>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-2 rounded-full border border-[#d8c49c] bg-[#fff7e8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7d5c2c] transition hover:border-[#c99c63] hover:bg-[#f7edd7] lg:hidden"
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
                    ? "bg-[#173124] text-[#fff8ed]"
                    : "text-[#4d6254] hover:bg-[#ece2cb] hover:text-[#173124]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/inquiry"
          className="hidden items-center gap-2 rounded-full border border-[#c99c63]/60 bg-[#c99c63] px-4 py-2 text-sm font-semibold text-[#173124] transition hover:bg-[#d8ab73] lg:inline-flex"
        >
          Start an Inquiry
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
