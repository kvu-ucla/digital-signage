import type { ScreenProps } from "@/lib/resolveScreen";
import { HorizontalScreen } from "../template";
import { HORIZONTAL_LEGEND_CONFIG } from "../config";

export default function Horizontal({ data, station }: ScreenProps) {
  return (
    <HorizontalScreen
      data={data}
      station={station}
      legendConfig={HORIZONTAL_LEGEND_CONFIG}
    />
  );
}
