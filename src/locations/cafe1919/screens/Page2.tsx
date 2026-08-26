import type { ScreenProps } from "@/lib/resolveScreen";
import { HorizontalScreen } from "../template";
import { PAGE_CONFIG } from "../config";
import { filterRegionsWithPlaceholders } from "../helpers/cafe1919";

export default function Page2({ data }: ScreenProps) {
  const config = PAGE_CONFIG["2"];
  if (!config) return null;
  const filteredData = {
    ...data,
    stationsWithRegions: filterRegionsWithPlaceholders(
      config.regions,
      data.stationsWithRegions,
    ),
  };
  return <HorizontalScreen data={filteredData} />;
}
