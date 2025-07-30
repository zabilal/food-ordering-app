"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.createFood = exports.getFood = exports.getFoods = void 0;
const foodService = __importStar(require("../services/food.service"));
const validation_1 = require("../utils/validation");
const getFoods = async (req, res) => {
    try {
        const { category, search } = req.query;
        const foods = await foodService.getAllFoods(category, search);
        res.json(foods);
    }
    catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getFoods = getFoods;
const getFood = async (req, res) => {
    try {
        const food = await foodService.getFoodById(parseInt(req.params.id));
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(food);
    }
    catch (error) {
        console.error('Error fetching food:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getFood = getFood;
exports.createFood = [
    // Validation middleware would go here
    validation_1.validateRequest,
    // Request handler
    async (req, res) => {
        try {
            const food = await foodService.createFood(req.body);
            res.status(201).json({
                success: true,
                data: food
            });
        }
        catch (error) {
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
exports.updateFood = [
    // Validation middleware would go here
    validation_1.validateRequest,
    // Request handler
    async (req, res) => {
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
        }
        catch (error) {
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
const deleteFood = async (req, res) => {
    try {
        const success = await foodService.deleteFood(parseInt(req.params.id));
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Food not found'
            });
        }
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting food:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        });
    }
};
exports.deleteFood = deleteFood;
