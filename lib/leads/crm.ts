import { execFile } from "node:child_process";
import { existsSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";
import type { StoredLead } from "./store";
import { env, envBool } from "./env";
import { getProduct, buyerTypeLabel, regionById } from "@/content";
import type { BuyerTypeId } from "@/content/types";

const execFileP = promisify(execFile);

export function crmEnabled(): boolean {
  return envBool("CRM_ENABLED", false);
}

export function crmReachable(): boolean {
  try {
    return crmEnabled() && existsSync(env("CRM_PYTHON")) && existsSync(join(env("CRM_DIR"), "src", "import_leads.py"));
  } catch {
    return false;
  }
}

function csvCell(v: string): string {
  const flat = v.replace(/\r?\n/g, " ");
  return `"${flat.replace(/"/g, '""')}"`;
}

/** One-row CSV in the exact shape the CRM's loose header matcher expects. */
export function leadToCsv(l: StoredLead): string {
  const b = l.lead.buyer;
  const products =
    l.lead.kind === "sample_kit" ? l.lead.items.map((i) => getProduct(i.productId)?.name ?? i.productId) : [l.lead.productInterest].filter(Boolean);
  const region = l.lead.region ? regionById[l.lead.region]?.short : "";
  const parts: string[] = [`Website ${l.ref} ${l.receivedAt.slice(0, 10)}`, l.lead.kind === "sample_kit" ? "sample kit" : "quick inquiry"];
  if (region) parts.push(`region ${region}`);
  if (b.buyerType) parts.push(buyerTypeLabel[b.buyerType as BuyerTypeId] ?? b.buyerType);
  if (l.lead.kind === "sample_kit") {
    parts.push(`incoterm ${l.lead.delivery.incoterm}`);
    if (l.lead.delivery.destination) parts.push(`to ${l.lead.delivery.destination}`);
    if (l.lead.delivery.timeline) parts.push(`when ${l.lead.delivery.timeline}`);
    const items = l.lead.items.map((i) => {
      const p = getProduct(i.productId)?.shortName ?? i.productId;
      const extra = [i.interest, i.variant, i.grade, i.specNotes, i.docs.length ? i.docs.join("+") : ""].filter(Boolean).join(", ");
      return `${p} (${extra})`;
    });
    parts.push(`items: ${items.join("; ")}`);
  }
  if (l.lead.message) parts.push(`msg: ${l.lead.message}`);
  const notes = parts.join(" | ").slice(0, 2000);
  const tags = ["website", "inbound", region ? region.toLowerCase().replace(/\s+/g, "-") : ""].filter(Boolean).join(",");
  const header = ["Email", "Company", "Contact Person", "Country", "Phone", "Product Interest", "Notes", "Tags"];
  const row = [b.email, b.company, b.name, b.country, b.phone, products.join(", "), notes, tags];
  const BOM = "﻿";
  return `${BOM}${header.map(csvCell).join(",")}\r\n${row.map(csvCell).join(",")}\r\n`;
}

/** Drop the CSV and run the CRM's own importer. Zero changes inside the CRM. */
export async function writeToCrm(l: StoredLead): Promise<void> {
  const dropDir = env("CRM_DROP_DIR");
  mkdirSync(join(dropDir, "done"), { recursive: true });
  const csvPath = join(dropDir, `${l.ref}.csv`);
  writeFileSync(csvPath, leadToCsv(l));
  const { stdout, stderr } = await execFileP(
    env("CRM_PYTHON"),
    ["src/import_leads.py", csvPath, "--source", "Website", "--tag", "website", "--owner", "exports"],
    { cwd: env("CRM_DIR"), timeout: 30_000, env: { ...process.env, PYTHONIOENCODING: "utf-8", PYTHONWARNINGS: "ignore" } },
  );
  if (!/Imported\./.test(stdout)) {
    throw new Error(`import_leads.py did not confirm import: ${stdout.slice(-300)} ${stderr.slice(-300)}`);
  }
  renameSync(csvPath, join(dropDir, "done", `${l.ref}.csv`));
}
