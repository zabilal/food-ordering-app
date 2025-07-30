"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectValidationError = exports.createTestFood = exports.createTestServer = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const food_model_1 = __importDefault(require("../models/food.model"));
const globals_1 = require("@jest/globals");
const TEST_PORT = process.env.TEST_PORT || 0;
const createTestServer = () => {
    const expressApp = app_1.default.getServer();
    const server = expressApp.listen(TEST_PORT);
    return {
        server,
        request: (0, supertest_1.default)(expressApp)
    };
};
exports.createTestServer = createTestServer;
const createTestFood = async (overrides = {}) => {
    const defaultFood = {
        name: 'Test Food',
        description: 'A delicious test food',
        price: 9.99,
        imageUrl: 'https://example.com/food.jpg',
        category: 'Test',
        rating: 4.5
    };
    return await food_model_1.default.create({ ...defaultFood, ...overrides });
};
exports.createTestFood = createTestFood;
const expectValidationError = (response, field) => {
    (0, globals_1.expect)(response.status).toBe(400);
    (0, globals_1.expect)(response.body).toHaveProperty('success', false);
    (0, globals_1.expect)(Array.isArray(response.body.errors)).toBe(true);
    (0, globals_1.expect)(response.body.errors.some((err) => err.param === field && err.msg && typeof err.msg === 'string')).toBe(true);
};
exports.expectValidationError = expectValidationError;
