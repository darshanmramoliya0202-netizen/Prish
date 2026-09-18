import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { DesiName } from "@/content/types";

/* ───────────────────────── Buttons ───────────────────────── */

type Variant = "primary" | "secondary" | "ghost" | "gold" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold whitespace-nowrap transition-[transform,background-color,color,box-shadow] duration-2 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-3 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-forest-900 text-cream-50 hover:bg-forest-800 dark:bg-cream-50 dark:text-forest-950 dark:hover:bg-cream-100",
  secondary: "border border-current/40 hover:border-current bg-transparent",
  ghost: "bg-transparent hover:bg-current/10",
  gold: "bg-gold-500 text-ink-900 hover:bg-gold-400",
  whatsapp: "bg-[#25D366] text-[#062a16] hover:bg-[#3ddc79]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-6 text-body",
  lg: "h-13 px-8 text-lead",
};

type ButtonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function Button({ variant = "primary", size = "md", className = "", children, ...rest }: ButtonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({ variant = "primary", size = "md", className = "", children, href, external, ...rest }: ButtonProps & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "className" | "children" | "href">) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/* ───────────────────────── Text bits ─────────────────────── */

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow opacity-70 ${className}`}>{children}</p>;
}

/** A Devanagari/Gujarati accent word with romanisation and translation, always with lang. */
export function Accent({
  accent,
  translation,
  size = "md",
  className = "",
  align = "left",
}: {
  accent: DesiName;
  translation?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  align?: "left" | "center";
}) {
  const sizeCls = { sm: "text-display-md", md: "text-display-lg", lg: "text-display-xl", xl: "text-display-2xl" }[size];
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <span lang={accent.lang} className={`${accent.script === "deva" ? "font-deva" : "font-gujr"} ${sizeCls} block leading-[1.1]`}>
        {accent.text}
      </span>
      <span className="eyebrow mt-2 block opacity-70">
        {accent.roman}
        {translation ? <span className="normal-case tracking-normal font-normal opacity-80"> · {translation}</span> : null}
      </span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <Tag className={Tag === "h1" ? "text-display-xl" : "text-display-lg"}>{title}</Tag>
      {sub ? <p className="mt-5 text-lead opacity-80">{sub}</p> : null}
    </div>
  );
}

export function Pill({ children, className = "", tone = "neutral" }: { children: ReactNode; className?: string; tone?: "neutral" | "gold" | "ok" | "muted" }) {
  const tones = {
    neutral: "border-current/30",
    gold: "border-gold-500 text-gold-600 dark:text-gold-400",
    ok: "border-ok text-ok",
    muted: "border-current/15 opacity-70",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-small font-medium ${tones[tone]} ${className}`}>{children}</span>;
}

/** Full-width section with theme + gutters. */
export function Section({
  theme = "light",
  className = "",
  children,
  id,
  style,
  as: Tag = "section",
}: {
  theme?: "light" | "dark" | "world";
  className?: string;
  children: ReactNode;
  id?: string;
  style?: React.CSSProperties;
  as?: "section" | "div" | "header" | "footer";
}) {
  return (
    <Tag id={id} data-theme={theme} className={`relative py-section ${className}`} style={style}>
      {children}
    </Tag>
  );
}
