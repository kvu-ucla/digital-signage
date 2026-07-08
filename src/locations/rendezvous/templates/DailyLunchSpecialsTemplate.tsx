import type { ReactElement, ReactNode } from "react";
import { MenuItem } from "@/menu/ModMenuList";
import { getStationItems } from "../helpers/rendezvous";
import { DietaryLegend } from "@/menu/DietaryLegend";
import type { MenuItemConfig, MenuItemData, MergedMenuData } from "@/lib/types";
import { LEGEND_CONFIG, NAME_ONLY_CONFIG } from "../config";

type DailyLunchSpecialsScreenProps = {
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

export default function DailyLunchSpecialsScreen({
  data,
}: DailyLunchSpecialsScreenProps): ReactElement {
  console.log("data:", data);
  const title = "DAILY LUNCH SPECIALS";
  const mondayItems = getStationItems(data, "MONDAY");
  const tuesdayItems = getStationItems(data, "TUESDAY");
  const wednesdayItems = getStationItems(data, "WEDNESDAY");
  const thursdayItems = getStationItems(data, "THURSDAY");
  const fridayItems = getStationItems(data, "FRIDAY");
  const saturdayItems = getStationItems(data, "SATURDAY");
  const sundayItems = getStationItems(data, "SUNDAY");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div
        className="relative h-[1080px] w-[1920px] overflow-hidden bg-[#F9E9D0]"
        style={{ fontFamily: "Tablet Gothic Condensed Bold" }}
      >
        <header className="absolute inset-x-0 top-0 h-[140px] bg-[#295541] px-[50px] text-right">
          <h1 className="mt-4 text-[85px] uppercase text-white">{title}</h1>
        </header>

        <main className="absolute bottom-[95px] left-[52px] right-[52px] top-[175px] grid grid-cols-[900px_1fr] gap-x-[80px]">
          <section className="flex flex-col">
            <MenuSection title="Monday" className="mb-[15px]">
              <MenuItemGrid
                items={mondayItems}
                columns={2}
                menuItemConfig={NAME_ONLY_CONFIG}
              />
            </MenuSection>

            <MenuSection title="Tuesday" className="mb-[15px]">
              <MenuItemGrid
                items={tuesdayItems}
                columns={2}
                menuItemConfig={NAME_ONLY_CONFIG}
              />
            </MenuSection>

            <MenuSection title="Wednesday" className="mb-[15px]">
              <MenuItemGrid
                items={wednesdayItems}
                columns={2}
                menuItemConfig={NAME_ONLY_CONFIG}
              />
            </MenuSection>
            
            <MenuSection title="Thursday" className="mb-[15px]">
              <MenuItemGrid
                items={thursdayItems}
                columns={2}
                menuItemConfig={NAME_ONLY_CONFIG}
              />
            </MenuSection>
          </section>

          <section className="mb-[15px] flex flex-col">
            <MenuSection title="Friday" className="mb-[15px]">
              <MenuItemGrid
                items={fridayItems}
                columns={2}
                menuItemConfig={NAME_ONLY_CONFIG}
              />
            </MenuSection>

            <MenuSection title="SATURDAY" className="mb-[15px]">
              <MenuItemGrid
                items={saturdayItems}
                columns={2}
                menuItemConfig={NAME_ONLY_CONFIG}
              />
            </MenuSection>

            <MenuSection title="SUNDAY" className="mb-[15px]">
              <MenuItemGrid
                items={sundayItems}
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
      <div className="mb-[15px] border-b-2 border-[#295541] text-[45px]">
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
