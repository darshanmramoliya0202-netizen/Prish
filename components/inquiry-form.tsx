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
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.34em] text-copper/80">Structured inquiry</p>
          <h3 className="mt-4 font-serif text-4xl text-mist">Tell us what your supply brief looks like.</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/64">
            Share your market, product interest, and expected volume. The form is designed to route serious sourcing conversations more clearly than an email-only CTA.
          </p>
        </div>

        <div className={fieldGridClass}>
          <label className="space-y-2 text-sm text-mist/72">
            <span>Full name</span>
            <input value={form.name} onChange={(event) => updateField("name", event.target.value)} required className="h-12 w-full rounded-2xl border border-white/10 bg-ink/55 px-4 text-mist outline-none transition focus:border-copper/45" />
          </label>
          <label className="space-y-2 text-sm text-mist/72">
            <span>Company</span>
            <input value={form.company} onChange={(event) => updateField("company", event.target.value)} required className="h-12 w-full rounded-2xl border border-white/10 bg-ink/55 px-4 text-mist outline-none transition focus:border-copper/45" />
          </label>
          <label className="space-y-2 text-sm text-mist/72">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required className="h-12 w-full rounded-2xl border border-white/10 bg-ink/55 px-4 text-mist outline-none transition focus:border-copper/45" />
          </label>
          <label className="space-y-2 text-sm text-mist/72">
            <span>Phone / WhatsApp</span>
            <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="h-12 w-full rounded-2xl border border-white/10 bg-ink/55 px-4 text-mist outline-none transition focus:border-copper/45" />
          </label>
          <label className="space-y-2 text-sm text-mist/72">
            <span>Country</span>
            <input value={form.country} onChange={(event) => updateField("country", event.target.value)} required className="h-12 w-full rounded-2xl border border-white/10 bg-ink/55 px-4 text-mist outline-none transition focus:border-copper/45" />
          </label>
          <label className="space-y-2 text-sm text-mist/72">
            <span>Inquiry topic</span>
            <select value={form.inquiryType} onChange={(event) => updateField("inquiryType", event.target.value)} className="h-12 w-full rounded-2xl border border-white/10 bg-ink/55 px-4 text-mist outline-none transition focus:border-copper/45">
              {inquiryTopics.map((topic) => (
                <option key={topic} value={topic} className="bg-ink text-mist">
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
          <label className="space-y-2 text-sm text-mist/72">
            <span>Product interest</span>
            <input value={form.productInterest} onChange={(event) => updateField("productInterest", event.target.value)} placeholder="e.g. Jamun powder, turmeric powder, dehydrated onion" className="h-12 w-full rounded-2xl border border-white/10 bg-ink/55 px-4 text-mist outline-none transition placeholder:text-mist/30 focus:border-copper/45" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-mist/72">
              <span>Target market</span>
              <input value={form.targetMarket} onChange={(event) => updateField("targetMarket", event.target.value)} placeholder="e.g. EU, GCC, USA" className="h-12 w-full rounded-2xl border border-white/10 bg-ink/55 px-4 text-mist outline-none transition placeholder:text-mist/30 focus:border-copper/45" />
            </label>
            <label className="space-y-2 text-sm text-mist/72">
              <span>Expected monthly volume</span>
              <input value={form.monthlyVolume} onChange={(event) => updateField("monthlyVolume", event.target.value)} placeholder="e.g. 2 MT trial, 1 container monthly" className="h-12 w-full rounded-2xl border border-white/10 bg-ink/55 px-4 text-mist outline-none transition placeholder:text-mist/30 focus:border-copper/45" />
            </label>
          </div>
          <label className="space-y-2 text-sm text-mist/72">
            <span>Project details</span>
            <textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} required rows={isCompact ? 4 : 6} className="w-full rounded-[1.5rem] border border-white/10 bg-ink/55 px-4 py-4 text-mist outline-none transition focus:border-copper/45" />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center rounded-full bg-copper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-[#e0b885] disabled:cursor-not-allowed disabled:opacity-70">
            {status === "submitting" ? "Submitting inquiry..." : "Submit inquiry brief"}
          </button>
          {feedback ? (
            <p className={`text-sm ${status === "error" ? "text-[#ffb6a2]" : "text-[#9ce5c6]"}`}>{feedback}</p>
          ) : null}
        </div>
      </form>

      <div className="space-y-4">
        {responsePromises.map((promise) => (
          <div key={promise} className="rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-5 text-sm leading-7 text-mist/66">
            {promise}
          </div>
        ))}
        <div className="rounded-[1.8rem] border border-copper/20 bg-copper/10 p-6">
          <p className="text-xs uppercase tracking-[0.34em] text-copper">Useful for</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {inquiryTopics.map((topic) => (
              <span key={topic} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-mist/72">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
