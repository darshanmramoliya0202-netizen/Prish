import nodemailer from "nodemailer";
import { contact } from "@/data/site";

export type InquiryPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  inquiryType: string;
  targetMarket: string;
  productInterest: string;
  monthlyVolume: string;
  message: string;
  website?: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getTransportConfig() {
  const host = getRequiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  };
}

function buildTextBody(payload: InquiryPayload) {
  return [
    `Inquiry topic: ${payload.inquiryType}`,
    `Name: ${payload.name}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Country: ${payload.country}`,
    `Target market: ${payload.targetMarket || "Not provided"}`,
    `Product interest: ${payload.productInterest || "Not provided"}`,
    `Expected monthly volume: ${payload.monthlyVolume || "Not provided"}`,
    "",
    "Project details:",
    payload.message
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtmlBody(payload: InquiryPayload) {
  const rowEntries: Array<[string, string]> = [
    ["Inquiry topic", payload.inquiryType],
    ["Name", payload.name],
    ["Company", payload.company],
    ["Email", payload.email],
    ["Phone", payload.phone || "Not provided"],
    ["Country", payload.country],
    ["Target market", payload.targetMarket || "Not provided"],
    ["Product interest", payload.productInterest || "Not provided"],
    ["Expected monthly volume", payload.monthlyVolume || "Not provided"]
  ];

  const rows = rowEntries
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 12px;border:1px solid #d8dee8;font-weight:600;">${escapeHtml(label)}</td><td style="padding:10px 12px;border:1px solid #d8dee8;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;background:#f5f7fb;padding:24px;color:#10203b;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #d8dee8;border-radius:18px;overflow:hidden;">
        <div style="padding:24px 28px;background:linear-gradient(135deg,#07101d 0%,#10203b 100%);color:#f5f0e7;">
          <div style="font-size:12px;letter-spacing:0.32em;text-transform:uppercase;color:#d3a56d;">Prish Overseas Inquiry</div>
          <h1 style="margin:12px 0 0;font-size:30px;line-height:1.15;">New website inquiry received</h1>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
          <div style="margin-top:24px;">
            <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7c889c;">Project details</div>
            <div style="margin-top:10px;padding:18px;border-radius:14px;background:#f5f7fb;border:1px solid #d8dee8;line-height:1.7;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
          </div>
          <div style="margin-top:24px;font-size:13px;color:#5b6472;">Reply directly to ${escapeHtml(payload.email)} to continue the conversation.</div>
        </div>
      </div>
      <div style="max-width:720px;margin:14px auto 0;font-size:12px;color:#667085;text-align:center;">${contact.company} · ${contact.address.join(", ")}</div>
    </div>
  `;
}

export async function sendInquiryEmail(payload: InquiryPayload) {
  const to = getRequiredEnv("INQUIRY_TO_EMAIL");
  const from = getRequiredEnv("INQUIRY_FROM_EMAIL");

  const transporter = nodemailer.createTransport(getTransportConfig());

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `Website inquiry: ${payload.inquiryType} | ${payload.company}`,
    text: buildTextBody(payload),
    html: buildHtmlBody(payload)
  });
}
