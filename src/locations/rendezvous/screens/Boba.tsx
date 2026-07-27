import type { MergedMenuData } from "../../../lib/types";
import BobaTemplate from "../templates/BobaTemplate";

type RendezvousDisplayProps = {
  data: MergedMenuData;
  station: string;
  screenType: string;
};

export const RendezvousDisplay = ({
  data,
  station,
}: RendezvousDisplayProps) => {
  return <BobaTemplate data={data} station={station} />;
};