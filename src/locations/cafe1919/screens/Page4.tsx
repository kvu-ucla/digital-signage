import type { ScreenProps } from "@/lib/resolveScreen";
import { VerticalScreen } from "../template";
import { PAGE_CONFIG } from "../config";

export default function Page4({ data }: ScreenProps) {
  const config = PAGE_CONFIG["4"];
  if (!config) return null;
  const filteredData = {
    ...data,
    stationsWithRegions: data.stationsWithRegions.filter(
      (s) => config.regions.includes(s.regionPosition)
    ),
  };
  return <VerticalScreen data={filteredData} />;
}


