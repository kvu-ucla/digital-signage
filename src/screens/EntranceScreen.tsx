import type { MenuData } from '../lib/types'
import {MenuItemList} from "../menu/MenuItemList";

type EntranceScreenProps = {
  data: MenuData
  sheetData: Record<string, string> | null
}

// TODO: Implement full 4-column entrance screen.
// - MenuData has access to all of a location's stations, MenuData.stations["Station Name"] will pull the list of menu
//    items associated with it
// - Menu data is pulled based on locations.ts, with location, station, menu, and screen types specified as query params i.e,
//    ?location=bruinplate&screen={horizontal|vertical|entrance}&station=simply+grilled&menu={breakfast|lunch|dinner}
// - Implement header, body, and footer components based on figma
// - build out HorizontalScreen.css with specifics for arranging header, body, footer components
// - correlate station XML with Google Sheet data and region
// - render each column's menu items based on the above
//
export const EntranceScreen = ({ data, sheetData }: EntranceScreenProps) => {
  if (!sheetData) {
    return (
      <div className="screen">
        <p>Column structure unavailable — sheet data failed to load.</p>
      </div>
    )
  }

  return (
    <div className="screen screen-entrance">
      {Object.entries(data.stations).map(([stationName, items]) => (
        <div key={stationName} className="screen-entrance__column">
          <h2 className="screen-entrance__column-header">{stationName}</h2>
            <MenuItemList
                items={items}
            ></MenuItemList>
        </div>
      ))}
    </div>
  )
}
