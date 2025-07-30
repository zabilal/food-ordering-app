import request from 'supertest';
import { app } from '../../app';
import { Food } from '../../models/food.model';
import { createTestFood } from '../../test/test-utils';

describe('Food Controller', () => {
  describe('GET /foods', () => {
    it('should return all food items', async () => {
      // Create test data
      const testFood1 = await createTestFood({ name: 'Pizza' });
      const testFood2 = await createTestFood({ name: 'Burger' });

      const response = await request(app)
        .get('/api/foods')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(2);
      
      // Check that both test foods are in the response
      const foodNames = response.body.data.map((f: any) => f.name);
      expect(foodNames).toContain('Pizza');
      expect(foodNames).toContain('Burger');
    });

    it('should filter food items by category', async () => {
      // Create test data
      await createTestFood({ name: 'Pizza', category: 'Italian' });
      await createTestFood({ name: 'Burger', category: 'American' });
      await createTestFood({ name: 'Pasta', category: 'Italian' });

      const response = await request(app)
        .get('/api/foods?category=Italian')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data.every((f: any) => f.category === 'Italian')).toBe(true);
    });
  });

  describe('GET /foods/:id', () => {
    it('should return a single food item', async () => {
      const testFood = await createTestFood({ name: 'Special Pizza' });

      const response = await request(app)
        .get(`/api/foods/${testFood.id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id', testFood.id);
      expect(response.body.data.name).toBe('Special Pizza');
    });

    it('should return 404 for non-existent food item', async () => {
      const response = await request(app)
        .get('/api/foods/9999')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toBe('Food not found');
    });
  });

  describe('POST /foods', () => {
    it('should create a new food item', async () => {
      const newFood = {
        name: 'New Pizza',
        description: 'Delicious new pizza',
        price: 12.99,
        imageUrl: 'https://example.com/pizza.jpg',
        category: 'Italian',
        rating: 4.5
      };

      const response = await request(app)
        .post('/api/foods')
        .send(newFood)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toMatchObject({
        name: newFood.name,
        description: newFood.description,
        price: newFood.price.toString(),
        imageUrl: newFood.imageUrl,
        category: newFood.category,
        rating: newFood.rating.toString()
      });

      // Verify the food was actually created in the database
      const createdFood = await Food.findByPk(response.body.data.id);
      expect(createdFood).not.toBeNull();
      expect(createdFood?.name).toBe(newFood.name);
    });

    it('should return 400 for invalid input', async () => {
      const invalidFood = {
        // Missing required 'name' field
        description: 'Missing name',
        price: 'not a number',
        category: 'Test'
      };

      const response = await request(app)
        .post('/api/foods')
        .send(invalidFood)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(Array.isArray(response.body.errors)).toBe(true);
      
      // Check that we got validation errors for the missing/invalid fields
      const errorFields = response.body.errors.map((e: any) => e.param);
      expect(errorFields).toContain('name');
      expect(errorFields).toContain('price');
    });
  });

  describe('PUT /foods/:id', () => {
    it('should update an existing food item', async () => {
      const testFood = await createTestFood({ name: 'Old Name', price: 9.99 });

      const updates = {
        name: 'Updated Name',
        price: 14.99
      };

      const response = await request(app)
        .put(`/api/foods/${testFood.id}`)
        .send(updates)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toMatchObject({
        name: updates.name,
        price: updates.price.toString()
      });

      // Verify the food was actually updated in the database
      const updatedFood = await Food.findByPk(testFood.id);
      expect(updatedFood?.name).toBe(updates.name);
      expect(Number(updatedFood?.price)).toBe(updates.price);
    });

    it('should return 404 for non-existent food item', async () => {
      const response = await request(app)
        .put('/api/foods/9999')
        .send({ name: 'Updated' })
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toBe('Food not found');
    });
  });

  describe('DELETE /foods/:id', () => {
    it('should delete an existing food item', async () => {
      const testFood = await createTestFood({ name: 'To Be Deleted' });

      await request(app)
        .delete(`/api/foods/${testFood.id}`)
        .expect(204);

      // Verify the food was actually deleted from the database
      const deletedFood = await Food.findByPk(testFood.id);
      expect(deletedFood).toBeNull();
    });

    it('should return 204 even if the food item does not exist', async () => {
      // This is the current behavior - returns 204 even if the ID doesn't exist
      await request(app)
        .delete('/api/foods/9999')
        .expect(204);
    });
  });
});
