import { HorizontalScreen } from './HorizontalScreen'
import { VerticalScreen } from './VerticalScreen'
import { EntranceScreen } from './EntranceScreen'
import type { ScreenType } from '../lib/types'

export type { ScreenType }

export const SCREENS = {
  horizontal: HorizontalScreen,
  vertical: VerticalScreen,
  entrance: EntranceScreen,
} as const satisfies Record<ScreenType, unknown>
