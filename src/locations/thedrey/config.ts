import type { LegendConfig, MenuItemConfig } from "@/lib/types";

/** Values transcribed from the retired hand-rolled DreyLegend so the shared
 *  DietaryLegend renders the same 20px light icons / 18px labels. */
export const LEGEND_CONFIG: LegendConfig = {
  labelColor: "#32302b",
  mode: "light",
  font: "var(--drey-font)",
  itemFontSize: "18px",
  itemFontWeight: 400,
  gap: "5px",
  gapItems: "16px",
  rowGap: "8px",
  imgSize: "20px",
};

export const MENU_ITEM_CONFIG: MenuItemConfig = {
  gap: "5px",
  divClassName: "break-inside-avoid",
  itemClassName:
    "break-words text-[27px] font-medium leading-[1.1] text-[#554727]",
  dietaryClassName: "mt-[4px] mb-[12px] flex flex-wrap gap-[5px] leading-none",
};

/**
 * The Drey's sheet (gid 1751470329) reuses region positions 1/2 on every page,
 * distinguished only by its Page column — which mergeData does not read.
 * Screens therefore select their stations by (normalized) name.
 */
export const PAGE_CONFIG: Record<
  string,
  { stations: ReadonlyArray<string> }
> = {
  "1": { stations: ["sandwiches", "salads", "sides"] },
  "2": { stations: ["bento boxes", "sushi", "noodle bowls"] },
};

/** Beverages are not in the XML feed — static content per the reference board. */
export const BEVERAGES: ReadonlyArray<{ name: string; options?: string }> = [
  { name: "Coffee" },
  { name: "Milk", options: "Non-Fat, Low-Fat (2%), Chocolate" },
  { name: "Vegan Milk", options: "Silk Vanilla Soy, Vanilla Almond, Oat" },
  { name: "Juice", options: "Orange, Apple" },
  { name: "Fountain Drinks" },
];

