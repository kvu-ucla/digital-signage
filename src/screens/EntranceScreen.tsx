import type { MergedMenuData } from "../lib/mergeData";
import { MenuItemList } from "../menu/MenuItemList";
import "./EntranceScreen.css";
import { CyclingColumn } from "./CyclingColumns";

type EntranceScreenProps = {
  data: MergedMenuData;
};

export const EntranceScreen = ({ data }: EntranceScreenProps) => {
  if (data.stationsWithRegions.length === 0) {
    return (
      <div className="screen">
        <p>No station region data available.</p>
      </div>
    );
  }

  const regionMap = new Map<number, Array<{ name: string; items: typeof data.stationsWithRegions[number]["items"]; order: number }>>();

  for (const station of data.stationsWithRegions) {
    const position = station.regionPosition;
    const order = station.regionOrder;
    if (!regionMap.has(position)) regionMap.set(position, []);
    regionMap.get(position)?.push({ name: station.name, items: station.items, order });
  }

  for (const [, stations] of regionMap) {
    stations.sort((a, b) => a.order - b.order);
  }

  const sortedRegions = [...regionMap.entries()].sort(([a], [b]) => a - b);

  return (
    <div className="screen-entrance">
      <header className="screen-entrance__header">
        <div className="screen-entrance__header-logo">
          <img src="./images/bruin-plate-logo.svg" alt="Bruin Plate" />
        </div>
        <h1 className="screen-entrance__header-title">Bruin Plate</h1>
        <div className="screen-entrance__header-certificate">
          <div className="screen-entrance__header-certificate-placeholder" />
        </div>
      </header>
      <div className="screen-entrance__body">
        <div className="screen-entrance__columns">
          {sortedRegions.map(([position, stations]) => (
            <div key={position} className="screen-entrance__column">
              {stations.map(({ name, items }) => {
                const itemNodes = items.map((item) => (
                  <MenuItemList key={item.recipeNumber} items={[item]} />
                ));

                return (
                  <div key={name}>
                    <h2 className="screen-entrance__column-header">{name}</h2>
                    <CyclingColumn viewportHeight={400}>{itemNodes}</CyclingColumn> {/* will probably have to modify this to be responsive later*/}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};