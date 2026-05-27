import type { MergedMenuData } from '../lib/mergeData'
import { DietaryLegend } from '../menu/DietaryLegend'
import { MenuItemList } from '../menu/MenuItemList'
import './VerticalScreen.css'

type VerticalScreenProps = {
  data: MergedMenuData
  station: string
}

// TODO: Implement full vertical screen with dynamic pagination.
// - Menu data is pulled based on locations.ts, with location, station, menu, and screen types specified as query params i.e,
//      - ?location=bruinplate&screen={horizontal|vertical|entrance}&station=simply+grilled&menu={breakfast|lunch|dinner}
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
  const stationTitle = stationKey.replace(/\b\w/g, c => c.toUpperCase())

  const items = data.stations[stationKey] ?? []
  const stationImageSrc = `./images/${stationKey.replace(/\s+/g, '-')}.jpg`

  return (
    <div className="screen-vertical">

      <header className="screen-vertical__header">
        <div className="screen-vertical__header-logo">
          <img src="./images/bruin-plate-logo.svg" alt="Bruin Plate" />
        </div>
        <h1 className="screen-vertical__header-title">{stationTitle}</h1>
        <div className="screen-vertical__header-certificate">
          <div className="screen-vertical__header-certificate-placeholder" />
        </div>
      </header>

      <div className="screen-vertical__body">
        
        <div className="screen-vertical__graphic">
          <img src={stationImageSrc} alt={station} />
        </div>

        <div className="screen-vertical__main">

          <div className="screen-vertical__main-hero">
            <MenuItemList items={items}></MenuItemList>
            {/* Placeholder for pagination logic */}
          </div>

          <div className="screen-vertical__footer">
            <DietaryLegend />
          </div>
          
        </div>

      </div>
    </div>
  )
}
