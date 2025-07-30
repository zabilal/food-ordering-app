import { Request, Response, NextFunction } from 'express';
import { ValidationError as AppValidationError } from './errors';

interface ValidationError {
  param: string;
  msg: string;
  location?: string;
  value?: any;
}

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: result.array()
    });
  }
  next();
};

// Custom validation result handler
const validationResult = (req: Request) => {
  const errors: ValidationError[] = [];
  
  // Check if there are any validation errors in the request
  if (req.validationErrors) {
    errors.push(...req.validationErrors);
  }
  
  return {
    isEmpty: (): boolean => errors.length === 0,
    array: (): ValidationError[] => errors
  };
};

// Export the validationResult function for use in controllers
export { validationResult };
