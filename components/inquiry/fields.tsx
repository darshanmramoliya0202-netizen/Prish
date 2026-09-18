"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const base = "w-full rounded-md border bg-cream-50 px-4 py-3 text-body text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-forest-900 focus:ring-2 focus:ring-forest-900/20";

export function Field({ label, error, hint, children, id }: { label: string; error?: string; hint?: string; children: React.ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-small font-semibold text-ink-700">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-small text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-small text-ink-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ error, className = "", ...rest }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return <input {...rest} aria-invalid={!!error || undefined} aria-describedby={error && rest.id ? `${rest.id}-error` : undefined} className={`${base} ${error ? "border-danger" : "border-ink-900/20"} ${className}`} />;
}

export function Textarea({ error, className = "", ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return <textarea {...rest} aria-invalid={!!error || undefined} aria-describedby={error && rest.id ? `${rest.id}-error` : undefined} className={`${base} min-h-28 ${error ? "border-danger" : "border-ink-900/20"} ${className}`} />;
}

export function Select({ error, className = "", children, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    <select {...rest} aria-invalid={!!error || undefined} className={`${base} ${error ? "border-danger" : "border-ink-900/20"} ${className}`}>
      {children}
    </select>
  );
}

export function Chip({ on, onClick, children, id }: { on: boolean; onClick: () => void; children: React.ReactNode; id?: string }) {
  return (
    <button type="button" id={id} onClick={onClick} aria-pressed={on} className={`rounded-full border px-3.5 py-1.5 text-small font-semibold transition-colors ${on ? "border-forest-900 bg-forest-900 text-cream-50" : "border-ink-900/20 hover:border-ink-900"}`}>
      {children}
    </button>
  );
}
