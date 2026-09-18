"use client";

import { useEffect, useRef } from "react";
import {
  burstBus,
  easeOut,
  hexToRgb,
  type BurstSettle,
  type BurstStart,
} from "@/lib/burst";

type P = {
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  x1: number;
  y1: number;
  r: number;
  c: [number, number, number];
  seed: number;
};

const EXPLODE_MS = 900;
const SETTLE_MS = 700;

/**
 * Canvas-2D burst (the fallback for no-WebGL / low-tier devices, and the reference
 * behaviour). ~400 particles, gravity + a little curl, then a settle toward the new hero.
 */
export function Burst2D({ max = 420 }: { max?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
    };
    resize();
    addEventListener("resize", resize);

    let parts: P[] = [];
    let phase: "idle" | "explode" | "hold" | "settle" = "idle";
    let t0 = 0;
    let raf = 0;
    let settleTo: BurstSettle | null = null;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (phase === "idle") return;
      const t = now - t0;
      let alive = false;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        let x: number, y: number, a: number, s: number;
        if (phase === "explode" || phase === "hold") {
          const k = easeOut(Math.min(1, t / EXPLODE_MS));
          const g = (t / 1000) ** 2 * 380;
          const curl = Math.sin(p.seed * 12.9 + t * 0.004) * 18 * k;
          x = p.x0 + p.dx * k + curl;
          y = p.y0 + p.dy * k + g * 0.6;
          a = phase === "hold" ? 0.55 : 1 - Math.max(0, (t - 500) / 600);
          s = p.r * (1 + k * 0.6);
          if (phase === "explode" && t > EXPLODE_MS) {
            phase = "hold";
            p.x1 = x;
            p.y1 = y;
          }
          alive = true;
        } else {
          const k = easeOut(Math.min(1, t / SETTLE_MS));
          const tx =
            settleTo!.rect.x + settleTo!.rect.w * (0.5 + (p.seed - 0.5) * 0.62);
          const ty =
            settleTo!.rect.y +
            settleTo!.rect.h * (0.45 + (((p.seed * 7919) % 1) - 0.5) * 0.3);
          x = p.x1 + (tx - p.x1) * k;
          y = p.y1 + (ty - p.y1) * k;
          a = 0.6 * (1 - k * 0.9);
          s = p.r * (1 - k * 0.5);
          alive = t < SETTLE_MS;
        }
        if (a <= 0.01) continue;
        ctx.globalAlpha = Math.max(0, Math.min(1, a));
        ctx.fillStyle = `rgb(${p.c[0]},${p.c[1]},${p.c[2]})`;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.4, s), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      if (phase === "hold" && t > 6000) alive = false; // give up waiting for the destination
      if (alive || phase === "hold") raf = requestAnimationFrame(draw);
      else {
        phase = "idle";
        parts = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const offStart = burstBus.onStart((e: BurstStart) => {
      const pal = e.palette.map(hexToRgb);
      const cx = e.rect.x + e.rect.w / 2;
      const cy = e.rect.y + e.rect.h * 0.55;
      const step = Math.max(1, e.samples.length / max);
      parts = [];
      for (let i = 0; i < e.samples.length; i += step) {
        const s = e.samples[Math.floor(i)]!;
        const x0 = e.rect.x + s.x * e.rect.w;
        const y0 = e.rect.y + s.y * e.rect.h;
        const ang = Math.atan2(y0 - cy, x0 - cx) + (Math.random() - 0.5) * 0.9;
        const dist =
          140 + Math.random() * Math.max(innerWidth, innerHeight) * 0.35;
        parts.push({
          x0,
          y0,
          dx: Math.cos(ang) * dist,
          dy: Math.sin(ang) * dist - 120 * Math.random(),
          x1: x0,
          y1: y0,
          r: 1.6 + Math.random() * 2.6,
          c: pal[s.c] ?? pal[0]!,
          seed: Math.random(),
        });
      }
      phase = "explode";
      t0 = performance.now();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });
    const offSettle = burstBus.onSettle((e) => {
      if (phase !== "hold" && phase !== "explode") return;
      settleTo = e;
      for (const p of parts)
        if (phase === "explode") ((p.x1 = p.x0 + p.dx), (p.y1 = p.y0 + p.dy));
      phase = "settle";
      t0 = performance.now();
    });
    return () => {
      offStart();
      offSettle();
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, [max]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[75]"
    />
  );
}
