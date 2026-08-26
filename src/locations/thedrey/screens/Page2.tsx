import type { ScreenProps } from "@/lib/resolveScreen";
import { HorizontalScreen } from "../template";
import { PAGE_CONFIG } from "../config";
import { stationsForPage } from "../helpers/thedrey";

export default function Page2({ data }: ScreenProps) {
  const config = PAGE_CONFIG["2"];
  if (!config) return null;

  const filteredData = {
    ...data,
    stationsWithRegions: stationsForPage(
      config.stations,
      data.stationsWithRegions,
    ),
  };

  return <HorizontalScreen data={filteredData} />;
}
