import type { LegendConfig, MenuItemConfig } from "@/lib/types";

export const LEGEND_CONFIG: LegendConfig = {
  labelColor: "#111111",
  mode: "dark",
  font: "Avenir Next",
  itemFontSize: "19px",
  itemFontWeight: 700,
  gap: "10px",
  gapItems: "30px",
  rowGap: "10px",
  imgSize: "25px",
  iconLabelOffset: "mt-1",
};

export const NAME_ONLY_CONFIG: MenuItemConfig = {
  divClassName: "",
  pricedivClassName: "",
  itemClassName: "m-0 text-[32px] uppercase leading-tight text-[#98002e]",
  priceClassName: "hidden",
  summaryClassName: "hidden",
  dietaryClassName: "hidden",
  gap: "5px",
};

export const PRICED_ITEM_CONFIG: MenuItemConfig = {
  divClassName: "",
  pricedivClassName: "flex items-start gap-4",
  itemClassName:
    "m-0 max-w-[270px] text-[32px] uppercase leading-[0.95] text-[#810031]",
  priceClassName:
    "ml-auto shrink-0 whitespace-nowrap text-[32px] leading-none text-[#98002e]",
  summaryClassName: "m-0 mt-[3px] text-[20px] leading-tight text-[#810031]",
  dietaryClassName: "mt-[4px] flex items-center",
  gap: "5px",
};

export const ICON_ITEM_CONFIG: MenuItemConfig = {
  divClassName: "",
  pricedivClassName: "flex items-start gap-3",
  itemClassName: "m-0 text-[32px] uppercase leading-[0.95] text-[#810031]",
  priceClassName:
    "ml-auto shrink-0 whitespace-nowrap text-[30px] leading-none text-[#810031]",
  summaryClassName: "m-0 mt-[3px] text-[19px] leading-tight text-[#810031]",
  dietaryClassName: "mt-[4px] flex items-center",
  gap: "5px",
};

export const COMPACT_PRICE_CONFIG: MenuItemConfig = {
  divClassName: "",
  pricedivClassName: "flex items-start gap-3",
  itemClassName: "m-0 text-[32px] uppercase leading-[0.95] text-[#810031]",
  priceClassName:
    "ml-auto shrink-0 whitespace-nowrap text-[32px] leading-none text-[#810031]",
  summaryClassName: "m-0 mt-[3px] text-[19px] leading-tight text-[#810031]",
  dietaryClassName: "mt-[4px] flex items-center",
  gap: "5px",
};

export const FREESTYLE_ITEM_CONFIG: MenuItemConfig = {
  divClassName: "mb-[4px]",
  pricedivClassName: "",
  itemClassName: "m-0 text-[30px] leading-tight text-[#1a1a1a]",
  priceClassName: "hidden",
  summaryClassName: "hidden",
  dietaryClassName: "mt-[6px] flex items-center",
  gap: "4px",
};


