import type { ReactElement } from "react";
import { LegendFooter } from "./LegendFooter";
import type { UpcomingBowl } from "../hooks/useUpcomingBowls";
import icon from "@/images/Rendezvous Logo - East White.svg";

type UpcomingBowlsTemplateProps = {
  bowls: ReadonlyArray<UpcomingBowl>;
};

/** "09/15/2025" -> "Monday, September 15, 2025". Local-date parse only —
 *  new Date("MM/DD/YYYY") string parsing can shift a day across timezones. */
const formatServeDate = (serveDate: string): string => {
  const [m, d, y] = serveDate.split("/").map(Number);
  if (!m || !d || !y) return serveDate;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function UpcomingBowlsTemplate({
  bowls,
}: UpcomingBowlsTemplateProps): ReactElement {
  // Mock shows 4 left / 3 right; ceil generalizes when days are missing.
  const splitAt = Math.ceil(bowls.length / 2);
  const columns = [bowls.slice(0, splitAt), bowls.slice(splitAt)];

  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div
        className="relative h-[1080px] w-[1920px] overflow-hidden bg-[#F9E9D0]"
        style={
          {
            fontFamily: "Tablet Gothic Condensed Bold",
            "--font-display": '"Tablet Gothic Condensed Bold"',
          } as React.CSSProperties
        }
      >
        <header className="absolute inset-x-0 top-0 flex h-[177px] items-center justify-between bg-[#98002e] px-[50px]">
          <h1 className="text-[85px] uppercase text-white pt-[24px]">
            Upcoming Weekly Freestyle Bowls
          </h1>
          <img src={icon} alt="Rendezvous East Logo" className="h-[80px]" />
        </header>

        <main className="absolute bottom-[95px] left-[160px] right-[160px] top-[177px]">
          {bowls.length === 0 ? (
            <div
              data-testid="bowls-empty"
              className="flex h-full items-center justify-center"
            >
              <p className="m-0 text-center text-[80px] font-normal leading-none text-[#3c3c3c]">
                Check back soon for this week&apos;s bowls
              </p>
            </div>
          ) : (
            <div className="grid h-full grid-cols-2 items-start gap-x-[120px] pt-[70px]">
              {columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  data-testid="bowl-column"
                  className="flex flex-col gap-[64px]"
                >
                  {column.map((bowl) => (
                    <div key={`${bowl.serveDate}-${bowl.name}`}>
                      <h2 className="m-0 text-[72px] font-bold leading-none text-[#98002e]">
                        {bowl.name}
                      </h2>
                      <p className="m-0 pt-[10px] text-[48px] font-normal leading-none text-[#1a1a1a]">
                        {formatServeDate(bowl.serveDate)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </main>

        <LegendFooter />
      </div>
    </div>
  );
}
