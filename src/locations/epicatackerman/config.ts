import type { LegendConfig, MenuItemConfig } from "@/lib/types";

export const PAGE_CONFIG: Record<
  string,
  { regions: Array<number>; type: "horizontal" }
> = {
  "left": { regions: [1, 2, 3], type: "horizontal" },  
  "center": { regions: [4, 5, 6], type: "horizontal" },  
  "right": { regions: [7, 8, 9, 10, 11, 12], type: "horizontal" },
};
