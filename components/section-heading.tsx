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
      <p className="text-xs uppercase tracking-[0.35em] text-copper/80">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl text-mist sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/64">{description}</p> : null}
    </div>
  );
}
