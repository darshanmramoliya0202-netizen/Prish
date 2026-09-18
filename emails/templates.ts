import type { StoredLead } from "@/lib/leads/store";
import { getProduct, buyerTypeLabel, regionById } from "@/content";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { getSiteUrl } from "@/lib/seo";
import type { BuyerTypeId } from "@/content/types";

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const DOC_LABEL: Record<string, string> = { coa: "COA", eto_free: "ETO-free declaration", mrl_report: "MRL / pesticide report", spec_sheet: "Spec sheet" };
const INTEREST_LABEL: Record<string, string> = { sample: "Sample", trial: "Trial lot", commercial: "Commercial" };

function shell(title: string, bodyHtml: string): string {
  const logo = `${getSiteUrl()}/brand/logo-seal-email.png`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;background:#f6f1e4;font-family:Figtree,Arial,Helvetica,sans-serif;color:#14110c;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f1e4;padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#fbf8f1;border-radius:16px;overflow:hidden;">
<tr><td style="background:#0b3d2e;padding:22px 28px;color:#fbf8f1;">
  <table role="presentation" cellspacing="0" cellpadding="0"><tr>
    <td style="padding-right:14px;"><img src="${logo}" width="48" height="48" alt="" style="display:block;border-radius:50%;"></td>
    <td><div style="font-size:14px;letter-spacing:3px;font-weight:700;">PRISH OVERSEAS</div><div style="font-size:12px;opacity:.8;">${escapeHtml(site.tagline)}</div></td>
  </tr></table>
</td></tr>
<tr><td style="padding:28px;font-size:15px;line-height:1.6;">${bodyHtml}</td></tr>
<tr><td style="padding:18px 28px;border-top:1px solid rgba(20,17,12,.1);font-size:12px;color:#6b6353;">
  ${escapeHtml(site.company)} · ${escapeHtml(site.address.join(", "))}<br>${escapeHtml(site.email)} · ${escapeHtml(site.phones[0])}
</td></tr>
</table></td></tr></table></body></html>`;
}

function itemsTable(l: StoredLead): { html: string; text: string } {
  if (l.lead.kind !== "sample_kit") return { html: "", text: "" };
  const rows = l.lead.items.map((it) => {
    const p = getProduct(it.productId);
    const name = p?.name ?? it.productId;
    const extras = [it.variant, it.grade, it.specNotes].filter(Boolean).join(" · ");
    const docs = it.docs.map((d) => DOC_LABEL[d] ?? d).join(", ");
    return { name, interest: INTEREST_LABEL[it.interest] ?? it.interest, extras, docs };
  });
  const html = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px;">
<tr style="text-align:left;color:#6b6353;"><th style="padding:6px 8px;border-bottom:1px solid #ddd;">Product</th><th style="padding:6px 8px;border-bottom:1px solid #ddd;">Interest</th><th style="padding:6px 8px;border-bottom:1px solid #ddd;">Details</th><th style="padding:6px 8px;border-bottom:1px solid #ddd;">Docs</th></tr>
${rows.map((r) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${escapeHtml(r.name)}</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(r.interest)}</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(r.extras || "—")}</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(r.docs || "—")}</td></tr>`).join("")}
</table>`;
  const text = rows.map((r) => `- ${r.name} — ${r.interest}${r.extras ? ` — ${r.extras}` : ""}${r.docs ? ` — docs: ${r.docs}` : ""}`).join("\n");
  return { html, text };
}

function kv(pairs: [string, string | undefined][]): { html: string; text: string } {
  const rows = pairs.filter(([, v]) => v && v.trim());
  return {
    html: `<table role="presentation" cellspacing="0" cellpadding="0" style="font-size:14px;">${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b6353;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:4px 0;">${escapeHtml(v!)}</td></tr>`).join("")}</table>`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
  };
}

/** Internal notification to exports@ (reply goes to the buyer). */
export function notificationEmail(l: StoredLead): { subject: string; html: string; text: string } {
  const b = l.lead.buyer;
  const region = l.lead.region ? regionById[l.lead.region]?.name : undefined;
  const kindLabel = l.lead.kind === "sample_kit" ? "Sample kit" : "Quick inquiry";
  const subject = `[Web] ${kindLabel} · ${b.company} · ${b.country} · ${l.ref}`;
  const items = itemsTable(l);
  const buyer = kv([
    ["Name", b.name],
    ["Company", b.company],
    ["Email", b.email],
    ["Phone / WhatsApp", b.phone],
    ["Country", b.country],
    ["Buyer type", b.buyerType ? buyerTypeLabel[b.buyerType as BuyerTypeId] : undefined],
    ["Region (site)", region],
  ]);
  const delivery =
    l.lead.kind === "sample_kit"
      ? kv([
          ["Incoterm", l.lead.delivery.incoterm],
          ["Destination", l.lead.delivery.destination],
          ["Timeline", l.lead.delivery.timeline],
        ])
      : kv([["Product interest", l.lead.productInterest]]);
  const message = l.lead.message?.trim();
  const meta = kv([
    ["Reference", l.ref],
    ["Received", l.receivedAt],
    ["Page", l.lead.page],
    ["IP", l.ip],
    ["Browser", l.userAgent?.slice(0, 120)],
  ]);
  const html = shell(
    subject,
    `<h1 style="font-size:22px;margin:0 0 6px;">${kindLabel} from ${escapeHtml(b.company)}</h1>
<p style="margin:0 0 18px;color:#6b6353;">${escapeHtml(l.ref)} · reply to this email to answer ${escapeHtml(b.name)} directly.</p>
${items.html ? `<h2 style="font-size:15px;margin:18px 0 8px;">Products</h2>${items.html}` : ""}
<h2 style="font-size:15px;margin:18px 0 8px;">Buyer</h2>${buyer.html}
<h2 style="font-size:15px;margin:18px 0 8px;">${l.lead.kind === "sample_kit" ? "Delivery" : "Interest"}</h2>${delivery.html}
${message ? `<h2 style="font-size:15px;margin:18px 0 8px;">Message</h2><p style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>` : ""}
<h2 style="font-size:15px;margin:18px 0 8px;color:#6b6353;">Meta</h2>${meta.html}
<p style="margin:18px 0 0;"><a href="${waLink({ name: b.name, company: b.company, intro: "Namaste" })}" style="color:#0b3d2e;">WhatsApp them</a></p>`,
  );
  const text = [`${kindLabel} from ${b.company} — ${l.ref}`, "", items.text ? `PRODUCTS\n${items.text}\n` : "", `BUYER\n${buyer.text}`, "", `${l.lead.kind === "sample_kit" ? "DELIVERY" : "INTEREST"}\n${delivery.text}`, "", message ? `MESSAGE\n${message}\n` : "", `META\n${meta.text}`].join("\n");
  return { subject, html, text };
}

/** Auto-confirmation to the buyer — founder voice, no response-time promises. */
export function confirmationEmail(l: StoredLead, downloads: { name: string; url: string }[]): { subject: string; html: string; text: string } {
  const b = l.lead.buyer;
  const first = b.name.split(/\s+/)[0] ?? b.name;
  const subject = `Namaste ${first} — your Prish Overseas request ${l.ref}`;
  const items = itemsTable(l);
  const wa = waLink({ ref: l.ref, name: b.name, company: b.company, country: b.country, products: l.lead.kind === "sample_kit" ? l.lead.items.map((i) => getProduct(i.productId)?.shortName ?? i.productId) : undefined });
  const dl = downloads.length ? `<p style="margin:14px 0 0;">Spec sheets: ${downloads.map((d) => `<a href="${d.url}" style="color:#0b3d2e;">${escapeHtml(d.name)}</a>`).join(" · ")}</p>` : "";
  const html = shell(
    subject,
    `<p style="margin:0 0 14px;font-size:17px;">Namaste ${escapeHtml(first)},</p>
<p style="margin:0 0 14px;">Thanks for the detail — it makes quoting faster. A real person reads this, usually Yash. Your reference is <strong>${escapeHtml(l.ref)}</strong>.</p>
${items.html ? `<p style="margin:0 0 8px;font-weight:600;">What you asked for</p>${items.html}` : ""}
${dl}
<p style="margin:18px 0 0;">If it is quicker, message us on WhatsApp with the reference: <a href="${wa}" style="color:#0b3d2e;">${escapeHtml(site.phones[0])}</a>.</p>
<p style="margin:18px 0 0;">— Yash Talaviya, Director<br>${escapeHtml(site.company)}, Rajkot</p>
<p style="margin:22px 0 0;font-size:12px;color:#6b6353;">You are receiving this because you submitted a request on prishoverseas.com.</p>`,
  );
  const text = [`Namaste ${first},`, "", `Thanks for the detail — it makes quoting faster. A real person reads this, usually Yash. Your reference is ${l.ref}.`, "", items.text ? `WHAT YOU ASKED FOR\n${items.text}\n` : "", downloads.length ? `Spec sheets:\n${downloads.map((d) => `- ${d.name}: ${d.url}`).join("\n")}\n` : "", `WhatsApp with the reference: ${wa}`, "", `— Yash Talaviya, Director, ${site.company}, Rajkot`].join("\n");
  return { subject, html, text };
}
