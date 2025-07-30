import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import classNames from 'classnames';

type InputVariant = 'default' | 'error' | 'success' | 'warning';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: FieldError | string;
  variant?: InputVariant;
  inputSize?: InputSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const inputVariants: Record<InputVariant, string> = {
  default: 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
  error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
  success: 'border-green-500 focus:ring-green-500 focus:border-green-500',
  warning: 'border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500',
};

const inputSizes: Record<InputSize, string> = {
  sm: 'py-1.5 px-3 text-sm rounded',
  md: 'py-2 px-4 text-base rounded-md',
  lg: 'py-3 px-5 text-lg rounded-lg',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      variant = 'default',
      inputSize = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      containerClassName = '',
      labelClassName = '',
      errorClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const errorMessage = typeof error === 'string' ? error : error?.message;
    const isError = !!errorMessage;
    const inputVariant = isError ? 'error' : variant;

    const inputClasses = classNames(
      'block w-full border shadow-sm focus:outline-none focus:ring-1 transition-colors',
      inputVariants[inputVariant],
      inputSizes[inputSize],
      {
        'pl-10': leftIcon,
        'pr-10': rightIcon,
        'w-full': fullWidth,
      },
      className
    );

    return (
      <div className={`${fullWidth ? 'w-full' : 'w-auto'} ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{leftIcon}</span>
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={inputClasses}
            aria-invalid={isError}
            aria-describedby={isError ? `${inputId}-error` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {isError && (
          <p
            id={`${inputId}-error`}
            className={`mt-1 text-sm text-red-600 ${errorClassName}`}
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

// Example usage:
/*
import { useForm } from 'react-hook-form';

const { register, formState: { errors } } = useForm();

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  {...register('email', { 
    required: 'Email is required',
    pattern: { 
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
      message: 'Invalid email address' 
    } 
  })}
/>
*/
