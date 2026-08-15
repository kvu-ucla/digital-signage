import type { ScreenProps } from "@/lib/resolveScreen";
import { EntranceScreen } from "@/templates/EntranceScreen";
import { ENTRANCE_LEGEND_CONFIG } from "../config";
import { isMockMode } from "@/lib/mockMode";
import type { MergedMenuData } from "@/lib/types";

const header = (
  <header className="flex h-[250px] w-full shrink-0 items-center justify-center bg-black text-white">
    <div className="flex h-full w-[230px] shrink-0 items-center justify-center">
      <img
        src="./icons/feast-Logo-07-Orange-White.svg"
        alt="Feast at Rieber"
        className="h-[162px] w-[189px] object-contain"
      />
    </div>

    <div className="h-[162px] w-0 border-r-2 border-white mx-10" />

    <div className="flex flex-col justify-center">
      <h1 className="text-[175px] font-light uppercase leading-none tracking-[0.15em] font-JosefinSans-light">
        WELCOME
      </h1>
    </div>
  </header>
);

// Dummy data to test formatting
function ensureMockData(data: MergedMenuData): MergedMenuData {
  if (data.stationsWithRegions.length > 0) return data;

  const mockItems = [
    {
      recipeNumber: "mock-001",
      name: "Green Papaya Salad",
      description: "A refreshing and tangy salad with shredded papaya",
      price: null,
      dietaryLabels: ["Soy", "Vegan", "Low-Carbon-Footprint"],
      mealType: "all day",
    },
    {
      recipeNumber: "mock-002",
      name: "Lemongrass Tofu",
      description: "Crispy tofu stir-fried with fragrant lemongrass",
      price: null,
      dietaryLabels: ["Vegan", "Gluten"],
      mealType: "all day",
    },
    {
      recipeNumber: "mock-003",
      name: "Char Siu Pork",
      description: "Cantonese-style barbecued pork with honey glaze",
      price: null,
      dietaryLabels: ["Soy", "Wheat"],
      mealType: "all day",
    },
    {
      recipeNumber: "mock-004",
      name: "Miso Ramen",
      description: "Rich miso broth with ramen noodles and soft egg",
      price: null,
      dietaryLabels: ["Soy", "Wheat", "Eggs", "Dairy"],
      mealType: "all day",
    },
    {
      recipeNumber: "mock-005",
      name: "Tandoori Chicken",
      description: "Yogurt-marinated chicken baked in a clay oven",
      price: null,
      dietaryLabels: ["Dairy"],
      mealType: "all day",
    },
    {
      recipeNumber: "mock-006",
      name: "Garlic Naan",
      description: "Soft leavened bread topped with garlic and butter",
      price: null,
      dietaryLabels: ["Wheat", "Dairy"],
      mealType: "all day",
    },
    {
      recipeNumber: "mock-007",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato, mozzarella, and basil",
      price: null,
      dietaryLabels: ["Wheat", "Dairy"],
      mealType: "all day",
    },
    {
      recipeNumber: "mock-008",
      name: "Grilled Salmon",
      description: "Atlantic salmon fillet with lemon herb butter",
      price: null,
      dietaryLabels: ["Fish", "Dairy"],
      mealType: "all day",
    },
  ];

  return {
    ...data,
    stationsWithRegions: [
      {
        name: "Bruin Wok",
        items: mockItems.slice(0, 2),
        regionPosition: 1,
        regionOrder: 1,
      },
      {
        name: "Spice Kitchen",
        items: mockItems.slice(2, 4),
        regionPosition: 2,
        regionOrder: 1,
      },
      {
        name: "Stone Oven",
        items: mockItems.slice(4, 6),
        regionPosition: 3,
        regionOrder: 1,
      },
      {
        name: "Iron Grill",
        items: mockItems.slice(6, 8),
        regionPosition: 4,
        regionOrder: 1,
      },
    ],
  };
}

// Dummy data is a formatting aid only — it renders solely in mock mode
// (?mock=true). Live boards show the real feed, even when it's empty.
export default function Entrance({ data }: ScreenProps) {
  const fullData = isMockMode() ? ensureMockData(data) : data;
  return (
    <EntranceScreen data={fullData} header={header} legendConfig={ENTRANCE_LEGEND_CONFIG} />
  );
}
