import type { GradeRow, SpecRow } from "@/content/types";
import { specsDisclaimer } from "@/content/copy";

export function SpecTable({ specs, caption = "Typical specifications" }: { specs: SpecRow[]; caption?: string }) {
  return (
    <figure>
      <table className="w-full border-collapse text-body">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {specs.map((s) => (
            <tr key={s.label} className="border-t border-current/15">
              <th scope="row" className="py-3 pr-4 text-left font-semibold opacity-80 align-top w-[38%]">
                {s.label}
              </th>
              <td className="py-3 tabular">
                {s.value}
                {s.note ? <span className="block text-small opacity-60">{s.note}</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-3 text-small opacity-60">{specsDisclaimer}</figcaption>
    </figure>
  );
}

export function GradeTable({ rows, title = "Grade ranges" }: { rows: GradeRow[]; title?: string }) {
  return (
    <figure>
      <table className="w-full border-collapse text-body">
        <caption className="pb-3 text-left eyebrow opacity-60">{title}</caption>
        <thead>
          <tr className="border-b border-current/25 text-left text-small opacity-70">
            <th className="py-2 pr-4 font-semibold">Parameter</th>
            <th className="py-2 font-semibold">Range</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.parameter} className="border-t border-current/15">
              <th scope="row" className="py-3 pr-4 text-left font-semibold opacity-80 w-[38%]">
                {r.parameter}
              </th>
              <td className="py-3 tabular">{r.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-3 text-small opacity-60">Ranges across grades and origins. Quoted per lot.</figcaption>
    </figure>
  );
}
