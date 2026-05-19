import type { MenuData } from '../lib/types'
import { MenuItem } from '../menu/MenuItem'

type EntranceScreenProps = {
  data: MenuData
  sheetData: Record<string, string> | null
}

// TODO: Implement full 4-column entrance screen.
// - sheetData drives column categories and display order — it is a structural dependency.
//   If sheetData is null, render an error state — column structure cannot be determined without it.
// - Each column header and its item category come from sheetData keys/values.
// - XML items (data.stations[stationKey].items) populate each column based on their station/category.
// - Render item name and DietaryIcon only — descriptions are NOT rendered on this screen.
// - Static display — no rotation, no featuredIndex.
// - Uses both data and sheetData.
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
          {items.map((item) => (
            <MenuItem key={item.recipeNumber} item={item} />
          ))}
        </div>
      ))}
    </div>
  )
}
