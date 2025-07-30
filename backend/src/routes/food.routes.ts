import { Router } from 'express';
import * as foodController from '../controllers/food.controller';
import { validateFoodCreate, validateFoodUpdate, validateIdParam } from '../middleware/validation';
import { validate } from '../middleware/validate';

const router = Router();

// GET /foods - Get all foods (with optional category and search filters)
router.get('/', foodController.getFoods);

// GET /foods/:id - Get a single food item by ID
router.get('/:id', validateIdParam, validate, foodController.getFood);

// POST /foods - Create a new food item
router.post('/', validateFoodCreate, validate, foodController.createFood);

// PUT /foods/:id - Update a food item
router.put('/:id', [...validateIdParam, ...validateFoodUpdate], validate, foodController.updateFood);

// DELETE /foods/:id - Delete a food item
router.delete('/:id', validateIdParam, validate, foodController.deleteFood);

export default router;
