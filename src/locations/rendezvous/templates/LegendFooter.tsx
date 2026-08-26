import { DietaryLegend } from "@/menu/DietaryLegend";
import { LEGEND_CONFIG } from "../config";

/** Shared legend footer for every east board. The w-[85%] wrapper sets the
 *  legend's wrap point and the bottom anchor sets its height off the canvas
 *  edge — keeping them here means the boards can never wrap or sit
 *  differently from one another. */
export const LegendFooter = () => (
  <footer className="absolute bottom-[20px] left-0 right-0 shrink-0">
    <div className="ml-auto mr-auto mt-1 flex w-[85%] items-center justify-center">
      <DietaryLegend config={LEGEND_CONFIG} />
    </div>
  </footer>
);
