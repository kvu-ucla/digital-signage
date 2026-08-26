import type { MergedMenuData, MenuItemData } from "@/lib/types";
import { DietaryIcon } from "@/menu/DietaryIcon";
import { MenuItemList } from "@/menu/ModMenuList";
import { groupByRegion, type RegionStation } from "@/lib/regions";
import {
  LEGEND_CONFIG,
  MENU_ITEM_CONFIG,
  keyContains,
  type EpicAtAckermanLegendConfig,
} from "../config";

type EpicAtAckermanTemplateProps = {
  data: MergedMenuData;
};

// Region positions that render a dedicated column instead of a station menu:
// position 1 is the dietary legend, position 9 is the payment/deal info.
const LEGEND_POSITION = 1;
const PAYMENT_POSITION = 9;

export default function HorizontalTemplate({ data }: EpicAtAckermanTemplateProps) {
    if (data.stationsWithRegions.length === 0) {
        return (
        <div className="flex h-[1080px] w-[1920px] items-center justify-center bg-slate-100 text-lg text-slate-600">
            No station region data available.
        </div>
        );
    }

  const sortedRegions = groupByRegion(data.stationsWithRegions);

  return (
    <div className="flex h-[1080px] w-[1920px] flex-col overflow-hidden bg-white subpixel-antialiased [font-family:var(--font-display)]">
      <header className="h-[142px] w-[1920px] shrink-0">
        <img
          src={`${import.meta.env.BASE_URL}images/Banner.png`}
          alt="Epicuria at Ackerman"
          className="h-full w-full object-cover"
        />
      </header>

      <main className="relative grid flex-1 h-[938px] w-[1920px] grid-cols-3 bg-[#FDFAF1]">
        {sortedRegions.map(([position, stations]) => {
          if (position === LEGEND_POSITION) {
            return <LegendColumn key={position} config={LEGEND_CONFIG} />;
          }
          if (position === PAYMENT_POSITION) {
            return <PaymentColumn key={position} />;
          }
          return <MenuColumn key={position} stations={stations} />;
        })}
      </main>
    </div>
  );
}

/** Epic's Figma shows prices as "$10.95", but the feed provides bare numbers.
 *  Prefix "$" when it's missing; leave any already-prefixed price untouched. */
const withDollarPrice = (item: MenuItemData): MenuItemData =>
  item.price && !item.price.trim().startsWith("$")
    ? { ...item, price: `$${item.price.trim()}` }
    : item;

function MenuColumn({ stations }: { stations: Array<RegionStation> }) {
  return (
    <div className="flex flex-col gap-[36px] p-[36px]">
      {stations.map(({ name, items }) =>
        name.trim() ? (
          <div key={name} className="flex flex-col gap-[24px]">
            <h2 className="m-0 text-[40px] font-bold uppercase leading-none text-[#1E355E]">
              {name}
            </h2>
            {items.length > 0 && (
              <MenuItemList
                items={items.map(withDollarPrice)}
                size="26px"
                menuItemConfig={MENU_ITEM_CONFIG}
              />
            )}
          </div>
        ) : null,
      )}
    </div>
  );
}

const LegendColumn = ({ config }: { config: EpicAtAckermanLegendConfig }) => {
  const legendItems = Object.entries(keyContains).map(([key, value]) => ({
    key,
    label: value,
    dietaryLabel: key,
  }));

  return (
    <div className="flex flex-col gap-[8px] px-[36px] py-[36px]">
      <p
        className="m-0 uppercase"
        style={{
          color: config.titleColor,
          fontSize: config.titleFontSize,
          fontWeight: 700,
          letterSpacing: "0px",
          padding: "0 0 22px 0",
          lineHeight: "18px",
        }}
      >
        {config.titleName}
      </p>


      <div className="flex flex-col" style={{ gap: config.rowGap }}>
        {legendItems.map(({ key, label, dietaryLabel }) => (
          <div key={key} className="flex items-center" style={{ gap: config.iconLabelOffset }}>
            <DietaryIcon dietaryLabel={dietaryLabel} mode="dark" size={config.imgSize} />
            <span
              style={{
                color: config.labelColor,
                fontSize: config.labelFontSize,
                fontWeight: 400,
                letterSpacing: "0px",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {config.description ? (
        <p
          className="m-0"
          style={{
            color: config.descriptionColor ?? config.titleColor,
            fontSize: config.descriptionFontSize ?? "18px",
            fontWeight: 700,
            padding: config.descriptionPadding ?? "0",
            lineHeight: "29px",
          }}
        >
          {config.description}
        </p>
      ) : null}
    </div>
  );
};

const PaymentColumn = () => {
    return (
        <div className="flex flex-col items-center justify-center px-[36px] gap-[28px] bg-[#FDFAF1] leading-none">
            <div className="flex flex-col items-center justify-center pt-[24px] pb-[24px] gap-[30px]">
                <p className="text-[#1E355E] text-[40px] font-bold leading-[29px]"> ACCEPTED PAYMENT </p>
                <div className="flex flex-col text-[#252525] text-[24px] font-bold gap-[24px] leading-[18px]"> 
                    <div> Bruincard (EasyPay) </div> 
                    <div> Credit & Debit Card </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center pt-[24px] pb-[24px] gap-[30px]">
                <p className="text-[#1E355E] text-[40px] font-bold leading-[29px]"> ONE SWIPE DEAL </p>
                <div className="text-[#252525] text-[24px] text-center font-regular gap-[24px] leading-1.3"> 
                    <p> Any Salad, Pizza, Pasta, or Sandwich </p> 
                    <p>+</p>
                    <p> One Fountain Drink and One Side </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-[#252525] text-[22px] font-bold text-center pr-[30px] pl-[30px]"> 
                    Due to demand, availability of selection may vary slightly each day. Thank you for your patience! 
                    </p>
            </div>
        </div>
    );
}