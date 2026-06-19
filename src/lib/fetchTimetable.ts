/* 
Example output for if checked at 2:29 PM

{
  BruinCafe: "lunch",
  BruinPlate: "lunch",
  Cafe1919: null,
  CovelEpicuria: "lunch",
  DeNeveDining: "lunch",
  EpicatAckerman: null,
  FacultyClub: null,
  FeastatRieber: "lunch",
  GeffenAcademy: null,
  HedrickStudy: null,
  Rendezvous: null,
  TheDrey: "lunch",
}
*/

import { fetchCsv } from './fetchMenu'
import type { MealTimeSchedule, MealPeriodTimes } from './types'

const GID = '1246955051';

export const fetchTimetable = async (): Promise<string> => {
  const csvText = await fetchCsv(GID);
  return csvText;
};

const MEAL_PERIODS: Array<{ key: keyof MealPeriodTimes; label: string }> = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
  { key: 'latenight', label: 'LateNight' },
];

export const parseMealTimeSchedule = (csvText: string): MealTimeSchedule => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return {};

  const headerLine = lines[0];
  if (!headerLine) return {};

  const headers: Array<string> = headerLine.split(',').map(h => h.trim());

  const findCol = (name: string): number | null => {
    const idx = headers.indexOf(name);
    return idx !== -1 ? idx : null;
  };

  const locationCol = findCol('Location');
  if (locationCol === null) {
    console.warn('parseMealTimeSchedule: Could not find "Location" column');
    return {};
  }

  const schedule: MealTimeSchedule = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const cols: Array<string> = line.split(',').map(c => c.trim());
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
