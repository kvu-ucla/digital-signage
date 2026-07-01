import type {
  MenuItemData,
  SheetData,
  StationConfig,
  StationWithRegion,
  MergedMenuData,
} from "@/lib/types";

export type Cafe1919DisplayId = "Mains" | "Sides" | "Late Night" | "Specials";

export function fillConfig(
  displayId: Cafe1919DisplayId,
  data: MergedMenuData,
): Array<StationWithRegion> {
  return data.stationsWithRegions.map((station) => {
    const rawItems = [...(data.stations[station.name] ?? station.items)];

    let items: Array<MenuItemData>;

    if (
      station.name.toUpperCase() === "DAILY SPECIALS" &&
      displayId === "Sides"
    ) {
      const dayName = new Date()
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 3);
      items = rawItems.filter((item) => item.name.startsWith(dayName));
    } else {
      items = rawItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    return { ...station, items };
  });
}

export function filterRegionsWithPlaceholders(
  expectedRegions: ReadonlyArray<number>,
  stationsWithRegions: ReadonlyArray<StationWithRegion>,
): ReadonlyArray<StationWithRegion> {
  const regionIndex = new Map<number, StationWithRegion>();
  for (const station of stationsWithRegions) {
    regionIndex.set(station.regionPosition, station);
  }

  return expectedRegions.map((position) => {
    const existing = regionIndex.get(position);
    if (existing) return existing;

    return {
      name: "",
      items: [],
      regionPosition: position,
      regionOrder: 0,
    };
  });
}

export function regionToPage(
  sheetData: SheetData,
): Record<Cafe1919DisplayId, StationConfig> {
  const pages: Record<Cafe1919DisplayId, StationConfig> = {
    Mains: { "2": [], "3": [], "4": [] },
    Sides: { "6": [], "7": [], "8": [] },
    "Late Night": { "10": [], "11": [], "12": [] },
    Specials: { "13": [] },
  };

  for (const row of sheetData) {
    const stationRaw = row[1];
    const positionRaw = row[2];
    const pos = Number(positionRaw);

    if (!stationRaw || !pos) continue;

    let station = stationRaw.toUpperCase();

    if (pos >= 2 && pos <= 4) {
      if (station === "PRETZEL SAUCE") station = "SC PRETZEL SAUCE";
      pages.Mains[String(pos)]?.push(station);
    } else if (pos >= 6 && pos <= 8) {
      if (station === "SC SALAD DRESSINGS") station = "SALAD DRESSINGS";
      else if (station === "SPECIALS") station = "DAILY SPECIALS";
      pages.Sides[String(pos)]?.push(station);
    } else if (pos >= 10 && pos <= 12) {
      pages["Late Night"][String(pos)]?.push(station);
    } else if (pos === 13) {
      pages.Specials[String(pos)]?.push(station);
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
