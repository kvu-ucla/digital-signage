import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { MergedMenuData, LegendConfig } from '../lib/types'
import { FeaturedItem } from '../menu/FeaturedItem'
import { MenuItemList } from '../menu/MenuItemList'
import { DietaryLegend } from '../menu/DietaryLegend'
import './HorizontalScreen.css'

type HorizontalScreenProps = {
  data: MergedMenuData
  station: string
  legendConfig: LegendConfig
}

export const HorizontalScreen = ({ data, station, legendConfig }: HorizontalScreenProps) => {
  const stationKey = station.toLowerCase().trim().replace(/\s+/g, ' ')
  const stationTitle = stationKey.replace(/\b\w/g, c => c.toUpperCase())
  const items = useMemo(() => data.stations[stationKey] ?? [], [data, stationKey])
  const stationImageSrc = `./images/${stationKey.replace(/\s+/g, '-')}.jpg`

  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState<number | null>(null)
  const listContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFeaturedIndex(0)
  }, [data])

  useEffect(() => {
    if (items.length === 0) return
    const interval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % items.length)
    }, 15_000)
    return () => { clearInterval(interval); }
  }, [items.length])

  const measure = useCallback(() => {
    const container = listContainerRef.current
    if (!container) return
    const paddingBottom = parseFloat(getComputedStyle(container).paddingBottom)
    const containerBottom = container.getBoundingClientRect().bottom - paddingBottom
    let count = 0
    for (const child of Array.from(container.children)) {
      if (child.getBoundingClientRect().bottom <= containerBottom) count++
      else break
    }
    setVisibleCount(count)
  }, [])

  useEffect(() => {
    measure()
  }, [featuredIndex, items, measure])

  useEffect(() => {
    if (visibleCount === null) measure()
  }, [visibleCount, measure])

  useEffect(() => {
    const container = listContainerRef.current
    if (!container) return
    const ro = new ResizeObserver(() => { setVisibleCount(null); })
    ro.observe(container)
    return () => { ro.disconnect(); }
  }, [])

  const featuredItem = items[featuredIndex]
  const rotatedItems = [
    ...items.slice(featuredIndex + 1),
    ...items.slice(0, featuredIndex),
  ]
  const displayListItems = rotatedItems.slice(0, visibleCount ?? rotatedItems.length)

  return (
    <div className="screen-horizontal">

      <header className="screen-horizontal__header">
        <div className="screen-horizontal__header-logo">
          <img src="./icons/bruinplate-logo-sm.svg" alt="Bruin Plate" />
        </div>
        <h1 className="screen-horizontal__header-title">{stationTitle}</h1>
        <div className="screen-horizontal__header-certificate">
          <div className="screen-horizontal__header-certificate-placeholder" />
        </div>
      </header>

      <div className="screen-horizontal__body">

        <div className="screen-horizontal__graphic">
          <img src={stationImageSrc} alt={station} />
        </div>

        <div className="screen-horizontal__main">
          <div className="screen-horizontal__main-hero">
            {featuredItem && <FeaturedItem item={featuredItem} />}
          </div>
          <div className="screen-horizontal__footer">
            <div className="screen-horizontal__footer-inner">
              <DietaryLegend config={legendConfig} />
            </div>
          </div>
        </div>

        <div className="screen-horizontal__side">
          <div className="screen-horizontal__side-inner" ref={listContainerRef}>
            <MenuItemList items={displayListItems} iconSize="30px" gap="8px" />
          </div>
        </div>

      </div>

    </div>
  )
}
