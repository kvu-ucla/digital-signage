import type { ComponentType } from "react";
import type { MergedMenuData, MealPeriod } from "./types";

export type ScreenProps = {
  data: MergedMenuData;
  location: string;
  screenType: string;
  station: string;
  menuType: MealPeriod | null;
};

type ScreenModule = {
  default?: ComponentType<ScreenProps>;
  [key: string]: unknown;
};

const screenModules = import.meta.glob<ScreenModule>(
  "../locations/*/screens/*.tsx",
  {
    eager: true,
  },
);

console.log("Loaded screen modules:", Object.keys(screenModules));

const toPascalCase = (value: string): string =>
  value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

const getCandidates = (
  location: string,
  screenType: string,
  station: string | null,
): Array<string> => {
  const screenName = toPascalCase(screenType);

  if (!station) return [`../locations/${location}/screens/${screenName}.tsx`];

  const stationName = toPascalCase(station);
  return [
    `../locations/${location}/screens/${stationName}.tsx`,
    `../locations/${location}/screens/${screenName}.tsx`,
  ];
};

export const resolveScreen = (
  location: string,
  screenType: string,
  station: string | null,
): ComponentType<ScreenProps> | null => {
  const candidates = getCandidates(location, screenType, station);

  for (const path of candidates) {
    const module = screenModules[path];
    if (!module) continue;

    if (module.default) return module.default;

    const named = Object.values(module).find((v) => typeof v === "function");
    if (named) return named as ComponentType<ScreenProps>;
  }

  return null;
};

export const getScreenCandidates = (
  location: string,
  screenType: string,
  station: string | null,
): Array<string> => getCandidates(location, screenType, station);
