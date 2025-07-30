export type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  prepTime: number; // in minutes
  isVeg: boolean;
  isSpicy: boolean;
  isPopular: boolean;
};

export type FoodCategory = {
  id: string;
  name: string;
  icon: string;
};
