import type { ReactElement } from "react";
import { getStationItems } from "../helpers/rendezvous";
import type { MergedMenuData } from "@/lib/types";
import icon from '@/images/Rendezvous Logo - East White.svg'

type BobaTemplateProps = {
  data: MergedMenuData;
  station: string;
};

export default function BobaTemplate({
  data,
  station,
}: BobaTemplateProps): ReactElement {
  void station;
  const drinks = getStationItems(data, "BOBA DRINKS");

  const leftColumn = drinks.filter((_, i) => i % 2 === 0);
  const rightColumn = drinks.filter((_, i) => i % 2 === 1);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div
        className="relative h-[1080px] w-[1920px] overflow-hidden"
        style={{ fontFamily: "Tablet Gothic Condensed Bold" }}
      >
        <img
          src="backgrounds/rd-boba.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-fill"
        />
        <header className="absolute inset-x-0 top-0 flex h-[177px] items-center justify-between px-[50px]">
          <h1 className="text-[85px] uppercase text-white pt-[24px]">Boba Drinks</h1>
          <img
            src={icon}
            alt="Rendezvous East Logo"
            className="h-[80px]"
          />
        </header>

        <main className="absolute bottom-[95px] left-[52px] right-[52px] top-[175px] flex items-start gap-x-[60px] pt-[40px] px-[50px]">
          {drinks.length > 0 ? (
            <>
              <div className="h-[50%] w-[25%]" />

              <div className="flex flex-1 flex-col pr-[120px] pt-[25px]">
                <div className="flex items-center justify-between pb-[10px] border-b-2 border-[#810031] mb-[20px]">
                  <span className="text-[45px] uppercase text-black">Boba Flavors</span>
                  <span className="text-[45px] uppercase text-black">22 oz.</span>
                </div>
                <div className="grid grid-cols-2 gap-x-[80px] gap-y-[20px]">
                  <div className="flex flex-col gap-y-[20px]">
                    {leftColumn.map((item) => (
                      <p
                        key={item.recipeNumber}
                        className="m-0 text-[45px] uppercase leading-tight text-[#810031]"
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-col gap-y-[20px]">
                    {rightColumn.map((item) => (
                      <p
                        key={item.recipeNumber}
                        className="m-0 text-[45px] uppercase leading-tight text-[#810031]"
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-[46px] text-[#3c3c3c] font-normal text-center m-0 leading-none [font-family:var(--font-display)]">
              No drinks available
            </p>
          )}
        </main>
      </div>
    </div>
  );
}