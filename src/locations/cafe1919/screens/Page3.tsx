import type { ScreenProps } from "@/lib/resolveScreen";
import { HorizontalScreen } from "../template";
import { PAGE_CONFIG } from "../config";
import { filterRegionsWithPlaceholders } from "../helpers/cafe1919";
import { isMockMode, mockItems } from "@/lib/mockMode";

export default function Page3({ data }: ScreenProps) {
  const config = PAGE_CONFIG["3"];
  if (!config) return null;

  const filteredData = {
    ...data,
    stationsWithRegions: filterRegionsWithPlaceholders(
      config.regions,
      data.stationsWithRegions,
    ),
  };

  const finalData = isMockMode()
    ? {
        ...filteredData,
        stationsWithRegions: filteredData.stationsWithRegions.map((s) =>
          s.items.length === 0
            ? {
                ...s,
                name: s.name || `Mock Station ${s.regionPosition}`,
                items: mockItems(),
              }
            : s,
        ),
      }
    : filteredData;

  return <HorizontalScreen data={finalData} />;
}
