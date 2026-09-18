// Verifies SMTP login with the same env the app uses. Run on the VM before cutover:
//   node scripts/smtp-check.mjs
import nodemailer from "nodemailer";
import { readFileSync } from "node:fs";

const pass = process.env.SMTP_PASS?.trim() || (process.env.SMTP_PASS_FILE ? readFileSync(process.env.SMTP_PASS_FILE, "utf8").trim() : "");
const port = Number(process.env.SMTP_PORT ?? 465);
const t = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: (process.env.SMTP_SECURE ?? (port === 465 ? "true" : "false")) === "true", auth: { user: process.env.SMTP_USER, pass } });
try {
  await t.verify();
  console.log(`SMTP OK — ${process.env.SMTP_USER} via ${process.env.SMTP_HOST}:${port}`);
  if (process.argv.includes("--send")) {
    const to = process.env.INQUIRY_TO ?? process.env.SMTP_USER;
    const info = await t.sendMail({ from: process.env.INQUIRY_FROM ?? process.env.SMTP_USER, to, subject: "prishoverseas.com SMTP check", text: "If you can read this, the website can send mail." });
    console.log("sent", info.messageId, "→", to);
  }
} catch (e) {
  console.error("SMTP FAILED:", e.message);
  process.exit(1);
}
