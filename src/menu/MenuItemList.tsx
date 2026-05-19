import type { MenuItemData } from '../lib/types'
import { MenuItem } from './MenuItem'

type MenuItemListProps = {
  items: ReadonlyArray<MenuItemData>
}

export const MenuItemList = ({ items }: MenuItemListProps) => (
  <>
    {items.map((item) => (
      <MenuItem key={item.recipeNumber} item={item} />
    ))}
  </>
)
