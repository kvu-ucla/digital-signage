import { useState, useEffect, useMemo } from 'react'
import type { MergedMenuData, LegendConfig } from '@/lib/types'
import { MenuItemList } from '@/menu/MenuItemList'
import { MenuTypeNotice } from '@/menu/MenuTypeNotice'
import { DietaryLegend } from '@/menu/DietaryLegend'
import { useVisibleCount } from '@/hooks/useVisibleCount'
import { getDisplayMode } from '@/lib/queryParams'
import './VerticalScreen.css'

type VerticalScreenProps = {
  data: MergedMenuData
  station: string
  legendConfig: LegendConfig
}

export const VerticalScreen = ({ data, station, legendConfig }: VerticalScreenProps) => {
  const { isMinimal } = getDisplayMode()
  const stationKey = station.toLowerCase().trim().replace(/\s+/g, ' ')
  const stationTitle = stationKey.replace(/\b\w/g, c => c.toUpperCase())

  const items = useMemo(() => data.stations[stationKey] ?? [], [data, stationKey])

  const { containerRef, visibleCount, measure } = useVisibleCount()
  const [pageOffset, setPageOffset] = useState(0)

  const rotationInterval = 15_000

  useEffect(() => {
    setPageOffset(0)
    measure()
  }, [items, measure])

  useEffect(() => {
    if (items.length === 0 || visibleCount === null || visibleCount >= items.length) return

    const intervalID = setInterval(() => {
      setPageOffset(prev => (prev + visibleCount) % items.length)
    }, rotationInterval)

    return () => {clearInterval(intervalID)}
  }, [items.length, visibleCount])

  const rotatedItems = useMemo(() => {
    if (items.length === 0) return items
    return [...items.slice(pageOffset), ...items.slice(0, pageOffset)]
  }, [items, pageOffset])

  const currentItems = visibleCount === null
    ? rotatedItems
    : rotatedItems.slice(0, visibleCount)

  return (
    <div className="screen-vertical">

      <header className="screen-vertical__header">
        <div className="screen-vertical__header-logo" />
        {!isMinimal && <h1 className="screen-vertical__header-title">{stationTitle}</h1>}
        <div className="screen-vertical__header-certificate">
          <div className="screen-vertical__header-certificate-placeholder" />
        </div>
      </header>

      <div className="screen-vertical__body">
        
        <div className="screen-vertical__graphic">
          {/*<img src={stationImageSrc} alt={station} />*/}
        </div>

        <div className="screen-vertical__main">

          <div className="screen-vertical__main-hero">
            {items.length === 0 ? (
              <MenuTypeNotice />
            ) : (
              <>
                <div
                  className="screen-vertical__main-list screen-vertical__main-list--measure"
                  ref={containerRef}
                  aria-hidden="true"
                >
                  <MenuItemList items={rotatedItems} iconSize="42px" gap="8px" nameSize="75px" descriptionSize="36px" className="items-center text-center" />
                </div>
                <div className="screen-vertical__main-list">
                  <MenuItemList items={currentItems} iconSize="42px" gap="8px" nameSize="75px" descriptionSize="36px" className="items-center text-center" />
                </div>
              </>
            )}
          </div>

          <div className="screen-vertical__footer">
            <div className="screen-vertical__footer-inner">
              <DietaryLegend config={legendConfig} />
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}
