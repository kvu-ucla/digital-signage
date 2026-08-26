import type { MergedMenuData } from "../../../lib/types";
import EastFreestyleScreen from "../templates/EastFreestyleTemplate";

type RendezvousDisplayProps = {
  data: MergedMenuData;
  station: string;
  screenType: string;
};

export const RendezvousDisplay = ({
  data,
  station,
}: RendezvousDisplayProps) => {
  // removed screenType due to build errors; may need to add back later

  return <EastFreestyleScreen data={data} station={station} />;
};
