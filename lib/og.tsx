import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;

const fontDir = (pkg: string) =>
  join(process.cwd(), "node_modules", "@fontsource", pkg, "files");

let fontCache: Promise<
  {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 600 | 700;
    style: "normal" | "italic";
  }[]
> | null = null;

/** Brand fonts for Satori (WOFF, not WOFF2). Cached per process. */
export function ogFonts() {
  if (!fontCache) {
    fontCache = Promise.all([
      readFile(
        join(fontDir("fraunces"), "fraunces-latin-600-normal.woff"),
      ).then((b) => ({
        name: "Fraunces",
        data: toAB(b),
        weight: 600 as const,
        style: "normal" as const,
      })),
      readFile(
        join(fontDir("fraunces"), "fraunces-latin-400-italic.woff"),
      ).then((b) => ({
        name: "Fraunces",
        data: toAB(b),
        weight: 400 as const,
        style: "italic" as const,
      })),
      readFile(join(fontDir("figtree"), "figtree-latin-600-normal.woff")).then(
        (b) => ({
          name: "Figtree",
          data: toAB(b),
          weight: 600 as const,
          style: "normal" as const,
        }),
      ),
    ]);
  }
  return fontCache;
}

function toAB(b: Buffer): ArrayBuffer {
  return b.buffer.slice(
    b.byteOffset,
    b.byteOffset + b.byteLength,
  ) as ArrayBuffer;
}

let sealCache: Promise<string> | null = null;
/** The seal as a data URI (Satori renders SVG via <img>). */
export function sealDataUri(color = "#fbf8f1") {
  if (!sealCache) {
    sealCache = readFile(
      join(process.cwd(), "public", "brand", "logo-seal.svg"),
      "utf8",
    ).then((s) => {
      // Satori decodes data URIs with atob(): strip the <title> (non-ASCII) and use base64.
      const ascii = s
        .replace(/<title[^>]*>.*?<\/title>/s, "")
        .replace(/currentColor/g, color);
      return `data:image/svg+xml;base64,${Buffer.from(ascii, "utf8").toString("base64")}`;
    });
  }
  return sealCache;
}

type OgProps = {
  eyebrow?: string;
  title: string;
  sub?: string;
  /** background + accent from a product colour world */
  bg?: string;
  bg2?: string;
  ink?: string;
  accent?: string;
  /** optional product illustration (absolute data URI or public path) */
  image?: string;
};

export async function renderOg({
  eyebrow,
  title,
  sub,
  bg = "#0b3d2e",
  bg2 = "#06231a",
  ink = "#fbf8f1",
  accent = "#d4a24c",
  image,
}: OgProps) {
  const [fonts, seal] = await Promise.all([ogFonts(), sealDataUri(ink)]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: `linear-gradient(135deg, ${bg} 0%, ${bg2} 100%)`,
        color: ink,
        fontFamily: "Figtree",
        padding: 64,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: image ? 720 : 1072,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={seal} width={84} height={84} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 22,
                letterSpacing: 6,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {site.company}
            </span>
            <span style={{ fontSize: 18, opacity: 0.75 }}>
              {eyebrow ?? `${site.city}, ${site.state}, ${site.country}`}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: image ? 64 : 76,
              lineHeight: 1.02,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {sub ? (
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.35,
                opacity: 0.85,
                maxWidth: 700,
              }}
            >
              {sub}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 20,
          }}
        >
          <span
            style={{
              width: 40,
              height: 3,
              background: accent,
              display: "flex",
            }}
          />
          <span
            style={{
              fontFamily: "Fraunces",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 24,
            }}
          >
            {site.tagline}
          </span>
        </div>
      </div>
      {image ? (
        <div
          style={{
            position: "absolute",
            right: 64,
            top: 64,
            bottom: 64,
            width: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            width={320}
            height={320}
            alt=""
            style={{ objectFit: "contain" }}
          />
        </div>
      ) : null}
    </div>,
    { ...OG_SIZE, fonts },
  );
}
