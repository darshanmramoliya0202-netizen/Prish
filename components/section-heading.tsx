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
      <p className="text-xs uppercase tracking-[0.35em] text-saffron">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl text-[#0f172a] sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">{description}</p> : null}
    </div>
  );
}
