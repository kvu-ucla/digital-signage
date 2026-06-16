import type { ReactNode } from "react";
import type { MergedMenuData, LegendConfig, StationWithRegion } from "@/lib/types";
import { MenuItemList } from "@/menu/MenuItemList";
import { DietaryLegend } from "@/menu/DietaryLegend";
import { CyclingColumn } from "@/components/CyclingColumns";
import "./EntranceScreen.css";

export type EntranceScreenProps = {
  data: MergedMenuData;
  legendConfig: LegendConfig;
  header?: ReactNode;
};

export const EntranceScreen = ({ data, legendConfig, header }: EntranceScreenProps) => {
  const isMinimal = new URLSearchParams(window.location.search).get('minimal') === 'true'

  if (data.stationsWithRegions.length === 0) {
    return (
      <div className="screen">
        <p>No station region data available.</p>
      </div>
    );
  }

  const sortedRegions = groupByRegion(data.stationsWithRegions);

  return (
    <div className="screen-entrance">
      {header}

      <div
        className={`screen-entrance__bar${isMinimal ? ' invisible' : ''}`}
        style={{ gridTemplateColumns: `repeat(${sortedRegions.length}, minmax(0, 1fr))` }}
      >
        {sortedRegions.map(([position, stations], index) => (
          <div
            key={position}
            className={`screen-entrance__bar-cell${index !== sortedRegions.length - 1 ? " screen-entrance__bar-cell--divider" : ""}`}
          >
            <h2 className="screen-entrance__bar-title">
              {stations.map(({ name }) => name).join(" / ")}
            </h2>
          </div>
        ))}
      </div>

      <main
        className="screen-entrance__main"
        style={{ gridTemplateColumns: `repeat(${sortedRegions.length}, minmax(0, 1fr))` }}
      >
        {sortedRegions.map(([position, stations]) => (
          <section key={position} className="screen-entrance__region">
            {stations.map(({ name, items }) => {
              const itemNodes = items.map((item) => (
                <MenuItemList key={item.recipeNumber} items={[item]} iconSize="30px" gap="10px" className="items-center text-center" />
              ));
              return (
                <div key={name} className="screen-entrance__items">
                  <CyclingColumn>{itemNodes}</CyclingColumn>
                </div>
              );
            })}
          </section>
        ))}
      </main>

      <div className={`screen-entrance__footer${isMinimal ? ' invisible' : ''}`}>
        <div className="screen-entrance__footer-rule" />
        <div className="screen-entrance__footer-legend">
          <DietaryLegend config={legendConfig} />
        </div>
      </div>
    </div>
  );
};

type RegionStation = {
  name: string;
  items: StationWithRegion['items'];
  order: number;
};

function groupByRegion(stations: MergedMenuData['stationsWithRegions']): Array<[number, Array<RegionStation>]> {
  const map = new Map<number, Array<RegionStation>>();

  for (const { regionPosition, regionOrder, name, items } of stations) {
    if (!map.has(regionPosition)) map.set(regionPosition, []);
    map.get(regionPosition)?.push({ name, items, order: regionOrder });
  }

  for (const group of map.values()) {
    group.sort((a, b) => a.order - b.order);
  }

  return [...map.entries()].sort(([a], [b]) => a - b);
}
