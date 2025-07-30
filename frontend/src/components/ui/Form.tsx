import { ComponentPropsWithoutRef, ReactNode, createContext, useContext } from 'react';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { ErrorBoundary } from '../ErrorBoundary';

interface FormProps<TFieldValues extends Record<string, any> = Record<string, any>> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  children: ReactNode;
  className?: string;
  formProps?: Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit' | 'className'>;
  error?: string | null;
  loading?: boolean;
  submitLabel?: string;
  showSubmitButton?: boolean;
  autoComplete?: string;
}

interface FormContextType {
  loading: boolean;
}

const FormContext = createContext<FormContextType>({ loading: false });

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export function Form<TFieldValues extends Record<string, any> = Record<string, any>>({
  form,
  onSubmit,
  children,
  className = '',
  formProps = {},
  error,
  loading = false,
  submitLabel = 'Submit',
  showSubmitButton = true,
  autoComplete = 'on',
}: FormProps<TFieldValues>) {
  const { handleSubmit, formState: { isSubmitting } } = form;
  const isLoading = loading || isSubmitting;

  return (
    <FormProvider {...form}>
      <FormContext.Provider value={{ loading: isLoading }}>
        <ErrorBoundary>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`space-y-6 ${className}`}
            autoComplete={autoComplete}
            {...formProps}
          >
            <div className="space-y-4">
              {children}
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {showSubmitButton && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : submitLabel}
                </button>
              </div>
            )}
          </form>
        </ErrorBoundary>
      </FormContext.Provider>
    </FormProvider>
  );
}

// Form Field component
type FormFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
};

export function FormField({
  label,
  name,
  required = false,
  children,
  className = '',
  labelClassName = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={name}
        className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

// Form Error component
type FormErrorProps = {
  message?: string;
  className?: string;
};

export function FormError({ message, className = '' }: FormErrorProps) {
  if (!message) return null;
  
  return (
    <p className={`mt-1 text-sm text-red-600 ${className}`}>
      {message}
    </p>
  );
}

// Form Description component
type FormDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function FormDescription({ children, className = '' }: FormDescriptionProps) {
  return (
    <p className={`mt-1 text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
}
