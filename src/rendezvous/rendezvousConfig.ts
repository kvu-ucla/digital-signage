import type { LegendConfig, MenuItemConfig } from "../lib/types";

export const LEGEND_CONFIG: LegendConfig = {
    color: "#111111",
    mode: "dark",
    font: "Avenir Next",
    fontSize: "19px",
    gap: "10px",
    gapItems: "30px",
    rowGap: "10px",
    imgSize: "25px",
};

export const NAME_ONLY_CONFIG: MenuItemConfig = {
  divClassName: "",
  pricedivClassName: "",
  itemClassName:
    "m-0 text-[32px] uppercase leading-tight text-(--hall-color-1)",
  priceClassName: "hidden",
  summaryClassName: "hidden",
  dietaryClassName: "hidden",
  gap: "5px",
};

export const PRICED_ITEM_CONFIG: MenuItemConfig = {
  divClassName: "",
  pricedivClassName: "flex items-start gap-4",
  itemClassName:
    "m-0 max-w-[270px] text-[32px] uppercase leading-[0.95] text-(--hall-color-1)",
  priceClassName:
    "ml-auto shrink-0 whitespace-nowrap text-[32px] leading-none text-(--hall-color-1)",
  summaryClassName:
    "m-0 mt-[3px] text-[20px] leading-tight text-(--hall-color-1)",
  dietaryClassName: "mt-[4px] flex items-center",
  gap: "5px",
};

export const ICON_ITEM_CONFIG: MenuItemConfig = {
  divClassName: "",
  pricedivClassName: "flex items-start gap-3",
  itemClassName:
    "m-0 text-[30px] uppercase leading-[0.95] text-(--hall-color-1)",
  priceClassName:
    "ml-auto shrink-0 whitespace-nowrap text-[30px] leading-none text-(--hall-color-1)",
  summaryClassName:
    "m-0 mt-[3px] text-[19px] leading-tight text-(--hall-color-1)",
  dietaryClassName: "mt-[4px] flex items-center",
  gap: "5px",
};

export const COMPACT_PRICE_CONFIG: MenuItemConfig = {
  divClassName: "",
  pricedivClassName: "flex items-start gap-3",
  itemClassName:
    "m-0 text-[32px] uppercase leading-[0.95] text-(--hall-color-1)",
  priceClassName:
    "ml-auto shrink-0 whitespace-nowrap text-[32px] leading-none text-(--hall-color-1)",
  summaryClassName:
    "m-0 mt-[3px] text-[19px] leading-tight text-(--hall-color-1)",
  dietaryClassName: "mt-[4px] flex items-center",
  gap: "5px",
};