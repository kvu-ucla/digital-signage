import { fetchCsv } from "./fetchMenu";
import type { MealTimeSchedule, MealPeriodTimes, MealTimeMap } from "./types";

const GID = "1246955051";

export const fetchTimetable = async (): Promise<string> => {
  const csvText = await fetchCsv(GID);
  return csvText;
};

const MEAL_PERIODS: Array<{ key: keyof MealPeriodTimes; label: string }> = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "latenight", label: "LateNight" },
];

export const parseMealTimeSchedule = (csvText: string): MealTimeSchedule => {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return {};

  const headerLine = lines[0];
  if (!headerLine) return {};

  const headers: Array<string> = headerLine.split(",").map((h) => h.trim());

  const findCol = (name: string): number | null => {
    const idx = headers.indexOf(name);
    return idx !== -1 ? idx : null;
  };

  const locationCol = findCol("Location");
  if (locationCol === null) {
    return {};
  }

  const schedule: MealTimeSchedule = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const cols: Array<string> = line.split(",").map((c) => c.trim());
    const hallName = cols[locationCol];
    if (!hallName) continue;

    const mealTimes: MealPeriodTimes = {
      breakfast: null,
      lunch: null,
      dinner: null,
      latenight: null,
    };

    for (const period of MEAL_PERIODS) {
      const startCol = findCol(`${period.label}Start`);
      const endCol = findCol(`${period.label}End`);
      if (startCol === null || endCol === null) continue;

      const startStr = cols[startCol]?.trim();
      const endStr = cols[endCol]?.trim();
      if (startStr && endStr) {
        mealTimes[period.key] = { start: startStr, end: endStr };
      }
    }

    schedule[hallName] = mealTimes;
  }

  return schedule;
};

function parseTime(timeStr: string): { hours: number; minutes: number } | null {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match || !match[1] || !match[2] || !match[3]) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}

function isCurrentlyInPeriod(
  start: string,
  end: string,
  now: Date = new Date(),
): boolean {
  const startTime = parseTime(start);
  const endTime = parseTime(end);

  if (!startTime || !endTime) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = startTime.hours * 60 + startTime.minutes;
  let endMinutes = endTime.hours * 60 + endTime.minutes;

  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60;
    if (currentMinutes < startMinutes) {
      const adjustedCurrent = currentMinutes + 24 * 60;
      return adjustedCurrent >= startMinutes && adjustedCurrent < endMinutes;
    }
  }

  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

export function getCurrentMealPeriods(
  schedule: MealTimeSchedule,
  now: Date = new Date(),
): MealTimeMap {
  const result: MealTimeMap = {};

  for (const [locationName, mealTimes] of Object.entries(schedule)) {
    let currentPeriod: string | null = null;

    const periods: Array<keyof MealPeriodTimes> = [
      "breakfast",
      "lunch",
      "dinner",
      "latenight",
    ];
    for (const period of periods) {
      const times = mealTimes[period];
      if (times && isCurrentlyInPeriod(times.start, times.end, now)) {
        currentPeriod = period;
        break;
      }
    }

    result[locationName] = currentPeriod;
  }

  return result;
}
