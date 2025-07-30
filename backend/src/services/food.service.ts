import Food from '../models/food.model';
import { Op } from 'sequelize';

export interface CreateFoodInput {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating?: number;
}

export interface UpdateFoodInput extends Partial<CreateFoodInput> {}

export const getAllFoods = async (category?: string, searchTerm?: string) => {
  const where: any = {};
  
  if (category) {
    where.category = category;
  }
  
  if (searchTerm) {
    where.name = { [Op.iLike]: `%${searchTerm}%` };
  }
  
  return await Food.findAll({ where });
};

export const getFoodById = async (id: number) => {
  return await Food.findByPk(id);
};

export const createFood = async (input: CreateFoodInput) => {
  return await Food.create(input);
};

export const updateFood = async (id: number, input: UpdateFoodInput) => {
  const food = await Food.findByPk(id);
  if (!food) {
    throw new Error('Food not found');
  }
  return await food.update(input);
};

export const deleteFood = async (id: number) => {
  const food = await Food.findByPk(id);
  if (!food) {
    throw new Error('Food not found');
  }
  await food.destroy();
  return true;
};
