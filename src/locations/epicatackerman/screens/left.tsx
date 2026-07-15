import type { MergedMenuData } from "@/lib/types";
import { PAGE_CONFIG } from "../config";
import HorizontalTemplate from "@/locations/epicatackerman/HorizontalTemplate";
import { filterRegionsWithPlaceholders } from "../epicatackerman";

export default function LeftScreen({ data }: { data: MergedMenuData }) {
    
    const config = PAGE_CONFIG["left"];
    if (!config) return null;

    const filteredData = {
        ...data,
        stationsWithRegions: filterRegionsWithPlaceholders(
          config.regions,
          data.stationsWithRegions,
        ),
      }; // 
    
    return (
        <HorizontalTemplate data={filteredData} />
    );
}
