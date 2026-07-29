import type { MenuItemData } from "@/lib/types";
import { DietaryIcon } from "./DietaryIcon";

type FeaturedItemProps = {
  item: MenuItemData;
  titleColor?: string;
  titleSize?: string;
  descriptionSize?: string;
};

export const FeaturedItem = ({
  item,
  titleColor = "#3c3c3c",
  titleSize = "85px",
  descriptionSize = "46px",
}: FeaturedItemProps) => (
  <div className="flex flex-col items-center gap-[42px] w-full">
    <h2
      className="font-bold not-italic leading-none tracking-[0.425px] text-center m-0 [font-family:var(--font-display)] [text-box:trim-both_cap_alphabetic]"
      style={{ color: titleColor, fontSize: titleSize }}
    >
      {item.name}
    </h2>
    {item.dietaryLabels.length > 0 && (
      <div className="flex gap-[8px] items-center h-[40px]">
        {item.dietaryLabels.map((label) => (
          <DietaryIcon
            key={label}
            dietaryLabel={label}
            size="40px"
            mode="light"
          />
        ))}
      </div>
    )}
    {item.description && (
      <p
        className="text-[#3c3c3c] font-normal text-center m-0 leading-none [font-family:var(--font-display)] [text-box:trim-both_cap_alphabetic]"
        style={{ fontSize: descriptionSize }}
      >
        {item.description}
      </p>
    )}
  </div>
);
