"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationResult = exports.validateRequest = void 0;
const validateRequest = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: result.array()
        });
    }
    next();
};
exports.validateRequest = validateRequest;
// Custom validation result handler
const validationResult = (req) => {
    const errors = [];
    // Check if there are any validation errors in the request
    if (req.validationErrors) {
        errors.push(...req.validationErrors);
    }
    return {
        isEmpty: () => errors.length === 0,
        array: () => errors
    };
};
exports.validationResult = validationResult;
