import type { MenuItemData, MenuItemConfig } from "../lib/types";
import { DietaryIcon } from "./DietaryIcon";

type MenuItemProps = {
  item: MenuItemData;
  size?: string;
  menuItemConfig: MenuItemConfig;
};

export const MenuItem = ({
  item,
  size = "25px",
  menuItemConfig,
}: MenuItemProps) => (
  <div className={menuItemConfig.divClassName}>
    <div className={menuItemConfig.pricedivClassName}>
      <h3 className={menuItemConfig.itemClassName}>{item.name}</h3>

      {item.price && (
        <span className={menuItemConfig.priceClassName}>{item.price}</span>
      )}
    </div>

    {item.description && (
      <p className={menuItemConfig.summaryClassName}>{item.description}</p>
    )}

    {item.dietaryLabels.length > 0 && (
      <div
        className={menuItemConfig.dietaryClassName}
        style={{
          columnGap: menuItemConfig.gap,
        }}
      >
        {item.dietaryLabels.map((label) => (
          <DietaryIcon
            key={label}
            dietaryLabel={label}
            mode="light"
            size={size}
          />
        ))}
      </div>
    )}
  </div>
);

type MenuItemListProps = {
  items: ReadonlyArray<MenuItemData>;
  size?: string;
  menuItemConfig: MenuItemConfig;
};

export const MenuItemList = ({
  items,
  size,
  menuItemConfig,
}: MenuItemListProps) => (
  <>
    {items.map((item) => (
      <MenuItem
        key={item.recipeNumber}
        item={item}
        size={size}
        menuItemConfig={menuItemConfig}
      />
    ))}
  </>
);
