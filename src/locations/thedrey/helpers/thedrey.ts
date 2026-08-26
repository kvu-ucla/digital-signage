import type { MergedMenuData, StationWithRegion } from "@/lib/types";

const normalize = (value: string): string => value.toLowerCase().trim();

/** Keep only the stations belonging to the current page, by normalized name. */
export function stationsForPage(
  pageStations: ReadonlyArray<string>,
  stationsWithRegions: MergedMenuData["stationsWithRegions"],
): ReadonlyArray<StationWithRegion> {
  const wanted = new Set(pageStations.map(normalize));
  return stationsWithRegions.filter((station) =>
    wanted.has(normalize(station.name)),
  );
}

const TITLE_OVERRIDES: Record<string, string> = {
  "bento boxes": "BENTOS",
};

export function displayTitleForStation(station: string): string {
  return TITLE_OVERRIDES[normalize(station)] ?? station.toUpperCase();
}
