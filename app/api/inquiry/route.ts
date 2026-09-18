import { NextResponse, after } from "next/server";
import { submissionSchema } from "@/lib/schemas/inquiry";
import { newRef } from "@/lib/leads/ref";
import { readLead, saveLead, type StoredLead } from "@/lib/leads/store";
import { processLead } from "@/lib/leads/pipeline";
import { allow } from "@/lib/leads/ratelimit";
import { getProduct } from "@/content";
import { waLink } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 32 * 1024;
const MIN_FILL_MS = 3_000;

function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  return (xf?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown").slice(0, 64);
}

function fakeOk(ref: string) {
  // bots that fill the honeypot get a plausible success and nothing else
  return NextResponse.json({ ok: true, ref, whatsapp: waLink({ ref }), downloads: [] });
}

export async function POST(req: Request) {
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BYTES) return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  // honeypot + time-trap before validation, so we never reveal which field tripped
  const raw = body as { buyer?: { website?: string }; startedAt?: unknown; submissionId?: unknown };
  if (raw?.buyer?.website) return fakeOk(newRef());
  if (typeof raw?.startedAt !== "number" || Date.now() - raw.startedAt < MIN_FILL_MS) return fakeOk(newRef());

  const ip = clientIp(req);
  if (!allow(ip)) return NextResponse.json({ ok: false, error: "Too many requests from this network. Please try again later or WhatsApp us." }, { status: 429 });

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.slice(0, 6).map((i) => ({ path: i.path.join("."), message: i.message }));
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", issues }, { status: 400 });
  }
  const lead = parsed.data;

  // message hygiene: too many links is spam
  const urls = (lead.message ?? "").match(/https?:\/\//g)?.length ?? 0;
  if (urls > 2) return fakeOk(newRef());

  // idempotency — a double-submit returns the original reference
  const existing = readLead(lead.submissionId);
  if (existing) return respond(existing);

  const stored: StoredLead = {
    ref: newRef(),
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? undefined,
    lead,
    steps: {
      notify: { status: "pending", attempts: 0 },
      confirm: { status: "pending", attempts: 0 },
      crm: { status: "pending", attempts: 0 },
    },
  };
  saveLead(lead.submissionId, stored); // persist FIRST — the file is the durable record

  after(async () => {
    try {
      await processLead(lead.submissionId);
    } catch (e) {
      console.error("[inquiry] pipeline error", e);
    }
  });

  return respond(stored);
}

function respond(l: StoredLead) {
  const products = l.lead.kind === "sample_kit" ? l.lead.items.map((i) => getProduct(i.productId)).filter((p): p is NonNullable<typeof p> => !!p) : [];
  return NextResponse.json({
    ok: true,
    ref: l.ref,
    whatsapp: waLink({ ref: l.ref, name: l.lead.buyer.name, company: l.lead.buyer.company, country: l.lead.buyer.country, products: products.map((p) => p.shortName) }),
    downloads: products.map((p) => ({ name: `${p.shortName} spec sheet`, url: `/downloads/spec-sheets/${p.slug}.pdf` })),
  });
}
