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
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-saffron">{eyebrow}</p>
      <h2 className="mt-4 font-sans text-3xl font-bold text-[#0f172a] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
