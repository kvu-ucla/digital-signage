export type ScreenType = 'horizontal' | 'vertical' | 'entrance'

/**
 * Configuration for dietary legend.
 * @prop.labelColor - color for dietary label text
 * @prop.mode - "light" or "dark" mode for dietary icons
 * @prop.font - font family for dietary label text
 * @prop.itemFontSize - font size for dietary label text
 * @prop.itemFontWeight - font weight (bolding/regular/thin) for dietary label text
 * @prop.gap - gap between icon and label in each legend item
 * @prop.gapItems - horizontal gap between legend items ("column gap")
 * @prop.rowGap - vertical gap between rows oflegend items (if wrapped)
 * @prop.imgSize - size of dietary icon (width and height square)
 * @prop.font - font family for legend text
 * @prop.strongLetterSpacing - letter spacing for strong text (e.g. in description)
 * @prop.className
 * @prop.description - description text for horizontal, vertical screens. 
 * @prop.descriptionColor - color for description text, defaults to same as legend text color
 * @prop.descriptionFontSize - font size for description text, defaults to 22px
 */
export type LegendConfig = {
  labelColor: string;
  mode: "light" | "dark";
  font: string;
  itemFontSize: string;
  itemFontWeight: number;
  gap: string;
  gapItems: string;
  rowGap: string;
  imgSize: string;
  strongLetterSpacing?: string;
  className?: string;
  iconLabelOffset?: string;
  description?: string;
  descriptionColor?: string;
  descriptionFontSize?: string;
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