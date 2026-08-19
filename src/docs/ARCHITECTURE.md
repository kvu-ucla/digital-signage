# Architecture

This document describes the overall architecture of the UCLA Dining digital signage web app. It covers the data flow, core data model, data fetching and parsing layers, hooks, screen resolution system, screen templates, location configuration, theming, auto-refresh/versioning, and testing.

## Overview

This web application uses React to render a full-screen menu display for a given dining location, specified by URL query parameters. All displays use these parameters to determine location, screen type, station, and optionally, a meal period; user interaction is not required. This app does not write any data and only displays data that it parses.

### Functionality

1. **`App.tsx`** reads the URL query string and normalizes the parameters (`location`, `screen`, `station`, `menu`, `mock`, `minimal`, `overlay-id`, `bg`). It looks up the location in the `LOCATIONS` configuration and dynamically loads the location's theme stylesheet.
2. **`useMealPeriod`** fetches a Google Sheet timetable, parses it into a schedule of meal-period start/end times per location, and determines the current meal period (or `null` if the location is closed). The `menu` override, which can be added to the URL manually, takes precedence.
3. **`useMenu`** fetches the location's Jamix XML feed and (if configured) a Google Sheet of station/region metadata. It parses both, filters items by the active meal period, and merges them into a `MergedMenuData` object.
4. **`useAutoRefresh`** periodically checks `version.json` for a new build and reloads the page when a new version is detected.
5. **`resolveScreen`** uses Vite to find and load the correct screen component for the location, screen type, and station.
6. The resolved **screen component** renders the menu using the menu components and the location's legend and menu-item configs.

## Core Data Structures/Data Model

All types are defined in [`src/lib/types.ts`](src/lib/types.ts).

### `MenuItemData`

A single menu item.

```ts
type MenuItemData = {
  recipeNumber: string;     // identifies the food item
  name: string;             // name of the specific item
  description: string | null;       // optional; usually null
  price: string | null;         // optional; usually null
  dietaryLabels: ReadonlyArray<string>;     // any dietary labels, which is used to display dietary icons
  mealType: string;         // e.g. "breakfast", "lunch", "dinner"
};
```

### `MenuData`

The parsed result of a Jamix XML feed.

```ts
type MenuData = {
  serveDate: string;
  locationNumber: string;
  menuType: string;
  stations: Record<string, ReadonlyArray<MenuItemData>>;
};
```

### `StationWithRegion`

A station plus its position/order within a physical region of the dining hall. It is used by entrance screens to display columns.

```ts
type StationWithRegion = {
  name: string;
  items: ReadonlyArray<MenuItemData>;
  regionPosition: number;
  regionOrder: number;
};
```

### `MergedMenuData`

`MenuData` combined with station/region numbers for column ordering from the Google Sheet. This is what screen components receive for display.

```ts
type MergedMenuData = MenuData & {
  stationsWithRegions: ReadonlyArray<StationWithRegion>;
};
```

### `LocationConfig`

The registry entry for a dining location.

```ts
type LocationConfig = {
  displayName: string;
  xmlUrl: string;          // Jamix XML feed
  gid?: string;            // Google Sheet gid for station/region data
  stylesheet?: string;     // CSS file in /public/themes
  screens?: Record<string, {
    menus?: ReadonlyArray<string>;
    type: ScreenType;      // "horizontal" | "vertical" | "entrance"; note that Cafe1919 uses 1, 2, 3, 4 instead
    requiresStation: boolean;
    stations?: ReadonlyArray<string>;
  }>;
};
```

### `LegendConfig`

Styling configuration for the dietary legend (colors, fonts, sizes, description text). Each location defines its own legend configs.

### `MenuItemConfig`

Styling configuration for menu item rendering (class names, gaps, which fields to show or hide). Used by locations with custom item layouts (e.g. Rendezvous, Cafe 1919, Epicuria at Ackerman).

## Data Fetching & Parsing

### `src/lib/fetchMenu.ts`

- `fetchXml(url)` - fetches the Jamix XML data
- `fetchCsv(gid)` - fetches data from a published Google Sheet

### `src/lib/fetchTimetable.ts`

- `fetchTimetable()` - fetches the meal timetable data (currently the same Google Sheet as the region ordering data)
- `parseMealTimeSchedule(csvText)` - parses the CSV into a `MealTimeSchedule` using the location name as a key, with `breakfast`/`lunch`/`dinner`/`latenight` start/end times. Supports a `DailyStart`/`DailyEnd` convention for locations that are open all day (e.g. Cafe 1919).
- `getCurrentMealPeriods(schedule)` - given the schedule and the current time, returns the active meal period per location. Daily-schedule locations return `"all day"` when open.

### `src/lib/parseXML.ts`

- `parseXml({ xmlText })` - parses a Jamix XML document with `DOMParser` and extracts `Serve_Date`, `Location_Number`, `Menu_Type`, and each `<recipe>` element. Recipes are grouped into stations by `Menu_Meal_Option`, with allergen labels collected from `<Allergen>` tags. Extra copies of duplicate recipes (same `Recipe_Number` + `Menu_Type`) are removed.

### `src/lib/parseCSV.ts`

- `parseCsv(csvText)` - a basic CSV parser that handles quoted fields and escaped quotes, returning an array of row objects using the header as the key.

### `src/lib/mergeData.ts`

- `mergeData(menuData, sheetRows)` - joins the parsed XML stations with the Google Sheet's station/region metadata. For each sheet row with a `Region Position`, it attaches `regionPosition` and `regionOrder` to the matching station and produces `stationsWithRegions`. The stations are sorted by region position then order.

### `src/lib/regions.ts`

- `groupByRegion(stations)` - groups `stationsWithRegions` by `regionPosition` into ordered columns. This is primarily used by entrance screens to render multiple columns.

## Hooks

### `src/hooks/useMenu.ts`

The primary data hook. Uses TanStack Query to fetch the XML feed (refetch every 5 min) and the Google Sheet (refetch every 3 min), then:

- Returns empty data if the location is closed (`menuType === null`).
- Filters items by meal type for dining halls.
- For `"all day"` (boutique dining), keeps items tagged `all day` or with no meal type.
- Merges the XML data with the sheet data via `mergeData`.

### `src/hooks/useMealPeriod.ts`

Fetches the timetable and returns the current meal period for a location. The `menu` URL param can be used to override this if needed.

### `src/hooks/useAutoRefresh.ts`

Checks `version.json` every 3 minutes; when a new version is detected, it waits 30 seconds and then reloads. Enforces a maximum uptime (24 hours by default) and reloads the page.

### `src/hooks/useVisibleCount.ts`

Measures how many menu items fit in a container using a `ResizeObserver` and `getBoundingClientRect`, returning the count. Used by horizontal and vertical screens to paginate/rotate items that fit on screen, moving any items partially cut off to the next rotation.

## Screen Resolution

### `src/lib/resolveScreen.ts`

Screens are resolved dynamically using Vite's `import.meta.glob` over `../locations/*/screens/*.tsx`.

1. Converts the screen type and station to PascalCase (e.g. `horizontal` → `Horizontal`, `simply+grilled` → `SimplyGrilled`).
2. Builds candidate module paths. If a station is provided, it tries the station-specific screen first, then falls back to the screen-type screen:
   - `../locations/{location}/screens/{StationName}.tsx`
   - `../locations/{location}/screens/{ScreenName}.tsx`
3. Returns the module's default export (or first function export) if found, otherwise `null`.

`App.tsx` renders an error message listing the candidates if no screen is found.

### The `template.tsx` re-export pattern

Each location folder has a `template.tsx` that re-exports the shared screen templates:

```ts
// eg. src/locations/bruinplate/template.tsx
export { HorizontalScreen } from "@/templates/HorizontalScreen";
export { VerticalScreen } from "@/templates/VerticalScreen";
export { EntranceScreen } from "@/templates/EntranceScreen";
```

Location-specific screens (in `screens/`) import from this template and pass in location-specific configurations (legend config, header markup, etc.). This keeps the shared layout logic in one place while allowing per-location customization.

## Screen Templates

The shared templates are found in [`src/templates/`](src/templates/). 

### `HorizontalScreen.tsx`

A landscape screen that generally features one item at a time with:

- A header (logo, station title).
- A central area that cycles through a featured item every 15 seconds.
- A list of the remaining items to the side, paginated to fit the visible height via `useVisibleCount`.
- A footer with the dietary legend.

### `VerticalScreen.tsx`

A portrait screen that contains:

- A header (logo, station title).
- A list of items, paginated by `visibleCount` and rotated every 15 seconds.
- A footer with the dietary legend.

### `EntranceScreen.tsx`

A multi-column layout that contains:

- A header (logo, region titles extracted via `groupByRegion`).
- Columns (usually 3 - 4) with menu items that paginate using `CyclingColumn`.
- A footer with the dietary legend.

### `src/components/CyclingColumns.tsx`

A reusable component that measures its available height, groups items into pages that prevent partial cutoff, and cycles through them every 15 seconds. Primarily used by entrance screens.

## Location Configuration

Each location is found in [`src/locations/{key}/`](src/locations/) and typically contains:

| File | Purpose |
|---|---|
| `config.ts` | Contains `LegendConfig` and `MenuItemConfig` values, plus any page/region config. |
| `template.tsx` | Re-exports the shared screen templates. |
| `screens/` | Contains location-specific screen components (e.g. `Horizontal.tsx`, `Vertical.tsx`, `Entrance.tsx`, or custom screens like `Westbyo.tsx`). |
| `templates/` | Contains location-specific layout templates (e.g. `WestByoTemplate` for Rendezvous). |
| `helpers/` | Contains location-specific helper modules. |

The `LOCATIONS` configuration in [`src/locations/index.ts`](src/locations/index.ts) maps URL keys to `LocationConfig` entries. Note there is also a legacy `src/config/locations.ts`, but this is not used.

## Auto-Refresh & Versioning

### `vite-plugin-version.ts`

A Vite plugin that, on build (`closeBundle`), writes a `version.json` to `dist/` containing the short git commit hash (or a timestamp fallback) and an ISO timestamp.

### `useAutoRefresh`

Every 3 minutes, the app checks for changes. When the version changes, it waits 30 seconds to ensure the deployment is fully complete and reloads the page. It also reloads after a set maximum uptime (24 hours by default) to prevent stale screen data.

## Testing

End-to-end tests are written with Playwright and are in [`e2e/`](../e2e/). See [`e2e/TESTING.md`](../e2e/TESTING.md) for an in-depth testing guide.