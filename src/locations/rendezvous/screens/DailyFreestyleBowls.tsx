import type { MergedMenuData } from "../../../lib/types";
import FeatureScreen from "../templates/FeatureTemplate";

type RendezvousDisplayProps = {
  data: MergedMenuData;
  station: string;
  screenType: string;
};

export const RendezvousDisplay = ({
  data,
  station,
}: RendezvousDisplayProps) => {
  return (
    <FeatureScreen
      data={data}
      station={station}
      stationName="ASIAN DAILY SPECIAL"
      title="Daily Freestyle Bowls"
    />
  );
};