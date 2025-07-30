import { FoodItem, FoodCategory } from '@/types/food';

// In a real app, this would be an environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

// Fetch all food items
export async function getFoods(): Promise<FoodItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/foods`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    return handleResponse<FoodItem[]>(response);
  } catch (error) {
    console.error('Error fetching foods:', error);
    return []; // Return empty array in case of error
  }
}

// Fetch food item by ID
export async function getFoodById(id: string): Promise<FoodItem | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    return handleResponse<FoodItem>(response);
  } catch (error) {
    console.error(`Error fetching food with id ${id}:`, error);
    return null;
  }
}

// Fetch all categories
export async function getCategories(): Promise<FoodCategory[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    return handleResponse<FoodCategory[]>(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Search food items
export async function searchFoods(query: string): Promise<FoodItem[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/foods/search?q=${encodeURIComponent(query)}`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );
    return handleResponse<FoodItem[]>(response);
  } catch (error) {
    console.error('Error searching foods:', error);
    return [];
  }
}

// Get foods by category
export async function getFoodsByCategory(categoryId: string): Promise<FoodItem[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/foods/category/${encodeURIComponent(categoryId)}`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      }
    );
    return handleResponse<FoodItem[]>(response);
  } catch (error) {
    console.error(`Error fetching foods for category ${categoryId}:`, error);
    return [];
  }
}
