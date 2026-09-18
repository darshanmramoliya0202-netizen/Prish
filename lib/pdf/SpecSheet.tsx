import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import type { Product, Cluster, Region } from "@/content/types";
import { C, s, pdfText, type ImageSrc } from "./theme";
import { site } from "@/content/site";
import { specsDisclaimer, hsDisclaimer } from "@/content/copy";

export interface SpecSheetProps {
  product: Product;
  cluster: Cluster;
  regions: Region[];
  flagText: Record<string, string>;
  buyerTypeLabel: Record<string, string>;
  sealPng: ImageSrc;
  bowlPng: ImageSrc;
  qrPng: ImageSrc;
  url: string;
  version: string;
  date: string;
}

export function Band({ sealPng, title, sub }: { sealPng: ImageSrc; title: string; sub: string }) {
  return (
    <View style={s.band} fixed>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image src={sealPng} style={{ width: 30, height: 30, marginRight: 10 }} />
        <View>
          <Text style={s.bandTitle}>PRISH OVERSEAS</Text>
          <Text style={s.bandSub}>{site.tagline}</Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontSize: 8, fontWeight: 600 }}>{title}</Text>
        <Text style={s.bandSub}>{sub}</Text>
      </View>
    </View>
  );
}

export function Footer({ left, right }: { left: string; right: string }) {
  return (
    <View style={s.footer} fixed>
      <Text>{left}</Text>
      <Text render={({ pageNumber, totalPages }) => `${right} · ${pageNumber}/${totalPages}`} />
    </View>
  );
}

function KV({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <View style={s.table}>
      {rows.map((r) => (
        <View key={r.k} style={s.tr} wrap={false}>
          <Text style={s.th}>{pdfText(r.k)}</Text>
          <Text style={s.td}>{pdfText(r.v)}</Text>
        </View>
      ))}
    </View>
  );
}

/** One product, 1–2 A4 pages. Also used as the per-product page inside the catalogue. */
export function SpecSheetPages(p: SpecSheetProps) {
  const { product, cluster, regions } = p;
  const hs = `${product.hs.hs6.slice(0, 4)}.${product.hs.hs6.slice(4)}`;
  return (
    <Page size="A4" style={s.page}>
      <Band sealPng={p.sealPng} title="PRODUCT SPEC SHEET" sub={`${cluster.name} · ${p.date}`} />
      <View style={s.body}>
        <View style={[s.row, { alignItems: "flex-start" }]}>
          <View style={{ width: "62%", paddingRight: 16 }}>
            <Text style={s.eyebrow}>{cluster.name}</Text>
            <Text style={[s.h1, { marginTop: 6 }]}>{product.name}</Text>
            {product.desiName ? <Text style={[s.small, { marginTop: 4 }]}>Trade name: {product.desiName.roman}</Text> : null}
            <Text style={[s.p, { marginTop: 10 }]}>{product.profile.whyIndian}</Text>
            <View style={[s.row, { flexWrap: "wrap", marginTop: 10 }]}>
              <Text style={s.chip}>Form: {product.form}</Text>
              <Text style={s.chip}>HS {hs}</Text>
              {product.hs.verified && product.hs.itcHs ? <Text style={s.chip}>ITC-HS {product.hs.itcHs}</Text> : null}
              <Text style={s.chip}>Origin: India</Text>
            </View>
          </View>
          <View style={{ width: "38%", alignItems: "center" }}>
            <View style={{ width: 150, height: 150, borderRadius: 10, backgroundColor: product.colourWorld.primary, alignItems: "center", justifyContent: "center" }}>
              <Image src={p.bowlPng} style={{ width: 140, height: 140 }} />
            </View>
          </View>
        </View>

        <View style={[s.row, { marginTop: 16 }]}>
          <View style={{ width: "50%", paddingRight: 12 }}>
            <Text style={s.h2}>Typical specifications</Text>
            <KV rows={product.specs.map((x) => ({ k: x.label, v: x.value }))} />
            <Text style={[s.small, { marginTop: 5 }]}>{specsDisclaimer}</Text>
          </View>
          <View style={{ width: "50%", paddingLeft: 12 }}>
            {product.gradeTable ? (
              <>
                <Text style={s.h2}>Grade ranges</Text>
                <KV rows={product.gradeTable.map((g) => ({ k: g.parameter, v: g.range }))} />
                <Text style={[s.small, { marginTop: 5 }]}>Ranges across grades and origins. Quoted per lot.</Text>
              </>
            ) : null}
            {product.variants ? (
              <>
                <Text style={[s.h2, { marginTop: product.gradeTable ? 12 : 0 }]}>Variants</Text>
                <View style={[s.row, { flexWrap: "wrap" }]}>
                  {product.variants.map((v) => (
                    <Text key={v} style={s.chip}>
                      {v}
                    </Text>
                  ))}
                </View>
              </>
            ) : null}
            <Text style={[s.h2, { marginTop: 12 }]}>Growing regions</Text>
            <View style={[s.row, { flexWrap: "wrap" }]}>
              {product.originRegions.map((o) => (
                <Text key={o} style={s.chip}>
                  {o}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={[s.row, { marginTop: 14 }]}>
          {[
            ["The science", product.profile.science],
            ["Why Indian", product.profile.whyIndian],
            ["In your formulation", product.profile.benefits],
          ].map(([h, t], i) => (
            <View key={h} style={{ width: "33.33%", paddingRight: i < 2 ? 10 : 0, borderLeftWidth: 1.2, borderLeftColor: C.gold, paddingLeft: 8 }}>
              <Text style={[s.eyebrow, { color: C.forest }]}>{h}</Text>
              <Text style={[s.p, { marginTop: 3, fontSize: 8.6 }]}>{t}</Text>
            </View>
          ))}
        </View>

        <View style={[s.row, { marginTop: 14 }]}>
          <View style={{ width: "50%", paddingRight: 12 }}>
            <Text style={s.h2}>Applications</Text>
            <View style={[s.row, { flexWrap: "wrap" }]}>
              {product.applications.map((a) => (
                <Text key={a} style={s.chip}>
                  {a}
                </Text>
              ))}
            </View>
            <Text style={[s.h2, { marginTop: 10 }]}>Who buys this</Text>
            <View style={[s.row, { flexWrap: "wrap" }]}>
              {product.buyerTypes.map((b) => (
                <Text key={b} style={s.chip}>
                  {p.buyerTypeLabel[b] ?? b}
                </Text>
              ))}
            </View>
          </View>
          <View style={{ width: "50%", paddingLeft: 12 }}>
            <Text style={s.h2}>Packaging & shelf life</Text>
            {product.packaging.map((x) => (
              <View key={x} style={s.bullet}>
                <View style={s.dot} />
                <Text style={[s.p, { fontSize: 8.8 }]}>{x}</Text>
              </View>
            ))}
            <Text style={[s.p, { marginTop: 4, fontSize: 8.8 }]}>
              Shelf life {product.shelfLife} in cool, dry, hygienic storage. FCL and LCL. Incoterms: {site.incoterms.join(" / ")}.
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 14 }} wrap={false}>
          <Text style={s.h2}>Compliance notes by market</Text>
          <View style={[s.row, { flexWrap: "wrap" }]}>
            {regions.map((r) => {
              const notes = product.flags.map((f) => r.compliance.byFlag[f]).filter((x): x is string => !!x);
              const first = notes[0] ?? r.compliance.general[0] ?? "";
              return (
                <View key={r.id} style={{ width: "50%", paddingRight: 10, marginBottom: 6 }}>
                  <Text style={{ fontSize: 8.5, fontWeight: 700 }}>
                    {r.name} · usually {r.incotermDefault}
                  </Text>
                  <Text style={[s.small, { color: C.ink2 }]}>{first}</Text>
                </View>
              );
            })}
          </View>
          {product.flags.length ? (
            <View style={{ marginTop: 4 }}>
              {product.flags.map((f) => (
                <View key={f} style={s.bullet}>
                  <View style={s.dot} />
                  <Text style={[s.small, { color: C.ink2 }]}>{p.flagText[f]}</Text>
                </View>
              ))}
            </View>
          ) : null}
          <Text style={[s.small, { marginTop: 4 }]}>{hsDisclaimer}</Text>
        </View>

        <View style={[s.row, { marginTop: 16, alignItems: "center", backgroundColor: C.cream2, borderRadius: 8, padding: 12 }]} wrap={false}>
          <Image src={p.qrPng} style={{ width: 54, height: 54, marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Fraunces", fontWeight: 600, fontSize: 12 }}>Get today’s price</Text>
            <Text style={[s.p, { fontSize: 8.8 }]}>
              WhatsApp {site.phones[0]} · {site.email} · {p.url}
            </Text>
            <Text style={[s.small, { marginTop: 2 }]}>Samples available — ask us. Lot-specific Certificate of Analysis with every consignment.</Text>
          </View>
        </View>
      </View>
      <Footer left={`${site.company} · ${site.address.join(", ")}`} right={`v${p.version} · ${p.date}`} />
    </Page>
  );
}

export function SpecSheetDocument(p: SpecSheetProps) {
  return (
    <Document title={`${p.product.name} — spec sheet — ${site.company}`} author={site.company} subject={p.product.seo.description} creator="prishoverseas.com">
      <SpecSheetPages {...p} />
    </Document>
  );
}
