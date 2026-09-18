"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconKit, IconWhatsApp } from "@/components/ui/icons";
import { waLink } from "@/lib/whatsapp";
import { cta } from "@/content/copy";
import { useKitCount } from "@/stores/sample-kit";
import { useHydrated } from "@/lib/browser-store";

/** Sticky bottom bar on small screens: WhatsApp + sample kit. */
export function MobileBar() {
  const pathname = usePathname();
  const count = useKitCount();
  const hydrated = useHydrated();
  if (pathname.startsWith("/inquiry")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-ink-900/10 bg-cream-50/90 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-[#062a16]"
        data-umami-event="whatsapp_click"
        data-umami-event-placement="mobile_bar"
      >
        <IconWhatsApp /> {cta.price}
      </a>
      <Link
        href="/inquiry"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-forest-900 font-semibold text-cream-50"
      >
        <IconKit /> Sample kit
        {hydrated && count > 0 ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1.5 text-[11px] font-bold text-ink-900 tabular">
            {count}
          </span>
        ) : null}
      </Link>
    </div>
  );
}
