import type { MenuItemData } from '../lib/types'
import { MenuItem } from './MenuItem'

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
