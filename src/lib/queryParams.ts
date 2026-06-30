import { MEAL_PERIODS, type MealPeriod } from "./types";

export function normalizeParam(value: string | null): string | null {
  if (!value) return null;
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

export function getMenuType(): MealPeriod | null {
  const params = new URLSearchParams(window.location.search);
  const menuParam = normalizeParam(params.get("menu"));

  // Validate that it's a valid MealPeriod using the constant array
  if (menuParam && MEAL_PERIODS.includes(menuParam as MealPeriod)) {
    return menuParam as MealPeriod;
  }

  return null;
}

export function getDisplayMode(): { isMinimal: boolean } {
  const params = new URLSearchParams(window.location.search);
  const isMinimal = params.get("minimal") === "true";
  return { isMinimal };
}
