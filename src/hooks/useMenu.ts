import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { LOCATIONS } from "@/locations";
import { fetchXml, fetchCsv } from "@/lib/fetchMenu";
import { parseXml } from "@/lib/parseXML";
import { parseCsv } from "@/lib/parseCSV";
import { mergeData } from "@/lib/mergeData";
import type { MergedMenuData, MenuItemData } from "@/lib/types";

type UseMenuOptions = {
  location: string;
  menuType?: string | null;
};

type UseMenuResult = {
  data: MergedMenuData | null;
  isLoading: boolean;
  error: unknown;
};

export const useMenu = ({
  location,
  menuType,
}: UseMenuOptions): UseMenuResult => {
  const config = LOCATIONS[location];

  if (!config) {
    throw new Error(`Invalid location: ${location}`);
  }

  const xmlQuery = useQuery({
    queryKey: ["menu-xml", location],
    queryFn: async () => {
      const xmlText = await fetchXml(config.xmlUrl);
      return parseXml({ xmlText });
    },
    refetchInterval: 5 * 60_000,
    retry: 2,
    enabled: true,
  });

  const sheetQuery = useQuery({
    queryKey: ["menu-sheet", location],
    queryFn: async () => {
      if (!config.gid)
        throw new Error(`No gid configured for location: ${location}`);
      const csvText = await fetchCsv(config.gid);
      const parsed = parseCsv(csvText);
      return parsed;
    },
    enabled: !!config.gid,
    refetchInterval: 3 * 60_000, // Refetch every 3 minutes
    retry: 1,
  });

  const mergedData = useMemo<MergedMenuData | null>(() => {
    let data = xmlQuery.data;

    if (!data) return null;

    // If menuType is explicitly null (location closed), return empty data
    if (menuType === null) {
      return {
        ...data,
        stations: {},
        stationsWithRegions: [],
      };
    }

    // Skip filtering for "all day" (used by Cafe 1919 when open)
    // The items will already be tagged as "all day" in XML, so filter for that
    if (menuType === "all day") {
      const normalizedMenuType = "all day";
      const filteredStations: Record<string, ReadonlyArray<MenuItemData>> = {};

      for (const [stationName, items] of Object.entries(data.stations)) {
        // For "all day", include items tagged as "all day" OR items with no meal type
        const filteredItems = items.filter(
          (item) => !item.mealType || item.mealType === normalizedMenuType,
        );
        if (filteredItems.length > 0) {
          filteredStations[stationName] = filteredItems;
        }
      }

      data = {
        ...data,
        stations: filteredStations,
      };
    } else if (menuType) {
      // Filter by meal type for dining halls
      const normalizedMenuType = menuType.toLowerCase().trim();
      const filteredStations: Record<string, ReadonlyArray<MenuItemData>> = {};

      for (const [stationName, items] of Object.entries(data.stations)) {
        const filteredItems = items.filter(
          (item) => item.mealType === normalizedMenuType,
        );
        if (filteredItems.length > 0) {
          filteredStations[stationName] = filteredItems;
        }
      }

      data = {
        ...data,
        stations: filteredStations,
      };
    }

    if (sheetQuery.data) {
      return mergeData(data, sheetQuery.data);
    }
    return mergeData(data, null);
  }, [xmlQuery.data, sheetQuery.data, menuType]);

  return {
    data: mergedData,
    isLoading: xmlQuery.isLoading,
    error: xmlQuery.error,
  };
};
