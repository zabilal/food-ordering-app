import { Food } from '../../models/food.model';
import * as foodService from '../../services/food.service';
import { createTestFood } from '../../test/test-utils';

describe('Food Service', () => {
  describe('createFood', () => {
    it('should create a new food item', async () => {
      const foodData = {
        name: 'Test Food',
        description: 'A delicious test food',
        price: 9.99,
        imageUrl: 'https://example.com/food.jpg',
        category: 'Test',
        rating: 4.5
      };

      const food = await foodService.createFood(foodData);
      
      expect(food).toHaveProperty('id');
      expect(food.name).toBe(foodData.name);
      expect(food.description).toBe(foodData.description);
      expect(Number(food.price)).toBe(foodData.price);
      expect(food.imageUrl).toBe(foodData.imageUrl);
      expect(food.category).toBe(foodData.category);
      expect(Number(food.rating)).toBe(foodData.rating);
    });
  });

  describe('getFoods', () => {
    it('should return all food items', async () => {
      // Create test data
      await createTestFood({ name: 'Food 1' });
      await createTestFood({ name: 'Food 2' });

      const foods = await foodService.getFoods();
      
      expect(Array.isArray(foods)).toBe(true);
      expect(foods.length).toBe(2);
      expect(foods[0].name).toBe('Food 1');
      expect(foods[1].name).toBe('Food 2');
    });

    it('should filter food items by category', async () => {
      // Create test data
      await createTestFood({ name: 'Pizza', category: 'Italian' });
      await createTestFood({ name: 'Burger', category: 'American' });
      await createTestFood({ name: 'Pasta', category: 'Italian' });

      const italianFoods = await foodService.getFoods({ category: 'Italian' });
      
      expect(italianFoods.length).toBe(2);
      expect(italianFoods.every(food => food.category === 'Italian')).toBe(true);
    });
  });

  describe('getFoodById', () => {
    it('should return a food item by id', async () => {
      const testFood = await createTestFood({ name: 'Find Me' });
      
      const food = await foodService.getFoodById(testFood.id);
      
      expect(food).not.toBeNull();
      expect(food?.name).toBe('Find Me');
    });

    it('should return null for non-existent id', async () => {
      const food = await foodService.getFoodById(9999);
      expect(food).toBeNull();
    });
  });

  describe('updateFood', () => {
    it('should update a food item', async () => {
      const testFood = await createTestFood({ name: 'Old Name' });
      
      const updatedFood = await foodService.updateFood(testFood.id, { 
        name: 'New Name',
        price: 12.99 
      });
      
      expect(updatedFood).not.toBeNull();
      expect(updatedFood?.name).toBe('New Name');
      expect(Number(updatedFood?.price)).toBe(12.99);
    });

    it('should return null for non-existent id', async () => {
      const updatedFood = await foodService.updateFood(9999, { name: 'New Name' });
      expect(updatedFood).toBeNull();
    });
  });

  describe('deleteFood', () => {
    it('should delete a food item', async () => {
      const testFood = await createTestFood();
      
      const result = await foodService.deleteFood(testFood.id);
      
      expect(result).toBe(true);
      
      // Verify the food item was deleted
      const food = await foodService.getFoodById(testFood.id);
      expect(food).toBeNull();
    });

    it('should return false for non-existent id', async () => {
      const result = await foodService.deleteFood(9999);
      expect(result).toBe(false);
    });
  });
});
