import type { MenuItemData } from '../lib/types'
import { MenuItem, VerticalMenuItem } from './MenuItem'

type MenuItemListProps = {
  items: ReadonlyArray<MenuItemData>
  size?: string
  gap?: string
}

export const MenuItemList = ({ items, size, gap }: MenuItemListProps) => (
  <>
    {items.map((item) => (
      <MenuItem key={item.recipeNumber} item={item} size={size} gap={gap} />
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