import { DIETARY_LABELS } from '../lib/dietaryLabels'

type DietaryIconMode = 'light' | 'dark'

type DietaryIconProps = {
  dietaryLabel: string
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mode?: DietaryIconMode
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: 'w-6 h-6',
  md: 'w-[30px] h-[30px]',
  lg: 'w-[42px] h-[42px]',
  xl: 'w-12 h-12',
}


export const DietaryIcon = ({ dietaryLabel, size = 'md', mode = 'light' }: DietaryIconProps) => {
  if (!DIETARY_LABELS.some(({ key }) => key === dietaryLabel)) return null

  const slug = dietaryLabel.toLowerCase()
  const dimension = SIZE_CLASSES[size]

  return (
    <img
      src={`./icons/dietary/${mode}/${slug}.svg`}
      alt={dietaryLabel}
      title={dietaryLabel}
      className={`${dimension} object-contain flex-shrink-0`}
    />
  )
}

export const VerticalDietaryIcon = ({ dietaryLabel, size = 'lg', mode = 'light' }: DietaryIconProps) => {
  if (!DIETARY_LABELS.some(({ key }) => key === dietaryLabel)) return null

  const slug = dietaryLabel.toLowerCase()
  const dimension = SIZE_CLASSES[size]

  return (
    <img
      src={`./icons/dietary/${mode}/${slug}.svg`}
      alt={dietaryLabel}
      title={dietaryLabel}
      className={`${dimension} object-contain flex-shrink-0`}
    />
  )
}
