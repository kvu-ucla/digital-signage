import type { MenuItemData } from "../../../lib/types";

const makeItem = (
  recipeNumber: string,
  name: string,
  dietaryLabels: ReadonlyArray<string>,
): MenuItemData => ({
  recipeNumber,
  name,
  description: null,
  price: null,
  dietaryLabels,
  mealType: "lunch",
});

export const DUMMY_BASE_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("B1", "Brown Rice", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("B2", "Chow Mein Noodles", [
    "Wheat",
    "Gluten",
    "Soy",
    "Vegan",
    "Low-Carbon-Footprint",
  ]),
  makeItem("B3", "Sticky Rice", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("B4", "Young Chow Vegetable Fried Rice", [
    "Soy",
    "Eggs",
    "Vegetarian",
    "Low-Carbon-Footprint",
  ]),
];

export const DUMMY_ENTREE_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("E1", "BBQ Roast Pork", [
    "Peanut",
    "Soy",
    "Wheat",
    "Alcohol",
  ]),
  makeItem("E2", "Beef & Broccoli", [
    "Peanut",
    "Soy",
    "Wheat",
    "High-Carbon-Footprint",
  ]),
  makeItem("E3", "Chinese Broccoli", ["Peanut", "Gluten", "Soy", "Sesame"]),
  makeItem("E4", "Eggplant & Tofu w/ Spicy Garlic Sauce", [
    "Peanut",
    "Soy",
    "Vegan",
    "Low-Carbon-Footprint",
  ]),
  makeItem("E5", "Fish w/ Black Bean Sauce", [
    "Soy",
    "Wheat",
    "Fish",
    "Alcohol",
  ]),
  makeItem("E6", "Green Bean Stir Fry", [
    "Peanut",
    "Gluten",
    "Soy",
    "Vegan",
  ]),
  makeItem("E7", "Orange Chicken", ["Peanut", "Wheat", "Soy"]),
];

export const DUMMY_TOPPING_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("T1", "Edamame", ["Soy", "Vegan", "Low-Carbon-Footprint"]),
  makeItem("T2", "Kimchi", ["Fish", "Low-Carbon-Footprint"]),
  makeItem("T3", "Marinated Soy Sprouts", [
    "Soy",
    "Vegan",
    "Low-Carbon-Footprint",
  ]),
  makeItem("T4", "Salted Cucumber", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("T5", "Seasoned Blanched Spinach", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("T6", "Seaweed Salad", [
    "Sesame",
    "Gluten",
    "Soy",
    "Vegan",
    "Low-Carbon-Footprint",
  ]),
  makeItem("T7", "Vietnamese Pickled Daikon", [
    "Vegan",
    "Low-Carbon-Footprint",
  ]),
  makeItem("T8", "Vietnamese Pickled Vegetables", [
    "Vegan",
    "Low-Carbon-Footprint",
  ]),
  makeItem("T9", "Vietnamese Shredded Green Papaya Salad", [
    "Vegan",
    "Low-Carbon-Footprint",
  ]),
];

export const DUMMY_MONDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("M1", "Spaghetti Bolognese", ["Wheat", "Gluten", "Dairy"]),
  makeItem("M2", "Garlic Bread", ["Wheat", "Gluten", "Dairy", "Vegan"]),
  makeItem("M3", "Caesar Salad", ["Eggs", "Dairy", "Fish"]),
  makeItem("M4", "Minestrone Soup", ["Vegan", "Low-Carbon-Footprint"]),
];

export const DUMMY_TUESDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("Tu1", "Chicken Tikka Masala", ["Dairy", "High-Carbon-Footprint"]),
  makeItem("Tu2", "Basmati Rice", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("Tu3", "Naan Bread", ["Wheat", "Gluten", "Dairy"]),
  makeItem("Tu4", "Mango Lassi", ["Dairy"]),
];

export const DUMMY_WEDNESDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("W1", "Fish & Chips", ["Fish", "Wheat", "Gluten", "Eggs"]),
  makeItem("W2", "Coleslaw", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("W3", "Mushy Peas", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("W4", "Tartar Sauce", ["Eggs"]),
];

export const DUMMY_THURSDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("Th1", "Pad Thai", ["Peanut", "Soy", "Wheat", "Gluten"]),
  makeItem("Th2", "Spring Rolls", ["Soy", "Wheat", "Gluten", "Vegan"]),
  makeItem("Th3", "Tom Yum Soup", ["Fish", "Shellfish"]),
  makeItem("Th4", "Sticky Rice", ["Vegan", "Low-Carbon-Footprint"]),
];

export const DUMMY_FRIDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("F1", "Margherita Pizza", ["Wheat", "Gluten", "Dairy"]),
  makeItem("F2", "Pepperoni Pizza", ["Wheat", "Gluten", "Dairy"]),
  makeItem("F3", "Garden Salad", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("F4", "Tiramisu", ["Dairy", "Eggs", "Wheat", "Gluten"]),
];

export const DUMMY_SATURDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("Sa1", "Beef Burrito", ["Dairy", "High-Carbon-Footprint"]),
  makeItem("Sa2", "Chicken Quesadilla", ["Dairy", "Wheat", "Gluten"]),
  makeItem("Sa3", "Guacamole", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("Sa4", "Churros", ["Wheat", "Gluten", "Dairy"]),
];

export const DUMMY_SUNDAY_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("Su1", "Roast Turkey", ["High-Carbon-Footprint"]),
  makeItem("Su2", "Mashed Potatoes", ["Dairy", "Vegan"]),
  makeItem("Su3", "Stuffing", ["Wheat", "Gluten", "Vegan"]),
  makeItem("Su4", "Cranberry Sauce", ["Vegan", "Low-Carbon-Footprint"]),
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
  makeItem("WF1", "Grilled Chicken", ["High-Carbon-Footprint"]),
  makeItem("WF2", "Steak", ["High-Carbon-Footprint"]),
  makeItem("WF3", "Grilled Tofu", ["Soy", "Vegan", "Low-Carbon-Footprint"]),
  makeItem("WF4", "Grilled Salmon", ["Fish"]),
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
  makeItem("WX1", "Side of Guacamole", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WX2", "Extra Cheese", ["Dairy"]),
  makeItem("WX3", "Side of Rice", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WX4", "Side of Beans", ["Vegan", "Low-Carbon-Footprint"]),
];

export const DUMMY_WEST_DRINK_ITEMS: ReadonlyArray<MenuItemData> = [
  makeItem("WD1", "Fountain Drink", []),
  makeItem("WD2", "Iced Tea", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WD3", "Lemonade", ["Vegan", "Low-Carbon-Footprint"]),
  makeItem("WD4", "Bottled Water", ["Vegan", "Low-Carbon-Footprint"]),
];
