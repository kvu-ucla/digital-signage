import { DIETARY_LABELS } from '../lib/dietaryLabels'
import { DietaryIcon } from './DietaryIcon'

export const DietaryLegend = () => (
  <div className="screen-horizontal__footer-inner">
    <p className="screen-horizontal__footer-description">
      <span>Please refer to</span>
      <strong>dining.ucla.edu/menu</strong>
      <span>for allergen and nutritional information.</span>
    </p>
    <div className="screen-horizontal__footer-icons">
      {DIETARY_LABELS.map(({ key, label }) => (
        <div key={key} className="screen-horizontal__footer-icon-entry">
          <DietaryIcon dietaryLabel={key} mode="light" size="sm" />
          <span className="screen-horizontal__footer-icon-label">{label}</span>
        </div>
      ))}
    </div>
  </div>
)
