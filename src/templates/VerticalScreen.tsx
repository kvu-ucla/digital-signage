import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { MergedMenuData, LegendConfig } from '@/lib/types'
import { MenuItemList } from '@/menu/MenuItemList'
import { DietaryLegend } from '@/menu/DietaryLegend'
import './VerticalScreen.css'

type VerticalScreenProps = {
  data: MergedMenuData
  station: string
  legendConfig: LegendConfig
}

export const VerticalScreen = ({ data, station, legendConfig }: VerticalScreenProps) => {
  const stationKey = station.toLowerCase().trim().replace(/\s+/g, ' ')
  const stationTitle = stationKey.replace(/\b\w/g, c => c.toUpperCase())

  const items = useMemo(() => data.stations[stationKey] ?? [], [data, stationKey])
  const stationImageSrc = `./images/${stationKey.replace(/\s+/g, '-')}.jpg`

  const listContainerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState<number | null>(null)
  const [pageOffset, setPageOffset] = useState(0)
  
  const rotationInterval = 15_000

  const measure = useCallback(() => {
    const container = listContainerRef.current
    if (!container) return

    requestAnimationFrame(() => {
      const paddingBottom = parseFloat(getComputedStyle(container).paddingBottom)
      const containerBottom = container.getBoundingClientRect().bottom - paddingBottom

      let count = 0
      for (const child of Array.from(container.children)) {
        if (child.getBoundingClientRect().bottom <= containerBottom) count++
        else break
      }
      setVisibleCount(count)
    })

  }, [])

  useEffect(() => {
    setPageOffset(0)
    measure()
  }, [items, measure])

  useEffect(() => {
    const container = listContainerRef.current
    if (!container) return
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    return () => { ro.disconnect(); }
  }, [measure])

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
        <h1 className="screen-vertical__header-title">{stationTitle}</h1>
        <div className="screen-vertical__header-certificate">
          <div className="screen-vertical__header-certificate-placeholder" />
        </div>
      </header>

      <div className="screen-vertical__body">
        
        <div className="screen-vertical__graphic">
          <img src={stationImageSrc} alt={station} />
        </div>

        <div className="screen-vertical__main">

          <div className="screen-vertical__main-hero" ref={listContainerRef}>
            <MenuItemList items={currentItems} iconSize="42px" gap="8px" nameSize="75px" descriptionSize="36px" className="items-center text-center" />
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
