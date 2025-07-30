import { FC } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
};

const colorClasses = {
  primary: 'border-t-primary border-r-primary/30 border-b-primary/30 border-l-primary/30',
  white: 'border-t-white border-r-white/30 border-b-white/30 border-l-white/30',
  gray: 'border-t-gray-500 border-r-gray-300 border-b-gray-300 border-l-gray-300',
};

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  return (
    <div className={`inline-block ${className}`} role="status" aria-live="polite" aria-busy="true">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        style={{ animation: 'spin 1s linear infinite' }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export const PageLoader: FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
    <LoadingSpinner size="lg" />
    <p className="text-gray-600">{message}</p>
  </div>
);

export const InlineLoader: FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="flex items-center space-x-2">
    <LoadingSpinner size="sm" />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

export default LoadingSpinner;
