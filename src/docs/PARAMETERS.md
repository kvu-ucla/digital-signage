# Query Parameter Reference

## Current Available Locations

- bruinplate
- cafe1919
- covelepicuria
- denevedining
- epicatackerman
- feast
- rendezvous

### BruinPlate
- Entrance
- Horizontal
- Vertical

### Cafe1919
- Page1     // Note that you can use 1, 2, 3, and 4 instead of Page1, Page2, Page3, Page4
- Page2
- Page3
- Page4

### Covel Epicuria
- Entrance
- Horizontal
- Vertical

### De Neve Dining
- Entrance
- Horizontal
- Vertical

### Epic At Ackerman
- Center
- Left
- Right

### Feast
- Entrance
- Horizontal

### Rendezvous
- Boba
- DailyFreestyleBowls
- DailyLunchSpecials
- DailySushiBowls
- EastFreestyle

## Menu Types

The `menu` parameter is optional and overrides the auto-detected meal period. Valid values:

- `breakfast`
- `lunch`
- `dinner`
- `latenight`
- `all day`

Example: `/?location=bruinplate&screen=horizontal&station=simply+grilled&menu=lunch`

## Stations

The `station` parameter is used for station-based screens (horizontal/vertical). Station names come from the live Jamix XML feed and should be URL-encoded (spaces → `+`).

### General Stations

For Bruin Plate, De Neve Dining, Covel Epicuria, and Feast, the station names vary by location and by day, so they are not hardcoded. Use a station name from the live feed, e.g. `simply+grilled`.

### Rendezvous Stations

The Rendezvous screens reference specific station names from the feed. These are hardcoded in the Rendezvous templates:

| Screen | Station names |
|---|---|
| Boba | `BOBA DRINKS` |
| DailyFreestyleBowls | `Base`, `Entrée`, `ASIAN TOPPING` |
| DailyLunchSpecials | `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY` |
| DailySushiBowls | `SUSHI BOWLS` |
| EastFreestyle | `ASIAN DAILY SPECIAL`, `Base`, `ASIAN TOPPING`, `ENTRÉE`, `ASIAN SAUCE` |