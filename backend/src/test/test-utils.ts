import { Server } from 'http';
import request, { Test } from 'supertest';
import { Express } from 'express';
import app from '../app';
import Food from '../models/food.model';
import { expect } from '@jest/globals';

const TEST_PORT = process.env.TEST_PORT || 0;

interface TestServer {
  server: Server;
  request: request.Agent;
}

export const createTestServer = (): TestServer => {
  const expressApp = app.getServer();
  const server = expressApp.listen(TEST_PORT);
  
  return {
    server,
    request: request(expressApp)
  };
};

export const createTestFood = async (overrides: Partial<Food> = {}) => {
  const defaultFood = {
    name: 'Test Food',
    description: 'A delicious test food',
    price: 9.99,
    imageUrl: 'https://example.com/food.jpg',
    category: 'Test',
    rating: 4.5
  };
  
  return await Food.create({ ...defaultFood, ...overrides });
};

export const expectValidationError = (response: request.Response, field: string) => {
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('success', false);
  expect(Array.isArray(response.body.errors)).toBe(true);
  expect(
    response.body.errors.some((err: any) => 
      err.param === field && err.msg && typeof err.msg === 'string'
    )
  ).toBe(true);
};
