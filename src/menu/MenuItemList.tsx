import type { MenuItemData } from '../lib/types'
import { MenuItem, VerticalMenuItem } from './MenuItem'

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

export const VerticalMenuItemList = ({ items }: MenuItemListProps) => (
  <>
    {items.map((item) => (
      <VerticalMenuItem key={item.recipeNumber} item={item} />
    ))}
  </>
)