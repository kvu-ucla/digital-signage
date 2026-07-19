import type { ReactElement, ReactNode } from "react";
import { MenuItem } from "@/menu/ModMenuList";
import { getStationItems, formatScreenTitle } from "../helpers/rendezvous";
import {
  DUMMY_EAST_BASE_ITEMS,
  DUMMY_EAST_TOPPING_ITEMS,
  DUMMY_EAST_ENTREE_ITEMS,
  DUMMY_EAST_SAUCE_ITEMS,
} from "../helpers/dummyFreestyleData";
import { DietaryLegend } from "@/menu/DietaryLegend";
import icon from '@/images/Rendezvous Logo - East White.svg'
import type { MenuItemConfig, MenuItemData, MergedMenuData } from "@/lib/types";
import {
  LEGEND_CONFIG,
  NAME_ONLY_CONFIG,
  PRICED_ITEM_CONFIG,
  ICON_ITEM_CONFIG,
} from "../config";

type EastFreestyleScreenProps = {
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

const withFallback = (
  items: Array<MenuItemData>,
  fallback: ReadonlyArray<MenuItemData>,
): Array<MenuItemData> => (items.length > 0 ? items : [...fallback]);

export default function EastFreestyleScreen({
  data,
  station,
}: EastFreestyleScreenProps): ReactElement {
  console.log("data:", data);
  const title = getStationItems(data, "ASIAN DAILY SPECIAL")[0]?.name ?? formatScreenTitle(station);
  const baseItems = withFallback(
    getStationItems(data, "Base"),
    DUMMY_EAST_BASE_ITEMS,
  );
  const toppingItems = withFallback(
    getStationItems(data, "ASIAN TOPPING"),
    DUMMY_EAST_TOPPING_ITEMS,
  );
  const entreeItems = withFallback(
    getStationItems(data, "ENTRÉE"),
    DUMMY_EAST_ENTREE_ITEMS,
  );
  const sauceItems = withFallback(
    getStationItems(data, "ASIAN SAUCE"),
    DUMMY_EAST_SAUCE_ITEMS,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div
        className="relative h-[1080px] w-[1920px] overflow-hidden bg-[#F9E9D0]"
        style={{ fontFamily: "Tablet Gothic Condensed Bold" }}
      >
        <header className="absolute inset-x-0 top-0 flex h-[140px] items-center justify-between bg-[#810031] px-[50px]">
          <h1 className="text-[85px] uppercase text-white pt-[14px]">{title}</h1>
          <img
            src={icon}
            alt="Rendezvous East Logo"
            className="h-[80px]"
          />
        </header>

        <main className="absolute bottom-[95px] left-[52px] right-[52px] top-[175px] grid grid-cols-[900px_1fr] gap-x-[80px]">
          <section className="flex flex-col">
            <MenuSection title="Choose One Base" className="mb-[15px]">
              <MenuItemGrid
                items={baseItems}
                columns={2}
                menuItemConfig={NAME_ONLY_CONFIG}
              />
            </MenuSection>

            <MenuSection title="Choose Three Toppings" className="mb-[15px]">
              <MenuItemGrid
                items={toppingItems}
                columns={2}
                menuItemConfig={ICON_ITEM_CONFIG}
                iconSize="30px"
              />
            </MenuSection>
          </section>

          <section className="mb-[15px] flex flex-col">
            <MenuSection title="Choose Two Entrées" className="mb-[15px]">
              <MenuItemGrid
                items={entreeItems}
                columns={2}
                menuItemConfig={PRICED_ITEM_CONFIG}
                iconSize="27px"
              />
            </MenuSection>

            <MenuSection title="Choose One Sauce" className="mb-[15px]">
              <MenuItemGrid
                items={sauceItems}
                columns={2}
                menuItemConfig={NAME_ONLY_CONFIG}
              />
            </MenuSection>
          </section>

          <div className="absolute bottom-[0px] left-0 right-0 shrink-0">
            <div className="ml-auto mr-auto mt-1 flex w-[85%] items-center justify-center">
              <DietaryLegend config={LEGEND_CONFIG} />
            </div>
          </div>
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
      <div className="mb-[15px] border-b-2 border-[#810031] text-[45px]">
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
