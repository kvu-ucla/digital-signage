import { useState, useEffect, useMemo } from "react";
import type { MergedMenuData, LegendConfig } from "@/lib/types";
import { FeaturedItem } from "@/menu/FeaturedItem";
import { MenuItemList } from "@/menu/MenuItemList";
import { MenuTypeNotice } from "@/menu/MenuTypeNotice";
import { DietaryLegend } from "@/menu/DietaryLegend";
import { useVisibleCount } from "@/hooks/useVisibleCount";
import { getDisplayMode } from "@/lib/queryParams";
import "./HorizontalScreen.css";

type HorizontalScreenProps = {
  data: MergedMenuData;
  station: string;
  legendConfig: LegendConfig;
};

export const HorizontalScreen = ({
  data,
  station,
  legendConfig,
}: HorizontalScreenProps) => {
  const { isMinimal } = getDisplayMode();
  const stationKey = station.toLowerCase().trim().replace(/\s+/g, " ");
  const stationTitle = stationKey.replace(/\b\w/g, (c) => c.toUpperCase());
  const items = useMemo(
    () => data.stations[stationKey] ?? [],
    [data, stationKey],
  );

  const [featuredIndex, setFeaturedIndex] = useState(0);
  const { containerRef, visibleCount, measure } = useVisibleCount();

  useEffect(() => {
    setFeaturedIndex(0);
  }, [data]);

  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % items.length);
    }, 15_000);
    return () => {
      clearInterval(interval);
    };
  }, [items.length]);

  useEffect(() => {
    measure();
  }, [featuredIndex, items, measure]);

  const featuredItem = items[featuredIndex];
  const rotatedItems = [
    ...items.slice(featuredIndex + 1),
    ...items.slice(0, featuredIndex),
  ];
  const displayListItems = rotatedItems.slice(
    0,
    visibleCount ?? rotatedItems.length,
  );

  return (
    <div className="screen-horizontal">
      <header className="screen-horizontal__header">
        <div className="screen-horizontal__header-logo" />
        {!isMinimal && (
          <h1 className="screen-horizontal__header-title">{stationTitle}</h1>
        )}
        <div className="screen-horizontal__header-certificate">
          <div className="screen-horizontal__header-certificate-placeholder" />
        </div>
      </header>

      <div className="screen-horizontal__body">
        <div className="screen-horizontal__graphic">
          {/*<img src={stationImageSrc} alt={station} />*/}
        </div>

        <div className="screen-horizontal__main">
          <div className="screen-horizontal__main-hero">
            {items.length === 0 ? (
              <MenuTypeNotice />
            ) : (
              featuredItem && <FeaturedItem item={featuredItem} />
            )}
          </div>
          <div className="screen-horizontal__footer">
            <div className="screen-horizontal__footer-inner">
              <DietaryLegend config={legendConfig} />
            </div>
          </div>
        </div>

        <div className="screen-horizontal__side">
          <div className="screen-horizontal__side-fit">
            <div
              className="screen-horizontal__side-inner screen-horizontal__side-inner--measure"
              ref={containerRef}
              aria-hidden="true"
            >
              <MenuItemList items={rotatedItems} iconSize="30px" gap="8px" />
            </div>
            <div className="screen-horizontal__side-inner">
              <MenuItemList
                items={displayListItems}
                iconSize="30px"
                gap="8px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
