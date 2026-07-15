import type { MenuItemConfig } from "@/lib/types";

export const PAGE_CONFIG: Record<
  string,
  { regions: Array<number>; type: "horizontal" }
> = {
  "left": { regions: [1, 2, 3], type: "horizontal" },  
  "center": { regions: [4, 5, 6], type: "horizontal" },  
  "right": { regions: [7, 8, 9, 10, 11, 12], type: "horizontal" },
};

export const MENU_ITEM_CONFIG: MenuItemConfig = {
  gap: "8px",
  divClassName: "",
  itemClassName:
    "max-w-[80%] break-words text-[24px] uppercase leading-none text-[#252525]",
  dietaryClassName: "mt-0.5 mb-4 flex flex-wrap gap-[5px] leading-none",
  priceClassName: "ml-auto shrink-0 whitespace-nowrap text-[24px] leading-none text-[#252525]",
  pricedivClassName: "flex w-full items-start gap-[4px]",
  summaryClassName: "mt-2 text-[24px] leading-tight text-[#252525]",
};

export type EpicAtAckermanLegendConfig = {
  titleName: string;
  titleFontSize: string;
  titleColor: string;
  rowGap: string;
  imgSize: string;
  iconLabelOffset: string;
  labelFontSize: string;
  labelColor: string;
  description?: string;
  descriptionFontSize?: string;
  descriptionColor?: string;
  descriptionPadding?: string;
}

export const LEGEND_CONFIG: EpicAtAckermanLegendConfig = {
  titleName: "DIETARY ICONS",
  titleFontSize: "24px",
  titleColor: "#1E355E",
  rowGap: "8px",
  imgSize: "36px",
  iconLabelOffset: "12px",
  labelFontSize: "24px",
  labelColor: "#252525",
  description: "For allergen and nutritional information, visit menu.dining.ucla.edu/Menus/EpicatAckerman",
  descriptionFontSize: "22px",
  descriptionColor: "#252525",
  descriptionPadding: "16px 0 16px 0",
};

export const keyContains = {
  Vegetarian: "Vegetarian",
  Vegan: "Vegan",
  Peanut: "Contains Peanuts",
  "Tree-Nuts": "Contains Tree Nuts",
  Wheat: "Contains Wheat",
  Gluten: "Contains Gluten",
  Soy: "Contains Soy",
  Sesame: "Contains Sesame Seeds",
  Dairy: "Contains Dairy",
  Eggs: "Contains Egg",
  "Crustacean-Shellfish": "Contains Shellfish",
  Fish: "Contains Fish",
  Alcohol: "Contains Ethanol-Alcohol",
  Halal: "Halal",
  "Low-Carbon-Footprint": "Low-Carbon Foodprint",
  "High-Carbon-Footprint": "High-Carbon Foodprint",
};
