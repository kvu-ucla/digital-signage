export type ScreenType = 'horizontal' | 'vertical' | 'entrance'

export type LegendConfig = {
  color: string;
  mode: "light" | "dark";
  font: string;
  fontSize: string;
  gap: string;
  gapItems: string;
  rowGap: string;
  imgSize: string;
  className?: string;
  description?: string;
}

export type MenuItemConfig = {
  gap: string
  divClassName: string,
  itemClassName: string,
  dietaryClassName: string,

  priceClassName?: string //set to hidden if no price
  pricedivClassName?: string, //set to empty string if no price

  summaryClassName?: string, //set to hidden if no summary
}

export type MenuItemData = {
  recipeNumber: string
  name: string
  description: string | null
  price: string | null
  dietaryLabels: ReadonlyArray<string>
}

export type MenuData = {
  serveDate: string
  locationNumber: string
  menuType: string
  stations: Record<string, ReadonlyArray<MenuItemData>>
}

export type LocationConfig = {
  displayName: string
  xmlUrl: string
  gid?: string
  stylesheet?: string
  screens?: Record<string, {
    menus?: ReadonlyArray<string>
    type: ScreenType
    requiresStation: boolean
    stations?: ReadonlyArray<string>
  }>
}

export type StationWithRegion = {
  name: string
  items: ReadonlyArray<MenuItemData>
  regionPosition: number
  regionOrder: number
}

export type MergedMenuData = MenuData & {
  stationsWithRegions: ReadonlyArray<StationWithRegion>
}

export type SheetRow = Array<string>;
export type SheetData = Array<SheetRow>;
export type StationItems = Record<string, Array<MenuItemData>>;
export type StationConfig = Record<string, Array<string>>;