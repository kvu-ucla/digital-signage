import type { MenuItemData, MenuItemConfig } from '../lib/types'
import { MenuItem } from './MenuItem'

type MenuItemListProps = {
  items: ReadonlyArray<MenuItemData>
  size?: string
  menuItemConfig: MenuItemConfig
}


export const MenuItemList = ({ items, size, menuItemConfig }: MenuItemListProps) => (
  <>
    {items.map((item) => (
      <MenuItem key={item.recipeNumber} item={item} size={size} menuItemConfig={menuItemConfig} />
    ))}
  </>
)