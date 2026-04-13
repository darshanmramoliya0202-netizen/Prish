"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6" fill="white">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.664 4.82 1.822 6.83L2 30l7.372-1.793A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.54 11.54 0 0 1-5.89-1.61l-.42-.25-4.37 1.062 1.1-4.25-.278-.44A11.56 11.56 0 0 1 4.4 16C4.4 9.592 9.592 4.4 16 4.4S27.6 9.592 27.6 16 22.408 27.6 16 27.6zm6.32-8.67c-.347-.174-2.053-1.013-2.372-1.129-.32-.116-.552-.174-.784.174-.232.347-.9 1.129-1.103 1.362-.202.232-.405.26-.752.087-.347-.174-1.465-.54-2.79-1.722-1.031-.921-1.727-2.058-1.93-2.405-.202-.347-.021-.534.152-.707.156-.155.347-.405.52-.607.174-.203.232-.347.347-.579.116-.232.058-.434-.029-.607-.087-.174-.784-1.89-1.074-2.588-.283-.68-.57-.587-.784-.598l-.666-.012c-.232 0-.607.087-.924.434-.32.347-1.218 1.19-1.218 2.902s1.247 3.366 1.42 3.598c.174.232 2.453 3.747 5.943 5.254.831.359 1.479.573 1.984.733.833.265 1.592.228 2.192.138.668-.1 2.053-.84 2.344-1.651.29-.812.29-1.508.202-1.651-.086-.144-.318-.232-.665-.405z" />
  </svg>
);

export default function WhatsAppButton() {
  const iconControls = useAnimation();

  useEffect(() => {
    const wiggle = async () => {
      await iconControls.start({
        rotate: [0, -14, 12, -10, 7, -4, 0],
        transition: { duration: 0.7, ease: "easeInOut" },
      });
    };
    wiggle();
    const id = setInterval(wiggle, 5000);
    return () => clearInterval(id);
  }, [iconControls]);

  return (
    <a
      href="https://wa.me/919586616746"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-110 hover:shadow-[0_12px_36px_rgba(37,211,102,0.6)] sm:bottom-6 sm:right-6"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* Continuous pulse ring */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ backgroundColor: "#25D366", animation: "wa-pulse 2.2s ease-out infinite" }}
      />
      {/* Wiggling icon */}
      <motion.span animate={iconControls} className="relative z-10 flex items-center justify-center">
        {WA_ICON}
      </motion.span>
    </a>
  );
}
