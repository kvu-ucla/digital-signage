import { useQuery } from '@tanstack/react-query';
import { fetchTimetable, parseMealTimeSchedule, getCurrentMealPeriods } from '@/lib/fetchTimetable';

type UseMealPeriodResult = {
  mealPeriod: string | null;
  isLoading: boolean;
};

function findLocationInTimetable(
    locationKey: string,
    timetableMap: Record<string, string | null>
): string | null {
  const normalizedKey = locationKey.toLowerCase().replace(/\s+/g, '');

  for (const [timetableName, period] of Object.entries(timetableMap)) {
    const normalizedTimetableName = timetableName.toLowerCase().replace(/\s+/g, '');
    if (normalizedKey === normalizedTimetableName) {
      return period;
    }
  }

  return null;
}

export function useMealPeriod(
    locationKey: string,
    manualOverride?: string | null
): UseMealPeriodResult {
  const { data, isLoading } = useQuery({
    queryKey: ['timetable'],
    queryFn: async () => {
      const csvText = await fetchTimetable();
      const schedule = parseMealTimeSchedule(csvText);

      return getCurrentMealPeriods(schedule);
    },
    staleTime: 0, // Always consider stale to ensure fresh meal period calculation
    refetchInterval: 3 * 60 * 1000,
    retry: 2,
  });

  if (manualOverride) {
    return { mealPeriod: manualOverride, isLoading: false };
  }

  if (isLoading || !data) {
    return { mealPeriod: null, isLoading };
  }

  const period = findLocationInTimetable(locationKey, data);

  console.log('[useMealPeriod]', {
    location: locationKey,
    period: period,
    time: new Date().toLocaleTimeString(),
  });

  return { mealPeriod: period, isLoading: false };
}