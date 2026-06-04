import { DIETARY_LABELS } from '@/lib/dietaryLabels'
import { DietaryIcon } from './DietaryIcon'
import type { LegendConfig } from '@/lib/types'

type DietaryLegendProps = {
  config: LegendConfig;
}

function splitDescription(text: string) {
  return text.split(/(\S+\.\S+\/\S+)/)
}

export const DietaryLegend = ({ config }: DietaryLegendProps) => (
  <div
    className={`flex flex-col items-center ${config.className ?? ''}`}
    style={{ fontFamily: config.font, gap: '8.5px' }}
  >
    {config.description && (
      <p
        className="m-0"
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'baseline',
          fontSize: '21px',
          whiteSpace: 'nowrap',
          color: '#005289',
        }}
      >
        {splitDescription(config.description).map((part, i) =>
          /\S+\.\S+\/\S+/.test(part)
            ? <strong key={i} style={{ fontWeight: 700, letterSpacing: '0.42px' }}>{part}</strong>
            : <span key={i} style={{ fontWeight: 400 }}>{part}</span>
        )}
      </p>
    )}
    <div
      className="flex flex-wrap justify-center"
      style={{ columnGap: config.gapItems, rowGap: config.rowGap }}
    >
      {DIETARY_LABELS.map(({ key, label }) => (
        <div
          key={key}
          className="flex items-center"
          style={{ gap: config.gap, height: config.imgSize }}
        >
          <DietaryIcon dietaryLabel={key} mode={config.mode} size={config.imgSize} />
          <span
            style={{
              fontFamily: config.font,
              fontWeight: 700,
              fontSize: config.fontSize,
              color: config.color,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
)
