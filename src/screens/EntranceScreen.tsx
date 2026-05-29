import type { MergedMenuData } from "../lib/types";
import { MenuItemList } from "../menu/MenuItemList";
import { DietaryLegend } from "../menu/DietaryLegend";
import { LEGEND_CONFIG } from "../config/bplate";
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
    <div className="relative flex h-[1080px] w-[1920px] flex-col overflow-hidden bg-[#f8f4e8] font-KlinicSlab-Bold">
      <header className="flex h-[250px] w-full shrink-0 items-center bg-[#005289] px-[80px] text-white">
        <div className="flex h-full w-[230px] shrink-0 items-center justify-center">
          <img
            src="./images/bruin-plate-logo.svg"
            alt="Bruin Plate"
            className="h-[200px] w-[200px] object-contain"
          />
        </div>

        <div className="flex flex-1 flex-col pl-10 justify-center pt-6">
          <p className="pl-35 text-[50px] font-light uppercase leading-none tracking-[0.35em] font-KlinicSlab-light">
            Welcome To
          </p>

          <h1 className="text-[150px] font-extrabold leading-none tracking-wide">
            Bruin Plate
          </h1>
        </div>

        <div className="flex h-full w-[360px] shrink-0 items-center justify-center">
          <div className="h-[150px] w-[310px] bg-[#7a8d32]" />
        </div>
      </header>

      <div
        className="grid h-[100px] w-full border-b-[10px] border-[#d69b2d] bg-[#5d94bb]"
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
                ? "after:absolute after:right-0 after:top-0 after:h-[706px] after:border-r-[4px] after:border-dotted after:border-[#00598a] after:content-['']"
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
                  <CyclingColumn viewportHeight={606}>{itemNodes}</CyclingColumn> {/* will probably have to modify this to be responsive later*/}
                </div>
              );
            })}
            </section>
        ))}
      </main>

      <div className="absolute bottom-[20px] left-0 right-0 shrink-0">
        <div className="ml-auto mr-auto h-[3px] w-[95%]  bg-[#005989]" />
        <div className="mt-5 ml-auto mr-auto flex w-[85%] items-center justify-center">
          <DietaryLegend config={LEGEND_CONFIG} />
        </div>
      </div>
    </div>
  );
};