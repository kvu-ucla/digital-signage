import type { ScreenProps } from "@/lib/resolveScreen";
import { HorizontalScreen } from "../template";
import { PAGE_CONFIG } from "../config";
import { filterRegionsWithPlaceholders } from "../epicatackerman";

export default function Center({ data }: ScreenProps) {
  const config = PAGE_CONFIG["center"];
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
