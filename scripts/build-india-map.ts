/**
 * Pre-project the India outline for <OriginMap> → content/generated/india-map.json.
 *
 * Source: Natural Earth 10m "admin 0 countries — India point of view"
 * (ne_10m_admin_0_countries_ind), which draws the external boundary as the Survey of
 * India does: all of Jammu & Kashmir and Ladakh, including Aksai Chin, inside India.
 * The default Natural Earth / world-atlas files follow the UN "de facto" line and leave
 * the north out — never use those for an India outline on this site.
 *
 * Run once when the source changes (output is committed):
 *   npx tsx scripts/build-india-map.ts            # downloads the 13 MB GeoJSON to a cache
 *   npx tsx scripts/build-india-map.ts <file>     # or point it at a local copy
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { geoMercator, geoPath } from "d3-geo";
import type {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
} from "geojson";

const SRC_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries_ind.geojson";
const OUT = join(
  import.meta.dirname,
  "..",
  "content",
  "generated",
  "india-map.json",
);
const WIDTH = 600;
const HEIGHT = 660;
/** drop projected vertices closer than this to the previous kept one (px) */
const MIN_STEP = 0.9;

async function loadSource(): Promise<FeatureCollection> {
  const local = process.argv[2];
  if (local) return JSON.parse(readFileSync(local, "utf8"));
  const cacheDir = join(tmpdir(), "prish-maps");
  const cache = join(cacheDir, "ne_10m_admin_0_countries_ind.geojson");
  if (!existsSync(cache)) {
    mkdirSync(cacheDir, { recursive: true });
    console.log(`downloading ${SRC_URL}`);
    const res = await fetch(SRC_URL);
    if (!res.ok) throw new Error(`download failed: ${res.status}`);
    writeFileSync(cache, Buffer.from(await res.arrayBuffer()));
  }
  return JSON.parse(readFileSync(cache, "utf8"));
}

function thin(ring: [number, number][]): [number, number][] {
  const out: [number, number][] = [];
  for (const p of ring) {
    const last = out[out.length - 1];
    if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) >= MIN_STEP)
      out.push(p);
  }
  return out;
}

async function main() {
  const fc = await loadSource();
  const india = fc.features.find(
    (f) =>
      f.properties?.ADMIN === "India" || f.properties?.SOVEREIGNT === "India",
  ) as Feature<Polygon | MultiPolygon> | undefined;
  if (!india) throw new Error("India feature not found in source");

  const projection = geoMercator().fitSize([WIDTH, HEIGHT], india);
  // project every ring ourselves so we can thin it and keep 1-decimal output small
  const polys =
    india.geometry.type === "Polygon"
      ? [india.geometry.coordinates]
      : india.geometry.coordinates;
  let d = "";
  let points = 0;
  for (const poly of polys) {
    for (const ring of poly) {
      const projected = ring.map((c) => projection(c as [number, number])!);
      const kept = thin(projected);
      if (kept.length < 4) continue; // specks
      points += kept.length;
      d +=
        "M" +
        kept.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L") +
        "Z";
    }
  }
  const out = {
    width: WIDTH,
    height: HEIGHT,
    path: d,
    scale: Number(projection.scale().toFixed(1)),
    translate: projection.translate().map((v) => Number(v.toFixed(1))),
    source:
      "Natural Earth 10m admin-0 countries, India point of view (ne_10m_admin_0_countries_ind); Survey of India boundary",
  };
  // sanity: the Survey of India boundary reaches ~37.1° N (Siachen / Karakoram)
  const northMost = Math.min(
    ...polys.flatMap((poly) =>
      poly.flatMap((ring) =>
        ring.map((c) => projection(c as [number, number])![1]),
      ),
    ),
  );
  const [, yLeh] = projection([77.58, 34.15])!;
  const [, yKashgarSide] = projection([78.5, 35.6])!; // Aksai Chin plateau
  console.log(
    `india-map: ${points} points, north edge at y=${northMost.toFixed(1)} (Leh y=${yLeh.toFixed(1)}, Aksai Chin y=${yKashgarSide.toFixed(1)})`,
  );
  if (!(northMost < yLeh - 20))
    throw new Error("outline does not extend north of Ladakh — wrong source?");
  void geoPath; // (d3 path not used: rings are emitted by hand after thinning)
  writeFileSync(OUT, JSON.stringify(out) + "\n");
  console.log(`wrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
