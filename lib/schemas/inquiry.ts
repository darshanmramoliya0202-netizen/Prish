import { z } from "zod";

/** Shared by the form (react-hook-form resolver) and POST /api/inquiry. */

const regionId = z.enum(["us", "eu", "gcc", "sea"]);
const interest = z.enum(["sample", "trial", "commercial"]);
const doc = z.enum(["coa", "eto_free", "mrl_report", "spec_sheet"]);

export const kitItemSchema = z.object({
  productId: z.string().min(1).max(64),
  variant: z.string().max(60).optional(),
  grade: z.string().max(120).optional(),
  interest,
  specNotes: z.string().max(600).optional(),
  docs: z.array(doc).max(4).default([]),
});

export const buyerSchema = z.object({
  name: z.string().trim().min(2, "Your name, please").max(120),
  company: z.string().trim().min(2, "Company name").max(160),
  email: z.string().trim().email("A work email we can reply to").max(200),
  phone: z.string().trim().min(6, "Phone or WhatsApp with country code").max(40),
  country: z.string().trim().min(2, "Country").max(80),
  buyerType: z.string().max(40).optional(),
  /** honeypot — must be empty */
  website: z.string().max(0).optional(),
});

export const deliverySchema = z.object({
  region: regionId.optional(),
  incoterm: z.enum(["FOB", "CIF"]).default("FOB"),
  destination: z.string().trim().max(160).optional(),
  timeline: z.string().trim().max(120).optional(),
});

export const kitSubmissionSchema = z.object({
  kind: z.literal("sample_kit"),
  submissionId: z.string().min(8).max(64),
  startedAt: z.number().int().nonnegative(),
  page: z.string().max(200).optional(),
  region: regionId.optional(),
  items: z.array(kitItemSchema).min(1, "Add at least one product").max(27),
  buyer: buyerSchema,
  delivery: deliverySchema,
  message: z.string().trim().max(2000).optional().default(""),
  consent: z.literal(true, { message: "Please agree to the privacy note" }),
});

export const quickSubmissionSchema = z.object({
  kind: z.literal("quick_inquiry"),
  submissionId: z.string().min(8).max(64),
  startedAt: z.number().int().nonnegative(),
  page: z.string().max(200).optional(),
  region: regionId.optional(),
  buyer: buyerSchema,
  productInterest: z.string().trim().max(400).optional().default(""),
  message: z.string().trim().min(5, "Tell us a little more").max(2000),
  consent: z.literal(true, { message: "Please agree to the privacy note" }),
});

export const submissionSchema = z.discriminatedUnion("kind", [kitSubmissionSchema, quickSubmissionSchema]);

export type KitSubmission = z.infer<typeof kitSubmissionSchema>;
export type QuickSubmission = z.infer<typeof quickSubmissionSchema>;
export type Submission = z.infer<typeof submissionSchema>;
