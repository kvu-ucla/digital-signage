import type { MergedMenuData } from "../../../lib/types";
import DailyFreestyleBowlScreen from "../templates/DailyFreestyleBowlTemplate";

type RendezvousDisplayProps = {
  data: MergedMenuData;
  station: string;
  screenType: string;
};

export const RendezvousDisplay = ({
  data,
  station,
}: RendezvousDisplayProps) => {

  return <DailyFreestyleBowlScreen data={data} station={station} />;
};
