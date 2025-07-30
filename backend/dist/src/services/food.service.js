"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.createFood = exports.getFoodById = exports.getAllFoods = void 0;
const food_model_1 = __importDefault(require("../models/food.model"));
const sequelize_1 = require("sequelize");
const getAllFoods = async (category, searchTerm) => {
    const where = {};
    if (category) {
        where.category = category;
    }
    if (searchTerm) {
        where.name = { [sequelize_1.Op.iLike]: `%${searchTerm}%` };
    }
    return await food_model_1.default.findAll({ where });
};
exports.getAllFoods = getAllFoods;
const getFoodById = async (id) => {
    return await food_model_1.default.findByPk(id);
};
exports.getFoodById = getFoodById;
const createFood = async (input) => {
    return await food_model_1.default.create(input);
};
exports.createFood = createFood;
const updateFood = async (id, input) => {
    const food = await food_model_1.default.findByPk(id);
    if (!food) {
        throw new Error('Food not found');
    }
    return await food.update(input);
};
exports.updateFood = updateFood;
const deleteFood = async (id) => {
    const food = await food_model_1.default.findByPk(id);
    if (!food) {
        throw new Error('Food not found');
    }
    await food.destroy();
    return true;
};
exports.deleteFood = deleteFood;
