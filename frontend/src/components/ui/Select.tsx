import { forwardRef, SelectHTMLAttributes, useId } from 'react';
import { FieldError } from 'react-hook-form';

type SelectVariant = 'default' | 'error' | 'success' | 'warning';
type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: FieldError | string;
  variant?: SelectVariant;
  size?: SelectSize;
  fullWidth?: boolean;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  leftIcon?: React.ReactNode;
}

const selectVariants: Record<SelectVariant, string> = {
  default: 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
  error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
  success: 'border-green-500 focus:ring-green-500 focus:border-green-500',
  warning: 'border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500',
};

const selectSizes: Record<SelectSize, string> = {
  sm: 'py-1.5 pl-3 pr-8 text-sm rounded',
  md: 'py-2 pl-3 pr-10 text-base rounded-md',
  lg: 'py-3 pl-4 pr-12 text-lg rounded-lg',
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      variant = 'default',
      size = 'md',
      fullWidth = false,
      options,
      placeholder = 'Select an option',
      className = '',
      containerClassName = '',
      labelClassName = '',
      errorClassName = '',
      leftIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorMessage = typeof error === 'string' ? error : error?.message;
    const isError = !!errorMessage;
    const selectVariant = isError ? 'error' : variant;
    const hasValue = props.value !== undefined && props.value !== '' && props.value !== null;

    return (
      <div className={`${fullWidth ? 'w-full' : 'w-auto'} ${containerClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">{leftIcon}</span>
            </div>
          )}
          <select
            id={selectId}
            ref={ref}
            className={`appearance-none block w-full bg-white border ${selectVariants[selectVariant]} ${selectSizes[size]} ${
              leftIcon ? 'pl-10' : 'pl-3'
            } pr-8 focus:outline-none focus:ring-1 ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${
              !hasValue ? 'text-gray-500' : 'text-gray-900'
            } ${className}`}
            disabled={disabled}
            aria-invalid={isError ? 'true' : 'false'}
            aria-describedby={isError ? `${selectId}-error` : undefined}
            {...props}
          >
            <option value="" disabled={!props.value}>
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="text-gray-900"
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {isError && (
          <p
            id={`${selectId}-error`}
            className={`mt-1 text-sm text-red-600 ${errorClassName}`}
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;

// Example usage:
/*
import { useForm } from 'react-hook-form';

const { register, formState: { errors } } = useForm();

const options = [
  { value: 'pizza', label: 'Pizza' },
  { value: 'burger', label: 'Burgers' },
  { value: 'sushi', label: 'Sushi' },
];

<Select
  label="Food Category"
  options={options}
  placeholder="Select a category"
  error={errors.category}
  {...register('category', { required: 'Category is required' })}
/>
*/
