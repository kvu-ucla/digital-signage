import type { MenuItemData } from '../lib/types'
import { DietaryIcon } from './DietaryIcon'

type FeaturedItemProps = {
  item: MenuItemData
}

export const FeaturedItem = ({ item }: FeaturedItemProps) => (
  <div className="flex flex-col items-center gap-[42px] w-full">
    <h2 className="text-[85px] text-[#3c3c3c] font-bold not-italic leading-none tracking-[0.425px] text-center m-0 [font-family:var(--font-display)]">
      {item.name}
    </h2>
    {item.dietaryLabels.length > 0 && (
      <div className="flex gap-[8px] items-center h-[40px]">
        {item.dietaryLabels.map((label) => (
          <DietaryIcon key={label} dietaryLabel={label} size="md" mode="light" />
        ))}
      </div>
    )}
  </div>
)
