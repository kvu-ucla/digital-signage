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
