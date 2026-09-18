import { regions } from "@/content/regions";
import type { RegionId } from "@/content/types";

export const REGION_COOKIE = "prish_region";
const IDS: RegionId[] = ["us", "eu", "gcc", "sea"];

export function isRegionId(v: unknown): v is RegionId {
  return typeof v === "string" && (IDS as string[]).includes(v);
}

export function readRegionCookie(): RegionId | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${REGION_COOKIE}=([^;]*)`),
  );
  const v = m?.[1];
  return isRegionId(v) ? v : null;
}

export function writeRegionCookie(id: RegionId | null): void {
  if (typeof document === "undefined") return;
  if (id === null) {
    document.cookie = `${REGION_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  } else {
    document.cookie = `${REGION_COOKIE}=${id}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax`;
  }
}

/** Best-effort, client-only guess: languages first, then timezone. Never persisted. */
export function guessRegion(): RegionId | null {
  if (typeof navigator === "undefined") return null;
  const langs = (navigator.languages ?? [navigator.language]).map((l) =>
    l.toLowerCase(),
  );
  for (const l of langs) {
    for (const r of regions) {
      if (
        r.languages.some(
          (code) =>
            l === code.toLowerCase() || l.startsWith(`${code.toLowerCase()}-`),
        )
      )
        return r.id;
    }
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    for (const r of regions) {
      if (
        r.timezones.some((t) => (t.endsWith("/") ? tz.startsWith(t) : tz === t))
      )
        return r.id;
    }
  } catch {
    /* no Intl */
  }
  return null;
}
