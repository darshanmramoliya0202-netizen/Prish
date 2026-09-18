"use client";

import { usePathname } from "next/navigation";
import { IconWhatsApp } from "@/components/ui/icons";
import { waLink } from "@/lib/whatsapp";
import { cta } from "@/content/copy";

/** Floating WhatsApp button — desktop only (mobile has the CTA bar). */
export function WhatsAppFab() {
  const pathname = usePathname();
  if (pathname.startsWith("/inquiry")) return null;
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cta.priceWhatsApp}
      className="fixed bottom-6 right-6 z-40 hidden md:inline-flex h-14 items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 font-semibold text-[#062a16] shadow-deep transition-transform hover:scale-105"
      data-umami-event="whatsapp_click"
      data-umami-event-placement="fab"
    >
      <IconWhatsApp width={22} height={22} />
      <span className="text-small">{cta.price}</span>
    </a>
  );
}
