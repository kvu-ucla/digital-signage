import type { ReactElement } from "react";
import { getStationItems, formatScreenTitle } from "../helpers/rendezvous";
import { FeaturedItem } from "@/menu/FeaturedItem";
import { DietaryLegend } from "@/menu/DietaryLegend";
import type { MergedMenuData } from "@/lib/types";
import { LEGEND_CONFIG } from "../config";
import icon from '@/images/Rendezvous Logo - East White.svg'

type FeatureScreenProps = {
  data: MergedMenuData;
  station: string;
  stationName?: string;
  title?: string;
};

export default function FeatureScreen({
  data,
  station,
  stationName = "ASIAN DAILY SPECIAL",
  title: titleOverride,
}: FeatureScreenProps): ReactElement {
  const displayTitle =
    titleOverride ??
    getStationItems(data, stationName)[0]?.name ??
    formatScreenTitle(station);

  const featuredItem = getStationItems(data, stationName)[0] ?? null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
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
            {displayTitle}
          </h1>
          <img
            src={icon}
            alt="Rendezvous East Logo"
            className="h-[80px]"
          />
        </header>

        <main className="absolute bottom-[95px] left-[250px] right-[250px] top-[177px] flex items-center justify-center">
          {featuredItem ? (
            <FeaturedItem item={featuredItem} />
          ) : (
            <p className="text-[80px] text-[#3c3c3c] font-normal text-center m-0 leading-none [font-family:var(--font-display)]">
              No items available
            </p>
          )}
        </main>

        <div className="absolute bottom-[20px] left-0 right-0 shrink-0">
          <div className="ml-auto mr-auto mt-1 flex w-[85%] items-center justify-center">
            <DietaryLegend config={LEGEND_CONFIG} />
          </div>
        </div>
      </div>
    </div>
  );
}