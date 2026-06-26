import type { ScreenProps } from "@/lib/resolveScreen";
import { HorizontalScreen } from "../template";
import { PAGE_CONFIG } from "../config";

export default function Page2({ data }: ScreenProps) {
  const config = PAGE_CONFIG["2"];
  if (!config) return null;
  const filteredData = {
    ...data,
    stationsWithRegions: data.stationsWithRegions.filter(
      (s) => config.regions.includes(s.regionPosition)
    ),
  };
  return <HorizontalScreen data={filteredData} />;
}


