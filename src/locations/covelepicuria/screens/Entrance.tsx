import type { ScreenProps } from "@/lib/resolveScreen";
import { EntranceScreen } from "../template";
import { LEGEND_CONFIG } from "../config";

const header = (
  <header className="flex h-[250px] w-full shrink-0 items-center bg-[#005289] px-[80px] text-white">
    <div className="flex h-full w-[230px] shrink-0 items-center justify-center">
      <img
        src="./images/epicuria-logo.svg"
        alt="Epicuria at Covel"
        className="h-[200px] w-[200px] object-contain"
      />
    </div>

    <div className="flex flex-1 flex-col pl-10 justify-center pt-6">
      <p className="pl-35 text-[50px] font-light uppercase leading-none tracking-[0.35em]">
        Welcome To
      </p>
      <h1 className="text-[150px] font-extrabold leading-none tracking-wide">
        Epicuria
      </h1>
    </div>

    <div className="flex h-full w-[360px] shrink-0 items-center justify-center">
      <div className="h-[150px] w-[310px] bg-[#7a8d32]" />
    </div>
  </header>
)

export default function Entrance({ data }: ScreenProps) {
  return (
    <EntranceScreen data={data} header={header} legendConfig={LEGEND_CONFIG} />
  );
}
