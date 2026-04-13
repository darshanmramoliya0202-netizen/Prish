"use client";

import { useEffect, useRef, useState } from "react";

export default function MobileCTABar() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY.current;
        if (delta > 6 && currentY > 80) {
          setHidden(true);
        } else if (delta < -4) {
          setHidden(false);
        }
        lastY.current = currentY;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-white/10 bg-leaf-dark/95 px-4 pb-safe pt-2.5 backdrop-blur-md transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href="https://wa.me/919586616746"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition active:opacity-80"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4" fill="white">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.664 4.82 1.822 6.83L2 30l7.372-1.793A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.54 11.54 0 0 1-5.89-1.61l-.42-.25-4.37 1.062 1.1-4.25-.278-.44A11.56 11.56 0 0 1 4.4 16C4.4 9.592 9.592 4.4 16 4.4S27.6 9.592 27.6 16 22.408 27.6 16 27.6zm6.32-8.67c-.347-.174-2.053-1.013-2.372-1.129-.32-.116-.552-.174-.784.174-.232.347-.9 1.129-1.103 1.362-.202.232-.405.26-.752.087-.347-.174-1.465-.54-2.79-1.722-1.031-.921-1.727-2.058-1.93-2.405-.202-.347-.021-.534.152-.707.156-.155.347-.405.52-.607.174-.203.232-.347.347-.579.116-.232.058-.434-.029-.607-.087-.174-.784-1.89-1.074-2.588-.283-.68-.57-.587-.784-.598l-.666-.012c-.232 0-.607.087-.924.434-.32.347-1.218 1.19-1.218 2.902s1.247 3.366 1.42 3.598c.174.232 2.453 3.747 5.943 5.254.831.359 1.479.573 1.984.733.833.265 1.592.228 2.192.138.668-.1 2.053-.84 2.344-1.651.29-.812.29-1.508.202-1.651-.086-.144-.318-.232-.665-.405z" />
        </svg>
      </a>

      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-wheat/50">Prish Overseas</span>

      <a
        href="/inquiry"
        className="rounded-full bg-gold-warm px-5 py-2 text-sm font-semibold text-leaf-dark transition active:scale-95 active:opacity-80"
      >
        Get quote
      </a>
    </div>
  );
}
