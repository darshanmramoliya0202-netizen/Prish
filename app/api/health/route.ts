import { NextResponse } from "next/server";
import { smtpConfigured } from "@/lib/leads/env";
import { crmEnabled, crmReachable } from "@/lib/leads/crm";
import { products } from "@/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Smoke-test endpoint used by the deploy workflow. Never leaks secrets. */
export function GET() {
  return NextResponse.json({
    ok: true,
    version: process.env.npm_package_version ?? "3",
    products: products.length,
    smtp: smtpConfigured() ? "configured" : "missing",
    crm: crmEnabled() ? (crmReachable() ? "reachable" : "unreachable") : "disabled",
    time: new Date().toISOString(),
  });
}
