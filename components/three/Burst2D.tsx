"use client";

import { useEffect, useRef } from "react";
import {
  burstBus,
  easeOut,
  FORM_PROFILES,
  rand,
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
  rot: number;
  spin: number;
  seed: number;
  /** sprite index in the atlas */
  i: number;
};

const EXPLODE_MS = 900;
const SETTLE_MS = 700;
const SPRITE = 24; // atlas cell (px)

/**
 * Canvas-2D burst (the fallback for no-WebGL / low-tier devices, and the reference
 * behaviour). A few hundred particles, each a real fragment of the bowl image: at burst
 * start every particle's patch is cut from the image once into a sprite atlas (soft disc
 * for powders, hard ellipse for pieces), then the frame loop only draws sprites.
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
    let atlas: HTMLCanvasElement | null = null;
    let cols = 1;
    let gravity = 1;
    let drift = 1;
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
      for (const p of parts) {
        let x: number, y: number, a: number, s: number;
        if (phase === "explode" || phase === "hold") {
          const k = easeOut(Math.min(1, t / EXPLODE_MS));
          const g = (t / 1000) ** 2 * 380 * gravity;
          const curl = Math.sin(p.seed * 12.9 + t * 0.004) * 18 * k * drift;
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
        const d = Math.max(1, s * 2);
        if (atlas) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(p.rot + (t / 1000) * p.spin);
          ctx.drawImage(
            atlas,
            (p.i % cols) * SPRITE,
            Math.floor(p.i / cols) * SPRITE,
            SPRITE,
            SPRITE,
            -d / 2,
            -d / 2,
            d,
            d,
          );
          ctx.restore();
        } else {
          ctx.fillStyle = "#d4a24c";
          ctx.beginPath();
          ctx.arc(x, y, d / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
      if (phase === "hold" && t > 6000) alive = false; // give up waiting for the destination
      if (alive || phase === "hold") raf = requestAnimationFrame(draw);
      else {
        phase = "idle";
        parts = [];
        atlas = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const offStart = burstBus.onStart((e: BurstStart) => {
      const profile = FORM_PROFILES[e.form] ?? FORM_PROFILES.powder;
      gravity = profile.gravity;
      drift = profile.drift;
      const cx = e.rect.x + e.rect.w / 2;
      const cy = e.rect.y + e.rect.h * 0.55;
      const step = Math.max(1, e.samples.length / max);
      parts = [];
      const chosen: number[] = [];
      for (let i = 0; i < e.samples.length; i += step) {
        const idx = Math.floor(i);
        const s = e.samples[idx]!;
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
          r: rand(profile.size) * 0.9,
          rot: Math.random() * Math.PI * 2,
          spin: profile.spin * (0.6 + Math.random()),
          seed: Math.random(),
          i: chosen.length,
        });
        chosen.push(idx);
      }

      // sprite atlas: one real fragment per particle, masked once
      atlas = null;
      if (e.texture) {
        cols = Math.ceil(Math.sqrt(chosen.length));
        const rows = Math.ceil(chosen.length / cols);
        const a = document.createElement("canvas");
        a.width = cols * SPRITE;
        a.height = rows * SPRITE;
        const actx = a.getContext("2d");
        if (actx) {
          const tex = e.texture;
          const patch = profile.patch * tex.width; // px of the texture per sprite
          chosen.forEach((idx, n) => {
            const s = e.samples[idx]!;
            const sx = (n % cols) * SPRITE;
            const sy = Math.floor(n / cols) * SPRITE;
            const asp = Math.sqrt(rand(profile.aspect));
            actx.save();
            actx.translate(sx + SPRITE / 2, sy + SPRITE / 2);
            actx.beginPath();
            actx.ellipse(
              0,
              0,
              (SPRITE / 2 - 1) * asp,
              (SPRITE / 2 - 1) / asp,
              0,
              0,
              Math.PI * 2,
            );
            actx.clip();
            actx.drawImage(
              tex,
              s.x * tex.width - patch / 2,
              s.y * tex.height - patch / 2,
              patch,
              patch,
              -SPRITE / 2,
              -SPRITE / 2,
              SPRITE,
              SPRITE,
            );
            // fill any transparent part of the patch with the pixel's own colour
            actx.globalCompositeOperation = "destination-over";
            actx.fillStyle = `rgb(${s.r},${s.g},${s.b})`;
            actx.fillRect(-SPRITE / 2, -SPRITE / 2, SPRITE, SPRITE);
            if (profile.soft) {
              // dust: fade the edge
              actx.globalCompositeOperation = "destination-in";
              const g = actx.createRadialGradient(0, 0, 0, 0, 0, SPRITE / 2);
              g.addColorStop(0.35, "rgba(0,0,0,1)");
              g.addColorStop(1, "rgba(0,0,0,0)");
              actx.fillStyle = g;
              actx.fillRect(-SPRITE / 2, -SPRITE / 2, SPRITE, SPRITE);
            }
            actx.restore();
          });
        }
        atlas = a;
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
