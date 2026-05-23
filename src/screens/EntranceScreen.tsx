import type { MenuData } from "../lib/types";
import { MenuItemList } from "../menu/MenuItemList";
import "./EntranceScreen.css";
import { CyclingColumn } from "./CyclingColumns"

type EntranceScreenProps = {
  data: MenuData;
  sheetData: Array<Record<string, string>> | null;
  sheetError: unknown;
};

export const EntranceScreen = ({
    data,
    sheetData,
    sheetError,
}: EntranceScreenProps) => {
    if (!sheetData) {
        const errorMessage: string =
        sheetError instanceof Error
        ? sheetError.message
        : typeof sheetError === "string"
        ? sheetError
        : "An unknown error occurred";
    return (
        <div className="screen">
            <p>Sheet data failed to load.</p>
            {sheetError ? (
            <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>{errorMessage}</p>
            ) : null}
        </div>
    );
    }

    const stationRegions = new Map<string, { regionPosition: number; regionOrder: number } >();

    for (const row of sheetData) {
        const stationName = row["Menu_Meal_Option"]?.toLowerCase().trim();
        if (!stationName) continue;
        const regionPositionRaw = row["Region Position"]?.trim().toLowerCase();

        if (!regionPositionRaw || regionPositionRaw === "none") continue;
        stationRegions.set(stationName, {
            regionPosition: parseInt(regionPositionRaw, 10) || 1,
            regionOrder: parseInt(row["Region Order"] ?? "0", 10) || 0,
        });
    }

    type RegionStation = {
        name: string;
        items: (typeof data.stations)[string];
        order: number;
    };
    const regionMap = new Map<number, Array<RegionStation>>();

    for (const [stationName, items] of Object.entries(data.stations)) {
        const region = stationRegions.get(stationName.toLowerCase().trim());
        if (!region) continue; // skip stations not in sheet data
        const position = region.regionPosition;
        const order = region.regionOrder;

        if (!regionMap.has(position)) {
            regionMap.set(position, []);
        }
        regionMap.get(position)?.push({ name: stationName, items, order });
    }

    for (const [, stations] of regionMap) {
        stations.sort((a, b) => a.order - b.order);
    }

    const sortedRegions = [...regionMap.entries()].sort(([a], [b]) => a - b);

    return (
        <div className="screen-entrance">
            <header className="screen-entrance__header">
                <div className="screen-entrance__header-logo">
                    <img src="./images/bruin-plate-logo.svg" alt="Bruin Plate" />
                </div>
                <h1 className="screen-entrance__header-title">Bruin Plate</h1>
                <div className="screen-entrance__header-certificate">
                    <div className="screen-entrance__header-certificate-placeholder" />
                </div>
            </header>
            <div className="screen-entrance__body">
                <div className="screen-entrance__columns">
                    {sortedRegions.map(([position, stations]) => (
                    <div key={position} className="screen-entrance__column">
                        {stations.map(({ name, items }) => {
                            const itemNodes = items.map((item) => (
                            <MenuItemList items={[item]} />
                            ));

                        return (
                        <div key={name}>
                            <h2 className="screen-entrance__column-header">{name}</h2>
                            <CyclingColumn viewportHeight={400}>{itemNodes}</CyclingColumn> {/* will probably have to modify this to be responsive later*/}
                        </div>
                        );
                        })}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
