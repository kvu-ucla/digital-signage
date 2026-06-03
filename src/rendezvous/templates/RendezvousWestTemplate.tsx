import type { ReactElement, ReactNode } from "react";
import { MenuItem } from "../../menu/MenuItem";
import { getStationItems, formatScreenTitle } from "../helpers/rendezvous";
import { NAME_ONLY_CONFIG, PRICED_ITEM_CONFIG, ICON_ITEM_CONFIG, COMPACT_PRICE_CONFIG } from "../rendezvousConfig";
import type { MenuItemConfig, MenuItemData, MergedMenuData } from "../../lib/types";

type WestBYOScreenProps = {
  data: MergedMenuData;
  station: string;
};

type MenuSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

type MenuItemGridProps = {
  items: Array<MenuItemData>;
  columns?: 1 | 2;
  menuItemConfig: MenuItemConfig;
  iconSize?: string;
};

type CompactPriceListProps = {
  items: Array<MenuItemData>;
  menuItemConfig: MenuItemConfig;
  iconSize?: string;
};

export default function WestBYOScreen({
  data,
  station,
}: WestBYOScreenProps): ReactElement {
  const title = formatScreenTitle(station);

  const styleItems = getStationItems(data, "STYLE");
  const fillingItems = getStationItems(data, "FILLING");
  const baseItems = getStationItems(data, "BASE");
  const toppingItems = getStationItems(data, "TOPPINGS");
  const extraItems = getStationItems(data, "EXTRAS");
  const drinkItems = getStationItems(data, "DRINKS");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div
        className="relative h-[1080px] w-[1920px] overflow-hidden bg-(--hall-bg-color)"
        style={{ fontFamily: "var(--hall-font-bold)" }}
      >
        <header className="absolute inset-x-0 top-0 h-[140px] bg-(--hall-color-2) px-[50px] text-right">
          <h1 className="mt-4 text-[85px] uppercase text-white">{title}</h1>
        </header>

        <main className="absolute bottom-[95px] left-[52px] right-[52px] top-[175px] grid grid-cols-[900px_1fr] gap-x-[80px]">
          <section className="flex flex-col">
            <MenuSection title="Choose Style" className="mb-[15px]">
              <MenuItemGrid
                items={styleItems}
                columns={2}
                menuItemConfig={NAME_ONLY_CONFIG}
              />
            </MenuSection>

            <MenuSection title="Choose One Filling">
              <MenuItemGrid
                items={fillingItems}
                columns={2}
                menuItemConfig={PRICED_ITEM_CONFIG}
                iconSize="27px"
              />
            </MenuSection>

            <MenuSection title="Choose Two Base" className="mb-[15px]">
              <MenuItemGrid
                items={baseItems}
                columns={2}
                menuItemConfig={ICON_ITEM_CONFIG}
                iconSize="30px"
              />
            </MenuSection>
          </section>

          <section className="mb-[15px] flex flex-col">
            <MenuSection title="Choose Toppings">
              <MenuItemGrid
                items={toppingItems}
                columns={2}
                menuItemConfig={ICON_ITEM_CONFIG}
                iconSize="30px"
              />
            </MenuSection>

            <div className="mt-[15px] grid grid-cols-[420px_1fr] gap-x-[35px]">
              <MenuSection title="Extras">
                <CompactPriceList
                  items={extraItems}
                  menuItemConfig={COMPACT_PRICE_CONFIG}
                  iconSize="27px"
                />
              </MenuSection>

              <MenuSection title="Drinks" className="mb-[15px]">
                <CompactPriceList
                  items={drinkItems}
                  menuItemConfig={COMPACT_PRICE_CONFIG}
                  iconSize="27px"
                />
              </MenuSection>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function MenuSection({
  title,
  children,
  className = "",
}: MenuSectionProps): ReactElement {
  return (
    <section className={className}>
      <div className="mb-[15px] border-b-2 border-(--hall-color-2) text-[45px]">
        <h2 className="m-0 uppercase leading-none text-black">{title}</h2>
      </div>

      {children}
    </section>
  );
}

function MenuItemGrid({
  items,
  columns = 2,
  menuItemConfig,
  iconSize = "25px",
}: MenuItemGridProps): ReactElement {
  return (
    <div
      className={
        columns === 2
          ? "grid grid-cols-2 gap-x-[60px] gap-y-[8px]"
          : "grid grid-cols-1 gap-y-[8px]"
      }
    >
      {items.map((item, index): ReactElement => (
        <MenuItem
          key={`${item.recipeNumber}-${item.name}-${index}`}
          item={item}
          size={iconSize}
          menuItemConfig={menuItemConfig}
        />
      ))}
    </div>
  );
}

function CompactPriceList({
  items,
  menuItemConfig,
  iconSize = "25px",
}: CompactPriceListProps): ReactElement {
  return (
    <div className="space-y-[8px]">
      {items.map((item, index): ReactElement => (
        <MenuItem
          key={`${item.recipeNumber}-${item.name}-${index}`}
          item={item}
          size={iconSize}
          menuItemConfig={menuItemConfig}
        />
      ))}
    </div>
  );
}