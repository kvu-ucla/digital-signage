import { useQuery } from "@tanstack/react-query";
import {
  fetchTimetable,
  parseMealTimeSchedule,
  getCurrentMealPeriods,
} from "@/lib/fetchTimetable";
import { getDelayToNext3MinMark } from "@/lib/syncedRefetch";
import type { MealPeriod, MealTimeMap } from "@/lib/types";

type UseMealPeriodResult = {
  mealPeriod: MealPeriod | null;
  isLoading: boolean;
};

function findLocationInTimetable(
  locationKey: string,
  timetableMap: MealTimeMap,
): MealPeriod | null {
  const normalizedKey = locationKey.toLowerCase().replace(/\s+/g, "");

  for (const [timetableName, period] of Object.entries(timetableMap)) {
    const normalizedTimetableName = timetableName
      .toLowerCase()
      .replace(/\s+/g, "");
    if (normalizedKey === normalizedTimetableName) {
      return period;
    }
  }

  return null;
}

export function useMealPeriod(
  locationKey: string,
  manualOverride?: MealPeriod | null,
): UseMealPeriodResult {
  const { data, isLoading } = useQuery({
    queryKey: ["timetable"],
    queryFn: async () => {
      const csvText = await fetchTimetable();
      const schedule = parseMealTimeSchedule(csvText);

      return getCurrentMealPeriods(schedule);
    },
    staleTime: 2 * 60 * 1000,
    refetchInterval: getDelayToNext3MinMark,
    retry: 2,
  });

  if (manualOverride) {
    return { mealPeriod: manualOverride, isLoading: false };
  }

  if (isLoading || !data) {
    return { mealPeriod: null, isLoading };
  }

  const period = findLocationInTimetable(locationKey, data);

  console.log("[useMealPeriod]", {
    location: locationKey,
    period: period,
  });

  return { mealPeriod: period, isLoading: false };
}
