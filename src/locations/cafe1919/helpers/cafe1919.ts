import type { StationWithRegion } from "@/lib/types";

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

export function displayTitleForStation(station: string): string {
  if (station === "SC PRETZEL SAUCE") return "PRETZEL SAUCE";
  if (station === "SC SALAD DRESSINGS") return "SALAD DRESSINGS";
  if (station === "DAILY SPECIALS") return "SPECIALS";
  return station;
}
