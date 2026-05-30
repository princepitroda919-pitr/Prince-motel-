export interface Room {
  id: number;
  name: string;
  type: 'premium' | 'normal';
  hasAC: boolean;
  rentPerDay: number;
  description: string;
  amenities: string[];
  imageUrl: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'veg' | 'non-veg';
  price: number;
  description: string;
  imagePlaceholderColor: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  roomId: number;
  roomName: string;
  roomType: 'premium' | 'normal';
  rentPerDay: number;
  checkInDate: string;
  checkOutDate: string;
  totalDays: number;
  roomTotal: number;
  foodOrders: {
    foodId: string;
    foodName: string;
    quantity: number;
    price: number;
  }[];
  foodTotal: number;
  grandTotal: number;
  createdAt: string;
}
