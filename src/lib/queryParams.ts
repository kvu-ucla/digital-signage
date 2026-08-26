export function normalizeParam(value: string | null): string | null {
  if (!value) return null;
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

export function getMenuType(): string | null {
  const params = new URLSearchParams(window.location.search);
  const rawParam = normalizeParam(params.get("menu"));
  // Older sign URLs use "late night"; the feed's meal type is "latenight".
  const menuParam = rawParam === "late night" ? "latenight" : rawParam;

  // Valid meal types: breakfast, lunch, dinner, latenight, all day
  const validMealTypes = ["breakfast", "lunch", "dinner", "latenight", "all day"];
  if (menuParam && validMealTypes.includes(menuParam)) {
    return menuParam;
  }

  return null;
}

export function getDisplayMode(): { isMinimal: boolean } {
  const params = new URLSearchParams(window.location.search);
  const isMinimal = params.get("minimal") === "true";
  return { isMinimal };
}
