import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

type BrandButtonProps = {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
};

const variantClasses: Record<Variant, string> = {
  primary:   "bg-gold text-leaf-dark border-transparent hover:bg-gold-light",
  secondary: "bg-leaf-dark text-parchment border-transparent hover:bg-spice-dark",
  outline:   "bg-transparent text-leaf-dark border-leaf-dark hover:bg-leaf-dark hover:text-parchment",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-50";

export default function BrandButton({
  variant = "secondary",
  href,
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
  target,
  rel,
}: BrandButtonProps) {
  const cls = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
