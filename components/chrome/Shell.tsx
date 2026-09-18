import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";
import { MobileBar } from "./MobileBar";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-ink-900">
        Skip to content
      </a>
      <Header />
      <main id="main" className="pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileBar />
    </>
  );
}
