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
      stationName="SUSHI BOWLS"
      title="Daily Sushi Bowls"
    />
  );
};