import type { MergedMenuData } from "@/lib/types";
import { MenuItemList } from "@/menu/ModMenuList";
import { VERTICAL_MENU_ITEM_CONFIG } from "../config";
import { displayTitleForStation } from "../helpers/cafe1919";

type Cafe1919TemplateProps = {
  data: MergedMenuData;
};

export default function Cafe1919VerticalTemplate({ data }: Cafe1919TemplateProps) {
    return (
    <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="relative h-[1920px] w-[1080px] overflow-hidden bg-[#ede0d7]">
            <MenuColumn stations={data.stationsWithRegions.flatMap((station) =>
                station.items.length > 0
                ? [{
                    name: station.name,
                    items: station.items,
                    order: station.regionOrder,
                }]
                : []
            )} />
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
  return (
    <div
      className="flex h-full flex-col text-[#451c00]"
      style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
    >
      {stations.map(({ name, items }) => (
        <div key={name}>
          <MenuTitle title={displayTitleForStation(name)} />

          <div
            className="
              mx-auto w-[85%] pt-15
              [&_h3]:max-w-[80%]
              [&_h3]:break-words
              [&_h3]:text-[64px]
              [&_h3]:uppercase
              [&_h3]:leading-none
              [&_p]:mt-2
              [&_p]:text-[40px]
              [&_p]:leading-tight
              [&_p]:text-#5c452b
            "
          >
            {items.length ? (
              <MenuItemList items={items} size="56px" menuItemConfig={VERTICAL_MENU_ITEM_CONFIG} />
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
      <div className="flex h-[163px] items-center justify-center border-b-8 border-b-[#c6a88e] bg-[#d83f22] py-5 text-white">
        <h2
          className="mt-2 text-[128px] uppercase leading-none"
          style={{ fontFamily: "Arial Narrow, Arial, sans-serif", fontWeight: 700 }}
        >
          {title}
        </h2>
      </div>
    </section>
  );
}