import {
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { join } from "node:path";
import type { Submission } from "@/lib/schemas/inquiry";

export type StepName = "notify" | "confirm" | "crm";
export type StepStatus = "pending" | "done" | "failed" | "skipped";

export interface StoredLead {
  ref: string;
  receivedAt: string;
  ip?: string;
  userAgent?: string;
  lead: Submission;
  steps: Record<
    StepName,
    { status: StepStatus; attempts: number; error?: string; at?: string }
  >;
  alerted?: boolean;
}

function dir(): string {
  const d =
    process.env.LEADS_DIR?.trim() || join(process.cwd(), "data", "leads");
  mkdirSync(d, { recursive: true });
  return d;
}

function pathFor(id: string): string {
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(id)) throw new Error("bad submission id");
  return join(dir(), `${id}.json`);
}

/** Atomic write: temp file + rename, so a crash never leaves a half-written lead. */
export function saveLead(id: string, data: StoredLead): void {
  const p = pathFor(id);
  const tmp = `${p}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2));
  renameSync(tmp, p);
}

export function readLead(id: string): StoredLead | null {
  const p = pathFor(id);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8")) as StoredLead;
  } catch {
    return null;
  }
}

export function listUnfinished(maxAttempts = 8): string[] {
  const d = dir();
  return readdirSync(/* turbopackIgnore: true */ d)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.slice(0, -5))
    .filter((id) => {
      const l = readLead(id);
      if (!l) return false;
      return Object.values(l.steps).some(
        (s) =>
          (s.status === "pending" || s.status === "failed") &&
          s.attempts < maxAttempts,
      );
    });
}
