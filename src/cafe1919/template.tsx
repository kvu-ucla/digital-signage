import type { MergedMenuData } from "../lib/types";
import type { Cafe1919DisplayId } from "./helpers/cafe1919";
import { fillConfig } from "./helpers/cafe1919";
import { MenuItemList } from "../menu/MenuItemList";
import { DietaryLegend } from "../menu/DietaryLegend";
import { LEGEND_CONFIG } from "./config";

type Cafe1919TemplateProps = {
  data: MergedMenuData;
  displayId?: Cafe1919DisplayId;
};

export function Cafe1919Template({ data, displayId = "Mains" }: Cafe1919TemplateProps) {
  const stationsWithRegions = fillConfig(displayId, data);

  if (stationsWithRegions.length === 0) {
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
      items: typeof stationsWithRegions[number]["items"];
      order: number;
    }>
  >();

  for (const station of stationsWithRegions) {
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="relative h-[1080px] w-[1920px] overflow-hidden">
        <img
          src="/bgs/cafe1919/Cafe 1919 Background.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-fill"
        />

        <main
          className="relative grid h-[1080px] w-[1920px] gap-x-3"
          style={{
            gridTemplateColumns: `471px repeat(${sortedRegions.length}, 471px)`,
          }}
        >
          <SideInfoPanel />

          {sortedRegions.map(([position, stations]) => (
            <MenuColumn key={position} stations={stations} />
          ))}
        </main>
      </div>
    </div>
  );
}

function SideInfoPanel() {
  return (
    <div className="flex h-full flex-col text-white">
      <section>
        <div className="flex h-[54px] items-center justify-center border-b-4 border-b-(--hall-border-color) bg-(--hall-bg-color) py-5 text-white">
          <h2
            className="mt-1 text-[40px] uppercase leading-none"
            style={{ fontFamily: "var(--hall-font-bold)" }}
          >
            SCAN FOR FULL MENU
          </h2>
        </div>
      </section>

      <section className="pt-5 text-center">
        <div className="mx-auto w-[85%] border-b-2 border-(--hall-border-color) pb-5">
          <div className="mx-auto h-[261px] w-[261px] bg-white">
            <img
              src="/bgs/cafe1919/qr.svg"
              alt="QR code"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="pt-3 text-center">
        <div className="mx-auto w-[85%] text-center">
          <h3
            className="text-[40px] uppercase"
            style={{ fontFamily: "var(--hall-font-bold)" }}
          >
            1 Swipe Meal Deal
          </h3>
        </div>

        <div className="mx-auto w-[85%] text-center">
          <p
            className="mx-auto my-auto max-w-[400px] text-[25px] leading-tight"
            style={{ fontFamily: "var(--hall-font-bold)" }}
          >
            Any Pizzette, Panini, Insalate, or Pretzel + 1 Side + 1 Fountain
            Drink
          </p>
        </div>
      </section>

      <section className="pt-3 text-center">
        <h3
          className="text-[40px] uppercase"
          style={{ fontFamily: "var(--hall-font-bold)" }}
        >
          1 Swipe Dessert Deal
        </h3>

        <p
          className="mx-auto max-w-[350px] text-[25px] leading-tight"
          style={{ fontFamily: "var(--hall-font-bold)" }}
        >
          Up to 2 Flavors + Up to 2 Toppings OR 1 Daily Special
        </p>
      </section>

      <section className="pt-3 text-center">
        <div className="mx-auto w-[85%] border-b-2 border-(--hall-border-color) pb-5">
          <h3
            className="text-[40px] uppercase"
            style={{ fontFamily: "var(--hall-font-bold)" }}
          >
            Accepted Payment
          </h3>

          <p
            className="text-[25px] leading-tight"
            style={{ fontFamily: "var(--hall-font-bold)" }}
          >
            Bruincard EasyPay, Credit/Debit Card
          </p>
        </div>
      </section>

      <section className="mx-auto w-[90%] pt-5 text-center">
        <DietaryLegend config={LEGEND_CONFIG} />
      </section>

      <div className="mt-auto pb-7 text-center text-[14px] leading-tight text-white">
        <h4 className="text-[18px]" style={{ fontFamily: "var(--hall-font)" }}>
          For allergen and nutritional information, visit
          <br />
          menu.dining.ucla.edu/Menus/Cafe1919
        </h4>
      </div>
    </div>
  );
}

type RegionStation = {
  name: string;
  items: MergedMenuData["stationsWithRegions"][number]["items"];
  order: number;
};

type MenuColumnProps = {
  stations: Array<RegionStation>;
};

function MenuColumn({ stations }: MenuColumnProps) {
  return (
    <div
      className="flex h-full flex-col text-(--hall-color-1)"
      style={{ fontFamily: "var(--hall-font-bold)" }}
    >
      {stations.map(({ name, items }) => (
        <div key={name}>
          <MenuTitle title={displayTitleForStation(name)} />

          <div
            className="
              mx-auto w-[90%] pt-4
              [&_h3]:max-w-[80%]
              [&_h3]:break-words
              [&_h3]:text-[25px]
              [&_h3]:uppercase
              [&_h3]:leading-none
              [&_p]:mt-2
              [&_p]:text-[18px]
              [&_p]:leading-tight
              [&_p]:text-(--hall-color-2)
            "
          >
            {items.length ? (
              <MenuItemList items={items} iconSize="20px" gap="10px" />
            ) : (
              <p className="text-[22px] uppercase text-(--hall-color-2)">
                No items available
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

type MenuTitleProps = {
  title: string;
};

function MenuTitle({ title }: MenuTitleProps) {
  return (
    <section>
      <div className="flex h-[54px] items-center justify-center border-b-4 border-b-(--hall-border-color) bg-(--hall-bg-color) py-5 text-white">
        <h2
          className="mt-1 text-[40px] uppercase leading-none"
          style={{ fontFamily: "var(--hall-font-bold)" }}
        >
          {title}
        </h2>
      </div>
    </section>
  );
}

function displayTitleForStation(station: string) {
  const titles: Record<string, string> = {
    PIZZETTE: "Pizzette",
    PANINI: "Panini",
    INSALATE: "Insalate",
    PRETZELS: "Pretzels",
    "DAILY SPECIALS": "Daily Specials",
    GELATO: "Gelato",
    DESSERTS: "Desserts",
  };

  return titles[station.toUpperCase()] ?? station;
}