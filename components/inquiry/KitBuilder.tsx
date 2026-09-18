"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  useKitStore,
  type KitDoc,
  type KitInterest,
} from "@/stores/sample-kit";
import { useRegionStore } from "@/stores/region";
import { useHydrated } from "@/lib/browser-store";
import { kitSubmissionSchema } from "@/lib/schemas/inquiry";
import { track } from "@/lib/analytics";
import type { KitProduct } from "./kit-data";
import { Chip, Field, Input, Select, Textarea } from "./fields";
import { Button } from "@/components/ui/primitives";
import {
  IconArrow,
  IconCheck,
  IconClose,
  IconDownload,
  IconWhatsApp,
} from "@/components/ui/icons";
import { cta, emptyKit } from "@/content/copy";
import { regions } from "@/content/regions";

const INTERESTS: { id: KitInterest; label: string; hint: string }[] = [
  { id: "sample", label: "Sample", hint: "Evaluate in your lab" },
  { id: "trial", label: "Trial lot", hint: "A first small shipment" },
  { id: "commercial", label: "Commercial", hint: "Ongoing supply" },
];
const DOCS: { id: KitDoc; label: string }[] = [
  { id: "spec_sheet", label: "Spec sheet" },
  { id: "coa", label: "Sample COA" },
  { id: "eto_free", label: "ETO-free declaration" },
  { id: "mrl_report", label: "MRL / pesticide report" },
];

type Result = {
  ref: string;
  whatsapp: string;
  downloads: { name: string; url: string }[];
};

export function KitBuilder({
  products,
  buyerTypes,
  clusters,
  preselect = [],
}: {
  products: KitProduct[];
  buyerTypes: { id: string; label: string }[];
  clusters: { id: string; name: string }[];
  preselect?: string[];
}) {
  const hydrated = useHydrated();
  const kit = useKitStore();
  const region = useRegionStore((s) => s.region);
  const hydrateRegion = useRegionStore((s) => s.hydrate);
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    hydrateRegion();
  }, [hydrateRegion]);

  // deep links: ?product=slug or ?kit=a,b (slugs)
  useEffect(() => {
    if (!hydrated || !preselect.length) return;
    const bySlug = new Map(products.map((p) => [p.slug, p.id]));
    for (const s of preselect) {
      const id = bySlug.get(s);
      if (id && !kit.has(id)) kit.add(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  // default incoterm/region from the region store once (only if the buyer hasn't chosen)
  useEffect(() => {
    if (!hydrated || !region || kit.delivery.region) return;
    const r = regions.find((x) => x.id === region);
    if (r) kit.setDelivery({ region, incoterm: r.incotermDefault });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, region]);

  const visible = useMemo(() => {
    const s = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (filter === "all" || p.cluster === filter) &&
        (!s || `${p.name} ${p.desi ?? ""}`.toLowerCase().includes(s)),
    );
  }, [products, filter, q]);

  const chosen = kit.items
    .map((i) => ({
      item: i,
      product: products.find((p) => p.id === i.productId),
    }))
    .filter(
      (x): x is { item: (typeof kit.items)[number]; product: KitProduct } =>
        !!x.product,
    );

  async function submit() {
    setServerError(null);
    const payload = {
      kind: "sample_kit" as const,
      submissionId: kit.submissionId,
      startedAt: kit.startedAt,
      page:
        typeof window !== "undefined" ? window.location.pathname : undefined,
      region: kit.delivery.region ?? region ?? undefined,
      items: kit.items,
      buyer: kit.buyer,
      delivery: kit.delivery,
      message: kit.message,
      consent,
    };
    const parsed = kitSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      for (const i of parsed.error.issues) e[i.path.join(".")] = i.message;
      setErrors(e);
      document
        .getElementById("kit-buyer")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        ref?: string;
        whatsapp?: string;
        downloads?: Result["downloads"];
      };
      if (!res.ok || !data.ok) {
        setServerError(
          data.error ??
            "Something went wrong. Please try again or WhatsApp us.",
        );
        return;
      }
      setResult({
        ref: data.ref!,
        whatsapp: data.whatsapp!,
        downloads: data.downloads ?? [],
      });
      track("kit_submit", {
        items: kit.items.length,
        region: payload.region ?? "none",
      });
      kit.reset(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError(
        "We couldn't reach the server. Your kit is saved in this browser — try again, or WhatsApp us.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-xl border border-ok/30 bg-cream-50 p-8 md:p-12">
        <p className="eyebrow text-ok">Received · {result.ref}</p>
        <h2 className="mt-3 text-display-lg">
          Dhanyavaad. A real person reads this next.
        </h2>
        <p className="mt-4 max-w-xl text-lead text-ink-700">
          We&apos;ve emailed you a copy with your reference. If it&apos;s
          quicker, continue on WhatsApp — the reference is already in the
          message.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={result.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-[#062a16]"
            data-umami-event="whatsapp_click"
            data-umami-event-placement="kit_success"
          >
            <IconWhatsApp /> Continue on WhatsApp
          </a>
          <Button variant="secondary" onClick={() => setResult(null)}>
            Build another kit
          </Button>
        </div>
        {result.downloads.length ? (
          <div className="mt-8">
            <p className="eyebrow text-ink-500">Spec sheets for your kit</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {result.downloads.map((d) => (
                <li key={d.url}>
                  <a
                    href={d.url}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 px-4 py-2 text-small font-semibold"
                    data-umami-event="spec_sheet_download"
                  >
                    <IconDownload width={16} height={16} /> {d.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      {/* ── 1. pick products ─────────────────────────────────────────── */}
      <section className="lg:col-span-7" aria-labelledby="kit-pick">
        <p className="eyebrow text-ink-500">Step 1</p>
        <h2 id="kit-pick" className="mt-2 text-display-md">
          Pick products
        </h2>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Chip on={filter === "all"} onClick={() => setFilter("all")}>
            All
          </Chip>
          {clusters.map((c) => (
            <Chip
              key={c.id}
              on={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.name}
            </Chip>
          ))}
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            aria-label="Search products"
            className="ml-auto h-9 w-40 rounded-full border border-ink-900/20 bg-cream-50 px-4 text-small outline-none focus:border-forest-900"
          />
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3" role="list">
          {visible.map((p) => {
            const on = hydrated && kit.has(p.id);
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => kit.toggle(p.id)}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${on ? "border-forest-900 bg-forest-900 text-cream-50" : "border-ink-900/15 hover:border-ink-900/50"}`}
                >
                  <span
                    className="size-8 shrink-0 rounded-full border border-white/20"
                    style={{ background: p.primary }}
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-body font-semibold leading-tight">
                      {p.shortName}
                    </span>
                    <span
                      className={`block text-[11px] ${on ? "opacity-80" : "text-ink-500"}`}
                    >
                      {p.clusterName}
                    </span>
                  </span>
                  {on ? (
                    <IconCheck
                      className="ml-auto shrink-0"
                      width={18}
                      height={18}
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── 2. per-product details ───────────────────────────────────── */}
      <section className="lg:col-span-5" aria-labelledby="kit-details">
        <p className="eyebrow text-ink-500">Step 2</p>
        <h2 id="kit-details" className="mt-2 text-display-md">
          Your kit {hydrated && kit.items.length ? `· ${kit.items.length}` : ""}
        </h2>
        {!hydrated || chosen.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-ink-900/20 p-6">
            <p className="font-semibold">{emptyKit.title}</p>
            <p className="mt-1 text-small text-ink-500">{emptyKit.sub}</p>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {chosen.map(({ item, product }) => (
              <li
                key={item.productId}
                className="rounded-lg border border-ink-900/15 bg-cream-100 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-display-md leading-tight">
                      {product.name}
                    </p>
                    <Link
                      href={`/products`}
                      className="text-small text-ink-500 underline-offset-4 hover:underline"
                    >
                      {product.clusterName}
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => kit.remove(item.productId)}
                    aria-label={`Remove ${product.name}`}
                    className="rounded-full p-1.5 hover:bg-ink-900/5"
                  >
                    <IconClose width={18} height={18} />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {INTERESTS.map((i) => (
                    <Chip
                      key={i.id}
                      on={item.interest === i.id}
                      onClick={() =>
                        kit.update(item.productId, { interest: i.id })
                      }
                    >
                      {i.label}
                    </Chip>
                  ))}
                </div>
                {product.variants ? (
                  <Select
                    value={item.variant ?? ""}
                    onChange={(e) =>
                      kit.update(item.productId, {
                        variant: e.target.value || undefined,
                      })
                    }
                    className="mt-3"
                    aria-label={`${product.name} variant`}
                  >
                    <option value="">Variant…</option>
                    {product.variants.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </Select>
                ) : null}
                <Input
                  value={item.specNotes ?? ""}
                  onChange={(e) =>
                    kit.update(item.productId, { specNotes: e.target.value })
                  }
                  placeholder={
                    product.gradeHint
                      ? `Grade / spec brief (${product.gradeHint})`
                      : "Spec brief — mesh, moisture, colour, use…"
                  }
                  className="mt-3"
                  maxLength={600}
                  aria-label={`${product.name} spec brief`}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {DOCS.map((d) => {
                    const on = item.docs.includes(d.id);
                    return (
                      <Chip
                        key={d.id}
                        on={on}
                        onClick={() =>
                          kit.update(item.productId, {
                            docs: on
                              ? item.docs.filter((x) => x !== d.id)
                              : [...item.docs, d.id],
                          })
                        }
                      >
                        {d.label}
                      </Chip>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
        {errors.items ? (
          <p className="mt-3 text-small text-danger">{errors.items}</p>
        ) : null}
      </section>

      {/* ── 3. about you ─────────────────────────────────────────────── */}
      <section
        id="kit-buyer"
        className="scroll-mt-28 lg:col-span-6"
        aria-labelledby="kit-you"
      >
        <p className="eyebrow text-ink-500">Step 3</p>
        <h2 id="kit-you" className="mt-2 text-display-md">
          About you
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Your name" id="b-name" error={errors["buyer.name"]}>
            <Input
              id="b-name"
              autoComplete="name"
              value={kit.buyer.name}
              onChange={(e) => kit.setBuyer({ name: e.target.value })}
              error={errors["buyer.name"]}
            />
          </Field>
          <Field label="Company" id="b-company" error={errors["buyer.company"]}>
            <Input
              id="b-company"
              autoComplete="organization"
              value={kit.buyer.company}
              onChange={(e) => kit.setBuyer({ company: e.target.value })}
              error={errors["buyer.company"]}
            />
          </Field>
          <Field label="Work email" id="b-email" error={errors["buyer.email"]}>
            <Input
              id="b-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={kit.buyer.email}
              onChange={(e) => kit.setBuyer({ email: e.target.value })}
              error={errors["buyer.email"]}
            />
          </Field>
          <Field
            label="Phone / WhatsApp"
            id="b-phone"
            error={errors["buyer.phone"]}
            hint="With country code"
          >
            <Input
              id="b-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={kit.buyer.phone}
              onChange={(e) => kit.setBuyer({ phone: e.target.value })}
              error={errors["buyer.phone"]}
            />
          </Field>
          <Field label="Country" id="b-country" error={errors["buyer.country"]}>
            <Input
              id="b-country"
              autoComplete="country-name"
              value={kit.buyer.country}
              onChange={(e) => kit.setBuyer({ country: e.target.value })}
              error={errors["buyer.country"]}
            />
          </Field>
          <Field
            label="You are a…"
            id="b-type"
            hint="Optional — helps us quote the right grade"
          >
            <Select
              id="b-type"
              value={kit.buyer.buyerType ?? ""}
              onChange={(e) =>
                kit.setBuyer({
                  buyerType: (e.target.value || undefined) as never,
                })
              }
            >
              <option value="">Choose…</option>
              {buyerTypes.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </Select>
          </Field>
          {/* honeypot */}
          <div className="hidden" aria-hidden>
            <label htmlFor="b-website">Website</label>
            <input
              id="b-website"
              tabIndex={-1}
              autoComplete="off"
              value={kit.buyer.website ?? ""}
              onChange={(e) => kit.setBuyer({ website: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* ── 4. delivery & docs ───────────────────────────────────────── */}
      <section className="lg:col-span-6" aria-labelledby="kit-delivery">
        <p className="eyebrow text-ink-500">Step 4</p>
        <h2 id="kit-delivery" className="mt-2 text-display-md">
          Delivery
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Your market" id="d-region">
            <Select
              id="d-region"
              value={kit.delivery.region ?? ""}
              onChange={(e) =>
                kit.setDelivery({
                  region: (e.target.value || undefined) as never,
                })
              }
            >
              <option value="">Choose…</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Incoterm" id="d-incoterm" hint="We quote FOB and CIF">
            <Select
              id="d-incoterm"
              value={kit.delivery.incoterm}
              onChange={(e) =>
                kit.setDelivery({ incoterm: e.target.value as "FOB" | "CIF" })
              }
            >
              <option value="FOB">FOB</option>
              <option value="CIF">CIF</option>
            </Select>
          </Field>
          <Field label="Destination port / city" id="d-dest" hint="Optional">
            <Input
              id="d-dest"
              value={kit.delivery.destination ?? ""}
              onChange={(e) => kit.setDelivery({ destination: e.target.value })}
            />
          </Field>
          <Field
            label="When do you need it?"
            id="d-when"
            hint="Optional — e.g. next quarter, this season"
          >
            <Input
              id="d-when"
              value={kit.delivery.timeline ?? ""}
              onChange={(e) => kit.setDelivery({ timeline: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field
              label="Anything else"
              id="d-msg"
              hint="Use, target spec, certificates you need, questions"
            >
              <Textarea
                id="d-msg"
                value={kit.message}
                onChange={(e) => kit.setMessage(e.target.value)}
                maxLength={2000}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* ── 5. review & send ─────────────────────────────────────────── */}
      <section className="lg:col-span-12" aria-labelledby="kit-send">
        <div className="rounded-xl bg-forest-950 p-6 text-cream-50 md:p-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 id="kit-send" className="text-display-md">
                Send the kit.
              </h2>
              <p className="mt-2 text-body text-cream-100/80">
                {hydrated && kit.items.length
                  ? `${kit.items.length} product${kit.items.length === 1 ? "" : "s"} · ${kit.delivery.incoterm}`
                  : "Add at least one product above."}{" "}
                You get a copy by email and a WhatsApp link with your reference.{" "}
                {cta.samples}
              </p>
              <label className="mt-5 flex items-start gap-3 text-small">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 size-4 accent-gold-500"
                />
                <span>
                  I agree that Prish Overseas keeps these details to answer my
                  request, as described in the{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4"
                  >
                    privacy note
                  </Link>
                  .
                </span>
              </label>
              {errors.consent ? (
                <p className="mt-2 text-small text-gold-300">
                  {errors.consent}
                </p>
              ) : null}
              {serverError ? (
                <p className="mt-3 text-small text-gold-300" role="alert">
                  {serverError}
                </p>
              ) : null}
            </div>
            <div className="md:col-span-4 md:text-right">
              <Button
                size="lg"
                onClick={submit}
                disabled={busy || !hydrated || kit.items.length === 0}
                className="!bg-gold-500 !text-ink-900 hover:!bg-gold-400"
              >
                {busy ? "Sending…" : "Send sample kit"} <IconArrow />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
