import type { ScreenProps } from "@/lib/resolveScreen";
import { MenuItemList } from "@/menu/MenuItemList";
import { CyclingColumn } from "@/components/CyclingColumns";
import { groupByRegion, type RegionStation } from "@/lib/regions";
import { getDisplayMode } from "@/lib/queryParams";

function Cell({
  stations,
  isMinimal,
}: {
  stations: Array<RegionStation>;
  isMinimal: boolean;
}) {
  const itemNodes = stations.flatMap(({ items }) =>
    items.map((item) => (
      <MenuItemList
        key={item.recipeNumber}
        items={[item]}
        iconSize="30px"
        gap="10px"
        className="items-center text-center"
      />
    )),
  );

  return (
    <section className="dn-entrance__cell">
      <h2 className={`dn-entrance__title${isMinimal ? " invisible" : ""}`}>
        {stations.map(({ name }) => name).join(" / ")}
      </h2>
      <div className="dn-entrance__items">
        <CyclingColumn>{itemNodes}</CyclingColumn>
      </div>
    </section>
  );
}

/**
 * De Neve portrait entrance. The frame (header, center divider, per-column
 * rules, footer) is supplied at runtime via the `?bg=` takeover overlay, not
 * hardcoded here. This layer lays out the live station cards as:
 * header ▸ top row ▸ bottom row ▸ footer, with the header/footer bands
 * reserving space for the frame. Titles and items are data-driven from the
 * sheet's region config. Layout lives in public/themes/deneve.css.
 */
export default function Entrance({ data }: ScreenProps) {
  const { isMinimal } = getDisplayMode();
  const regions = groupByRegion(data.stationsWithRegions);
  const topRow = regions.slice(0, 2);
  const bottomRow = regions.slice(2, 4);

  return (
    <div className="dn-entrance">
      <div className="dn-entrance__header" aria-hidden="true" />

      <div className="dn-entrance__row dn-entrance__row--top">
        {topRow.map(([position, stations]) => (
          <Cell key={position} stations={stations} isMinimal={isMinimal} />
        ))}
      </div>

      <div className="dn-entrance__row dn-entrance__row--bottom">
        {bottomRow.map(([position, stations]) => (
          <Cell key={position} stations={stations} isMinimal={isMinimal} />
        ))}
      </div>

      <div className="dn-entrance__footer" aria-hidden="true" />
    </div>
  );
}
