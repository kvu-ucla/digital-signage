import type { MenuItemData } from '../lib/types'
import { MenuItem } from './MenuItem'

type MenuItemListProps = {
  items: ReadonlyArray<MenuItemData>
  size?: string
  gap?: string
  className?: string
}

export const MenuItemList = ({ items, size, gap, className }: MenuItemListProps) => (
  <>
    {items.map((item) => (
      <MenuItem key={item.recipeNumber} item={item} size={size} gap={gap} className={className} />
    ))}
  </>
)
