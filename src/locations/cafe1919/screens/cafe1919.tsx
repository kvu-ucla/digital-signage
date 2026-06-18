import type { MergedMenuData } from "../../../lib/types";
import { SCREEN_CONFIG } from "../config";
import HorizontalTemplate from "../templates/HorizontalTemplate";
import VerticalTemplate from "../templates/VerticalTemplate";

type Cafe1919ScreenProps = {
    data: MergedMenuData;
    station: string;
    screenType: string;
};

export const MainScreen = ({ data, station, screenType }: Cafe1919ScreenProps) => {
    const validRegions = SCREEN_CONFIG[station];

    if (!validRegions) {
        return (
            <div className="screen">
                <p>No screen configuration found for station "{station}".</p>
            </div>
        );
    }

    const validPositionsSet = new Set(validRegions);

    const filteredData: MergedMenuData = {
        ...data,
        stationsWithRegions: data.stationsWithRegions.filter((station) =>
            validPositionsSet.has(station.regionPosition)
        ),
    };
    
    if (screenType === "horizontal" && (station === "mains" || station === "sides" || station === "late-night")) {
        return (
            <HorizontalTemplate 
                data={filteredData}
            />
        );
    }
    else if (screenType === "vertical" && station === "specials") {
        return (
            <VerticalTemplate
                data={filteredData}
            />
        )
    }
    else {
        return (
            <main className="flex h-screen items-center justify-center text-[40px]">
                <div className="text-[40px]">
                    ERROR: INVALID URL
                </div>
            </main>
        )
    }
};