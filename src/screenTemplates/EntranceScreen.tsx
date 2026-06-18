import type { MergedMenuData, LegendConfig, MenuItemConfig } from "../lib/types";
import { MenuItemList } from "../menu/MenuItemList";
import { DietaryLegend } from "../menu/DietaryLegend";
import { CyclingColumn } from "../components/CyclingColumns";

export type EntranceScreenProps = {
  data: MergedMenuData;
  font?: string;
  header?: React.ReactNode;
  bgColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  dottedLine?: string;
  legendConfig: LegendConfig;
  menuItemConfig: MenuItemConfig;
};

export const EntranceScreen = ({ 
  data, 
  font, 
  header, 
  bgColor, 
  primaryColor, 
  secondaryColor, 
  dottedLine, 
  legendConfig, 
  menuItemConfig,
}: EntranceScreenProps) => {
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
  <div
    className="flex min-h-screen items-center justify-center"
    style={{ backgroundColor: bgColor ?? "#f8f4e8" }}
  >
    <div
      className="relative flex h-[1080px] w-[1920px] flex-col overflow-hidden"
      style={
        {
          backgroundColor: bgColor ?? "#f8f4e8",
          fontFamily: font ?? undefined,
          "--primary-color": primaryColor ?? "#005989",
          "--secondary-color": secondaryColor ?? "#d69b2d",
          "--dotted-line": dottedLine ?? "#222222",
        } as React.CSSProperties
      }
    >
      {header}

      <div
        className="grid h-[100px] w-full border-b-[10px] border-[var(--secondary-color)] bg-[var(--primary-color)]"
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
                ? "after:absolute after:right-0 after:top-0 after:h-[706px] after:border-r-[4px] after:border-dotted after:border-[var(--dotted-line)] after:content-['']"
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
        className="grid h-[606px] w-full shrink-0"
        style={{
          gridTemplateColumns: `repeat(${sortedRegions.length}, minmax(0, 1fr))`,
        }}
      >
        {sortedRegions.map(([position, stations]) => (
          <section key={position}>
            {stations.map(({ name, items }) => {
              const itemNodes = items.map((item) => (
                <MenuItemList
                  key={item.recipeNumber}
                  items={[item]}
                  size="30px"
                  menuItemConfig={menuItemConfig}
                />
              ));

              return (
                <div
                  key={name}
                  className="
                    w-full
                    [&_h3]:pt-[20px]
                    [&_h3]:text-[40px]
                    [&_h3]:font-KlinicSlab
                    [&_h3]:text-[#3c3c3c]
                  "
                >
                  <CyclingColumn viewportHeight={606}>{itemNodes}</CyclingColumn>
                </div>
              );
            })}
          </section>
        ))}
      </main>

      <div className="absolute bottom-[20px] left-0 right-0 shrink-0">
        <div className="ml-auto mr-auto h-[3px] w-[95%] bg-[#005989]" />
        <div className="ml-auto mr-auto mt-5 flex w-[85%] items-center justify-center">
          <DietaryLegend config={legendConfig} />
        </div>
      </div>
    </div>
  </div>
);
};