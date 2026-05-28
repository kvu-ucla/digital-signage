import type { MenuItemData } from '../lib/types'
import { DietaryIcon } from './DietaryIcon'

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
);
