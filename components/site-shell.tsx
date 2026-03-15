"use client";

import type { ReactNode } from "react";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f0e6] text-[#173124]">
      <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(255,249,238,0.95),transparent_48%)]" />
      <div className="pointer-events-none absolute left-[-10rem] top-[12rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(146,178,136,0.16),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[30rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(201,156,99,0.16),transparent_72%)] blur-3xl" />
      <div className="relative">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </main>
  );
}
