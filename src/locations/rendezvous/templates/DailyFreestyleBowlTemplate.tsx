import type { ReactElement, ReactNode } from "react";
import { MenuItem } from "@/menu/ModMenuList";
import { getStationItems } from "../helpers/rendezvous";
import {
  DUMMY_BASE_ITEMS,
  DUMMY_ENTREE_ITEMS,
  DUMMY_TOPPING_ITEMS,
} from "../helpers/dummyFreestyleData";
import { DietaryLegend } from "@/menu/DietaryLegend";
import type { MenuItemConfig, MenuItemData, MergedMenuData } from "@/lib/types";
import { LEGEND_CONFIG, FREESTYLE_ITEM_CONFIG } from "../config";

type DailyFreestyleBowlScreenProps = {
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

export default function DailyFreestyleBowlScreen({
  data,
  station,
}: DailyFreestyleBowlScreenProps): ReactElement {
  void station;
  const baseItems = withFallback(
    getStationItems(data, "Base"),
    DUMMY_BASE_ITEMS,
  );
  const entreeItems = withFallback(
    getStationItems(data, "Entrée"),
    DUMMY_ENTREE_ITEMS,
  );
  const toppingItems = withFallback(
    getStationItems(data, "ASIAN TOPPING"),
    DUMMY_TOPPING_ITEMS,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div
        className="relative h-[1080px] w-[1920px] overflow-hidden bg-[#F9E9D0]"
        style={{ fontFamily: "Tablet Gothic Condensed Bold" }}
      >
        <header className="absolute inset-x-0 top-0 h-[140px] bg-[#810031] px-[50px] text-left">
          <h1 className="mt-4 text-[85px] uppercase text-white">
            Daily Freestyle Bowls
          </h1>
        </header>

        <main className="absolute bottom-[95px] left-[52px] right-[52px] top-[175px] grid grid-cols-3 gap-x-[60px]">
          <section className="flex flex-col">
            <MenuSection title="Select 1 Base:" className="mb-[15px]">
              <MenuItemGrid
                items={baseItems}
                columns={1}
                menuItemConfig={FREESTYLE_ITEM_CONFIG}
                iconSize="30px"
              />
            </MenuSection>
          </section>

          <section className="flex flex-col">
            <MenuSection title="Select 2 Entrées:" className="mb-[15px]">
              <MenuItemGrid
                items={entreeItems}
                columns={1}
                menuItemConfig={FREESTYLE_ITEM_CONFIG}
                iconSize="30px"
              />
            </MenuSection>
          </section>

          <section className="flex flex-col">
            <MenuSection title="Select 3 Toppings:" className="mb-[15px]">
              <MenuItemGrid
                items={toppingItems}
                columns={2}
                menuItemConfig={FREESTYLE_ITEM_CONFIG}
                iconSize="30px"
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
      <div className="mb-[15px] text-[45px]">
        <h2 className="m-0 uppercase leading-none text-[#810031]">{title}</h2>
      </div>

      {children}
    </section>
  );
}

function MenuItemGrid({
  items,
  columns = 1,
  menuItemConfig,
  iconSize = "25px",
}: MenuItemGridProps): ReactElement {
  return (
    <div
      className={
        columns === 2
          ? "grid grid-cols-2 gap-x-[40px] gap-y-[14px]"
          : "grid grid-cols-1 gap-y-[14px]"
      }
    >
      {items.map(
        (item, index): ReactElement => (
          <MenuItem
            key={`${item.recipeNumber}-${item.name}-${index}`}
            item={item}
            size={iconSize}
            menuItemConfig={menuItemConfig}
          />
        ),
      )}
    </div>
  );
}