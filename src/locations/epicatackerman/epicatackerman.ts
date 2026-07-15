import type {
  MenuItemData,
  StationConfig,
  StationWithRegion,
  MergedMenuData,
} from "@/lib/types";

export type EpicAtAckermanDisplayId = "Left" | "Center" | "Right";

export const regionToPage: Record<EpicAtAckermanDisplayId, StationConfig> = {
  Left: { "1": [], "2": [], "3": [] },
  Center: { "4": [], "5": [], "6": [] },
  Right: { "7": [], "8": [], "9": [], "10": [], "11": [], "12": [] },
}

const normalize = (value: string): string => value.toLowerCase().trim();

export const getStationItems = (
  data: MergedMenuData,
  stationName: string,
): Array<MenuItemData> => {
  const normalizedStationName = normalize(stationName);

  const matchingStation = Object.entries(data.stations).find(
    ([name]): boolean => normalize(name) === normalizedStationName,
  );

  return matchingStation ? [...matchingStation[1]] : [];
};

export function fillConfig(data: MergedMenuData): Array<StationWithRegion> {
  return data.stationsWithRegions.map((station) => {
    const rawItems = [...(data.stations[normalize(station.name)] ?? station.items)];

    let items: Array<MenuItemData>;

    items = rawItems.sort((a, b) => a.name.localeCompare(normalize(b.name)));

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
    if (existing && existing.name.trim() ) return existing;

    return { 
      name: "",
      items: [],
      regionPosition: position,
      regionOrder: 0,
    };
  });
}