type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={alignment}>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-warm">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">{description}</p> : null}
    </div>
  );
}
