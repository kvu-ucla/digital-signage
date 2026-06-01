import type {
  MenuItemData,
  SheetData,
  StationConfig,
  MergedMenuData,
} from "../../lib/types";

export type Cafe1919DisplayId = "Mains" | "Sides" | "Late Night" | "Specials";

export function fillConfig(
  displayId: Cafe1919DisplayId,
  config: StationConfig,
  filtered: MenuItemData[],
): MergedMenuData {
  const itemsByStation: Record<string, MenuItemData[]> = {};

  for (const item of filtered) {
    const station = item.facets.station.toUpperCase();

    if (station === "DAILY SPECIALS" && displayId === "Sides") {
      const dayName = new Date()
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 3);

      if (!item.title.startsWith(dayName)) continue;
    }

    if (!itemsByStation[station]) itemsByStation[station] = [];
    itemsByStation[station].push(item);
  }

  const stationsWithRegions: MergedMenuData["stationsWithRegions"] = [];

  for (const [positionString, stations] of Object.entries(config)) {
    const regionPosition = Number(positionString);

    stations.forEach((station, index) => {
      const stationKey = station.toUpperCase();
      const rawItems = itemsByStation[stationKey] || [];

      const items =
        stationKey === "DAILY SPECIALS"
          ? rawItems
          : [...rawItems].sort((a, b) => a.title.localeCompare(b.title));

      stationsWithRegions.push({
        name: stationKey,
        regionPosition,
        regionOrder: index,
        items,
      });
    });
  }

  return {
    stationsWithRegions,
  };
}

export function regionToPage(
  sheetData: SheetData,
): Record<Cafe1919DisplayId, StationConfig> {
  const pages: Record<Cafe1919DisplayId, StationConfig> = {
    Mains: { 2: [], 3: [], 4: [] },
    Sides: { 6: [], 7: [], 8: [] },
    "Late Night": { 10: [], 11: [], 12: [] },
    Specials: { 13: [] },
  };

  for (const row of Object.values(sheetData || [])) {
    let station = row[1];
    const position = row[2];
    const pos = Number(position);

    if (!station || !pos) continue;

    station = station.toUpperCase();

    if (pos >= 2 && pos <= 4) {
      if (station === "PRETZEL SAUCE") station = "SC PRETZEL SAUCE";
      pages.Mains[pos].push(station);
    } else if (pos >= 6 && pos <= 8) {
      if (station === "SC SALAD DRESSINGS") station = "SALAD DRESSINGS";
      else if (station === "SPECIALS") station = "DAILY SPECIALS";

      pages.Sides[pos].push(station);
    } else if (pos >= 10 && pos <= 12) {
      pages["Late Night"][pos].push(station);
    } else if (pos === 13) {
      pages.Specials[pos].push(station);
    }
  }

  return pages;
}

export function displayTitleForStation(station: string): string {
  if (station === "SC PRETZEL SAUCE") return "PRETZEL SAUCE";
  if (station === "SC SALAD DRESSINGS") return "SALAD DRESSINGS";
  if (station === "DAILY SPECIALS") return "SPECIALS";

  return station;
}