import type { LegendConfig, MenuItemConfig } from "../lib/types";

export const LEGEND_CONFIG: LegendConfig = {
    color: "#4d4d4f",
    mode: "light",
    font: "Klinic Slab",
    fontSize: "21px",
    gap: "6px",
    gapItems: "15px",
    rowGap: "10px",
    imgSize: "25px",
}

export const HORIZONTAL_LEGEND_CONFIG: LegendConfig = {
    color: "#4d4d4f",
    mode: "light",
    font: "Klinic Slab",
    fontSize: "18px",
    gap: "4px",
    gapItems: "10px",
    rowGap: "10px",
    imgSize: "24px",
    description: "Please refer to dining.ucla.edu/menu for allergen and nutritional information.",
}

export const MENU_ITEM_CONFIG: MenuItemConfig = {
    gap: "10px",
    divClassName: "flex w-full flex-col items-center gap-[5px] text-center",
    itemClassName: "m-0 max-w-[420px] text-center text-[28px] font-bold leading-[1.08] [font-family:var(--font-display)]",
    dietaryClassName: "flex flex-wrap items-center justify-center gap-[10px] leading-none",
}
