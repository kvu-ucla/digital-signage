import type { MenuData } from '../lib/types'
import { MenuItem } from '../menu/MenuItem'

type VerticalScreenProps = {
  data: MenuData
  station: string
}

// TODO: Implement full vertical screen with dynamic pagination.
// Menu data is pulled based on locations.ts, with location, station, menu, and screen types specified as query params i.e,
// ?location=bruinplate&screen={horizontal|vertical|entrance}&station=simply+grilled&menu={breakfast|lunch|dinner}
// - Implement header, body, and footer components based on figma
// - build out HorizontalScreen.css with specifics for arranging header, body, footer components
// - Implement pagination algorithm to get the size of rendered items and split them accordingly
//      - if it exceeds the current component's height find the minimum amount of items that will fit, and overflow
//      - repeat for any set of items that exceed the height
// - the current list just maps data directly; you will need logic to either filter the current list
//   based on the pagination  have separate discrete paginated objects to render 
// - Cycle through paginated sets on a 15-second interval

export const VerticalScreen = ({ data, station }: VerticalScreenProps) => {
  const stationKey = station.toLowerCase().trim().replace(/\s+/g, ' ')
  const items = data.stations[stationKey] ?? []

  return (
    <div className="screen screen-vertical">
      <div className="screen-vertical__page">
        {items.map((item) => (
          <MenuItem key={item.recipeNumber} item={item} />
        ))}
      </div>
    </div>
  )
}
