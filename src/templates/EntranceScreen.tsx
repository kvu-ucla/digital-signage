import type { ReactNode } from "react";
import type { MergedMenuData, LegendConfig } from "@/lib/types";
import { MenuItemList } from "@/menu/MenuItemList";
import { DietaryLegend } from "@/menu/DietaryLegend";
import { CyclingColumn } from "@/components/CyclingColumns";
import { getDisplayMode } from "@/lib/queryParams";
import { groupByRegion } from "@/lib/regions";
import "./EntranceScreen.css";

export type EntranceScreenProps = {
  data: MergedMenuData;
  legendConfig: LegendConfig;
  header?: ReactNode;
};

export const EntranceScreen = ({
  data,
  legendConfig,
  header,
}: EntranceScreenProps) => {
  const { isMinimal } = getDisplayMode();
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
        className={`screen-entrance__bar${isMinimal ? " invisible" : ""}`}
        style={{
          gridTemplateColumns: `repeat(${sortedRegions.length}, minmax(0, 1fr))`,
        }}
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
        style={{
          gridTemplateColumns: `repeat(${sortedRegions.length}, minmax(0, 1fr))`,
        }}
      >
        {sortedRegions.map(([position, stations]) => {
          // Combine all items from all stations in this region/column
          const allItemNodes = stations.flatMap(({ items }) =>
            items.map((item) => (
              <MenuItemList
                key={item.recipeNumber}
                items={[item]}
                iconSize="30px"
                gap="10px"
                className="items-center text-center"
              />
            ))
          );

          return (
            <section key={position} className="screen-entrance__region">
              <div className="screen-entrance__items">
                <CyclingColumn>{allItemNodes}</CyclingColumn>
              </div>
            </section>
          );
        })}
      </main>

      <div className="screen-entrance__footer">
        <div className="screen-entrance__footer-rule" />
        <div className="screen-entrance__footer-legend">
          <DietaryLegend config={legendConfig} />
        </div>
      </div>
    </div>
  );
};
