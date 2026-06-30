import type { LegendConfig, MenuItemConfig } from "@/lib/types";

export const LEGEND_CONFIG: LegendConfig = {
  labelColor: "white",
  mode: "dark",
  font: "var(--hall-font-bold)",
  itemFontSize: "18px",
  itemFontWeight: 700,
  gap: "10px",
  gapItems: "20px",
  rowGap: "13px",
  imgSize: "20px",
};

export const MENU_ITEM_CONFIG: MenuItemConfig = {
  gap: "5px",
  divClassName: "",
  itemClassName:
    "max-w-[80%] break-words text-[25px] uppercase leading-none text-[#451c00]",
  dietaryClassName: "mt-0.5 mb-4 flex flex-wrap gap-[5px] leading-none",
  priceClassName: "ml-auto shrink-0 whitespace-nowrap text-[25px] leading-none",
  pricedivClassName: "flex w-full items-start gap-3",
  summaryClassName: "mt-2 text-[18px] leading-tight text-[#5c452b]",
};

export const VERTICAL_MENU_ITEM_CONFIG: MenuItemConfig = {
  gap: "10px",
  divClassName: "",
  itemClassName:
    "max-w-[80%] break-words text-[25px] uppercase leading-none text-[#451c00]",
  dietaryClassName: "mt-1 mb-15 flex flex-wrap leading-none",
};

export const PAGE_CONFIG: Record<
  string,
  { regions: Array<number>; type: "horizontal" | "vertical" }
> = {
  "1": { regions: [2, 3, 4], type: "horizontal" },
  "2": { regions: [6, 7, 8], type: "horizontal" },
  "3": { regions: [10, 11, 12], type: "horizontal" },
  "4": { regions: [13], type: "vertical" },
};
