"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import sourcingMap from "@/brochure/Brochure Draft 4 edit lite_page-0002.jpg";
import labProcess from "@/brochure/Brochure Draft 4 edit lite_page-0004.jpg";
import portfolioHighlight from "@/brochure/Brochure Draft 4 edit lite_page-0005.jpg";
import ingredientHighlights from "@/brochure/Brochure Draft 4 edit lite_page-0006.jpg";
import exportExecution from "@/brochure/Brochure Draft 4 edit lite_page-0007.jpg";

const feedPosts = [
  {
    image: sourcingMap,
    caption: "5 AM at the cumin belt. Negotiating directly with cooperative leads in Unjha, Gujarat — the world's largest cumin market. No middlemen, no markup games.",
    tag: "Origin Run",
    time: "2 days ago",
    likes: 142
  },
  {
    image: labProcess,
    caption: "New laser sorting line commissioned. Testing aflatoxin rejection rates before we clear it for the EU-bound turmeric batch. Zero tolerance means zero tolerance.",
    tag: "Tech Upgrade",
    time: "5 days ago",
    likes: 218
  },
  {
    image: portfolioHighlight,
    caption: "Sample kits going out to 3 new prospects in Germany, UAE, and Vietnam this week. Each one hand-packed with COA sheets and spec cards. The hustle never stops.",
    tag: "Sales Grind",
    time: "1 week ago",
    likes: 97
  },
  {
    image: ingredientHighlights,
    caption: "R&D day: testing a new ultra-fine 120-mesh beetroot powder for a supplement brand in California. Color retention is insane — check that crimson.",
    tag: "Lab Notes",
    time: "1 week ago",
    likes: 185
  },
  {
    image: exportExecution,
    caption: "Container loaded, documentation filed, shipping line confirmed. 20 MT of dehydrated onion heading to the GCC. Another Friday at the port.",
    tag: "Export Day",
    time: "2 weeks ago",
    likes: 263
  }
];

export default function FounderFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const post = feedPosts[activeIndex];

  const next = () => setActiveIndex((i) => (i + 1) % feedPosts.length);
  const prev = () => setActiveIndex((i) => (i - 1 + feedPosts.length) % feedPosts.length);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">Behind the Scenes</p>
        <h2 className="mt-4 max-w-xl font-sans text-3xl font-bold text-[#0f172a] sm:text-4xl">
          The Founder&apos;s Feed.{" "}
          <span className="bg-gradient-to-r from-saffron to-turmeric bg-clip-text text-transparent">
            Raw & unfiltered.
          </span>
        </h2>
        <p className="mt-3 max-w-lg text-base leading-7 text-slate-600">
          No stock photos. No corporate polish. Real moments from the ground — markets, labs, ports, and everything in between.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Reels-style card */}
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-[#0f172a] shadow-card-dark">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-[9/14]">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(min-width: 1024px) 24vw, 80vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />

                {/* Top tag */}
                <div className="absolute left-4 top-4 rounded-full bg-saffron px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0f172a]">
                  {post.tag}
                </div>

                {/* Side actions */}
                <div className="absolute bottom-20 right-4 flex flex-col items-center gap-5">
                  <button type="button" className="flex flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold text-white">{post.likes}</span>
                  </button>
                  <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </button>
                  <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <Share2 className="h-5 w-5 text-white" />
                  </button>
                </div>

                {/* Bottom caption */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-saffron to-turmeric" />
                    <div>
                      <p className="text-xs font-bold text-white">Prish Overseas</p>
                      <p className="text-[10px] text-slate-400">{post.time}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-white/90">{post.caption}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
            <button type="button" onClick={prev} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {feedPosts.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex ? "w-6 bg-saffron" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button type="button" onClick={next} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Feed grid preview */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {feedPosts.map((p, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              whileHover={{ scale: 1.03 }}
              className={`group relative aspect-square overflow-hidden rounded-2xl border transition ${
                i === activeIndex ? "border-saffron ring-2 ring-saffron/30" : "border-slate-200"
              }`}
            >
              <Image
                src={p.image}
                alt={p.tag}
                fill
                sizes="(min-width: 1024px) 15vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="rounded-full bg-saffron/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0f172a] inline-block">
                  {p.tag}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
