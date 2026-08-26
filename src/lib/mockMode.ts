import type { MenuItemData, MergedMenuData } from "./types";

export const isMockMode = (): boolean =>
  new URLSearchParams(window.location.search).get("mock") === "true";

export const MOCK_ITEM: MenuItemData = {
  recipeNumber: "mock-001",
  name: "A Really Really Long Menu Item (Sometimes There's Random Extra Info)",
  description:
    "Items are subject to change based on availability without prior notice. Sometimes the descriptions get super super duper lengthy and really detailed",
  price: null,
  dietaryLabels: [
    "Gluten",
    "Wheat",
    "Dairy",
    "Eggs",
    "Soy",
    "Fish",
    "Crustacean-Shellfish",
    "Peanut",
    "Tree-Nuts",
    "Sesame",
    "Alcohol",
  ],
  mealType: "lunch",
};

const mockItems = (): Array<MenuItemData> =>
  Array.from({ length: 10 }, (_, i) => ({
    ...MOCK_ITEM,
    recipeNumber: `mock-${i.toString().padStart(3, "0")}`,
    description: `Mock item ${i.toString().padStart(3, "0")} short description`,
  }));

export function applyMockData(data: MergedMenuData): MergedMenuData {
  return {
    ...data,
    stations: Object.fromEntries(
      Object.keys(data.stations).map((key) => [key, mockItems()]),
    ),
    stationsWithRegions: data.stationsWithRegions.map((s) => ({
      ...s,
      items: mockItems(),
    })),
  };
}
