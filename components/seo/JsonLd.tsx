export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON-LD is data, not markup; escape "<" to be safe inside <script>
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\u003c") }}
        />
      ))}
    </>
  );
}
