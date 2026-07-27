import type { ScreenProps } from "@/lib/resolveScreen";
import { HorizontalScreen } from "@/templates/HorizontalScreen";
import { HORIZONTAL_LEGEND_CONFIG } from "../config";
import type { HorizontalScreenProps } from "@/templates/HorizontalScreen";

export default function HorizontalTemplate({ data, station }: ScreenProps) {

    const feastHorizontalScreenProps: HorizontalScreenProps = {
        data: data,
        station: station,
        legendConfig: HORIZONTAL_LEGEND_CONFIG
    };

    console.log(data);

    return (
        <HorizontalScreen {...feastHorizontalScreenProps} />
      );
}