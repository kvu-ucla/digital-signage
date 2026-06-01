import type { MergedMenuData, LegendConfig } from "../../lib/types";
import { MenuItemList } from "../../menu/MenuItemList";
import { DietaryLegend } from "../../menu/DietaryLegend";
import { CyclingColumn } from "../helpers/CyclingColumns";

export type EntranceScreenProps = {
  data: MergedMenuData;
  font?: string;
  header?: React.ReactNode;
  bgColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  dottedLine?: string;
  legend_config: LegendConfig;
};

export const EntranceScreenTemplate = ({ 
  data, 
  font, 
  header, 
  bgColor, 
  primaryColor, 
  secondaryColor, 
  dottedLine, 
  legend_config 
}: EntranceScreenProps) => {
  console.log("Merged Menu Data:", data);
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
    <div className={`relative flex h-[1080px] w-[1920px] flex-col overflow-hidden bg-[${bgColor}] font-${font}`}>
      {header}
      <div
        className={`grid h-[100px] w-full border-b-[10px] border-[${secondaryColor}] bg-[${primaryColor}]`}
        style={{
          gridTemplateColumns: `repeat(${sortedRegions.length}, minmax(0, 1fr))`,
        }}
      >
        {sortedRegions.map(([position, stations], index) => (
          <div
            key={position}
            className={[
              "relative box-border flex h-full items-center justify-center px-[24px]",
              index !== sortedRegions.length - 1
                ? `after:absolute after:right-0 after:top-0 after:h-[706px] after:border-r-[4px] after:border-dotted after:border-[${dottedLine}] after:content-['']`
              : "",
            ].join(" ")}
          >
            <h2 className="pt-3 text-center text-[50px] font-extrabold capitalize leading-none text-white">
              {stations.map(({ name }) => name).join(" / ")}
            </h2>
          </div>
        ))}
      </div>

      <main
        className="grid w-full h-[606px] shrink-0"
        style={{
          gridTemplateColumns: `repeat(${sortedRegions.length}, minmax(0, 1fr))`,
        }}
      >
        {sortedRegions.map(([position, stations]) => (
          <section
            key={position}
          >
            {stations.map(({ name, items }) => {

              const itemNodes = items.map((item) => (
                  <MenuItemList key={item.recipeNumber} items={[item]} size="30px" gap="10px" />
                ));

              return (
                <div key={name} className="w-full 
                [&_h3]:pt-[20px]
                [&_h3]:text-[40px]
                [&_h3]:font-KlinicSlab
                [&_h3]:color-[#3c3c3c]"
                >
                  <CyclingColumn viewportHeight={606}>{itemNodes}</CyclingColumn>
                </div>
              );
            })}
            </section>
        ))}
      </main>

      <div className="absolute bottom-[20px] left-0 right-0 shrink-0">
        <div className="ml-auto mr-auto h-[3px] w-[95%]  bg-[#005989]" />
        <div className="mt-5 ml-auto mr-auto flex w-[85%] items-center justify-center">
          <DietaryLegend config={legend_config} />
        </div>
      </div>
    </div>
  );
};