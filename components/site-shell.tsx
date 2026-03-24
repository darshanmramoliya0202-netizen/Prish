"use client";

import type { ReactNode } from "react";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cream text-ink">
      <div className="relative">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </main>
  );
}
