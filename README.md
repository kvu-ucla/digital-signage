# UCLA Dining Digital Signage

A React + TypeScript + Vite application that powers the digital menu screens displayed at UCLA dining locations. It fetches live menu data from Jamix XML feeds and Google Sheets, determines the current meal period from a Google Sheets timetable, and renders location-specific screens (generally horizontal, vertical, and entrance) with dietary icons and legends.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## High-Level Functionality

1. Reads URL parameters to determine the location, screen, station, and menu to be displayed.
2. Fetches the menu XML (from Jamix) and the station/region data (from a manually maintained Google Sheet) for the specified location.
3. Fetches the meal timetable to determine the current meal period (breakfast, lunch, dinner, latenight, or all-day).
4. Parses and merges the data, filtering items by the active meal period.
5. Renders the screen for the location and screen type.

## URL Parameters

Screens are set through URL query parameters.

| Param | Example | Notes |
|---|---|---|
| `location` | `bruinplate` | **Required.** The dining location key (see [Locations](#locations)). |
| `screen` | `horizontal`, `vertical`, `entrance`, `1` | **Required.** Screen type, or a page number (e.g. `1` → `page1`). |
| `station` | `simply+grilled` | Required for station-based screens. |
| `menu` | `breakfast`, `lunch`, `dinner`, `latenight`, `all day` | Optional. Overrides the auto-detected meal period. |
| `mock` | `true` | Optional. Replaces real menu data with mock items for testing layouts. |
| `minimal` | `true` | Optional. Hides the station title header. |
| `overlay-id` | `sys-xxx` | Optional. Activates takeover mode with a PlaceOS signage overlay iframe. |
| `bg` | `images/foo.png` | Optional. Activates takeover mode with a background image. |

### Example URLs

```
/?location=bruinplate&screen=horizontal&station=simply+grilled&menu=lunch
/?location=bruinplate&screen=entrance&mock=true
/?location=rendezvous&screen=east-freestyle
```

## Locations

Locations are registered in [`src/locations/index.ts`](src/locations/index.ts). Each entry maps a URL key to a display name, a Jamix XML feed URL, an optional Google Sheet `gid`, an optional theme stylesheet, and an optional set of screen definitions.

| Key | Display name |
|---|---|
| `bruinplate` | Bruin Plate |
| `denevedining` | De Neve Dining |
| `cafe1919` | Cafe 1919 |
| `rendezvous` | Rendezvous |
| `covelepicuria` | Epicuria at Covel |
| `epicatackerman` | Epicuria at Ackerman |
| `feast` | Feast |

## Project Structure

```
.
├── e2e/                         # End-to-end tests using Playwright
│   ├── TESTING.md               # Testing documentation
│   ├── entrance.spec.ts
│   ├── horizontal.spec.ts
│   └── vertical.spec.ts
├── public/
│   ├── themes/                  # Stylesheets for each location
│   ├── fonts/                   # Fonts
│   ├── icons/                   # Dietary icons
│   └── images/                  # Logos & background images
├── src/
│   ├── App.tsx                  # Root; parses parameters and loads corresponding screens
│   ├── main.tsx                 # React entry point
│   ├── components/              # Shared components (e.g. CyclingColumn)
│   ├── config/                  # Legacy location config
│   ├── docs/                    # Documentation (CONTRIBUTING.md and ARCHITECTURE.md)
│   ├── hooks/                   # Data and behavior hooks
│   ├── lib/                     # Data fetching, parsing, merging, utilities
│   ├── locations/               # Configurations for each location
│   ├── menu/                    # Menu item and dietary legend components
│   ├── styles/                  # Global and takeover styles
│   └── templates/               # Reusable screen templates
├── index.html
├── package.json
├── vite.config.ts
└── vite-plugin-version.ts       # Generates version.json on build
```

## Documentation

- **[Architecture](docs/ARCHITECTURE.md)** - technical architecture of the codebase, including data flow, core data structures, etc.
- **[Contributing](src/docs/CONTRIBUTING.md)** - workflow conventions and instructions
- **[Testing](e2e/TESTING.md)** - instructions on how to run the Playwright suite and write new tests