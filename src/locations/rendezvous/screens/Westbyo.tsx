import type { MergedMenuData } from "../../../lib/types";
import  WestBYOScreen  from "../templates/WestByoTemplate";

type RendezvousDisplayProps = {
  data: MergedMenuData;
  station: string;
  screenType: string;
};

export const RendezvousDisplay = ({ data, station, screenType }: RendezvousDisplayProps) => {

  return (
    <WestBYOScreen
          data={data}
          station={station}
    />
  );
};