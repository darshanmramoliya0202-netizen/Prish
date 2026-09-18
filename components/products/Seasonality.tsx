import { MONTHS, statusLabel } from "@/content/crop-calendar";
import type { CropCalendarRow, MonthStatus } from "@/content/types";
import { calendarDisclaimer } from "@/content/copy";

const tone: Record<MonthStatus, string> = {
  harvest: "bg-gold-500",
  processing: "bg-forest-500",
  stock: "bg-current/25",
  lean: "bg-current/8",
};

/** 12-month strip; the current month is outlined on the client via CSS var set by <CurrentMonth/>. */
export function Seasonality({
  row,
  compact = false,
}: {
  row: CropCalendarRow;
  compact?: boolean;
}) {
  return (
    <div>
      <ol className="grid grid-cols-12 gap-1" aria-label="Seasonality by month">
        {row.months.map((m, i) => (
          <li key={i} className="text-center" data-month={i}>
            <div
              className={`h-3 rounded-sm ${tone[m]}`}
              title={`${MONTHS[i]}: ${statusLabel[m]}`}
            />
            {!compact ? (
              <span className="mt-1 block text-[11px] opacity-60">
                {MONTHS[i]}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {!compact ? (
        <>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-small opacity-70">
            {(Object.keys(statusLabel) as MonthStatus[]).map((k) => (
              <li key={k} className="inline-flex items-center gap-2">
                <span
                  className={`inline-block h-2.5 w-4 rounded-sm ${tone[k]}`}
                  aria-hidden
                />{" "}
                {statusLabel[k]}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-small opacity-70">{row.note}</p>
          <p className="mt-1 text-small opacity-80">{calendarDisclaimer}</p>
        </>
      ) : null}
    </div>
  );
}
