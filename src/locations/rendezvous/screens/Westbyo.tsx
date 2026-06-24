import type { MergedMenuData } from "../../../lib/types";
import  WestBYOScreen  from "../templates/WestByoTemplate";

type RendezvousDisplayProps = {
  data: MergedMenuData;
};

export const RendezvousDisplay = ({ data }: RendezvousDisplayProps) => {

  return (
    <WestBYOScreen
          data={data}
    />
  );
};