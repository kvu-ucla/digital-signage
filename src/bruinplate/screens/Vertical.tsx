import type { ScreenProps } from "../../lib/resolveScreen";
import { VerticalScreen } from "../template";
import { VERTICAL_LEGEND_CONFIG } from "../config";

export default function Vertical({ data, station }: ScreenProps) {
  return <VerticalScreen data={data} station={station} legendConfig={VERTICAL_LEGEND_CONFIG} />;
}
