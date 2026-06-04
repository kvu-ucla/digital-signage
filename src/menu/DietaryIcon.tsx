import { DIETARY_LABELS } from '@/lib/dietaryLabels'

type DietaryIconMode = 'light' | 'dark'

type DietaryIconProps = {
  dietaryLabel: string
  size?: string;
  mode?: DietaryIconMode
}

export const DietaryIcon = ({ dietaryLabel, size = '25px', mode = 'light' }: DietaryIconProps) => {
  if (!DIETARY_LABELS.some(({ key }) => key === dietaryLabel)) return null

  const slug = dietaryLabel.toLowerCase()

  return (
    <img
      src={`./icons/dietary/${mode}/${slug}.svg`}
      alt={dietaryLabel}
      title={dietaryLabel}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        flexShrink: 0,
      }}
    />
  )
}