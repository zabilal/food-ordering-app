"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.validateFoodUpdate = exports.validateFoodCreate = void 0;
const express_validator_1 = require("express-validator");
// Validation middleware functions
exports.validateFoodCreate = [
    (0, express_validator_1.check)('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    (0, express_validator_1.check)('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10, max: 1000 })
        .withMessage('Description must be between 10 and 1000 characters'),
    (0, express_validator_1.check)('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.check)('imageUrl')
        .isURL()
        .withMessage('Image URL must be a valid URL')
        .matches(/\.(jpe?g|png|gif|webp)$/)
        .withMessage('Image URL must be a valid image URL'),
    (0, express_validator_1.check)('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required'),
    (0, express_validator_1.check)('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5')
];
exports.validateFoodUpdate = [
    (0, express_validator_1.check)('id')
        .isInt()
        .withMessage('Invalid food ID'),
    (0, express_validator_1.check)('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    (0, express_validator_1.check)('description')
        .optional()
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Description must be between 10 and 1000 characters'),
    (0, express_validator_1.check)('price')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.check)('imageUrl')
        .optional()
        .isURL()
        .withMessage('Image URL must be a valid URL')
        .matches(/\.(jpe?g|png|gif|webp)$/)
        .withMessage('Image URL must be a valid image URL'),
    (0, express_validator_1.check)('category')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Category cannot be empty'),
    (0, express_validator_1.check)('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5')
];
exports.validateIdParam = [
    (0, express_validator_1.check)('id')
        .isInt()
        .withMessage('Invalid food ID')
];
