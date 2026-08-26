import { useQuery } from '@tanstack/react-query';
import { fetchTimetable, parseMealTimeSchedule, getCurrentMealPeriods } from '@/lib/fetchTimetable';
import { readCache, writeCache } from '@/lib/persistentCache';
import { LOCATIONS } from '@/locations';

type UseMealPeriodResult = {
  /** Active period name; null when the timetable confirms the location is
   *  closed; undefined when the answer is unknown (no timetable row for this
   *  location, or the timetable itself is unavailable). Unknown must not be
   *  treated as closed — downstream it means "show the full menu", so a
   *  missing row or a sheet outage never blanks a live board. */
  mealPeriod: string | null | undefined;
  isLoading: boolean;
};

function findLocationInTimetable(
    locationKey: string,
    timetableMap: Record<string, string | null>
): string | null | undefined {
  const normalizedKey = locationKey.toLowerCase().replace(/\s+/g, '');

  for (const [timetableName, period] of Object.entries(timetableMap)) {
    const normalizedTimetableName = timetableName.toLowerCase().replace(/\s+/g, '');
    if (normalizedKey === normalizedTimetableName) {
      return period;
    }
  }

  return undefined;
}

export function useMealPeriod(
    locationKey: string,
    manualOverride?: string | null
): UseMealPeriodResult {
  const { data, isLoading } = useQuery({
    queryKey: ['timetable'],
    queryFn: async () => {
      const csvText = await fetchTimetable();
      writeCache('timetable', csvText);
      const schedule = parseMealTimeSchedule(csvText);

      return getCurrentMealPeriods(schedule);
    },
    // Seed from the last fetched timetable so reloads skip the loading
    // screen. Only the raw CSV is cached — the current period is always
    // recomputed from the clock, never restored stale.
    initialData: () => {
      const cached = readCache('timetable');
      if (!cached) return undefined;
      return getCurrentMealPeriods(parseMealTimeSchedule(cached));
    },
    initialDataUpdatedAt: 0,
    staleTime: 0, // Always consider stale to ensure fresh meal period calculation
    refetchInterval: 3 * 60 * 1000,
    retry: 2,
  });

  if (manualOverride) {
    return { mealPeriod: manualOverride, isLoading: false };
  }

  if (isLoading) {
    return { mealPeriod: null, isLoading };
  }

  // Timetable unavailable (fetch failed, no cache): unknown, not closed.
  if (!data) {
    return { mealPeriod: undefined, isLoading: false };
  }

  const timetableKey = LOCATIONS[locationKey]?.timetableName ?? locationKey;
  const period = findLocationInTimetable(timetableKey, data);

  console.log('[useMealPeriod]', {
    location: locationKey,
    period: period,
    time: new Date().toLocaleTimeString(),
  });

  return { mealPeriod: period, isLoading: false };
}