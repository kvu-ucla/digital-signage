<<<<<<< HEAD
import type { ScreenProps } from "@/lib/resolveScreen";
=======
import type { ScreenProps } from "../../../lib/resolveScreen";
>>>>>>> 8f9a397 (type:[feat] add cafe1919/rendezvous west)
import { HorizontalScreen } from "../template";
import { HORIZONTAL_LEGEND_CONFIG } from "../config";

export default function Horizontal({ data, station }: ScreenProps) {
  return <HorizontalScreen data={data} station={station} legendConfig={HORIZONTAL_LEGEND_CONFIG} />;
}
