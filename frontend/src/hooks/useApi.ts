import { useState, useCallback } from 'react';

type ApiFunction<T, P extends any[]> = (...args: P) => Promise<T>;

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  initialLoading?: boolean;
}

interface UseApiResult<T, P extends any[]> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: P) => Promise<T | undefined>;
  clearError: () => void;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

export function useApi<T, P extends any[] = []>(
  apiFunction: ApiFunction<T, P>,
  options: UseApiOptions<T> = {}
): UseApiResult<T, P> {
  const { onSuccess, onError, initialLoading = false } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: P): Promise<T | undefined> => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await apiFunction(...args);
        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(error);
        onError?.(error);
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, onSuccess, onError]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    clearError,
    setData,
  };
}
