import type { MergedMenuData } from "../../../lib/types";
import DailyLunchSpecialsScreen from "../templates/DailyLunchSpecialsTemplate";

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

  return <DailyLunchSpecialsScreen data={data} station={station} />;
};
