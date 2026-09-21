"use client";
/* eslint-disable react-hooks/immutability, react-hooks/refs -- imperative three.js island: geometry/material are mutated on purpose */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import {
  burstBus,
  FORM_PROFILES,
  rand,
  type BurstSettle,
  type BurstStart,
} from "@/lib/burst";

const CAPACITY = 8000;

// GLSL as template strings — no loader config needed under Turbopack.
// Every particle is a fragment of the bowl image: aUV is where it was sampled, and the
// fragment shader reads a small patch of the texture around that point, so a chilli
// burst is made of chilli-coloured grain and a cumin burst of cumin seed. Powders get a
// soft dust edge; seeds / flakes / grain are hard-edged, elongated and spin.
const vert = /* glsl */ `
  attribute vec2 aStart;
  attribute vec2 aDir;
  attribute vec2 aUV;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aSeed;
  attribute float aAspect;
  uniform float uProgress;   // explode 0→1
  uniform float uSettle;     // settle 0→1 (after navigation)
  uniform vec2  uTarget;     // settle rect centre (world units)
  uniform vec2  uTargetSize; // settle rect size
  uniform float uTime;
  uniform float uDpr;
  uniform float uGravity;
  uniform float uDrift;
  uniform float uSpin;
  varying vec3 vColor;
  varying vec2 vUV;
  varying float vAlpha;
  varying float vRot;
  varying float vAspect;
  float easeOut(float t){ return 1.0 - pow(1.0 - t, 3.0); }
  void main(){
    float k = easeOut(clamp(uProgress, 0.0, 1.0));
    float g = uProgress * uProgress * 380.0 * 0.6 * uGravity;
    float curl = sin(aSeed * 12.9 + uTime * 4.0) * 18.0 * k * uDrift;
    vec2 flung = aStart + aDir * k + vec2(curl, -g);
    // settle target: spread across the destination bowl
    vec2 t = uTarget + vec2((aSeed - 0.5) * uTargetSize.x * 0.62, (fract(aSeed * 7919.0) - 0.5) * uTargetSize.y * 0.3);
    float s = easeOut(clamp(uSettle, 0.0, 1.0));
    vec2 pos = mix(flung, t, s);
    vColor = aColor;
    vUV = aUV;
    vAspect = aAspect;
    vRot = aSeed * 6.2831 + uTime * uSpin * (0.6 + aSeed);
    float explodeAlpha = 1.0 - max(0.0, (uProgress - 0.55) / 0.7);
    vAlpha = mix(max(explodeAlpha, 0.55 * step(1.0, uProgress)), 0.6 * (1.0 - s * 0.9), step(0.001, uSettle));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
    gl_PointSize = aSize * uDpr * (1.0 + k * 0.6) * (1.0 - s * 0.5);
  }
`;
const frag = /* glsl */ `
  precision mediump float;
  uniform sampler2D uTex;
  uniform float uHasTex;
  uniform float uSoft;
  uniform float uPatch;
  varying vec3 vColor;
  varying vec2 vUV;
  varying float vAlpha;
  varying float vRot;
  varying float vAspect;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    // rotate the piece, then squash it into its aspect
    float cs = cos(vRot), sn = sin(vRot);
    vec2 r = vec2(c.x * cs - c.y * sn, c.x * sn + c.y * cs);
    vec2 e = vec2(r.x / vAspect, r.y * vAspect);
    float d = dot(e, e);
    if (d > 0.25) discard;
    // soft dust for powders, crisp edge for pieces
    float edge = mix(1.0 - smoothstep(0.17, 0.25, d), smoothstep(0.25, 0.04, d), uSoft);
    // the fragment shows a small patch of the real image around where it was sampled
    vec2 uv = vUV + vec2(r.x, -r.y) * uPatch;
    vec4 t = texture2D(uTex, uv);
    // outside the product (transparent / bowl) fall back to the pixel's own colour
    vec3 col = mix(vColor, t.rgb, uHasTex * step(0.5, t.a));
    gl_FragColor = vec4(col, vAlpha * edge);
  }
`;

function BurstPoints() {
  const { invalidate, size } = useThree();
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const attr = (n: string, itemSize: number) =>
      g.setAttribute(
        n,
        new THREE.BufferAttribute(
          new Float32Array(CAPACITY * itemSize),
          itemSize,
        ),
      );
    attr("position", 3);
    attr("aStart", 2);
    attr("aDir", 2);
    attr("aUV", 2);
    attr("aColor", 3);
    attr("aSize", 1);
    attr("aSeed", 1);
    attr("aAspect", 1);
    g.setDrawRange(0, 0);
    return g;
  }, []);
  const blank = useMemo(() => {
    const t = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1);
    t.needsUpdate = true;
    return t;
  }, []);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        // real colours, not glow: normal alpha blending
        blending: THREE.NormalBlending,
        uniforms: {
          uProgress: { value: 0 },
          uSettle: { value: 0 },
          uTarget: { value: new THREE.Vector2() },
          uTargetSize: { value: new THREE.Vector2(1, 1) },
          uTime: { value: 0 },
          uDpr: { value: 1 },
          uGravity: { value: 1 },
          uDrift: { value: 1 },
          uSpin: { value: 0 },
          uSoft: { value: 1 },
          uPatch: { value: 0.03 },
          uHasTex: { value: 0 },
          uTex: { value: blank },
        },
      }),
    [blank],
  );
  const state = useRef<{
    phase: "idle" | "explode" | "hold" | "settle";
    tl: gsap.core.Tween | null;
    tex: THREE.CanvasTexture | null;
    t0: number;
  }>({ phase: "idle", tl: null, tex: null, t0: 0 });
  const sizeRef = useRef(size);
  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  useEffect(() => {
    mat.uniforms.uDpr!.value = Math.min(window.devicePixelRatio || 1, 1.5);
    const toWorld = (x: number, y: number): [number, number] => [
      x - sizeRef.current.width / 2,
      sizeRef.current.height / 2 - y,
    ];

    const offStart = burstBus.onStart((e: BurstStart) => {
      const profile = FORM_PROFILES[e.form] ?? FORM_PROFILES.powder;
      const n = Math.min(CAPACITY, e.samples.length);
      const get = (name: string) =>
        geom.getAttribute(name) as THREE.BufferAttribute;
      const aStart = get("aStart"),
        aDir = get("aDir"),
        aUV = get("aUV"),
        aColor = get("aColor"),
        aSize = get("aSize"),
        aSeed = get("aSeed"),
        aAspect = get("aAspect");
      const cx = e.rect.x + e.rect.w / 2;
      const cy = e.rect.y + e.rect.h * 0.55;
      const reach =
        Math.max(sizeRef.current.width, sizeRef.current.height) * 0.35;
      for (let i = 0; i < n; i++) {
        const s = e.samples[i]!;
        const px = e.rect.x + s.x * e.rect.w;
        const py = e.rect.y + s.y * e.rect.h;
        const [wx, wy] = toWorld(px, py);
        const ang = Math.atan2(py - cy, px - cx) + (Math.random() - 0.5) * 0.9;
        const dist = 140 + Math.random() * reach;
        aStart.setXY(i, wx, wy);
        aDir.setXY(
          i,
          Math.cos(ang) * dist,
          -(Math.sin(ang) * dist - 120 * Math.random()),
        );
        // canvas textures are y-down; three samples y-up
        aUV.setXY(i, s.x, 1 - s.y);
        aColor.setXYZ(i, s.r / 255, s.g / 255, s.b / 255);
        aSize.setX(i, rand(profile.size));
        aSeed.setX(i, Math.random());
        aAspect.setX(i, Math.sqrt(rand(profile.aspect)));
      }
      aStart.needsUpdate =
        aDir.needsUpdate =
        aUV.needsUpdate =
        aColor.needsUpdate =
        aSize.needsUpdate =
        aSeed.needsUpdate =
        aAspect.needsUpdate =
          true;
      geom.setDrawRange(0, n);

      // fragment texture: the bowl image itself
      state.current.tex?.dispose();
      state.current.tex = null;
      if (e.texture) {
        const t = new THREE.CanvasTexture(e.texture);
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.generateMipmaps = false;
        t.flipY = true;
        state.current.tex = t;
      }
      mat.uniforms.uTex!.value = state.current.tex ?? blank;
      mat.uniforms.uHasTex!.value = state.current.tex ? 1 : 0;
      mat.uniforms.uSoft!.value = profile.soft ? 1 : 0;
      mat.uniforms.uPatch!.value = profile.patch;
      mat.uniforms.uGravity!.value = profile.gravity;
      mat.uniforms.uDrift!.value = profile.drift;
      mat.uniforms.uSpin!.value = profile.spin;
      mat.uniforms.uSettle!.value = 0;
      mat.uniforms.uProgress!.value = 0;
      state.current.tl?.kill();
      state.current.phase = "explode";
      state.current.t0 = performance.now();
      state.current.tl = gsap.to(mat.uniforms.uProgress!, {
        value: 1,
        duration: 0.9,
        ease: "none",
        onUpdate: () => {
          mat.uniforms.uTime!.value =
            (performance.now() - state.current.t0) / 1000;
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
      const [tx, ty] = toWorld(
        e.rect.x + e.rect.w / 2,
        e.rect.y + e.rect.h * 0.5,
      );
      mat.uniforms.uTarget!.value.set(tx, ty);
      mat.uniforms.uTargetSize!.value.set(e.rect.w, e.rect.h);
      state.current.tl?.kill();
      state.current.phase = "settle";
      state.current.tl = gsap.to(mat.uniforms.uSettle!, {
        value: 1,
        duration: 0.7,
        ease: "none",
        onUpdate: () => {
          mat.uniforms.uTime!.value =
            (performance.now() - state.current.t0) / 1000;
          invalidate();
        },
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
      st.tex?.dispose();
    };
  }, [geom, mat, blank, invalidate]);

  return <points geometry={geom} material={mat} frustumCulled={false} />;
}

/** One fixed, transparent, pointer-transparent canvas for the whole app. */
export default function BurstGL() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[75]">
      <Canvas
        orthographic
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          premultipliedAlpha: false,
        }}
        camera={{ position: [0, 0, 10], zoom: 1, near: 0.1, far: 100 }}
        // R3F puts pointer-events:auto on its own wrapper, which would override the
        // parent's `pointer-events-none` and swallow every click on the page.
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <BurstPoints />
      </Canvas>
    </div>
  );
}
