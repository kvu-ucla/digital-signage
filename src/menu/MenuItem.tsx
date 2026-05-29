import type { MenuItemData } from '../lib/types'
import { DietaryIcon, VerticalDietaryIcon } from './DietaryIcon'

type MenuItemProps = {
  item: MenuItemData
  size?: string
  gap?: string
}

export const MenuItem = ({ item, size="25px", gap="5px" }: MenuItemProps) => (
  <div className="flex w-full flex-col items-center gap-[5px] text-center">
    <h3 className="m-0 max-w-[420px] text-center text-[28px] font-bold leading-[1.08] [font-family:var(--font-display)]">
      {item.name}
    </h3>

    {item.dietaryLabels.length > 0 && (
      <div className={`flex flex-wrap items-center justify-center gap-[${gap}] leading-none`}
        style={{
          columnGap: gap,
        }}>
        {item.dietaryLabels.map((label) => (
          <DietaryIcon key={label} dietaryLabel={label} mode="light" size={size}/>
        ))}
      </div>
    )}
  </div>
)

export const VerticalMenuItem = ({ item }: MenuItemProps) => (
  <div className="flex flex-col gap-[14px] items-center w-full"> 
    <h3 className="text-[75px] font-bold text-[#3c3c3c] leading-none m-0 [font-family:var(--font-display)] text-center">
      {item.name}
    </h3>
    {item.dietaryLabels.length > 0 && (
      <div className="flex gap-[8px] items-center h-[42px]">
        {item.dietaryLabels.map((label) => (
          <VerticalDietaryIcon key={label} dietaryLabel={label} mode="light" />
        ))}
      </div>
    )}
  </div>
)
