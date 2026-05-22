import { useQuery } from "@tanstack/react-query";
import { LOCATIONS } from "../config/locations";
import { fetchXml, fetchCsv } from "../lib/fetchMenu";
import { parseXml } from "../lib/parseXML";
import { parseCsv } from "../lib/parseCSV";
import type { MenuData } from "../lib/types";

type UseMenuOptions = {
  location: string;
  menuType?: string;
};

type UseMenuResult = {
  data: MenuData | null;
  sheetData: Array<Record<string, string>> | null;
  isLoading: boolean;
  error: unknown;
  sheetError: unknown;
};

export const useMenu = ({
  location,
  menuType,
}: UseMenuOptions): UseMenuResult => {
  const config = LOCATIONS[location];
  const normalizedMenuType = menuType?.toLowerCase().trim();

  const xmlQuery = useQuery({
    queryKey: ["menu-xml", location, normalizedMenuType],
    queryFn: async () => {
      const xmlText = await fetchXml(config.xmlUrl);
      return parseXml({ xmlText, menuTypeFilter: normalizedMenuType });
    },
    refetchInterval: 10 * 60_000,
    retry: 2,
  });

  const sheetQuery = useQuery({
    queryKey: ["menu-sheet", location],
    queryFn: async () => {
      if (!config.gid)
        throw new Error(`No gid configured for location: ${location}`);
      const csvText = await fetchCsv(config.gid);
      const parsed = parseCsv(csvText);
      console.log(`[useMenu] sheetData for ${location}:`, parsed);
      return parsed;
    },
    enabled: !!config.gid,
    retry: 1,
  });

  return {
    data: xmlQuery.data ?? null,
    sheetData: sheetQuery.data ?? null,
    isLoading: xmlQuery.isLoading,
    error: xmlQuery.error,
    sheetError: sheetQuery.error,
  };
};
