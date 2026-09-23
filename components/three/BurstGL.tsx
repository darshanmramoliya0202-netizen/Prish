"use client";
/* eslint-disable react-hooks/immutability -- imperative three.js island: geometry/material are mutated on purpose */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import {
  burstBus,
  FORM_PROFILES,
  PIECE_PHYSICS,
  layoutPieces,
  rand,
  type BurstSettle,
  type BurstStart,
} from "@/lib/burst";

const CAPACITY = 8000;
const PIECE_CAP = 64;

/* ── dust: one point per sampled pixel of the bowl's contents ─────────────────
   Every particle is a fragment of the bowl image: aUV is where it was sampled, and the
   fragment shader reads a small patch of the texture around that point, so chilli dust
   is chilli-coloured grain and cumin dust is cumin seed. Powders get a soft edge; seeds /
   flakes / grain are hard-edged, elongated and spin. */
const dustVert = /* glsl */ `
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
const dustFrag = /* glsl */ `
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
    float cs = cos(vRot), sn = sin(vRot);
    vec2 r = vec2(c.x * cs - c.y * sn, c.x * sn + c.y * cs);
    vec2 e = vec2(r.x / vAspect, r.y * vAspect);
    float d = dot(e, e);
    if (d > 0.25) discard;
    float edge = mix(1.0 - smoothstep(0.17, 0.25, d), smoothstep(0.25, 0.04, d), uSoft);
    vec2 uv = vUV + vec2(r.x, -r.y) * uPatch;
    vec4 t = texture2D(uTex, uv);
    vec3 col = mix(vColor, t.rgb, uHasTex * step(0.5, t.a));
    gl_FragColor = vec4(col, vAlpha * edge);
  }
`;

/* ── pieces: the real fruit / seeds / leaves, one textured quad each ─────────── */
const pieceVert = /* glsl */ `
  attribute vec2 iStart;
  attribute vec2 iDir;
  attribute vec2 iSize;
  attribute vec4 iUV;   // atlas rect: x, y (top-left), w, h — normalised
  attribute float iSeed;
  attribute float iSpin;
  uniform float uProgress;
  uniform float uSettle;
  uniform vec2  uTarget;
  uniform vec2  uTargetSize;
  uniform float uTime;
  uniform float uPieceGravity;
  varying vec2 vUv;
  varying float vAlpha;
  float easeOut(float t){ return 1.0 - pow(1.0 - t, 3.0); }
  void main(){
    float k = easeOut(clamp(uProgress, 0.0, 1.0));
    float g = uProgress * uProgress * 380.0 * 0.6 * uPieceGravity;
    float curl = sin(iSeed * 12.9 + uTime * 3.0) * 10.0 * k;
    vec2 flung = iStart + iDir * k + vec2(curl, -g);
    vec2 t = uTarget + vec2((iSeed - 0.5) * uTargetSize.x * 0.5, (fract(iSeed * 7919.0) - 0.5) * uTargetSize.y * 0.3);
    float s = easeOut(clamp(uSettle, 0.0, 1.0));
    vec2 c = mix(flung, t, s);
    // a piece pops up as it leaves, tumbles in the air, and shrinks into the new bowl
    float rot = iSeed * 6.2831 + uTime * iSpin;
    float sc = (1.0 + 0.14 * sin(k * 3.1416)) * (1.0 - 0.6 * s);
    vec2 local = position.xy * iSize * sc;
    float cs = cos(rot), sn = sin(rot);
    vec2 r = vec2(local.x * cs - local.y * sn, local.x * sn + local.y * cs);
    // atlas is uploaded flipped (flipY): image y grows downwards, v grows upwards
    vUv = vec2(iUV.x + uv.x * iUV.z, 1.0 - (iUV.y + (1.0 - uv.y) * iUV.w));
    vAlpha = (1.0 - 0.1 * step(1.0, uProgress)) * (1.0 - s * 0.9);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(c + r, 0.0, 1.0);
  }
`;
const pieceFrag = /* glsl */ `
  precision mediump float;
  uniform sampler2D uAtlas;
  varying vec2 vUv;
  varying float vAlpha;
  void main(){
    vec4 t = texture2D(uAtlas, vUv);
    if (t.a < 0.06) discard;
    gl_FragColor = vec4(t.rgb, t.a * vAlpha);
  }
`;

function BurstScene() {
  const { invalidate, size } = useThree();
  const blank = useMemo(() => {
    const t = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1);
    t.needsUpdate = true;
    return t;
  }, []);
  // one set of uniforms drives both materials
  const uniforms = useMemo(
    () => ({
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
      uTex: { value: blank as THREE.Texture },
      uPieceGravity: { value: PIECE_PHYSICS.gravity },
      uAtlas: { value: blank as THREE.Texture },
    }),
    [blank],
  );

  const dustGeom = useMemo(() => {
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
  const dustMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: dustVert,
        fragmentShader: dustFrag,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.NormalBlending,
        uniforms,
      }),
    [uniforms],
  );

  const pieceGeom = useMemo(() => {
    const g = new THREE.InstancedBufferGeometry();
    const plane = new THREE.PlaneGeometry(1, 1);
    g.setAttribute("position", plane.getAttribute("position"));
    g.setAttribute("uv", plane.getAttribute("uv"));
    g.setIndex(plane.getIndex());
    const attr = (n: string, itemSize: number) =>
      g.setAttribute(
        n,
        new THREE.InstancedBufferAttribute(
          new Float32Array(PIECE_CAP * itemSize),
          itemSize,
        ),
      );
    attr("iStart", 2);
    attr("iDir", 2);
    attr("iSize", 2);
    attr("iUV", 4);
    attr("iSeed", 1);
    attr("iSpin", 1);
    g.instanceCount = 0;
    return g;
  }, []);
  const pieceMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: pieceVert,
        fragmentShader: pieceFrag,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        uniforms,
      }),
    [uniforms],
  );

  const state = useRef<{
    phase: "idle" | "explode" | "hold" | "settle";
    tl: gsap.core.Tween | null;
    tex: THREE.Texture | null;
    atlas: THREE.Texture | null;
    t0: number;
  }>({ phase: "idle", tl: null, tex: null, atlas: null, t0: 0 });
  const sizeRef = useRef(size);
  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  useEffect(() => {
    uniforms.uDpr.value = Math.min(window.devicePixelRatio || 1, 1.5);
    const toWorld = (x: number, y: number): [number, number] => [
      x - sizeRef.current.width / 2,
      sizeRef.current.height / 2 - y,
    ];
    const clear = () => {
      dustGeom.setDrawRange(0, 0);
      pieceGeom.instanceCount = 0;
      invalidate();
    };
    const tick = () => {
      uniforms.uTime.value = (performance.now() - state.current.t0) / 1000;
      invalidate();
    };

    const offStart = burstBus.onStart((e: BurstStart) => {
      const profile = FORM_PROFILES[e.form] ?? FORM_PROFILES.powder;
      const reach =
        Math.max(sizeRef.current.width, sizeRef.current.height) * 0.35;

      // ── dust ──
      const dustBudget = e.pieces ? Math.round(profile.count * 0.7) : profile.count;
      const n = Math.min(CAPACITY, e.samples.length, dustBudget);
      const get = (name: string) =>
        dustGeom.getAttribute(name) as THREE.BufferAttribute;
      const aStart = get("aStart"),
        aDir = get("aDir"),
        aUV = get("aUV"),
        aColor = get("aColor"),
        aSize = get("aSize"),
        aSeed = get("aSeed"),
        aAspect = get("aAspect");
      const anc = e.anchor ?? { x: 0, y: 0, w: 1, h: 1 };
      const cx = e.rect.x + (anc.x + anc.w / 2) * e.rect.w;
      const cy = e.rect.y + (anc.y + anc.h * 0.55) * e.rect.h;
      const stride = e.samples.length / Math.max(1, n);
      for (let i = 0; i < n; i++) {
        const s = e.samples[Math.floor(i * stride)]!;
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
        aUV.setXY(i, s.x, 1 - s.y);
        aColor.setXYZ(i, s.r / 255, s.g / 255, s.b / 255);
        aSize.setX(i, rand(profile.size));
        aSeed.setX(i, Math.random());
        aAspect.setX(i, Math.sqrt(rand(profile.aspect)));
      }
      for (const a of [aStart, aDir, aUV, aColor, aSize, aSeed, aAspect])
        a.needsUpdate = true;
      dustGeom.setDrawRange(0, n);

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
      uniforms.uTex.value = state.current.tex ?? blank;
      uniforms.uHasTex.value = state.current.tex ? 1 : 0;
      uniforms.uSoft.value = profile.soft ? 1 : 0;
      uniforms.uPatch.value = profile.patch;
      uniforms.uGravity.value = profile.gravity;
      uniforms.uDrift.value = profile.drift;
      uniforms.uSpin.value = profile.spin;

      // ── pieces ──
      state.current.atlas?.dispose();
      state.current.atlas = null;
      let m = 0;
      if (e.pieces) {
        const flying = layoutPieces(e.pieces, e.rect, e.anchor, reach).slice(
          0,
          PIECE_CAP,
        );
        const pget = (name: string) =>
          pieceGeom.getAttribute(name) as THREE.InstancedBufferAttribute;
        const iStart = pget("iStart"),
          iDir = pget("iDir"),
          iSize = pget("iSize"),
          iUV = pget("iUV"),
          iSeed = pget("iSeed"),
          iSpin = pget("iSpin");
        flying.forEach((f, i) => {
          const [wx, wy] = toWorld(f.x, f.y);
          iStart.setXY(i, wx, wy);
          iDir.setXY(i, f.dx, -f.dy);
          iSize.setXY(i, f.w, f.h);
          iUV.setXYZW(i, f.piece.sx, f.piece.sy, f.piece.sw, f.piece.sh);
          iSeed.setX(i, f.seed);
          iSpin.setX(i, f.spin);
        });
        for (const a of [iStart, iDir, iSize, iUV, iSeed, iSpin])
          a.needsUpdate = true;
        m = flying.length;
        const t = new THREE.Texture(e.pieces.atlas);
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.generateMipmaps = false;
        t.flipY = true;
        t.needsUpdate = true;
        state.current.atlas = t;
      }
      pieceGeom.instanceCount = m;
      uniforms.uAtlas.value = state.current.atlas ?? blank;

      uniforms.uSettle.value = 0;
      uniforms.uProgress.value = 0;
      state.current.tl?.kill();
      state.current.phase = "explode";
      state.current.t0 = performance.now();
      state.current.tl = gsap.to(uniforms.uProgress, {
        value: 1,
        duration: 0.9,
        ease: "none",
        onUpdate: tick,
        onComplete: () => {
          state.current.phase = "hold";
          // give up if no destination settles us within 6 s
          window.setTimeout(() => {
            if (state.current.phase === "hold") {
              state.current.phase = "idle";
              clear();
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
      uniforms.uTarget.value.set(tx, ty);
      uniforms.uTargetSize.value.set(e.rect.w, e.rect.h);
      state.current.tl?.kill();
      state.current.phase = "settle";
      state.current.tl = gsap.to(uniforms.uSettle, {
        value: 1,
        duration: 0.7,
        ease: "none",
        onUpdate: tick,
        onComplete: () => {
          state.current.phase = "idle";
          clear();
        },
      });
    });
    const st = state.current;
    return () => {
      offStart();
      offSettle();
      st.tl?.kill();
      st.tex?.dispose();
      st.atlas?.dispose();
    };
  }, [dustGeom, pieceGeom, uniforms, blank, invalidate]);

  return (
    <>
      <points geometry={dustGeom} material={dustMat} frustumCulled={false} />
      <mesh geometry={pieceGeom} material={pieceMat} frustumCulled={false} />
    </>
  );
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
        <BurstScene />
      </Canvas>
    </div>
  );
}
