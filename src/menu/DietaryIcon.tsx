import { DIETARY_LABELS } from '../lib/dietaryLabels'

type DietaryIconMode = 'light' | 'dark'

type DietaryIconProps = {
  dietaryLabel: string
  size?: 'sm' | 'md'
  mode?: DietaryIconMode
}

export const DietaryIcon = ({ dietaryLabel, size = 'md', mode = 'light' }: DietaryIconProps) => {
  if (!DIETARY_LABELS.some(({ key }) => key === dietaryLabel)) return null

  const slug = dietaryLabel.toLowerCase()
  const dimension = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'

  return (
    <img
      src={`./icons/dietary/${mode}/${slug}.svg`}
      alt={dietaryLabel}
      title={dietaryLabel}
      className={`${dimension} object-contain flex-shrink-0`}
    />
  )
}
