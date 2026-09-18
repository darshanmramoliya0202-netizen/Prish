/**
 * Runs once per server start (Node runtime). Sweeps unfinished leads every 10 minutes
 * so a temporary SMTP or CRM failure never loses an inquiry — the JSON on disk is the
 * source of truth and every step is idempotent.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.LEADS_SWEEPER === "off") return;
  const { listUnfinished } = await import("./lib/leads/store");
  const { processLead } = await import("./lib/leads/pipeline");
  const tick = async () => {
    try {
      for (const id of listUnfinished()) await processLead(id);
    } catch (e) {
      console.error("[leads] sweeper error", e);
    }
  };
  setTimeout(tick, 30_000).unref();
  setInterval(tick, 10 * 60 * 1000).unref();
}
