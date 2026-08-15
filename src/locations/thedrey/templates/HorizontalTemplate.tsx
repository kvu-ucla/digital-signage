import type { MergedMenuData, MenuItemData } from "@/lib/types";
import { MenuItemList } from "@/menu/ModMenuList";
import { DietaryLegend } from "@/menu/DietaryLegend";
import { groupByRegion, type RegionStation } from "@/lib/regions";
import { BEVERAGES, LEGEND_CONFIG, MENU_ITEM_CONFIG } from "../config";
import { displayTitleForStation } from "../helpers/thedrey";

type TheDreyTemplateProps = {
  data: MergedMenuData;
  /** Page 1 renders the static beverage section under the right column. */
  showBeverages?: boolean;
};

// The background image bakes in the header banner and COMBO MEAL sidebar.
// Content renders only in the light area to its right: two columns whose
// x-origins (560px / 1326px) come from the 2023 Winter reference board.
export default function HorizontalTemplate({
  data,
  showBeverages = false,
}: TheDreyTemplateProps) {
  if (data.stationsWithRegions.length === 0) {
    return (
      <div className="screen">
        <p>No station region data available.</p>
      </div>
    );
  }

  const regions = new Map(groupByRegion(data.stationsWithRegions));

  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="relative h-[1080px] w-[1920px] overflow-hidden [font-family:var(--drey-font)]">
        <img
          src={`${import.meta.env.BASE_URL}backgrounds/drey-bg.jpg`}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-fill"
        />

        <main className="absolute bottom-[60px] left-[560px] top-[170px] grid w-[1290px] grid-cols-[700px_1fr] gap-x-[66px] overflow-hidden">
          <MenuColumn stations={regions.get(1) ?? []} splitAt={4} />
          <MenuColumn
            stations={regions.get(2) ?? []}
            appendBeverages={showBeverages}
          />
        </main>

        <DreyLegend />
      </div>
    </div>
  );
}

/**
 * The Drey boards display neither prices nor descriptions — the feed's
 * Description field carries internal kitchen notes, not customer copy.
 */
const forDisplay = (item: MenuItemData): MenuItemData =>
  item.price || item.description
    ? { ...item, price: null, description: null }
    : item;

function MenuColumn({
  stations,
  appendBeverages = false,
  splitAt = 8,
}: {
  stations: Array<RegionStation>;
  appendBeverages?: boolean;
  splitAt?: number;
}) {
  return (
    <div className="flex flex-col gap-[28px] text-[#554727]">
      {stations.map(({ name, items }) => (
        <section key={name}>
          <StationTitle title={displayTitleForStation(name)} />
          {items.length > 0 && (
            // Long stations flow into two internal columns so real-world
            // item counts (e.g. 10 sandwiches) fit the fixed canvas.
            <div
              className={items.length >= splitAt ? "columns-2 gap-x-[36px]" : ""}
            >
              <MenuItemList
                items={[...items]
                  .sort((a, b) =>
                    a.name.localeCompare(b.name, undefined, {
                      sensitivity: "base",
                    }),
                  )
                  .map(forDisplay)}
                size="20px"
                menuItemConfig={MENU_ITEM_CONFIG}
              />
            </div>
          )}
        </section>
      ))}

      {appendBeverages && <BeverageSection />}
    </div>
  );
}

function StationTitle({ title }: { title: string }) {
  return (
    <h2 className="m-0 mb-[14px] text-[48px] font-bold uppercase leading-none tracking-[1px] text-[#554727]">
      {title}
    </h2>
  );
}

function BeverageSection() {
  return (
    <section>
      <StationTitle title="BEVERAGE" />
      <div className="flex flex-col gap-[10px]">
        {BEVERAGES.map(({ name, options }) => (
          <div key={name}>
            <p className="m-0 text-[27px] font-medium leading-tight">{name}</p>
            {options && (
              <p className="m-0 text-[23px] font-normal italic leading-tight">
                {options}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function DreyLegend() {
  return (
    <div className="absolute bottom-[16px] left-[40px] w-[1840px]">
      <DietaryLegend config={LEGEND_CONFIG} />
    </div>
  );
}
