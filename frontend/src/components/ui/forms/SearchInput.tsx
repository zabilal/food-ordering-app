import { Search } from 'lucide-react';
import { Input, InputProps } from './Input';
import { cn } from '@/lib/utils';

export interface SearchInputProps extends Omit<InputProps, 'type' | 'prefix'> {
  onSearch?: (query: string) => void;
  debounce?: number;
}

export function SearchInput({
  className,
  onSearch,
  debounce = 300,
  ...props
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      // We'll implement debouncing in the parent component for better control
      onSearch(e.target.value);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="search"
        className="w-full pl-10"
        placeholder="Search for food..."
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
