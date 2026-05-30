import { Room, FoodItem } from './types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 101,
    name: "Prince Executive Crown Suite",
    type: "premium",
    hasAC: true,
    rentPerDay: 3000,
    description: "Our signature luxury suite featuring a majestic king-size bed, smart ambient climate controls, high-speed Wi-Fi, and premium ensuite bathroom with hot shower.",
    amenities: ["Ultra-Cool Air Conditioning (AC)", "King Size Bed", "High-Speed Wi-Fi", "Digital Smart TV", "Ensuite Bathroom", "24/7 Room Service"],
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 102,
    name: "Emerald Garden AC Suite",
    type: "premium",
    hasAC: true,
    rentPerDay: 3000,
    description: "Superb double-occupancy suite overlooking the beautiful tropical lawns of Prince Motel. Handcrafted teakwood furniture meets responsive AC systems.",
    amenities: ["Comfort Air Conditioning (AC)", "Garden View Terrace", "Plush Queen Bed", "Complimentary Beverages", "Safe Locker"],
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 103,
    name: "Imperial AC Vista Suite",
    type: "premium",
    hasAC: true,
    rentPerDay: 3000,
    description: "Architect-designed interior with deep forest green themes and indirect neon lighting. Features a private mini-bar and premium comfort mattress.",
    amenities: ["Premium Air Conditioning (AC)", "Mini Bar Fridge", "Workspace Corner", "Rain Shower Suite", "Plush Bathrobes"],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 104,
    name: "Jade Breeze Normal Room",
    type: "normal",
    hasAC: false,
    rentPerDay: 1500,
    description: "Comfortable and budget-friendly non-AC room optimized with ceiling fan cooling, large openable fresh-air windows, and traditional hospitality decor.",
    amenities: ["Natural Cooling Ceiling Fan", "Double Bed", "Wide Windows", "Ensuite Washroom", "Fresh Towels Daily"],
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 105,
    name: "Meadow View Classic Normal Room",
    type: "normal",
    hasAC: false,
    rentPerDay: 1500,
    description: "Quaint non-AC sanctuary featuring beautiful natural ventilation, a highly comfortable bed, and writing table. Designed for the adventurous budget traveler.",
    amenities: ["Ceiling Fan", "Work Desk", "Window Side Sitting", "24/7 Cold/Hot Water", "Housekeeping Service"],
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800"
  }
];

export const VEG_FOOD_ITEMS: FoodItem[] = [
  {
    id: "veg_punjabi",
    name: "Punjabi Special",
    category: "veg",
    price: 500,
    description: "Rich and creamy Paneer Butter Masala served with butter naan, dal makhani, and fragrant jeera rice.",
    imagePlaceholderColor: "bg-emerald-950/40 border-emerald-500/30"
  },
  {
    id: "veg_idli",
    name: "Genuine South Indian Edli",
    category: "veg",
    price: 500,
    description: "Soft, fluffy steamed rice cakes (4 pieces) served with warm sambar and signature coconut & tomato chutneys.",
    imagePlaceholderColor: "bg-green-950/40 border-green-500/30"
  },
  {
    id: "veg_dhosa",
    name: "Crispy Golden Dhosa",
    category: "veg",
    price: 500,
    description: "Thin crepe made of fermented rice-and-lentil batter filled with seasoned potato masala, served with chutneys.",
    imagePlaceholderColor: "bg-teal-950/40 border-teal-500/30"
  },
  {
    id: "veg_chinese",
    name: "Wok-fired Chinese Food",
    category: "veg",
    price: 500,
    description: "Fiery Schezwan Veg Noodles and Hakka Veg Fried Rice served with crunchy dry Manchurian balls.",
    imagePlaceholderColor: "bg-emerald-900/40 border-emerald-500/30"
  },
  {
    id: "veg_gujarati",
    name: "Royal Gujarati Thali",
    category: "veg",
    price: 500,
    description: "A colossal platter featuring Gujarati Kadhi, sweet dal, rotlis, potato sukhi bhaji, dhoklas, and pristine basmati rice.",
    imagePlaceholderColor: "bg-green-900/40 border-green-500/30"
  }
];

export const NON_VEG_FOOD_ITEMS: FoodItem[] = [
  {
    id: "nonveg_chicken",
    name: "Mouthwatering Chicken Special Items",
    category: "non-veg",
    price: 600,
    description: "Sizzling Tandoori Chicken, succulent Butter Chicken Curry, or spicy Chicken Biryani cooked to culinary perfection.",
    imagePlaceholderColor: "bg-lime-950/40 border-lime-500/30"
  },
  {
    id: "nonveg_eggs",
    name: "Double Egg Special (All Items Included)",
    category: "non-veg",
    price: 600,
    description: "Your preference of Egg Bhurji, Masala Egg Curry, Egg Fried Rice, or French Toast made from farm-fresh organic eggs.",
    imagePlaceholderColor: "bg-emerald-950/40 border-emerald-500/30"
  }
];
