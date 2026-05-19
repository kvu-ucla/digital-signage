import type { MenuItemData } from '../lib/types'
import { DietaryIcon } from './DietaryIcon'

type MenuItemProps = {
  item: MenuItemData
}

export const MenuItem = ({ item }: MenuItemProps) => (
  <div className="flex flex-col gap-[14px]">
    <h3 className="text-[40px] text-[#3c3c3c] font-bold italic leading-none m-0 [font-family:var(--font-display)]">
      {item.name}
    </h3>
    {item.dietaryLabels.length > 0 && (
      <div className="flex gap-[8px] items-center h-[30px]">
        {item.dietaryLabels.map((label) => (
          <DietaryIcon key={label} dietaryLabel={label} size="sm" mode="light" />
        ))}
      </div>
    )}
  </div>
)
