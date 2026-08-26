import type { MenuData, MenuItemData } from "./types";

const getTagText = (node: Element | Document, tag: string): string =>
  node.getElementsByTagName(tag).item(0)?.textContent.trim() ?? "";

const getTagNullableText = (
  node: Element | Document,
  tag: string,
): string | null => {
  const text = node.getElementsByTagName(tag).item(0)?.textContent.trim() ?? "";
  return text.length > 0 ? text : null;
};

const normalizeStationName = (raw: string): string =>
  raw.toLowerCase().trim().replace(/\s+/g, " ");

type ParseXmlOptions = {
  xmlText: string;
  menuTypeFilter?: string;
};

export const parseXml = ({
  xmlText,
  menuTypeFilter,
}: ParseXmlOptions): MenuData => {
  const doc = new DOMParser().parseFromString(xmlText, "application/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error(`XML parse error: ${parseError.textContent}`);
  }

  const serveDate = getTagText(doc, "Serve_Date");
  const locationNumber = getTagText(doc, "Location_Number");
  const menuType = getTagText(doc, "Menu_Type");

  const recipeEls = Array.from(doc.getElementsByTagName("recipe"));

  const stationMap = new Map<string, Array<MenuItemData>>();

  for (const recipeEl of recipeEls) {
    const itemMealType = getTagText(recipeEl, "Menu_Type").toLowerCase().trim();

    // Skip if we have a filter and this item doesn't match
    if (menuTypeFilter && itemMealType !== menuTypeFilter) continue;

    const stationName = normalizeStationName(
      getTagText(recipeEl, "Menu_Meal_Option"),
    );

    const dietaryLabels = Array.from(recipeEl.getElementsByTagName("Allergen"))
      .map((el) => el.textContent.trim())
      .filter((a) => a.length > 0);

    const item: MenuItemData = {
      recipeNumber: getTagText(recipeEl, "Recipe_Number"),
      name: getTagText(recipeEl, "Recipe_Print_As"),
      description: getTagNullableText(recipeEl, "Description"),
      price: getTagNullableText(recipeEl, "Sales_Price"),
      dietaryLabels,
      mealType: itemMealType,
    };

    const existing = stationMap.get(stationName);
    if (existing) {
      const isDuplicate = existing.some(
        (i) =>
          i.recipeNumber === item.recipeNumber && i.mealType === item.mealType,
      );
      if (!isDuplicate) existing.push(item);
    } else {
      stationMap.set(stationName, [item]);
    }
  }

  return {
    serveDate,
    locationNumber,
    menuType,
    stations: Object.fromEntries(stationMap),
  };
};
