import UpcomingBowlsTemplate from "../templates/UpcomingBowlsTemplate";
import { useUpcomingBowls } from "../hooks/useUpcomingBowls";

// Ignores the ScreenProps data on purpose: this board's need is multi-day
// (today + 6 offsets), fetched by its own hook rather than useMenu.
export const RendezvousDisplay = () => {
  const { bowls } = useUpcomingBowls();
  return <UpcomingBowlsTemplate bowls={bowls} />;
};
