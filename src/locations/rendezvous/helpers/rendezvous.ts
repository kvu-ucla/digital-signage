import type { MenuItemData, MergedMenuData } from "../../../lib/types";

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
