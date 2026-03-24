"use client";

import { FormEvent, useMemo, useState } from "react";
import { inquiryTopics, responsePromises } from "@/data/content";

type InquiryFormState = {
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
  website: string;
};

const initialState: InquiryFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  inquiryType: inquiryTopics[0],
  targetMarket: "",
  productInterest: "",
  monthlyVolume: "",
  message: "",
  website: ""
};

type InquiryFormProps = {
  mode?: "default" | "compact";
};

export default function InquiryForm({ mode = "default" }: InquiryFormProps) {
  const [form, setForm] = useState<InquiryFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const isCompact = mode === "compact";

  const fieldGridClass = useMemo(() => {
    return isCompact ? "grid gap-4 md:grid-cols-2" : "grid gap-4 sm:grid-cols-2";
  }, [isCompact]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to submit inquiry right now.");
      }

      setStatus("success");
      setFeedback(payload.message || "Inquiry submitted successfully.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  function updateField<K extends keyof InquiryFormState>(key: K, value: InquiryFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-wheat/25 bg-white/80 p-6 shadow-card-light backdrop-blur-sm sm:p-8">
        <div className="mb-8 sm:mb-9">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-warm">Structured inquiry</p>
          <h3 className="mt-4 font-serif text-3xl text-ink">Tell us what your supply brief looks like.</h3>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
            Share your market, product interest, and expected volume. The form is designed to route serious sourcing conversations more clearly than an email-only CTA.
          </p>
        </div>

        <div className={fieldGridClass}>
          <label className="space-y-2 text-sm text-ink-soft">
            <span>Full name</span>
            <input value={form.name} onChange={(event) => updateField("name", event.target.value)} required className="h-12 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-ink outline-none transition placeholder:text-ink-soft focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15" />
          </label>
          <label className="space-y-2 text-sm text-ink-soft">
            <span>Company</span>
            <input value={form.company} onChange={(event) => updateField("company", event.target.value)} required className="h-12 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-ink outline-none transition placeholder:text-ink-soft focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15" />
          </label>
          <label className="space-y-2 text-sm text-ink-soft">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required className="h-12 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-ink outline-none transition placeholder:text-ink-soft focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15" />
          </label>
          <label className="space-y-2 text-sm text-ink-soft">
            <span>Phone / WhatsApp</span>
            <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="h-12 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-ink outline-none transition placeholder:text-ink-soft focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15" />
          </label>
          <label className="space-y-2 text-sm text-ink-soft">
            <span>Country</span>
            <input value={form.country} onChange={(event) => updateField("country", event.target.value)} required className="h-12 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-ink outline-none transition placeholder:text-ink-soft focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15" />
          </label>
          <label className="space-y-2 text-sm text-ink-soft">
            <span>Inquiry topic</span>
            <select value={form.inquiryType} onChange={(event) => updateField("inquiryType", event.target.value)} className="h-12 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-ink outline-none transition focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15">
              {inquiryTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4">
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => updateField("website", event.target.value)}
            className="hidden"
            aria-hidden="true"
          />
          <label className="space-y-2 text-sm text-ink-soft">
            <span>Product interest</span>
            <input value={form.productInterest} onChange={(event) => updateField("productInterest", event.target.value)} placeholder="e.g. Jamun powder, turmeric powder, dehydrated onion" className="h-12 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-ink outline-none transition placeholder:text-ink-soft focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-ink-soft">
              <span>Target market</span>
              <input value={form.targetMarket} onChange={(event) => updateField("targetMarket", event.target.value)} placeholder="e.g. EU, GCC, USA" className="h-12 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-ink outline-none transition placeholder:text-ink-soft focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15" />
            </label>
            <label className="space-y-2 text-sm text-ink-soft">
              <span>Expected monthly volume</span>
              <input value={form.monthlyVolume} onChange={(event) => updateField("monthlyVolume", event.target.value)} placeholder="e.g. 2 MT trial, 1 container monthly" className="h-12 w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 text-ink outline-none transition placeholder:text-ink-soft focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15" />
            </label>
          </div>
          <label className="space-y-2 text-sm text-ink-soft">
            <span>Project details</span>
            <textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} required rows={isCompact ? 4 : 6} className="w-full rounded-xl border border-wheat/25 bg-parchment/35 px-4 py-4 text-ink outline-none transition placeholder:text-ink-soft focus:border-gold-warm focus:ring-2 focus:ring-gold-warm/15" />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center rounded-full bg-leaf-dark px-6 py-3 text-sm font-semibold text-parchment transition duration-300 hover:bg-soil hover:shadow-[0_8px_24px_rgba(44,26,14,0.18)] disabled:cursor-not-allowed disabled:opacity-70">
            {status === "submitting" ? "Submitting inquiry..." : "Submit inquiry brief"}
          </button>
          {feedback ? (
            <p className={`text-sm ${status === "error" ? "text-red-600" : "text-emerald-700"}`}>{feedback}</p>
          ) : null}
        </div>
      </form>

      <div className="space-y-4">
        {responsePromises.map((promise) => (
          <div key={promise} className="rounded-2xl border border-wheat/25 bg-white/75 p-5 text-sm leading-7 text-ink-soft shadow-card-light">
            {promise}
          </div>
        ))}
        <div className="rounded-2xl border border-wheat/25 bg-parchment/35 p-6">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-warm">Useful for</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {inquiryTopics.map((topic) => (
              <span key={topic} className="rounded-full border border-wheat/20 bg-white/80 px-3 py-2 text-xs uppercase tracking-[0.18em] text-ink-soft">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
