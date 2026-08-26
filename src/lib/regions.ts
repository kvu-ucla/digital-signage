import type { MergedMenuData, StationWithRegion } from "@/lib/types";

export type RegionStation = {
  name: string;
  items: StationWithRegion["items"];
  order: number;
};

/**
 * Group `stationsWithRegions` by `regionPosition` into ordered columns.
 * Stations within a region are sorted by `regionOrder`; regions are returned
 * sorted by position ascending. Shared by the landscape EntranceScreen and
 * De Neve's portrait entrance.
 */
export function groupByRegion(
  stations: MergedMenuData["stationsWithRegions"],
): Array<[number, Array<RegionStation>]> {
  const map = new Map<number, Array<RegionStation>>();

  for (const { regionPosition, regionOrder, name, items } of stations) {
    if (!map.has(regionPosition)) map.set(regionPosition, []);
    map.get(regionPosition)?.push({ name, items, order: regionOrder });
  }

  for (const group of map.values()) {
    group.sort((a, b) => a.order - b.order);
  }

  return [...map.entries()].sort(([a], [b]) => a - b);
}