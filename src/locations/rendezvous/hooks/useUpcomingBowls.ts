import { useQuery } from "@tanstack/react-query";
import { LOCATIONS } from "@/locations";
import { fetchXml } from "@/lib/fetchMenu";
import { parseXml } from "@/lib/parseXML";
import { readCache, writeCache } from "@/lib/persistentCache";

export type UpcomingBowl = {
  name: string;
  /** Raw feed date, MM/DD/YYYY — formatting is a display concern. */
  serveDate: string;
};

/** The one station whose single recipe is the bowl of the day. */
const BOWL_STATION = "asian daily special";

/** Jamix serves today at the base URL and +1..+6 days at /1../6. */
const DAY_OFFSETS = [0, 1, 2, 3, 4, 5, 6] as const;

const CACHE_KEY = "bowls:rendezvous";

const fetchDay = async (
  xmlUrl: string,
  offset: number,
): Promise<UpcomingBowl | null> => {
  const url = offset === 0 ? xmlUrl : `${xmlUrl}/${offset}`;
  const menu = parseXml({ xmlText: await fetchXml(url) });
  const bowl = menu.stations[BOWL_STATION]?.[0];
  return bowl ? { name: bowl.name, serveDate: menu.serveDate } : null;
};

export function useUpcomingBowls(): {
  bowls: ReadonlyArray<UpcomingBowl>;
  isLoading: boolean;
} {
  const xmlUrl = LOCATIONS["rendezvous"]?.xmlUrl ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["upcoming-bowls", "rendezvous"],
    queryFn: async () => {
      const settled = await Promise.allSettled(
        DAY_OFFSETS.map((offset) => fetchDay(xmlUrl, offset)),
      );
      // A total failure must reject (not return []) so react-query retries,
      // keeps the last-good data on error, and the cache isn't clobbered.
      if (settled.every((r) => r.status === "rejected")) {
        throw new Error("All upcoming-bowl feeds failed");
      }
      // Failed or bowl-less days are simply omitted (offsets stay ordered).
      const bowls = settled
        .filter(
          (r): r is PromiseFulfilledResult<UpcomingBowl | null> =>
            r.status === "fulfilled",
        )
        .map((r) => r.value)
        .filter((b): b is UpcomingBowl => b !== null);
      writeCache(CACHE_KEY, JSON.stringify(bowls));
      return bowls;
    },
    // Seed from the last successful run so playlist reloads paint
    // immediately; updatedAt 0 marks it stale so a refetch fires on mount.
    initialData: () => {
      const cached = readCache(CACHE_KEY);
      if (!cached) return undefined;
      try {
        return JSON.parse(cached) as Array<UpcomingBowl>;
      } catch {
        return undefined;
      }
    },
    initialDataUpdatedAt: 0,
    refetchInterval: 5 * 60_000,
    retry: 2,
  });

  return { bowls: data ?? [], isLoading };
}
