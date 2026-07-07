import type { MenuItemData } from "@/lib/types";
import { MenuItem } from "./MenuItem";

type MenuItemListProps = {
  items: ReadonlyArray<MenuItemData>;
  iconSize?: string;
  gap?: string;
  nameSize?: string;
  descriptionSize?: string;
  className?: string;
};

export const MenuItemList = ({
  items,
  iconSize,
  gap,
  nameSize,
  descriptionSize,
  className,
}: MenuItemListProps) => (
  <>
    {items.map((item) => (
      <MenuItem
        key={item.recipeNumber}
        item={item}
        iconSize={iconSize}
        gap={gap}
        nameSize={nameSize}
        descriptionSize={descriptionSize}
        className={className}
      />
    ))}
  </>
);
