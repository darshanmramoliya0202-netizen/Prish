import { readFileSync } from "node:fs";

export function env(name: string, fallback?: string): string {
  const v = process.env[name]?.trim();
  if (v) return v;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required environment variable ${name}`);
}

export function envBool(name: string, fallback = false): boolean {
  const v = process.env[name]?.trim().toLowerCase();
  if (v === undefined || v === "") return fallback;
  return v === "1" || v === "true" || v === "yes";
}

/** SMTP password from SMTP_PASS or, on the VM, from the CRM's secret file. */
export function smtpPassword(): string {
  const direct = process.env.SMTP_PASS?.trim();
  if (direct) return direct;
  const file = process.env.SMTP_PASS_FILE?.trim();
  if (file) return readFileSync(file, "utf8").trim();
  throw new Error("Missing SMTP_PASS or SMTP_PASS_FILE");
}

export function smtpConfigured(): boolean {
  try {
    env("SMTP_HOST");
    env("SMTP_USER");
    smtpPassword();
    return true;
  } catch {
    return false;
  }
}
