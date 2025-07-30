import { z } from 'zod';

// Common validation messages
export const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (length: number) => `Must be at least ${length} characters`,
  maxLength: (length: number) => `Must be at most ${length} characters`,
};

// Base schemas
export const emailSchema = z
  .string()
  .min(1, { message: validationMessages.required })
  .email({ message: validationMessages.email });

export const passwordSchema = z
  .string()
  .min(8, { message: validationMessages.minLength(8) })
  .max(100, { message: validationMessages.maxLength(100) });

// Form schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: validationMessages.required }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const checkoutSchema = z.object({
  fullName: z.string().min(1, { message: validationMessages.required }),
  email: emailSchema,
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(1, { message: validationMessages.required }),
  city: z.string().min(1, { message: validationMessages.required }),
  zipCode: z.string().min(5, { message: 'Please enter a valid ZIP code' }),
  paymentMethod: z.enum(['credit_card', 'paypal', 'cash_on_delivery'], {
    required_error: 'Please select a payment method',
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

// Food related schemas
export const foodItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: validationMessages.required }),
  description: z.string().min(1, { message: validationMessages.required }),
  price: z.number().min(0.01, { message: 'Price must be greater than 0' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  image: z.string().url({ message: 'Please enter a valid URL' }).optional(),
  isAvailable: z.boolean().default(true),
  ingredients: z.array(z.string()).optional(),
  calories: z.number().min(0).optional(),
  prepTime: z.number().min(0).optional(),
});

// Review schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, { message: 'Please enter your review' }),
});

// Export types
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type FoodItemFormData = z.infer<typeof foodItemSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;

// Helper function to format validation errors
export function formatValidationError(error: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formattedErrors[path] = err.message;
  });
  
  return formattedErrors;
}

// Helper function to create form resolver for react-hook-form
export function createFormResolver<T extends z.ZodType<any, any>>(schema: T) {
  return (values: any) => {
    try {
      return { values: schema.parse(values), errors: {} };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          values: {},
          errors: formatValidationError(error),
        };
      }
      throw error;
    }
  };
}
