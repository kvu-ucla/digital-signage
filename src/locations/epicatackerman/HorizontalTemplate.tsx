import type { MergedMenuData, LegendConfig } from "@/lib/types";
import { MenuItemList } from "@/menu/ModMenuList";
import { getStationItems } from "@/locations/epicatackerman/epicatackerman";
import { DIETARY_LABELS } from "@/lib/dietaryLabels";
import { DietaryIcon } from "@/menu/DietaryIcon";

type EpicAtAckermanTemplateProps = {
  data: MergedMenuData;
};

export default function HorizontalTemplate({ data }:   EpicAtAckermanTemplateProps) {
    if (data.stationsWithRegions.length === 0) {
        return (
            <div className="screen">
                <p>No station region data available.</p>
            </div>
        );
    }

    const regionMap = new Map<
    number,
    Array<{
      name: string;
      items: (typeof data.stationsWithRegions)[number]["items"];
      order: number;
    }>
  >();

    for (const station of data.stationsWithRegions) {
        const position = station.regionPosition;
        const order = station.regionOrder;

        if (!regionMap.has(position)) regionMap.set(position, []);

        regionMap.get(position)?.push({
        name: station.name,
        items: station.items,
        order,
        });
    }

    for (const [, stations] of regionMap) {
        stations.sort((a, b) => a.order - b.order);
    }

  const sortedRegions = [...regionMap.entries()].sort(([a], [b]) => a - b);

}

const legendColumn = ( config: LegendConfig ) => (
  <div
    className={`flex flex-col items-center ${config.className ?? ""}`}
    style={{  }}
  >
  </div>
);
