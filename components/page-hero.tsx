"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PageHeroVariant = "plain" | "image" | "video";

type PageHeroProps = {
  variant?: PageHeroVariant;
  eyebrow: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  videoPoster?: string;
  videoSrc?: string;
  children?: ReactNode;
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function PageHero({
  variant = "plain",
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  videoPoster,
  videoSrc,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-cream pt-10 sm:pt-16 lg:pt-24">
      {/* Subtle top gradient to soften dark header edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-leaf-dark/8 to-transparent" />

      {variant === "video" && (
        <>
          <video
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={videoPoster}
          >
            {videoSrc && <source src={videoSrc} type="video/webm" />}
            {videoSrc && <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />}
          </video>
          {videoPoster && (
            <Image
              src={videoPoster}
              alt={imageAlt}
              fill
              className="object-cover md:hidden"
              priority
            />
          )}
          <div className="absolute inset-0 bg-leaf-dark/45" />
        </>
      )}

      {variant === "image" && imageSrc && (
        <>
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-leaf-dark/40" />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          <motion.p
            {...fadeUp(0)}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-saffron"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            {...fadeUp(0.12)}
            className={`mt-4 font-serif text-4xl leading-tight sm:text-5xl ${
              variant === "plain" ? "text-ink" : "text-parchment"
            }`}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              {...fadeUp(0.24)}
              className={`mt-5 max-w-xl text-base leading-7 ${
                variant === "plain" ? "text-ink-soft" : "text-parchment/80"
              }`}
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div {...fadeUp(0.36)} className="mt-8">
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
