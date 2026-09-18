import nodemailer, { type Transporter } from "nodemailer";
import { env, smtpPassword } from "./env";

let transporter: Transporter | null = null;

/** Pooled SMTP transport (Hostinger for exports@). Password may come from the CRM's secret file. */
export function getTransport(): Transporter {
  if (transporter) return transporter;
  const port = Number(env("SMTP_PORT", "465"));
  const secure = (process.env.SMTP_SECURE ?? (port === 465 ? "true" : "false")).toLowerCase() === "true";
  transporter = nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port,
    secure,
    auth: { user: env("SMTP_USER"), pass: smtpPassword() },
    pool: true,
    maxConnections: 2,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transporter;
}

export interface Mail {
  to: string;
  cc?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendMail(m: Mail): Promise<string> {
  const from = env("INQUIRY_FROM", `Prish Overseas <${env("SMTP_USER")}>`);
  const info = await getTransport().sendMail({ from, ...m });
  return info.messageId;
}

export async function verifySmtp(): Promise<boolean> {
  try {
    await getTransport().verify();
    return true;
  } catch {
    return false;
  }
}
