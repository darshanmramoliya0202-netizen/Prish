import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import type { Certificate, Cluster, Product, Region } from "@/content/types";
import { C, s, type ImageSrc } from "./theme";
import { site } from "@/content/site";
import { Band, Footer, SpecSheetPages, type SpecSheetProps } from "./SpecSheet";

export interface CatalogueProps {
  clusters: Cluster[];
  productsByCluster: (id: Cluster["id"]) => Product[];
  sheetFor: (p: Product) => SpecSheetProps;
  certificates: Certificate[];
  regions: Region[];
  sealPng: ImageSrc;
  sealCreamPng: ImageSrc;
  coverBowls: ImageSrc[];
  qrPng: ImageSrc;
  version: string;
  date: string;
}

export function CatalogueDocument(c: CatalogueProps) {
  const held = c.certificates.filter((x) => x.status === "held");
  const pending = c.certificates.filter((x) => x.status === "in_process");
  return (
    <Document title={`${site.company} — Product catalogue ${c.date.slice(0, 4)}`} author={site.company} creator="prishoverseas.com">
      {/* cover */}
      <Page size="A4" style={[s.page, { backgroundColor: C.forestDeep, color: C.cream, paddingBottom: 0 }]}>
        <View style={{ padding: 40, height: "100%", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image src={c.sealCreamPng} style={{ width: 54, height: 54, marginRight: 14 }} />
            <View>
              <Text style={{ fontSize: 11, letterSpacing: 3, fontWeight: 700 }}>PRISH OVERSEAS</Text>
              <Text style={{ fontSize: 9, opacity: 0.8 }}>{site.positioning}</Text>
            </View>
          </View>
          <View>
            <Text style={{ fontFamily: "Fraunces", fontWeight: 600, fontSize: 40, lineHeight: 1.02 }}>From Indian farms to global formulations.</Text>
            <Text style={{ fontFamily: "Fraunces", fontStyle: "italic", fontSize: 14, color: C.gold2, marginTop: 10 }}>Product catalogue · {c.date.slice(0, 4)}</Text>
            <View style={{ flexDirection: "row", marginTop: 28 }}>
              {c.coverBowls.map((b, i) => (
                <Image key={i} src={b} style={{ width: 110, height: 110, marginRight: 6 }} />
              ))}
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 9, opacity: 0.85 }}>
              {c.clusters.length} families · {c.clusters.reduce((n, cl) => n + c.productsByCluster(cl.id).length, 0)} products · United States · European Union · GCC · Southeast Asia
            </Text>
            <Text style={{ fontSize: 8, opacity: 0.65, marginTop: 4 }}>
              {site.address.join(", ")} · {site.email} · {site.phones[0]}
            </Text>
          </View>
        </View>
      </Page>

      {/* intro + index */}
      <Page size="A4" style={s.page}>
        <Band sealPng={c.sealPng} title="ABOUT" sub="Farm-rooted in Saurashtra" />
        <View style={s.body}>
          <Text style={s.h1}>Indian origin, documented for your market.</Text>
          <Text style={[s.p, { marginTop: 10 }]}>
            India has long been a trusted source of high-quality agricultural and botanical ingredients. {site.company} offers fruit, vegetable and herbal powders, dehydrated onion and garlic, whole spices, moringa and basmati rice — responsibly sourced from selected Indian farms and processed with controlled drying and milling so nutrient content, functional performance and quality stay consistent. Purity, traceability and export compliance are the point.
          </Text>
          <View style={[s.row, { marginTop: 14 }]}>
            {site.stats.map((st) => (
              <View key={st.label} style={{ width: "25%", borderTopWidth: 1.2, borderTopColor: C.gold, paddingTop: 6, paddingRight: 8 }}>
                <Text style={{ fontFamily: "Fraunces", fontWeight: 600, fontSize: 20, color: C.forest }}>
                  {st.value} {st.unit}
                </Text>
                <Text style={s.small}>{st.label}</Text>
              </View>
            ))}
          </View>
          <Text style={[s.h2, { marginTop: 18 }]}>Why Indian origin</Text>
          {["Multiple agro-climatic zones supporting diverse botanicals", `${site.sunshineDays} annual sunshine days in the major growing regions`, "Traditional farming expertise combined with modern processing", "Cost-effective production with year-round availability", "Structured sourcing for traceable, export-oriented quality"].map((x) => (
            <View key={x} style={s.bullet}>
              <View style={s.dot} />
              <Text style={s.p}>{x}</Text>
            </View>
          ))}
          <Text style={[s.h2, { marginTop: 18 }]}>Families in this catalogue</Text>
          {c.clusters.map((cl) => (
            <View key={cl.id} style={[s.tr, { justifyContent: "space-between" }]}>
              <Text style={{ fontWeight: 600, fontSize: 9.5 }}>{cl.name}</Text>
              <Text style={[s.small, { width: "55%", textAlign: "right" }]}>{c.productsByCluster(cl.id).map((p) => p.shortName).join(" · ")}</Text>
            </View>
          ))}
        </View>
        <Footer left={`${site.company} · Rajkot, Gujarat, India`} right={`Catalogue v${c.version}`} />
      </Page>

      {/* per family divider + product pages */}
      {c.clusters.map((cl) => (
        <View key={cl.id}>
          <Page size="A4" style={[s.page, { backgroundColor: cl.colourWorld.primary, color: cl.colourWorld.ink === "light" ? C.cream : C.ink, paddingBottom: 0 }]}>
            <View style={{ padding: 40, height: "100%", justifyContent: "flex-end" }}>
              <Text style={{ fontSize: 9, letterSpacing: 3, fontWeight: 700, opacity: 0.8 }}>FAMILY</Text>
              <Text style={{ fontFamily: "Fraunces", fontWeight: 600, fontSize: 38, lineHeight: 1.02, marginTop: 6 }}>{cl.name}</Text>
              <Text style={{ fontFamily: "Fraunces", fontStyle: "italic", fontSize: 14, marginTop: 8, opacity: 0.9 }}>{cl.promise}</Text>
              <Text style={{ fontSize: 9.5, lineHeight: 1.5, marginTop: 14, opacity: 0.9, maxWidth: 380 }}>{cl.description}</Text>
              <Text style={{ fontSize: 8.5, marginTop: 18, opacity: 0.8 }}>{c.productsByCluster(cl.id).map((p) => p.name).join(" · ")}</Text>
            </View>
          </Page>
          {c.productsByCluster(cl.id).map((p) => (
            <SpecSheetPages key={p.id} {...c.sheetFor(p)} />
          ))}
        </View>
      ))}

      {/* quality & documents */}
      <Page size="A4" style={s.page}>
        <Band sealPng={c.sealPng} title="QUALITY & DOCUMENTS" sub="Audit us before you buy" />
        <View style={s.body}>
          <Text style={s.h1}>What we hold, how we process, what ships.</Text>
          <Text style={[s.h2, { marginTop: 14 }]}>Certificates & registrations</Text>
          {held.map((x) => (
            <View key={x.id} style={s.tr}>
              <Text style={[s.th, { width: "45%" }]}>{x.name}</Text>
              <Text style={[s.td, { width: "55%" }]}>{x.number ? `${x.number} · ${x.issuer}` : `Held · copy on request · ${x.issuer}`}</Text>
            </View>
          ))}
          {pending.map((x) => (
            <View key={x.id} style={s.tr}>
              <Text style={[s.th, { width: "45%" }]}>{x.name}</Text>
              <Text style={[s.td, { width: "55%" }]}>Under approval · {x.issuer}</Text>
            </View>
          ))}
          <View style={[s.row, { marginTop: 16 }]}>
            <View style={{ width: "50%", paddingRight: 12 }}>
              <Text style={s.h2}>Processing</Text>
              {["Selection of premium-grade raw materials", "Low-temperature drying to preserve active compounds", "Fine milling for uniform particle size", "Hygienic processing under controlled conditions"].map((x) => (
                <View key={x} style={s.bullet}>
                  <View style={s.dot} />
                  <Text style={s.p}>{x}</Text>
                </View>
              ))}
              <Text style={[s.h2, { marginTop: 12 }]}>Commitments</Text>
              {["No artificial colours or flavours", "No adulteration", "Batch-wise consistency", "Export-ready documentation", "Third-party laboratory testing on request"].map((x) => (
                <View key={x} style={s.bullet}>
                  <View style={s.dot} />
                  <Text style={s.p}>{x}</Text>
                </View>
              ))}
            </View>
            <View style={{ width: "50%", paddingLeft: 12 }}>
              <Text style={s.h2}>What ships with your consignment</Text>
              {["Commercial invoice", "Packing list", "Certificate of origin", "Phytosanitary certificate (where applicable)", "Lot-specific Certificate of Analysis", "ETO-free declaration (spices, on request)", "Exporter-oriented IEC & documentation support", "Freight quotation and proforma invoice"].map((x) => (
                <View key={x} style={s.bullet}>
                  <View style={s.dot} />
                  <Text style={s.p}>{x}</Text>
                </View>
              ))}
              <Text style={[s.h2, { marginTop: 12 }]}>Packaging</Text>
              {["HDPE export bag (outer food grade)", "BOPP / brown kraft paper bag", "Multi-layer laminated bulk box", "25 kg food-grade fibre drum", "Small pack sizes supported on request"].map((x) => (
                <View key={x} style={s.bullet}>
                  <View style={s.dot} />
                  <Text style={s.p}>{x}</Text>
                </View>
              ))}
              <Text style={[s.p, { marginTop: 6 }]}>Shelf life 12–24 months in cool, dry, hygienic storage. FCL and LCL.</Text>
            </View>
          </View>
          <Text style={[s.h2, { marginTop: 16 }]}>Markets</Text>
          <View style={[s.row, { flexWrap: "wrap" }]}>
            {c.regions.map((r) => (
              <View key={r.id} style={{ width: "50%", paddingRight: 10, marginBottom: 6 }}>
                <Text style={{ fontSize: 9, fontWeight: 700 }}>
                  {r.name} · usually {r.incotermDefault}
                </Text>
                <Text style={s.small}>{r.compliance.general[0]}</Text>
              </View>
            ))}
          </View>
        </View>
        <Footer left={`${site.company} · Rajkot, Gujarat, India`} right={`Catalogue v${c.version}`} />
      </Page>

      {/* contact */}
      <Page size="A4" style={[s.page, { backgroundColor: C.forest, color: C.cream, paddingBottom: 0 }]}>
        <View style={{ padding: 40, height: "100%", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 9, letterSpacing: 3, fontWeight: 700, color: C.gold2 }}>TELL US WHAT YOU’RE SOURCING</Text>
            <Text style={{ fontFamily: "Fraunces", fontWeight: 600, fontSize: 34, lineHeight: 1.05, marginTop: 10 }}>Pick products, tell us your market, and we quote against today’s crop.</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.5, marginTop: 14, opacity: 0.9, maxWidth: 400 }}>Samples available — ask us. Incoterms {site.incoterms.join(" and ")}. Lot-specific Certificate of Analysis with every consignment. Third-party testing on request.</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image src={c.qrPng} style={{ width: 90, height: 90, marginRight: 18, borderRadius: 6 }} />
            <View>
              <Text style={{ fontSize: 11, fontWeight: 700 }}>{site.company}</Text>
              {site.address.map((l) => (
                <Text key={l} style={{ fontSize: 9, opacity: 0.9 }}>
                  {l}
                </Text>
              ))}
              <Text style={{ fontSize: 9.5, marginTop: 6 }}>WhatsApp / phone: {site.phones.join(" · ")}</Text>
              <Text style={{ fontSize: 9.5 }}>{site.email} · prishoverseas.com/inquiry</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
