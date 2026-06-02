import type { MenuItemData } from '../lib/types'
import { DietaryIcon } from './DietaryIcon'

type MenuItemProps = {
  item: MenuItemData
  size?: string
  gap?: string
  className?: string
}

export const MenuItem = ({ item, size = '25px', gap = '8px', className = '' }: MenuItemProps) => (
  <div className={`flex w-full flex-col gap-[14px] ${className}`}>
    <h3 className="text-[40px] text-[#3c3c3c] font-bold italic leading-none m-0 [font-family:var(--font-display)]">
      {item.name}
    </h3>
    {item.dietaryLabels.length > 0 && (
      <div className="flex items-center h-[30px]" style={{ gap }}>
        {item.dietaryLabels.map((label) => (
          <DietaryIcon key={label} dietaryLabel={label} mode="light" size={size} />
        ))}
      </div>
    )}
  </div>
)
