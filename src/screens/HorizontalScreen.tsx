import { useState, useEffect } from 'react'
import type { MenuData } from '../lib/types'
import { FeaturedItem } from '../menu/FeaturedItem'
import { MenuItemList } from '../menu/MenuItemList'
import { DietaryLegend } from '../menu/DietaryLegend'
import './HorizontalScreen.css'

type HorizontalScreenProps = {
  data: MenuData
  station: string
}

export const HorizontalScreen = ({ data, station }: HorizontalScreenProps) => {
  const stationKey = station.toLowerCase().trim().replace(/\s+/g, ' ')
  const stationTitle = stationKey.replace(/\b\w/g, c => c.toUpperCase())
  const items = data.stations[stationKey] ?? []
  const stationImageSrc = `./images/${stationKey.replace(/\s+/g, '-')}.jpg`

  const [featuredIndex, setFeaturedIndex] = useState(0)

  useEffect(() => {
    setFeaturedIndex(0)
  }, [data])

  useEffect(() => {
    if (items.length === 0) return
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % items.length)
    }, 15_000)
    return () => { clearInterval(interval) }
  }, [items.length])

  const featuredItem = items[featuredIndex]
  const listItems = items.filter((_, i) => i !== featuredIndex)

  return (
    <div className="screen-horizontal">

      <header className="screen-horizontal__header">
        <div className="screen-horizontal__header-logo">
          <img src="./images/bruin-plate-logo.svg" alt="Bruin Plate" />
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
          <div className="screen-horizontal__side-inner">
            <MenuItemList items={listItems} />
          </div>
        </div>

      </div>
    </div>
  )
}
