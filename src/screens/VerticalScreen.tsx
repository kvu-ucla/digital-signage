import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { MenuData } from '../lib/types'
import { DietaryLegend } from '../menu/DietaryLegend'
import { VerticalMenuItemList } from '../menu/MenuItemList'
import './VerticalScreen.css'

type VerticalScreenProps = {
  data: MenuData
  station: string
}

// TODO: Implement full vertical screen with dynamic pagination.
// - Menu data is pulled based on locations.ts, with location, station, menu, and screen types specified as query params i.e,
//      - ?location=bruinplate&screen={horizontal|vertical|entrance}&station=simply+grilled&menu={breakfast|lunch|dinner}
// - Implement header, body, and footer components based on figma
// - build out HorizontalScreen.css with specifics for arranging header, body, footer components
// - Implement pagination algorithm to get the size of rendered items and split them accordingly
//      - if it exceeds the current component's height find the minimum amount of items that will fit, and overflow
//      - repeat for any set of items that exceed the height
// - the current list just maps data directly; you will need logic to either filter the current list
//   based on the pagination  have separate discrete paginated objects to render 
// - Cycle through paginated sets on a 15-second interval

export const VerticalScreen = ({ data, station }: VerticalScreenProps) => {
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
      setVisibleCount(prev => {
        if (prev !== count) setPageOffset(0)
        return count
      })
    })

  }, [])

  useEffect(() => {
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
    setPageOffset(0)
  }, [items])

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
        <div className="screen-vertical__header-logo">
          <img src="./images/bruin-plate-logo.svg" alt="Bruin Plate" />
        </div>
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
            <VerticalMenuItemList items={currentItems}></VerticalMenuItemList>
          </div>

          <div className="screen-vertical__footer">
            <DietaryLegend />
          </div>
          
        </div>

      </div>
    </div>
  )
}
