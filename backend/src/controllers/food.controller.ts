import { Request, Response, NextFunction } from 'express';
import * as foodService from '../services/food.service';
import { ValidationError } from '../utils/errors';
import { validateRequest, validationResult } from '../utils/validation';

// Type augmentation for request
declare global {
  namespace Express {
    interface Request {
      validationErrors?: Array<{
        param: string;
        msg: string;
        location?: string;
        value?: any;
      }>;
    }
  }
}

export const getFoods = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    const foods = await foodService.getAllFoods(
      category as string | undefined,
      search as string | undefined
    );
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFood = async (req: Request, res: Response) => {
  try {
    const food = await foodService.getFoodById(parseInt(req.params.id));
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    console.error('Error fetching food:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createFood = [
  // Validation middleware would go here
  validateRequest,
  
  // Request handler
  async (req: Request, res: Response) => {
    try {
      const food = await foodService.createFood(req.body);
      res.status(201).json({
        success: true,
        data: food
      });
    } catch (error) {
      console.error('Error creating food:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ 
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      });
    }
  }
];

export const updateFood = [
  // Validation middleware would go here
  validateRequest,
  
  // Request handler
  async (req: Request, res: Response) => {
    try {
      const food = await foodService.updateFood(parseInt(req.params.id), req.body);
      if (!food) {
        return res.status(404).json({ 
          success: false,
          message: 'Food not found' 
        });
      }
      res.json({
        success: true,
        data: food
      });
    } catch (error) {
      console.error('Error updating food:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ 
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      });
    }
  }
];

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const success = await foodService.deleteFood(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ 
        success: false,
        message: 'Food not found' 
      });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting food:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
};
