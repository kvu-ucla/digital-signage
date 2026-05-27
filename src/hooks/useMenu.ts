import { useQuery } from "@tanstack/react-query";
import { LOCATIONS } from "../config/locations";
import { fetchXml, fetchCsv } from "../lib/fetchMenu";
import { parseXml } from "../lib/parseXML";
import { parseCsv } from "../lib/parseCSV";
import { mergeData } from "../lib/mergeData";
import type { MergedMenuData } from "../lib/mergeData";

type UseMenuOptions = {
  location: string;
  menuType?: string;
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
  
  const normalizedMenuType = menuType?.toLowerCase().trim();

  const xmlQuery = useQuery({
    queryKey: ["menu-xml", location, normalizedMenuType],
    queryFn: async () => {
      const xmlText = await fetchXml(config.xmlUrl);
      return parseXml({ xmlText, menuTypeFilter: normalizedMenuType });
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
    retry: 1,
  });

  const mergedData: MergedMenuData | null =
    xmlQuery.data && sheetQuery.data
      ? mergeData(xmlQuery.data, sheetQuery.data)
      : xmlQuery.data
        ? mergeData(xmlQuery.data, null)
        : null;

  return {
    data: mergedData,
    isLoading: xmlQuery.isLoading,
    error: xmlQuery.error,
  };
};
