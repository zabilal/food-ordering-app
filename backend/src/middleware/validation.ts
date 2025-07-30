import { check, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation middleware functions
export const validateFoodCreate: ValidationChain[] = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  check('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  check('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
  
  check('imageUrl')
    .isURL()
    .withMessage('Image URL must be a valid URL')
    .matches(/\.(jpe?g|png|gif|webp)$/)
    .withMessage('Image URL must be a valid image URL'),
  
  check('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  
  check('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5')
];

export const validateFoodUpdate: ValidationChain[] = [
  check('id')
    .isInt()
    .withMessage('Invalid food ID'),
  
  check('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  check('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  check('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
  
  check('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL')
    .matches(/\.(jpe?g|png|gif|webp)$/)
    .withMessage('Image URL must be a valid image URL'),
  
  check('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  
  check('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5')
];

export const validateIdParam: ValidationChain[] = [
  check('id')
    .isInt()
    .withMessage('Invalid food ID')
];
