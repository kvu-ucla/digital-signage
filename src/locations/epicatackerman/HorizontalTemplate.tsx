import type { MergedMenuData } from "@/lib/types";
// import { MenuItemList } from "@/menu/ModMenuList";
import { DietaryIcon } from "@/menu/DietaryIcon";
import { LEGEND_CONFIG, type EpicAtAckermanLegendConfig, keyContains } from "./config";

// uses rockwell font

type EpicAtAckermanTemplateProps = {
  data: MergedMenuData;
};

export default function HorizontalTemplate({ data }: EpicAtAckermanTemplateProps) {
    if (data.stationsWithRegions.length === 0) {
        return (
        <div className="flex h-[1080px] w-[1920px] items-center justify-center bg-slate-100 text-lg text-slate-600">
            No station region data available.
        </div>
        );
    }

    const regionMap = new Map<
        number,
        Array<{
        name: string;
        items: (typeof data.stationsWithRegions)[number]["items"];
        order: number;
        }>
    >();

    for (const station of data.stationsWithRegions) {
    const position = station.regionPosition;
    const order = station.regionOrder;

    if (!regionMap.has(position)) {
      regionMap.set(position, []);
    }

    regionMap.get(position)?.push({
      name: station.name,
      items: [...station.items],
      order,
    });
  }

    for (const [, stations] of regionMap) {
        stations.sort((a, b) => a.order - b.order);
    }

  const sortedRegions = [...regionMap.entries()].sort(([a], [b]) => a - b);
  const rightPageColumnGroups = [
    [7, 8],
    [9, 10, 11],
    [12],
  ] as const;

  return (
    <div className="flex h-[1080px] w-[1920px] flex-col overflow-hidden bg-white">
      
        <header className="flex h-[142px] items-center justify-between">
            <div className="flex h-[142px] w-[1920px] items-center justify-center bg-[#143051]">
                {/* Image */}
            </div>
        </header>

        <main className="relative grid flex-1 h-[938px] w-[1920px] grid-cols-3 bg-[#FDFAF1]">
            {sortedRegions.some(([position]) => position === 1) ? (
              <LegendColumn config={LEGEND_CONFIG} />
            ) : null}

            {sortedRegions.some(([position]) => position >= 7 && position <= 11) ? (
              rightPageColumnGroups
                .filter((group) => group.some((position) => position < 12))
                .map((group) => (
                  <div key={group.join("-")} className="flex flex-col">
                    {group.map((position) => {
                      if (position === 12) return null;

                      const region = sortedRegions.find(([regionPosition]) => regionPosition === position);

                      return (
                        <div key={position} className="flex flex-col gap-[36px] px-[30px] py-[36px] text-[24px] text-[#252525]">
                          {region ? `position: ${position}` : `missing: ${position}`}
                        </div>
                      );
                    })}
                  </div>
                ))
            ) : (
              sortedRegions.map(([position]) => {
                if (position === 1 || position === 12) return null;

                return <div className="flex flex-col gap-[36px] px-[30px] py-[36px] text-[24px] text-[#252525]" key={position}>position: {position}</div>;
              })
            )}

            {sortedRegions.some(([position]) => position === 12) ? (
              <PaymentColumn />
            ) : null}
        </main>
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