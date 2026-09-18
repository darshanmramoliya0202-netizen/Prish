import { test, expect } from "@playwright/test";

const buyer = {
  name: "QA Buyer",
  company: "QA Foods",
  email: "qa@example.com",
  phone: "+31 20 000 0000",
  country: "Netherlands",
};
const base = () => ({
  submissionId: `pw-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  startedAt: Date.now() - 5000,
  consent: true,
});

test("rejects invalid email with a field issue", async ({ request }) => {
  const res = await request.post("/api/inquiry", {
    data: {
      kind: "quick_inquiry",
      ...base(),
      buyer: { ...buyer, email: "nope" },
      message: "Hello there",
    },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.issues?.[0]?.path).toBe("buyer.email");
});

test("honeypot gets a fake success and nothing persists under that id", async ({
  request,
}) => {
  const id = base();
  const fake = await (
    await request.post("/api/inquiry", {
      data: {
        kind: "quick_inquiry",
        ...id,
        buyer: { ...buyer, website: "http://spam" },
        message: "Hello there",
      },
    })
  ).json();
  expect(fake.ok).toBe(true);
  const real = await (
    await request.post("/api/inquiry", {
      data: { kind: "quick_inquiry", ...id, buyer, message: "Hello there" },
    })
  ).json();
  expect(real.ref).not.toBe(fake.ref);
});

test("sample kit returns ref, WhatsApp link and spec-sheet downloads; double submit is idempotent", async ({
  request,
}) => {
  const payload = {
    kind: "sample_kit",
    ...base(),
    items: [{ productId: "turmeric_powder", interest: "trial", docs: ["coa"] }],
    buyer,
    delivery: { incoterm: "FOB", region: "eu" },
    message: "",
  };
  const a = await (
    await request.post("/api/inquiry", { data: payload })
  ).json();
  expect(a.ok).toBe(true);
  expect(a.ref).toMatch(/^PO-\d{6}-[A-Z2-9]{4}$/);
  expect(a.whatsapp).toContain("wa.me/919586616746");
  expect(a.downloads[0].url).toBe("/downloads/spec-sheets/turmeric-powder.pdf");
  const b = await (
    await request.post("/api/inquiry", { data: payload })
  ).json();
  expect(b.ref).toBe(a.ref);
});
