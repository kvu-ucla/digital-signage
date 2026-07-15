import type { ScreenProps } from "@/lib/resolveScreen";
import { HorizontalScreen } from "../template";
import { PAGE_CONFIG } from "../config";
import { filterRegionsWithPlaceholders } from "../epicatackerman";

export default function Right({ data }: ScreenProps) {
  const config = PAGE_CONFIG["right"];
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
