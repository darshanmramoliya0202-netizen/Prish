"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import sourcingMap from "@/brochure/Brochure Draft 4 edit lite_page-0002.jpg";
import exportExecution from "@/brochure/Brochure Draft 4 edit lite_page-0007.jpg";

export default function SoilToScale() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const farmOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const tradeOpacity = useTransform(scrollYProgress, [0.3, 0.5, 1], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] min-h-[500px] overflow-hidden sm:h-[90vh]"
    >
      {/* Farm layer */}
      <motion.div className="absolute inset-0" style={{ opacity: farmOpacity, scale }}>
        <Image
          src={sourcingMap}
          alt="Indian agricultural landscape and farming communities"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#0f172a]/30 to-[#0f172a]/80" />
      </motion.div>

      {/* Trade/global layer */}
      <motion.div className="absolute inset-0" style={{ opacity: tradeOpacity, scale }}>
        <Image
          src={exportExecution}
          alt="Modern global trade routes and export logistics"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 50%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/70 via-[#0f172a]/40 to-[#0f172a]/90" />
      </motion.div>

      {/* Animated trade arcs overlay */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: tradeOpacity }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px origin-left bg-gradient-to-r from-saffron/60 via-saffron/30 to-transparent"
            style={{
              top: `${30 + i * 10}%`,
              left: "30%",
              width: `${35 + i * 5}%`,
              transform: `rotate(${-15 + i * 8}deg)`
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleX: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
        {/* Pulsing India epicenter */}
        <motion.div
          className="absolute left-[32%] top-[48%] h-4 w-4 rounded-full bg-saffron"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.8, 0.3, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-[31%] top-[47%] h-6 w-6 rounded-full border border-saffron/40"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Content overlay */}
      <div className="relative flex h-full items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div style={{ y: textY }} className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.5em] text-saffron"
            >
              Why India? Why Prish?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 font-sans text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-7xl"
            >
              Rooted in Heritage.
              <span className="block bg-gradient-to-r from-saffron to-turmeric bg-clip-text text-transparent">
                Driving Global Growth.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg"
            >
              As the fastest-growing major economy, India is the new frontier for world trade. 
              At Prish Overseas, we bring the spirit, scale, and uncompromising quality of 
              Indian agriculture directly to the global stage.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fafaf9] to-transparent" />
    </section>
  );
}
