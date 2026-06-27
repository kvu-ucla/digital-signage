import type { MergedMenuData } from "../../../lib/types";
import  WestBYOScreen  from "../templates/WestByoTemplate";

type RendezvousDisplayProps = {
  data: MergedMenuData;
  station: string;
  screenType: string;
};

export const RendezvousDisplay = ({ data, station }: RendezvousDisplayProps) => {       // removed screenType due to build errors; may need to add back later

  return (
    <WestBYOScreen
          data={data}
          station={station}
    />
  );
};