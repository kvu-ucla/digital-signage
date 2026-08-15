import type { MenuItemData, MergedMenuData } from "../../../lib/types";
import { isMockMode } from "@/lib/mockMode";

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

export const formatScreenTitle = (station: string): string => {
  if (!station.trim()) return "Build Your Own";

  return station.replaceAll("-", " ").replaceAll("_", " ").replaceAll("+", " ");
};

/** Dummy data is a formatting aid only — it renders solely in mock mode
 *  (?mock=true). Live boards show the real feed, even when it's empty. */
export const withFallback = (
  items: Array<MenuItemData>,
  fallback: ReadonlyArray<MenuItemData>,
): Array<MenuItemData> =>
  items.length > 0 || !isMockMode() ? items : [...fallback];
