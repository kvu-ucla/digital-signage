# Playwright Testing

## Prerequisites

Run `npm install` before anything else. The dev server must be running (or let `webServer` in the config start it).

## Setup

```bash
npm install
npx playwright install chromium
```

---

## Running Tests

```bash
npx playwright test                         # all specs, headless
npx playwright test e2e/horizontal.spec.ts  # one file
npx playwright test --headed                # watch the browser run
npx playwright test --ui                    # visual debugger — start here
```

When tests fail, open the HTML report for traces and screenshots:

```bash
npx playwright show-report
```

---

## Template

Start from `e2e/horizontal.spec.ts`. Name new files after the screen they test: `horizontal.spec.ts`, `vertical.spec.ts`. Place them in `e2e/`.

### Rules
- Use BEM classes as selectors (`.screen-horizontal__header-title`, `.screen-vertical__main-hero`)
- Use `data-testid` for components that only have Tailwind classes
- Never use Tailwind classes as selectors — they break when styling changes
- Never use `waitForTimeout()` — `expect()` retries automatically

---

## BEM Classes

### Horizontal (`screen=horizontal`)

| Class | Element |
|---|---|
| `.screen-horizontal` | root |
| `.screen-horizontal__header-title` | station name |
| `.screen-horizontal__header-logo` | logo |
| `.screen-horizontal__body` | main content area |
| `.screen-horizontal__main-hero` | featured item |
| `.screen-horizontal__side` | scrolling item list |
| `.screen-horizontal__footer` | footer bar |

### Vertical (`screen=vertical`)

| Class | Element |
|---|---|
| `.screen-vertical` | root |
| `.screen-vertical__header-title` | station name |
| `.screen-vertical__header-logo` | logo |
| `.screen-vertical__body` | main content area |
| `.screen-vertical__main-hero` | scrolling item list |
| `.screen-vertical__footer` | footer bar |

---

## Bruinplate Stations

| URL value | Display name |
|---|---|
| `farmstand` | Farmstand |
| `simply+grilled` | Simply Grilled |
| `freshly+bowled` | Freshly Bowled |
| `sweet+bites` | Sweet Bites |
| `stone+fired` | Stone Fired |
| `harvest` | Harvest |

---

## URL Parameters

| Param        | Example                        | Notes                                                                               |
|--------------|--------------------------------|-------------------------------------------------------------------------------------|
| `location`   | `bruinplate`                   | required                                                                            |
| `screen`     | `horizontal`, `vertical`       | required                                                                            |
| `menu`       | `breakfast`, `lunch`, `dinner` | required                                                                            |
| `station`    | `simply+grilled`               | required                                                                            |
| `mock`       | `true`                         | optional, replaces real data with mock items                                        |
| `overlay-id` | any string                     | optional, activates takeover mode based on PlaceOS signage ID (i.e. sys-xxxyyyzzz) |
