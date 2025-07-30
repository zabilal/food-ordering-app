"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../utils/errors");
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        throw new errors_1.ValidationError('Validation failed', errors.array());
    };
};
exports.validate = validate;
const handleValidationErrors = (err, req, res, next) => {
    if (err instanceof errors_1.ValidationError) {
        return res.status(422).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }
    next(err);
};
exports.handleValidationErrors = handleValidationErrors;
