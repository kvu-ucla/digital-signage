import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { MenuItemData } from '../lib/types'
import type { MergedMenuData } from '../lib/types'
import { FeaturedItem } from '../menu/FeaturedItem'
import { MenuItemList } from '../menu/MenuItemList'
import { DietaryLegend } from '../menu/DietaryLegend'
import './HorizontalScreen.css'

const MOCK_ITEM: MenuItemData = {
  recipeNumber: 'mock-001',
  name: "A Really Really Long Menu Item (Sometimes There's Random Extra Info)",
  description: 'Items are subject to change based on availability without prior notice. Sometimes the descriptions get super super duper lengthy and really detailed',
  price: null,
  dietaryLabels: ['Gluten', 'Wheat', 'Dairy', 'Eggs', 'Soy', 'Fish', 'Crustacean-Shellfish', 'Peanut', 'Tree-Nuts', 'Sesame', 'Alcohol'],
}

type HorizontalScreenProps = {
  data: MergedMenuData
  station: string
}

export const HorizontalScreen = ({ data, station }: HorizontalScreenProps) => {
  const stationKey = station.toLowerCase().trim().replace(/\s+/g, ' ')
  const stationTitle = stationKey.replace(/\b\w/g, c => c.toUpperCase())
  const items = useMemo(() => data.stations[stationKey] ?? [], [data, stationKey])
  const stationImageSrc = `./images/${stationKey.replace(/\s+/g, '-')}.jpg`

  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState<number | null>(null)
  const [isMockEnabled, setIsMockEnabled] = useState(true)
  const listContainerRef = useRef<HTMLDivElement>(null)
  const isDev = import.meta.env.DEV || import.meta.env.VITE_SHOW_MOCKS === 'true'

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
    const container = listContainerRef.current
    if (!container) return
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    return () => { ro.disconnect(); }
  }, [measure])

  const isMockActive = isDev && isMockEnabled
  const featuredItem = isMockActive ? MOCK_ITEM : items[featuredIndex]
  const rotatedItems = [
    ...items.slice(featuredIndex + 1),
    ...items.slice(0, featuredIndex),
  ]
  const listItems = rotatedItems.slice(0, visibleCount ?? rotatedItems.length)
  const displayListItems = isMockActive && listItems.length > 0
    ? [MOCK_ITEM, ...listItems.slice(1)]
    : listItems

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
            <DietaryLegend />
          </div>
        </div>

        <div className="screen-horizontal__side">
          <div className="screen-horizontal__side-inner" ref={listContainerRef}>
            <MenuItemList items={displayListItems} />
          </div>
        </div>

      </div>

      {isDev && (
        <button
          onClick={() => { setIsMockEnabled(prev => !prev); }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1 p-4 rounded-xl bg-black/80 text-white border border-white/10 shadow-lg cursor-pointer backdrop-blur-sm"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">dev</span>
          <span className="text-base font-mono font-semibold tracking-wide">
            mock {isMockEnabled ? 'on' : 'off'}
          </span>
        </button>
      )}
    </div>
  )
}
