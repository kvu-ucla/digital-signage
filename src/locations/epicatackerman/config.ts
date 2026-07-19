import type { MenuItemConfig } from "@/lib/types";

export const PAGE_CONFIG: Record<
  string,
  { regions: Array<number>; type: "horizontal" }
> = {
  "left": { regions: [1, 2, 3], type: "horizontal" },  
  "center": { regions: [4, 5, 6], type: "horizontal" },  
  "right": { regions: [7, 8, 9], type: "horizontal" },
};

export const MENU_ITEM_CONFIG: MenuItemConfig = {
  gap: "8px",
  divClassName: "flex flex-col gap-[8px] w-full",
  itemClassName:
    "flex-1 min-w-0 break-words text-[26px] capitalize font-bold leading-[1.2] text-[#252525]",
  dietaryClassName: "flex flex-wrap gap-[8px] leading-none",
  priceClassName: "ml-auto shrink-0 whitespace-nowrap text-[26px] font-bold leading-[1.2] text-[#252525]",
  pricedivClassName: "flex w-full items-start gap-[4px]",
  summaryClassName: "text-[26px] leading-[1.3] text-[#252525]",
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
