import { randomBytes } from "node:crypto";

/** Human-readable reference: PO-YYMMDD- plus 4 random unambiguous characters. */
export function newRef(now = new Date()): string {
  const yy = String(now.getUTCFullYear()).slice(2);
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const b = randomBytes(4);
  let code = "";
  for (let i = 0; i < 4; i++) code += alphabet[b[i]! % alphabet.length];
  return `PO-${yy}${mm}${dd}-${code}`;
}
