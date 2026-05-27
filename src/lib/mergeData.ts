import type { MenuData, MenuItemData } from './types'

export type StationWithRegion = {
  name: string
  items: ReadonlyArray<MenuItemData>
  regionPosition: number
  regionOrder: number
}

export type MergedMenuData = MenuData & {
  stationsWithRegions: ReadonlyArray<StationWithRegion>
}

export const mergeData = (
  menuData: MenuData,
  sheetRows: Array<Record<string, string>> | null,
): MergedMenuData => {
  const regionLookup = new Map<
    string,
    { regionPosition: number; regionOrder: number }
  >()

  if (sheetRows) {
    for (const row of sheetRows) {
      const stationName = row['Menu_Meal_Option']?.toLowerCase().trim()
      if (!stationName) continue

      const regionPositionRaw = row['Region Position']?.trim().toLowerCase()
      if (!regionPositionRaw || regionPositionRaw === 'none') continue

      regionLookup.set(stationName, {
        regionPosition: parseInt(regionPositionRaw, 10) || 1,
        regionOrder: parseInt(row['Region Order'] ?? '0', 10) || 0,
      })
    }
  }

  const stationsWithRegions: Array<StationWithRegion> = []

  for (const [stationName, items] of Object.entries(menuData.stations)) {
    const region = regionLookup.get(stationName.toLowerCase().trim())
    if (!region) continue

    stationsWithRegions.push({
      name: stationName,
      items,
      regionPosition: region.regionPosition,
      regionOrder: region.regionOrder,
    })
  }

  stationsWithRegions.sort((a, b) => {
    if (a.regionPosition !== b.regionPosition) return a.regionPosition - b.regionPosition
    return a.regionOrder - b.regionOrder
  })

  return {
    ...menuData,
    stationsWithRegions,
  }
}
