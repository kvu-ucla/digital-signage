<<<<<<< HEAD
import type { ScreenProps } from "@/lib/resolveScreen";
=======
import type { ScreenProps } from "../../../lib/resolveScreen";
>>>>>>> 8f9a397 (type:[feat] add cafe1919/rendezvous west)
import { VerticalScreen } from "../template";
import { VERTICAL_LEGEND_CONFIG } from "../config";

export default function Vertical({ data, station }: ScreenProps) {
  return <VerticalScreen data={data} station={station} legendConfig={VERTICAL_LEGEND_CONFIG} />;
}
