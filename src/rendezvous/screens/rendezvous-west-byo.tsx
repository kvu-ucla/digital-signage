import { useEffect, type ReactElement } from "react";
import type { MergedMenuData } from "../../lib/types";
import  WestBYOScreen  from "../templates/RendezvousWestTemplate";

type RendezvousDisplayProps = {
  data: MergedMenuData;
  station: string;
};

const formatTitle = (station: string): string => {
  if (!station.trim()) return "Rendezvous";

  return station
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replaceAll("+", " ");
};

export default function RendezvousDisplay({
  data,
  station,
}: RendezvousDisplayProps): ReactElement {
  useEffect((): void => {
    document.body.dataset.hall = "rende";

    const themeStyles = document.getElementById(
      "themeStyles",
    ) as HTMLLinkElement | null;

    if (themeStyles) {
      themeStyles.href = "/themes/default.css";
    }

    document.title = `Rendezvous ${formatTitle(station)} — Digital Signage`;
  }, [station]);

  if (station === "build-your-own") {
    return (
      <WestBYOScreen
        data={data}
        station={station}
      />
    );
  }

  return (
    <WestBYOScreen
          data={data}
          station={station}
    />
  );
}