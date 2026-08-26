import type { ScreenProps } from "@/lib/resolveScreen";
import { VerticalScreen } from "../template";
import { PAGE_CONFIG } from "../config";
import { filterRegionsWithPlaceholders } from "../helpers/cafe1919";

export default function Page4({ data }: ScreenProps) {
  const config = PAGE_CONFIG["4"];
  if (!config) return null;
  const filteredData = {
    ...data,
    stationsWithRegions: filterRegionsWithPlaceholders(
      config.regions,
      data.stationsWithRegions,
    ),
  };
  return <VerticalScreen data={filteredData} />;
}
