import type { StationWithRegion } from "@/lib/types";

/**
 * For a page's expected region positions, return *every* station in each region
 * — a region can hold multiple sections (e.g. "Beverage Selections" and
 * "Beer & Wine" both live on region 8), and all should render in that column —
 * substituting an empty placeholder for any region the feed hasn't filled, so
 * the grid keeps its column slots.
 */
export function filterRegionsWithPlaceholders(
  expectedRegions: ReadonlyArray<number>,
  stationsWithRegions: ReadonlyArray<StationWithRegion>,
): ReadonlyArray<StationWithRegion> {
  const byRegion = new Map<number, Array<StationWithRegion>>();

  for (const station of stationsWithRegions) {
    const group = byRegion.get(station.regionPosition);
    if (group) group.push(station);
    else byRegion.set(station.regionPosition, [station]);
  }

  return expectedRegions.flatMap((position) => {
    const stations = byRegion.get(position)?.filter((s) => s.name.trim());
    if (stations && stations.length > 0) return stations;

    return [{ name: "", items: [], regionPosition: position, regionOrder: 0 }];
  });
}
