"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { quickSubmissionSchema } from "@/lib/schemas/inquiry";
import { useRegionStore } from "@/stores/region";
import { track } from "@/lib/analytics";
import { Field, Input, Textarea } from "./fields";
import { Button } from "@/components/ui/primitives";
import { IconArrow, IconWhatsApp } from "@/components/ui/icons";

const formSchema = quickSubmissionSchema.omit({
  kind: true,
  submissionId: true,
  startedAt: true,
  page: true,
  region: true,
});
type FormInput = z.input<typeof formSchema>;
type FormValues = z.output<typeof formSchema>;

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function QuickForm() {
  const region = useRegionStore((s) => s.region);
  const [meta] = useState(() => ({
    submissionId: newId(),
    startedAt: Date.now(),
  }));
  const [result, setResult] = useState<{
    ref: string;
    whatsapp: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyer: { name: "", company: "", email: "", phone: "", country: "" },
      productInterest: "",
      message: "",
    },
  });

  async function onSubmit(v: FormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "quick_inquiry",
          ...meta,
          page: window.location.pathname,
          region: region ?? undefined,
          ...v,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        ref?: string;
        whatsapp?: string;
      };
      if (!res.ok || !data.ok) {
        setServerError(
          data.error ??
            "Something went wrong. Please try again or WhatsApp us.",
        );
        return;
      }
      setResult({ ref: data.ref!, whatsapp: data.whatsapp! });
      track("quick_inquiry_submit");
    } catch {
      setServerError(
        "We couldn't reach the server. Please try again or WhatsApp us.",
      );
    }
  }

  if (result) {
    return (
      <div className="rounded-xl border border-ok/30 bg-cream-50 p-8">
        <p className="eyebrow text-ok">Received · {result.ref}</p>
        <h3 className="mt-3 text-display-md">
          Dhanyavaad. We&apos;ll reply by email.
        </h3>
        <a
          href={result.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-[#062a16]"
          data-umami-event="whatsapp_click"
          data-umami-event-placement="quick_success"
        >
          <IconWhatsApp /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label="Your name" id="q-name" error={errors.buyer?.name?.message}>
        <Input
          id="q-name"
          autoComplete="name"
          {...register("buyer.name")}
          error={errors.buyer?.name?.message}
        />
      </Field>
      <Field
        label="Company"
        id="q-company"
        error={errors.buyer?.company?.message}
      >
        <Input
          id="q-company"
          autoComplete="organization"
          {...register("buyer.company")}
          error={errors.buyer?.company?.message}
        />
      </Field>
      <Field
        label="Work email"
        id="q-email"
        error={errors.buyer?.email?.message}
      >
        <Input
          id="q-email"
          type="email"
          autoComplete="email"
          {...register("buyer.email")}
          error={errors.buyer?.email?.message}
        />
      </Field>
      <Field
        label="Phone / WhatsApp"
        id="q-phone"
        error={errors.buyer?.phone?.message}
      >
        <Input
          id="q-phone"
          type="tel"
          autoComplete="tel"
          {...register("buyer.phone")}
          error={errors.buyer?.phone?.message}
        />
      </Field>
      <Field
        label="Country"
        id="q-country"
        error={errors.buyer?.country?.message}
      >
        <Input
          id="q-country"
          autoComplete="country-name"
          {...register("buyer.country")}
          error={errors.buyer?.country?.message}
        />
      </Field>
      <Field
        label="Products you're interested in"
        id="q-products"
        hint="Optional"
      >
        <Input
          id="q-products"
          {...register("productInterest")}
          placeholder="e.g. turmeric powder, onion flakes"
        />
      </Field>
      <div className="hidden" aria-hidden>
        <label htmlFor="q-website">Website</label>
        <input
          id="q-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("buyer.website")}
        />
      </div>
      <div className="sm:col-span-2">
        <Field
          label="Your question"
          id="q-message"
          error={errors.message?.message}
        >
          <Textarea
            id="q-message"
            {...register("message")}
            error={errors.message?.message}
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-small text-ink-700">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 size-4 accent-forest-900"
          />
          <span>
            I agree that Prish Overseas keeps these details to answer my
            request, as described in the{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              privacy note
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-1.5 text-small text-danger">
            {errors.consent.message}
          </p>
        ) : null}
        {serverError ? (
          <p className="mt-2 text-small text-danger" role="alert">
            {serverError}
          </p>
        ) : null}
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send question"} <IconArrow />
        </Button>
      </div>
    </form>
  );
}
