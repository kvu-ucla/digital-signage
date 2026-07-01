import type {
  MenuItemData,
  MenuData,
  StationWithRegion,
  MergedMenuData,
} from "./types";

export const mergeData = (
  menuData: MenuData,
  sheetRows: Array<Record<string, string>> | null,
): MergedMenuData => {
  const normalize = (value: string): string => value.toLowerCase().trim();

  const stationItemsLookup = new Map<
    string,
    { name: string; items: Array<MenuItemData> }
  >();

  for (const [stationName, items] of Object.entries(menuData.stations)) {
    stationItemsLookup.set(normalize(stationName), {
      name: stationName,
      items: [...items],
    });
  }

  const stationsWithRegions: Array<StationWithRegion> = [];

  if (sheetRows) {
    for (const row of sheetRows) {
      const sheetStationName = row["Menu_Meal_Option"]?.trim();
      if (!sheetStationName) continue;

      const normalizedStationName = normalize(sheetStationName);

      const regionPositionRaw = row["Region Position"]?.trim();
      if (!regionPositionRaw || regionPositionRaw.toLowerCase() === "none") {
        continue;
      }

      const matchingStation = stationItemsLookup.get(normalizedStationName);
      if (!matchingStation) continue;

      const parsedRegionPosition = parseInt(regionPositionRaw, 10);
      const parsedRegionOrder = parseInt(row["Region Order"] ?? "0", 10);

      stationsWithRegions.push({
        name: matchingStation.name,
        items: matchingStation.items,
        regionPosition: Number.isNaN(parsedRegionPosition)
          ? 1
          : parsedRegionPosition,
        regionOrder: Number.isNaN(parsedRegionOrder) ? 0 : parsedRegionOrder,
      });
    }
  }

  stationsWithRegions.sort((a, b) => {
    if (a.regionPosition !== b.regionPosition) {
      return a.regionPosition - b.regionPosition;
    }

    return a.regionOrder - b.regionOrder;
  });

  return {
    ...menuData,
    stationsWithRegions,
  };
};
