import type { MenuItemData } from "../../../lib/types";

const makeItem = (
  recipeNumber: string,
  name: string,
  dietaryLabels: ReadonlyArray<string>,
  price: string | null = null,
): MenuItemData => ({
  recipeNumber,
  name,
  description: null,
  price,
  dietaryLabels,
  mealType: "lunch",
});

export const DUMMY_MONDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("M1", "Spaghetti Bolognese", ["Wheat", "Gluten", "Dairy"], "$8.50"),
  makeItem("M2", "Garlic Bread", ["Wheat", "Gluten", "Dairy", "Vegan"], "$3.50"),
  makeItem("M3", "Caesar Salad", ["Eggs", "Dairy", "Fish"], "$6.00"),
  makeItem("M4", "Minestrone Soup", ["Vegan", "Low-Carbon-Footprint"], "$4.50"),
];

export const DUMMY_TUESDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("Tu1", "Chicken Tikka Masala", ["Dairy", "High-Carbon-Footprint"], "$9.00"),
  makeItem("Tu2", "Basmati Rice", ["Vegan", "Low-Carbon-Footprint"], "$2.50"),
  makeItem("Tu3", "Naan Bread", ["Wheat", "Gluten", "Dairy"], "$3.00"),
  makeItem("Tu4", "Mango Lassi", ["Dairy"], "$4.00"),
];

export const DUMMY_WEDNESDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("W1", "Fish & Chips", ["Fish", "Wheat", "Gluten", "Eggs"], "$9.50"),
  makeItem("W2", "Coleslaw", ["Vegan", "Low-Carbon-Footprint"], "$3.00"),
  makeItem("W3", "Mushy Peas", ["Vegan", "Low-Carbon-Footprint"], "$2.50"),
  makeItem("W4", "Tartar Sauce", ["Eggs"], "$1.00"),
];

export const DUMMY_THURSDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("Th1", "Pad Thai", ["Peanut", "Soy", "Wheat", "Gluten"], "$8.50"),
  makeItem("Th2", "Spring Rolls", ["Soy", "Wheat", "Gluten", "Vegan"], "$4.00"),
  makeItem("Th3", "Tom Yum Soup", ["Fish", "Shellfish"], "$5.50"),
  makeItem("Th4", "Sticky Rice", ["Vegan", "Low-Carbon-Footprint"], "$2.50"),
];

export const DUMMY_FRIDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("F1", "Margherita Pizza", ["Wheat", "Gluten", "Dairy"], "$7.50"),
  makeItem("F2", "Pepperoni Pizza", ["Wheat", "Gluten", "Dairy"], "$8.00"),
  makeItem("F3", "Garden Salad", ["Vegan", "Low-Carbon-Footprint"], "$5.50"),
  makeItem("F4", "Tiramisu", ["Dairy", "Eggs", "Wheat", "Gluten"], "$4.50"),
];

export const DUMMY_SATURDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("Sa1", "Beef Burrito", ["Dairy", "High-Carbon-Footprint"], "$8.50"),
  makeItem("Sa2", "Chicken Quesadilla", ["Dairy", "Wheat", "Gluten"], "$7.50"),
  makeItem("Sa3", "Guacamole", ["Vegan", "Low-Carbon-Footprint"], "$3.00"),
  makeItem("Sa4", "Churros", ["Wheat", "Gluten", "Dairy"], "$4.00"),
];

export const DUMMY_SUNDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("Su1", "Roast Turkey", ["High-Carbon-Footprint"], "$10.00"),
  makeItem("Su2", "Mashed Potatoes", ["Dairy", "Vegan"], "$3.50"),
  makeItem("Su3", "Stuffing", ["Wheat", "Gluten", "Vegan"], "$3.00"),
  makeItem("Su4", "Cranberry Sauce", ["Vegan", "Low-Carbon-Footprint"], "$2.00"),
];

export const DUMMY_EAST_BASE_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("EB1", "Jasmine Rice", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("EB2", "Udon Noodles", ["Wheat", "Gluten", "Vegan"]),
  makeItem("EB3", "Soba Noodles", ["Wheat", "Gluten", "Vegan"]),
  makeItem("EB4", "Mixed Greens", ["Vegan", "Low-Carbon-Footprint"]),
];

export const DUMMY_EAST_TOPPING_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("ET1", "Pickled Ginger", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("ET2", "Wasabi", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("ET3", "Seaweed Flakes", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("ET4", "Sesame Seeds", ["Sesame", "Vegan", "Low-Carbon-Footprint"]),
  makeItem("ET5", "Cucumber Slices", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("ET6", "Avocado", ["Vegan", "Low-Carbon-Footprint"]),
];

export const DUMMY_EAST_ENTREE_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("EE1", "Teriyaki Chicken", ["Soy", "Wheat", "Gluten"]),
  makeItem("EE2", "Grilled Salmon", ["Fish"]),
  makeItem("EE3", "Tofu Steak", ["Soy", "Vegan", "Low-Carbon-Footprint"]),
  makeItem("EE4", "Beef Bulgogi", ["Soy", "Sesame", "High-Carbon-Footprint"]),
];

export const DUMMY_EAST_SAUCE_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("ES1", "Soy Sauce", ["Soy", "Wheat", "Gluten", "Vegan"]),
  makeItem("ES2", "Spicy Mayo", ["Eggs", "Soy"]),
  makeItem("ES3", "Ponzu", ["Soy", "Fish", "Vegan"]),
  makeItem("ES4", "Sweet Chili", ["Vegan", "Low-Carbon-Footprint"]),
];

export const DUMMY_WEST_STYLE_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("WS1", "Stir-Fry", ["Vegan"]),
  makeItem("WS2", "Rice Bowl", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WS3", "Wrap", ["Wheat", "Gluten", "Vegan"]),
  makeItem("WS4", "Salad Bowl", ["Vegan", "Low-Carbon-Footprint"]),
];

export const DUMMY_WEST_FILLING_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("WF1", "Grilled Chicken", ["High-Carbon-Footprint"], "$3.50"),
  makeItem("WF2", "Steak", ["High-Carbon-Footprint"], "$4.50"),
  makeItem("WF3", "Grilled Tofu", ["Soy", "Vegan", "Low-Carbon-Footprint"], "$2.50"),
  makeItem("WF4", "Grilled Salmon", ["Fish"], "$5.00"),
];

export const DUMMY_WEST_BASE_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("WB1", "Brown Rice", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WB2", "Quinoa", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WB3", "Mixed Greens", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WB4", "Sweet Potato Fries", ["Vegan", "Low-Carbon-Footprint"]),
];

export const DUMMY_WEST_TOPPING_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("WT1", "Shredded Cheese", ["Dairy"]),
  makeItem("WT2", "Sour Cream", ["Dairy"]),
  makeItem("WT3", "Pico de Gallo", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WT4", "Jalapeños", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WT5", "Black Beans", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WT6", "Corn Salsa", ["Vegan", "Low-Carbon-Footprint"]),
];

export const DUMMY_WEST_EXTRA_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("WX1", "Side of Guacamole", ["Vegan", "Low-Carbon-Footprint"], "$2.50"),
  makeItem("WX2", "Extra Cheese", ["Dairy"], "$1.50"),
  makeItem("WX3", "Side of Rice", ["Vegan", "Low-Carbon-Footprint"], "$2.00"),
  makeItem("WX4", "Side of Beans", ["Vegan", "Low-Carbon-Footprint"], "$2.00"),
];

export const DUMMY_WEST_DRINK_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("WD1", "Fountain Drink", [], "$2.50"),
  makeItem("WD2", "Iced Tea", ["Vegan", "Low-Carbon-Footprint"], "$2.50"),
  makeItem("WD3", "Lemonade", ["Vegan", "Low-Carbon-Footprint"], "$3.00"),
  makeItem("WD4", "Bottled Water", ["Vegan", "Low-Carbon-Footprint"], "$2.00"),
];