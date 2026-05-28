import { DIETARY_LABELS } from '../lib/dietaryLabels'
import { DietaryIcon } from './DietaryIcon'
import type { LegendConfig } from '../lib/types'

interface DietaryLegendProps {
  config: LegendConfig;
}

export const DietaryLegend = ({ config }: DietaryLegendProps) => (
  <div
    className={`flex flex-wrap items-center justify-center ${config.className}`}
    style={{
      columnGap: config.gapItems,
      rowGap: config.rowGap,
      fontFamily: config.font,
    }}
  >
    {DIETARY_LABELS.map(({ key, label }) => (
      <div
        key={key}
        className="inline-flex items-center justify-center whitespace-nowrap"
        style={{
          gap: config.gap,
        }}
      >
        <DietaryIcon dietaryLabel={key} mode={config.mode} size={config.imgSize} />

        <span
          className="inline-flex items-center leading-none uppercase font-extrabold"
          style={{
            color: config.color,
            fontSize: config.fontSize,
            fontFamily: config.font,
          }}
        >
          {label}
        </span>
      </div>
    ))}
  </div>
);
