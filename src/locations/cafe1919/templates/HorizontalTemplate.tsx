import type { MergedMenuData } from "@/lib/types";
import { MenuItemList } from "@/menu/ModMenuList";
import { DietaryLegend } from "@/menu/DietaryLegend";
import { LEGEND_CONFIG, MENU_ITEM_CONFIG } from "../config";
import { displayTitleForStation } from "../helpers/cafe1919";

type Cafe1919TemplateProps = {
  data: MergedMenuData;
};

export default function HorizontalTemplate({ data }: Cafe1919TemplateProps) {
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
      items: typeof data.stationsWithRegions[number]["items"];
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="relative h-[1080px] w-[1920px] overflow-hidden">
        <img
          src="backgrounds/c1919-bg.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-fill"
        />

        <main className="relative grid h-[1080px] w-[1920px] grid-cols-[471px_471px_471px_471px] gap-x-3">
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
        <div className="flex h-[54px] items-center justify-center border-b-4 border-b-[#c6a88e] bg-[#d83f22] py-5 text-white">
          <h2
            className="mt-1 text-[40px] uppercase leading-none"
            style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
          >
            SCAN FOR FULL MENU
          </h2>
        </div>
      </section>

      <section className="pt-5 text-center">
        <div className="mx-auto w-[85%] border-b-2 border-[#c6a88e] pb-5">
          <div className="mx-auto h-[261px] w-[261px] bg-white">
            <img
              src="backgrounds/c1919-qr.svg"
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
            style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
          >
            1 Swipe Meal Deal
          </h3>
        </div>

        <div className="mx-auto w-[85%] text-center">
          <p
            className="mx-auto my-auto max-w-[400px] text-[25px] leading-tight"
            style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
          >
            Any Pizzette, Panini, Insalate, or Pretz
            <br />
            &amp; Any Fountain Drink or Bottled Beverage
          </p>
        </div>

        <div className="mx-auto w-[85%] pt-2 text-center">
          <p
            className="text-[25px] leading-tight"
            style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
          >
            $7.99 + Tax
          </p>
        </div>
      </section>

      <section className="pt-3 text-center">
        <div className="mx-auto w-[85%] border-b-2 border-[#c6a88e] pb-3 text-center">
          <h3
            className="text-[40px] uppercase"
            style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
          >
            Accepted Payment
          </h3>

          <p
            className="text-[25px] leading-tight"
            style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
          >
            Bruincard EasyPay, Credit/Debit Card
          </p>
        </div>
      </section>

      <section className="mx-auto w-[90%] pt-5 text-center">
        <DietaryLegend config={LEGEND_CONFIG} />
      </section>

      <div className="mt-auto pb-5 text-center text-[14px] leading-tight text-white">
        <h4 className="text-[18px]" style={{ fontFamily: "Arial Narrow, Arial, sans-serif" }}>
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

export function MenuColumn({ stations }: MenuColumnProps) {
  const sortedStations = stations.map((station) => ({
    ...station,
    items:
      station.name.toLowerCase().trim() === "daily specials"
        ? station.items
        : [...station.items].sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
          ),
  }));

  return (
    <div
      className="flex h-full flex-col text-[#451c00]"
      style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
    >
      {sortedStations.map(({ name, items }) => (
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
              [&_p]:text-#5c452b
            "
          >
            {items.length ? (
              <MenuItemList items={items} size="20px" menuItemConfig={MENU_ITEM_CONFIG} />
            ) : (
              <p className="text-[22px] uppercase text-#5c452b">
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
      <div className="flex h-[54px] items-center justify-center border-b-4 border-b-[#c6a88e] bg-[#d83f22] py-5 text-white">
        <h2
          className="mt-1 text-[40px] uppercase leading-none"
          style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
        >
          {title}
        </h2>
      </div>
    </section>
  );
}