"use client";
/* eslint-disable react-hooks/immutability, react-hooks/refs -- imperative three.js island: geometry/material are mutated on purpose */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { burstBus, hexToRgb, type BurstSettle, type BurstStart } from "@/lib/burst";

const CAPACITY = 8000;

// GLSL as template strings — no loader config needed under Turbopack.
const vert = /* glsl */ `
  attribute vec2 aStart;
  attribute vec2 aDir;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aSeed;
  uniform float uProgress;   // explode 0→1
  uniform float uSettle;     // settle 0→1 (after navigation)
  uniform vec2  uTarget;     // settle rect centre (world units)
  uniform vec2  uTargetSize; // settle rect size
  uniform float uTime;
  uniform float uDpr;
  varying vec3 vColor;
  varying float vAlpha;
  float easeOut(float t){ return 1.0 - pow(1.0 - t, 3.0); }
  void main(){
    float k = easeOut(clamp(uProgress, 0.0, 1.0));
    float g = uProgress * uProgress * 380.0 * 0.6;
    float curl = sin(aSeed * 12.9 + uTime * 4.0) * 18.0 * k;
    vec2 flung = aStart + aDir * k + vec2(curl, -g);
    // settle target: spread across the destination bowl
    vec2 t = uTarget + vec2((aSeed - 0.5) * uTargetSize.x * 0.62, (fract(aSeed * 7919.0) - 0.5) * uTargetSize.y * 0.3);
    float s = easeOut(clamp(uSettle, 0.0, 1.0));
    vec2 pos = mix(flung, t, s);
    vColor = aColor;
    float explodeAlpha = 1.0 - max(0.0, (uProgress - 0.55) / 0.7);
    vAlpha = mix(max(explodeAlpha, 0.55 * step(1.0, uProgress)), 0.6 * (1.0 - s * 0.9), step(0.001, uSettle));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
    gl_PointSize = aSize * uDpr * (1.0 + k * 0.6) * (1.0 - s * 0.5);
  }
`;
const frag = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float soft = smoothstep(0.25, 0.05, d);
    gl_FragColor = vec4(vColor, vAlpha * soft);
  }
`;

function BurstPoints() {
  const { invalidate, size } = useThree();
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(CAPACITY * 3), 3));
    g.setAttribute("aStart", new THREE.BufferAttribute(new Float32Array(CAPACITY * 2), 2));
    g.setAttribute("aDir", new THREE.BufferAttribute(new Float32Array(CAPACITY * 2), 2));
    g.setAttribute("aColor", new THREE.BufferAttribute(new Float32Array(CAPACITY * 3), 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(new Float32Array(CAPACITY), 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(new Float32Array(CAPACITY), 1));
    g.setDrawRange(0, 0);
    return g;
  }, []);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uProgress: { value: 0 },
          uSettle: { value: 0 },
          uTarget: { value: new THREE.Vector2() },
          uTargetSize: { value: new THREE.Vector2(1, 1) },
          uTime: { value: 0 },
          uDpr: { value: 1 },
        },
      }),
    [],
  );
  const state = useRef<{ phase: "idle" | "explode" | "hold" | "settle"; tl: gsap.core.Tween | null }>({ phase: "idle", tl: null });
  const sizeRef = useRef(size);
  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  useEffect(() => {
    mat.uniforms.uDpr!.value = Math.min(window.devicePixelRatio || 1, 1.5);
    const toWorld = (x: number, y: number): [number, number] => [x - sizeRef.current.width / 2, sizeRef.current.height / 2 - y];

    const offStart = burstBus.onStart((e: BurstStart) => {
      const pal = e.palette.map(hexToRgb);
      const n = Math.min(CAPACITY, e.samples.length);
      const aStart = geom.getAttribute("aStart") as THREE.BufferAttribute;
      const aDir = geom.getAttribute("aDir") as THREE.BufferAttribute;
      const aColor = geom.getAttribute("aColor") as THREE.BufferAttribute;
      const aSize = geom.getAttribute("aSize") as THREE.BufferAttribute;
      const aSeed = geom.getAttribute("aSeed") as THREE.BufferAttribute;
      const cx = e.rect.x + e.rect.w / 2;
      const cy = e.rect.y + e.rect.h * 0.55;
      const reach = Math.max(sizeRef.current.width, sizeRef.current.height) * 0.35;
      for (let i = 0; i < n; i++) {
        const s = e.samples[i]!;
        const px = e.rect.x + s.x * e.rect.w;
        const py = e.rect.y + s.y * e.rect.h;
        const [wx, wy] = toWorld(px, py);
        const ang = Math.atan2(py - cy, px - cx) + (Math.random() - 0.5) * 0.9;
        const dist = 140 + Math.random() * reach;
        aStart.setXY(i, wx, wy);
        aDir.setXY(i, Math.cos(ang) * dist, -(Math.sin(ang) * dist - 120 * Math.random()));
        const c = pal[s.c] ?? pal[0]!;
        aColor.setXYZ(i, c[0] / 255, c[1] / 255, c[2] / 255);
        aSize.setX(i, 2.2 + Math.random() * 3.2);
        aSeed.setX(i, Math.random());
      }
      aStart.needsUpdate = aDir.needsUpdate = aColor.needsUpdate = aSize.needsUpdate = aSeed.needsUpdate = true;
      geom.setDrawRange(0, n);
      mat.uniforms.uSettle!.value = 0;
      mat.uniforms.uProgress!.value = 0;
      state.current.tl?.kill();
      state.current.phase = "explode";
      const t0 = performance.now();
      state.current.tl = gsap.to(mat.uniforms.uProgress!, {
        value: 1,
        duration: 0.9,
        ease: "none",
        onUpdate: () => {
          mat.uniforms.uTime!.value = (performance.now() - t0) / 1000;
          invalidate();
        },
        onComplete: () => {
          state.current.phase = "hold";
          // give up if no destination settles us within 6 s
          window.setTimeout(() => {
            if (state.current.phase === "hold") {
              state.current.phase = "idle";
              geom.setDrawRange(0, 0);
              invalidate();
            }
          }, 6000);
        },
      });
    });

    const offSettle = burstBus.onSettle((e: BurstSettle) => {
      if (state.current.phase === "idle") return;
      const [tx, ty] = toWorld(e.rect.x + e.rect.w / 2, e.rect.y + e.rect.h * 0.5);
      mat.uniforms.uTarget!.value.set(tx, ty);
      mat.uniforms.uTargetSize!.value.set(e.rect.w, e.rect.h);
      state.current.tl?.kill();
      state.current.phase = "settle";
      state.current.tl = gsap.to(mat.uniforms.uSettle!, {
        value: 1,
        duration: 0.7,
        ease: "none",
        onUpdate: () => invalidate(),
        onComplete: () => {
          state.current.phase = "idle";
          geom.setDrawRange(0, 0);
          invalidate();
        },
      });
    });
    const st = state.current;
    return () => {
      offStart();
      offSettle();
      st.tl?.kill();
    };
  }, [geom, mat, invalidate]);

  return <points geometry={geom} material={mat} frustumCulled={false} />;
}

/** One fixed, transparent, pointer-transparent canvas for the whole app. */
export default function BurstGL() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[75]">
      <Canvas orthographic frameloop="demand" dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance", premultipliedAlpha: false }} camera={{ position: [0, 0, 10], zoom: 1, near: 0.1, far: 100 }} style={{ background: "transparent" }}>
        <BurstPoints />
      </Canvas>
    </div>
  );
}
