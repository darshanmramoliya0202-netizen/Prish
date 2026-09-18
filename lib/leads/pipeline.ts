import { readLead, saveLead, type StepName, type StoredLead } from "./store";
import { sendMail } from "./email";
import { crmEnabled, writeToCrm } from "./crm";
import { notificationEmail, confirmationEmail } from "@/emails/templates";
import { env } from "./env";
import { getProduct } from "@/content";
import { getSiteUrl } from "@/lib/seo";

export const MAX_ATTEMPTS = 8;

function downloadsFor(l: StoredLead): { name: string; url: string }[] {
  if (l.lead.kind !== "sample_kit") return [];
  return l.lead.items
    .map((i) => getProduct(i.productId))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map((p) => ({
      name: `${p.shortName} spec sheet`,
      url: `${getSiteUrl()}/downloads/spec-sheets/${p.slug}.pdf`,
    }));
}

async function runStep(l: StoredLead, name: StepName): Promise<void> {
  const step = l.steps[name];
  if (step.status === "done" || step.status === "skipped") return;
  if (step.attempts >= MAX_ATTEMPTS) return;
  step.attempts += 1;
  try {
    if (name === "notify") {
      const m = notificationEmail(l);
      await sendMail({
        to: env("INQUIRY_TO"),
        cc: process.env.INQUIRY_CC?.trim() || undefined,
        replyTo: l.lead.buyer.email,
        ...m,
      });
    } else if (name === "confirm") {
      const m = confirmationEmail(l, downloadsFor(l));
      await sendMail({
        to: l.lead.buyer.email,
        replyTo: env("INQUIRY_TO"),
        ...m,
      });
    } else if (name === "crm") {
      if (!crmEnabled()) {
        step.status = "skipped";
        step.at = new Date().toISOString();
        return;
      }
      await writeToCrm(l);
    }
    step.status = "done";
    step.error = undefined;
  } catch (e) {
    step.status = "failed";
    step.error =
      e instanceof Error ? e.message.slice(0, 500) : String(e).slice(0, 500);
  }
  step.at = new Date().toISOString();
}

/** Idempotent: runs every pending/failed step, persists after each. Safe to call repeatedly. */
export async function processLead(id: string): Promise<StoredLead | null> {
  const l = readLead(id);
  if (!l) return null;
  for (const name of ["notify", "confirm", "crm"] as StepName[]) {
    await runStep(l, name);
    saveLead(id, l);
  }
  // after the last attempt, tell the team once (best effort)
  const exhausted = Object.entries(l.steps).filter(
    ([, s]) => s.status === "failed" && s.attempts >= MAX_ATTEMPTS,
  );
  if (exhausted.length && !l.alerted) {
    l.alerted = true;
    saveLead(id, l);
    try {
      const list = exhausted
        .map(([k, s]) => `${k}: ${s.error ?? ""}`)
        .join("; ");
      await sendMail({
        to: env("INQUIRY_TO"),
        subject: `[Web] Lead ${l.ref} needs manual handling (${exhausted.map(([k]) => k).join(", ")} failed)`,
        text: `Lead ${l.ref} from ${l.lead.buyer.company} <${l.lead.buyer.email}> could not complete: ${list}. The full lead is stored on the server as ${id}.json.`,
        html: `<p>Lead <b>${l.ref}</b> from ${l.lead.buyer.company} &lt;${l.lead.buyer.email}&gt; could not complete: ${list}.</p><p>The full lead is stored on the server as ${id}.json.</p>`,
      });
    } catch {
      /* if even the alert fails, the JSON on disk is the record */
    }
  }
  return l;
}
