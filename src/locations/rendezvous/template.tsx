import type { MenuItemData, MergedMenuData } from "@/lib/types";
import { DietaryIcon } from "@/menu/DietaryIcon";
import { DietaryLegend } from "@/menu/DietaryLegend";
import { LEGEND_CONFIG } from "./config";

type RendezvousTemplateProps = {
  data: MergedMenuData;
};

export function RendezvousTemplate({ data }: RendezvousTemplateProps) {
  const stations = data.stations

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div
        className="relative h-[1080px] w-[1920px] overflow-hidden bg-(--hall-bg-color)"
        style={{ fontFamily: "var(--hall-font-bold)" }}
      >
        <header className="absolute text-right inset-x-0 top-0 h-[140px] items-center bg-(--hall-color-2) px-[50px]">
          <h1 className="mt-4 text-[85px] uppercase text-white">
            BUILD YOUR OWN ENTRÉE
          </h1>
        </header>

        <main className="absolute left-[52px] right-[52px] top-[175px] bottom-[95px] grid grid-cols-[900px_1fr] gap-x-[80px]">
          <section className="flex flex-col">
            <MenuSection title="Choose Style" className="mb-[15px]">
              <NameOnlyGrid items={stations["STYLE"] ?? []} columns={2} />
            </MenuSection>

            <MenuSection title="Choose One Filling">
              <PricedItemGrid items={stations["FILLING"] ?? []} columns={2} />
            </MenuSection>

            <MenuSection title="Choose Two Base" className="mb-[15px]">
              <IconItemGrid items={stations["BASE"] ?? []} columns={2} />
            </MenuSection>
          </section>

          <section className="flex flex-col mb-[15px]">
            <MenuSection title="Choose Toppings">
              <IconItemGrid items={stations["TOPPINGS"] ?? []} columns={2} />
            </MenuSection>

            <div className="mt-[15px] grid grid-cols-[420px_1fr] gap-x-[35px]">
              <MenuSection title="Extras">
                <CompactPriceList items={stations["EXTRAS"] ?? []} />
              </MenuSection>

              <MenuSection title="Drinks" className="mb-[15px]">
                <CompactPriceList items={stations["DRINKS"] ?? []} />
              </MenuSection>
            </div>
          </section>
        </main>

        <div className="absolute bottom-[20px] left-1/2 w-[75%] -translate-x-1/2">
          <DietaryLegend config={LEGEND_CONFIG} />
        </div>
      </div>
    </div>
  );
}

type MenuSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function MenuSection({ title, children, className = "" }: MenuSectionProps) {
  return (
    <section className={className}>
      <div className="mb-[15px] border-b-2 border-(--hall-color-2) text-[45px]">
        <h2 className="m-0 uppercase leading-none text-black">{title}</h2>
      </div>
      {children}
    </section>
  );
}

type GridProps = {
  items: ReadonlyArray<MenuItemData>
  columns?: 1 | 2
}

function NameOnlyGrid({ items, columns = 2 }: GridProps) {
  return (
    <div className={columns === 2 ? "grid grid-cols-2 gap-x-[60px] gap-y-[4px]" : "grid grid-cols-1 gap-y-[4px]"}>
      {items.map((item) => (
        <p key={item.recipeNumber} className="m-0 text-[32px] uppercase leading-tight text-(--hall-color-1)">
          {item.name}
        </p>
      ))}
    </div>
  );
}

function PricedItemGrid({ items, columns = 2 }: GridProps) {
  return (
    <div className={columns === 2 ? "grid grid-cols-2 gap-x-[35px] gap-y-[10px]" : "grid grid-cols-1 gap-y-[10px]"}>
      {items.map((item) => (
        <article key={item.recipeNumber}>
          <div className="flex items-start gap-4">
            <h3 className="m-0 max-w-[270px] text-[32px] uppercase leading-[0.95] text-(--hall-color-1)">
              {item.name}
            </h3>
            {item.price && (
              <span className="ml-auto shrink-0 whitespace-nowrap text-[32px] leading-none text-(--hall-color-1)">
                {item.price}
              </span>
            )}
          </div>
          <DietaryIcons item={item} size="27px" />
        </article>
      ))}
    </div>
  );
}

function IconItemGrid({ items, columns = 2 }: GridProps) {
  return (
    <div className={columns === 2 ? "grid grid-cols-2 gap-x-[60px] gap-y-[8px]" : "grid grid-cols-1 gap-y-[8px]"}>
      {items.map((item) => (
        <article key={item.recipeNumber}>
          <h3 className="m-0 text-[30px] uppercase leading-[0.95] text-(--hall-color-1)">
            {item.name}
          </h3>
          <DietaryIcons item={item} size="30px" />
        </article>
      ))}
    </div>
  );
}

function CompactPriceList({ items }: { items: ReadonlyArray<MenuItemData> }) {
  return (
    <div className="space-y-[8px]">
      {items.map((item) => (
        <article key={item.recipeNumber}>
          <div className="flex items-start gap-3">
            <h3 className="m-0 text-[32px] uppercase leading-[0.95] text-(--hall-color-1)">
              {item.name}
            </h3>
            {item.price && (
              <span className="ml-auto shrink-0 whitespace-nowrap text-[32px] leading-none text-(--hall-color-1)">
                {item.price}
              </span>
            )}
          </div>
          {item.dietaryLabels.length > 0 && <DietaryIcons item={item} size="27px" />}
        </article>
      ))}
    </div>
  );
}

function DietaryIcons({ item, size }: { item: MenuItemData; size: string }) {
  if (item.dietaryLabels.length === 0) return null;
  return (
    <div className="mt-[4px] flex gap-[5px]">
      {item.dietaryLabels.map((label) => (
        <DietaryIcon key={label} dietaryLabel={label} mode="light" size={size} />
      ))}
    </div>
  );
}
